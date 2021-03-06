import ReactFullpage from '@fullpage/react-fullpage';
import { FirstCarousel } from '../component/carousel/FirstCarousel';
import { Charts } from '../component/charts/Charts';
import { Tableview } from '../component/Tableview/Tableview';
import {Drawer} from "@material-ui/core";
import {Selected} from "../component/Selectdevice/Selected";
import React, {useEffect, useState} from "react";
import {Nav} from "../component/public/Nav";
import {_getall,_getalertnum} from "../../util/request";
import './main.css';
export const Main=()=>{
    /*定义设备默认参数*/
    const defaultDevice={
        id:'',
        displayName:'',
        description:'',
        state:0,
        num:1,
        banner:[]
    }
    /*轮播总数*/
    const [count, setCount] = useState(0);
    /*轮播设备*/
    const [bannerdevice, setBannerdevice] = useState(defaultDevice);
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
    const handleSelectedChange=(flag,fullpageApi)=>{
        setChooseflag(flag)
        fullpageApi.setAllowScrolling(!flag);
    }

    useEffect( ()=> {
        _getall({}).then(res=>{
            // 数据清洗
            // @ts-ignore
            let data=res._embedded.endpoints
            data=data.map((item)=>{
                delete item._links
                item.state=2
                item.num=0
                item.banner=[item.image1,item.image2]
                return item
            })
            setCount(data.length)
            // @ts-ignore
            setMachinelist(data);
            setMachineid(data[0].id)
            _getalertnum({endpointId:data[0].id}).then(res=>{
                // @ts-ignore
                let num=res.payload
                data[0].num=num
                if(num>0){
                    data[0].state=1
                }
                setBannerdevice(data[0])
            })


        })
    },[])

    return(
        <>
        <ReactFullpage
            navigation
            scrollingSpeed = {1000}
            scrollHorizontally = {true}
            setAllowScrolling = {false}
            sectionsColor={["#1D2227", "#1D2227", "#1D2227"]}
            onLeave={(index, nextIndex, direction)=>{
                /*记录切换页面*/
                setPageindex(nextIndex.index)
            }}
            render={({ fullpageApi }) => {
                return (
                    <>
                        <Drawer
                            anchor='top'
                            open={chooseflag}
                            onClose={()=>handleSelectedChange(false,fullpageApi)}>
                            <Selected machinelist={machinelist}
                                      onChooseMachine={(chooseid)=>handleMachineChange(chooseid)}
                                      isshow={chooseflag}
                                      onCloseChange={()=>handleSelectedChange(false,fullpageApi)} />
                        </Drawer>
                        <div className="section">
                            <div className="pagecontainer section1-bg">
                                <Nav count={count} onSelectedChange={()=>handleSelectedChange(true,fullpageApi)}/>
                                <FirstCarousel device={bannerdevice} pageindex={pageindex} fullpage_api={fullpageApi} />
                            </div>
                        </div>
                        <div className="section" >
                            <div className="pagecontainer section2-bg">
                                <Nav count={count} onSelectedChange={()=>handleSelectedChange(true,fullpageApi)}/>
                                <Charts machineid={machineid} pageindex={pageindex} fullpage_api={fullpageApi} />
                            </div>
                        </div>
                        <div className="section" >
                            <div className="pagecontainer section3-bg">
                                <Nav count={count} onSelectedChange={()=>handleSelectedChange(true,fullpageApi)}/>
                                <Tableview  />
                            </div>
                        </div>
                    </>
            );
            }}
        />

        </>

    )
}