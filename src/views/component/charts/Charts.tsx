import { makeStyles } from '@material-ui/core/styles';
import ReactEcharts from  'echarts-for-react';
import React, {useEffect, useState} from 'react';
import {_getmachine,_getchart,_getprops} from "../../../util/request";
import Box from '@material-ui/core/Box';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Mouse} from "../public/Mouse";
const lodash = require('lodash');//深拷贝
const echarts = require('echarts/lib/echarts');
const option_default = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        axisPointer: {
            lineStyle: {
                color: '#FF8533',
            },
        },
        data: []
    },
    grid: {
        x: 30,
        y: 50,
        x2: 20,
        y2: 30,
    },
    yAxis: {
        type: 'value',
        splitLine:{
            show: true,
            lineStyle:{
                color: ['#41454C'],
                width: 1,
                type: 'solid'
            }
        },
    },
    tooltip: {
        trigger: 'axis'
    },
    series: [
        {
            data: [],
            type: 'line',
            showSymbol: false,
            symbolSize: 12,
            areaStyle: {
                color:new echarts.graphic.LinearGradient(
                    0,1, 0, 0,
                    [
                        {offset: 1, color: 'rgba(110,229,200,0.45)'},
                        {offset: 0.7, color: 'rgba(110,229,200,0.35)'},
                        {offset: 0.3, color: 'rgba(31,45,50,0.16)'},
                        {offset: 0, color: 'rgba(31,45,50,0)'},
                    ]),
                opacity:.4
            },
            itemStyle : {
                normal : {
                    color:'#FF8533',
                    lineStyle:{
                        color:'#44E7D5'
                    }
                }
            },
            smooth: true
        }
    ]
};
const Styles = makeStyles((theme) => ({
    selectcomp:{
        display:'flex',
        justifyContent: 'flex-end',
        paddingRight:'0.9vw'
    },
    FormControl:{
        minWidth:'130px',
        position:'relative',
        border:'1px solid #41454C',
        borderRadius:'4px',
        marginLeft:'20px',
    },
    occupy:{
        width:'100%',
        height:'30px',
        cursor:'pointer',
        position:'absolute'
    },
    autocomplete:{
        '& *':{
            color:'#ccc',
        },
        '& input':{
            fontSize:'14px',
            paddingLeft:'15px !important    ',
            fontFamily:'PingFangSC-Regular',
            fontWeight:400,
        },
        '& .MuiAutocomplete-inputRoot':{
            paddingRight:'0',
        },

    },
    fullpage:{
        width:'100vw',
        height:'100vh',
        position:'absolute',
        zIndex:988,
        top:'0vh'
    },

    title:{
        fontSize: '36px',
        textAlign: 'center',
        fontFamily:'PingFangSC-Medium',
        marginBottom: '11vh',
        marginTop: '7vh',
        color: '#fff',
        fontweight:'500',
    },
    color:{
        color: '#fff',
    },

    container:{
        width:'81vw',
        boxSizing:'border-box',
        margin:'0 auto',
    },
}));
const inittime=()=>{
    let date=new Date()
    let endtime=date.getTime()
    let pre_oneday=endtime-86400*1
    let pre_sevenday=endtime-86400*7
    let pre_month=new Date(date.setMonth(date.getMonth()-1)).getTime()
    return [
        {id:0,title:'请选择'},
        {id:1,title:'近一天',starttime:pre_oneday,endtime:endtime},
        {id:2,title:'近一周',starttime:pre_sevenday,endtime:endtime},
        {id:3,title:'近一月',starttime:pre_month,endtime:endtime},
        {id:4,title:'近一天',starttime:pre_oneday,endtime:endtime},
        {id:5,title:'近一周',starttime:pre_sevenday,endtime:endtime},
        {id:6,title:'近一月',starttime:pre_month,endtime:endtime},
        {id:7,title:'近一天',starttime:pre_oneday,endtime:endtime},
        {id:8,title:'近一周',starttime:pre_sevenday,endtime:endtime},
        {id:9,title:'近一月',starttime:pre_month,endtime:endtime},
        {id:10,title:'近一天',starttime:pre_oneday,endtime:endtime},
        {id:11,title:'近一周',starttime:pre_sevenday,endtime:endtime},
        {id:12,title:'近一月',starttime:pre_month,endtime:endtime},
    ]
}
export const Charts= (props) => {
    /**/
    const [option, setOption] = useState(option_default);
    /*机器分类*/
    const [machine,setMachine]=useState([])
    const [machineindex,setMachineindex]=useState(0)
    const [showmachine,setShowmachine]=useState(false)
    /*筛选属性*/
    const [prop,setProp]=useState([])
    const [propindex,setPropindex]=useState(0)
    const [showprop,setShowprop]=useState(false)
    const [refreshflag,setRefreshflag]=useState(false)
    /*筛选时间*/
    const time=inittime()
    const [timeindex,setTimeindex]=useState(0)
    const [showtime,setShowtime]=useState(false)
    const refreshoption=async ()=>{
        let machineid=machine[machineindex].id
        let propid=prop[propindex].id
        let starttime=time[timeindex].starttime
        let endtime=time[timeindex].endtime
        let chartdata=await _getchart({machineid,propid,starttime,endtime})
        /*可能需要深拷贝---这里浅拷贝*/
        let new_option=lodash.cloneDeep(option_default)
        // @ts-ignore
        new_option.xAxis.data=chartdata.x_data
        // @ts-ignore
        new_option.series[0].data=chartdata.y_data
        setOption(new_option)
    }
    /*
    *重新绘图
    * */
    useEffect(()=>{
        if(propindex!==0&&timeindex!==0){
            refreshoption()
        }
    },[propindex,timeindex])

    /*触发条件重置*/
    useEffect(()=>{
        if(props.pageindex===1){
            /*section1显示*/
            reset()
        }else{
            setRefreshflag(true);
        }
    },[props.machineid])
    /*触发条件重置*/
    useEffect(()=>{
        if(props.pageindex===1&&refreshflag){
            /*section1显示*/
            reset()
            setRefreshflag(false)
        }
    },[props.pageindex])
    /*
    * 选择设备刷新当前页面状态
    * 重新请求二级分类
    * 清空充值选择项
    * 重置图
    */
    const reset=async ()=>{
        /*重新请求二级分类-以及属性*/
        let machineitem=await _getmachine({id: props.machineid})
        let propsitem=await _getprops({id:machineitem[0].id})
        // @ts-ignore
        setMachine(machineitem)
        setMachineindex(0)
        // @ts-ignore
        setProp(propsitem)
        setPropindex(0)
        setTimeindex(0)
        /*重置图*/
        let new_option=lodash.cloneDeep(option_default)
        setOption(new_option)
    }
    /*
     * 二级分类改变事件
     * */
    const handleShowMachineChange=()=>{
        setShowmachine(!showmachine)
    }
    const handleMachineChange=async (event)=>{
        let machineindex=machine.findIndex(item=>{
            return item.title===event.title
        })
        setShowmachine(false)
        setMachineindex(machineindex)
        let propsitem=await _getprops({id:machine[machineindex].id})
        // @ts-ignore
        setProp(propsitem)
        setPropindex(0)
        setTimeindex(0)
        /*重置图*/
        let new_option=lodash.cloneDeep(option_default)
        setOption(new_option)
    }
    /*
     * 关闭所有
     * */
    const closeallselect=()=>{
        setShowprop(false)
        setShowtime(false)
        setShowmachine(false)
    }
    /*
     * 属性改变事件
     * */
    const handleShowPropChange=()=>{
        setShowprop(!showprop)
    }
    const handlePropChange=(event)=>{
        setShowprop(false)
        let propindex=prop.findIndex(item=>{
            return item.title===event.title
        })
        setPropindex(propindex)
    }
    /*
     * 时间改变事件
     * */
    const handleShowTimeChange=()=>{
        setShowtime(!showtime)
    }
    const handleTimeChange=(event)=>{
        setShowtime(false)
        let timeindex=time.findIndex(item=>{
            return item.title===event.title
        })
        setTimeindex(timeindex)
    }

    const classes = Styles();
    return (
        <div>
            <div className={classes.fullpage} style={{display:(showtime||showprop||showmachine)?'block':'none'}} onClick={()=>closeallselect()}></div>
            <div className={classes.title}>设备趋势</div>
            <div className={classes.container}>
                <div className={classes.selectcomp}>
                    <FormControl className={classes.FormControl}>
                        {/*设备二级分类*/}
                        <Autocomplete
                            id="grouped-demo"
                            options={machine}
                            disabled={true}
                            open={showmachine}
                            onChange={(e,newValue)=>handleMachineChange(newValue)}
                            getOptionLabel={(option) => option.title}
                            className={classes.autocomplete}
                            closeIcon={null}
                            renderInput={(params) => <TextField {...params} placeholder={'请选择'}  className={classes.color} disabled={true} />}
                        />
                        <div className={classes.occupy} onClick={()=>handleShowMachineChange()}></div>
                    </FormControl>
                    <FormControl className={classes.FormControl}>
                        {/*设备属性*/}
                        <Autocomplete
                            id="grouped-demo"
                            options={prop}
                            disabled={true}
                            open={showprop}
                            onChange={(e,newValue)=>handlePropChange(newValue)}
                            getOptionLabel={(option) => option.title}
                            className={classes.autocomplete}
                            closeIcon={null}
                            renderInput={(params) => <TextField {...params} placeholder={'请选择'}   className={classes.color} disabled={true} />}
                        />
                        <div className={classes.occupy} onClick={()=>handleShowPropChange()}></div>
                    </FormControl>
                    <FormControl className={classes.FormControl}>
                        {/*设备时间段分类*/}
                        <Autocomplete
                            id="grouped-demo"
                            options={time}
                            disabled={true}
                            open={showtime}
                            onChange={(e, newValue)=>handleTimeChange(newValue)}
                            getOptionLabel={(option) => option.title}
                            className={classes.autocomplete}
                            closeIcon={null}
                            renderInput={(params) => <TextField {...params} placeholder={'请选择'}   className={classes.color} disabled={true} />}
                        />
                        <div className={classes.occupy} onClick={()=>handleShowTimeChange()}></div>
                    </FormControl>
                </div>
                <ReactEcharts
                    option={option}
                    style={{ height: '60vh',width:'100%'}}
                />
                <Mouse />
            </div>
        </div>
    );
};