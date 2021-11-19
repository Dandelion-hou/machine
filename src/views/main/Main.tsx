import ReactFullpage from '@fullpage/react-fullpage';
import { FirstCarousel } from '../component/carousel/FirstCarousel';
import { Charts } from '../component/charts/Charts';
import { Tableview } from '../component/Tableview/Tableview';
import { Footer } from "../footer/Footer";
import {Drawer} from "@material-ui/core";
import {Selected} from "../component/Selectdevice/Selected";
import React, {useEffect, useState} from "react";
import {Nav} from "../component/public/Nav";
import {_getall} from "../../util/request";
import './main.css';
export const Main=()=>{
    /*设备列表*/
    const [machinelist, setMachinelist] = useState([]);
    /*设备编号*/
    const [machineid, setMachineid] = useState('');
    /*当前第几页*/
    const [pageindex, setPageindex] = useState(0);
    /*选择设备控制*/
    const [chooseflag, setChooseflag,] = useState(false);
    /*设备选择触发*/
    const handleMachineChange=(machineid)=>{
        setMachineid(machineid) //会自动触发上述effect
    }
    /*控制开关触发*/
    const handleSelectedChange=(flag)=>{
        setChooseflag(flag)
    }

    useEffect( ()=> {
        _getall({}).then(res=>{
            let data=res
            // @ts-ignore
            setMachinelist(data);
            setMachineid(data[0].id)
        })

    },[])

    return(
        <>
        <ReactFullpage
            navigation
            scrollingSpeed = {1000}
            scrollHorizontally = {true}
            sectionsColor={["#1D2227", "#1D2227", "#1D2227"]}
            onLeave={(index, nextIndex, direction)=>{
                /*记录切换页面*/
                setPageindex(nextIndex.index)
                /*关闭选择弹窗*/
                // setChooseflag(false)
                /*关闭选择弹窗*/
                // setChooseflag(false)
            }}
            render={() => {
                return (
                    <>

                        <div className="section">
                            <div className="pagecontainer section1-bg">
                                <Nav  onSelectedChange={()=>handleSelectedChange(true)}/>
                                <FirstCarousel pageindex={pageindex} />
                            </div>
                        </div>
                        <div className="section" >
                            <div className="pagecontainer section2-bg">
                                <Nav  onSelectedChange={()=>handleSelectedChange(true)}/>
                                <Charts machineid={machineid} pageindex={pageindex} />
                            </div>
                        </div>


                        <div className="section" >
                            <div className="pagecontainer section3-bg">
                                <Nav  onSelectedChange={()=>handleSelectedChange(true)}/>
                                <Tableview  />
                            </div>
                        </div>
                        <div className="section fp-auto-height">
                            <Footer />
                        </div>
                    </>
            );
            }}
        />
            <Drawer
                anchor='top'
                open={chooseflag}
                onClose={()=>handleSelectedChange(false)}>
                <Selected machinelist={machinelist}
                          onChooseMachine={(chooseid)=>handleMachineChange(chooseid)}
                          isshow={chooseflag}
                          onCloseChange={()=>handleSelectedChange(false)} />
            </Drawer>
        </>

    )
}