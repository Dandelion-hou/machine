import { makeStyles } from '@material-ui/core/styles';
import ReactEcharts from  'echarts-for-react';
import React, {useEffect, useState} from 'react';
import {_getmachine,_getchart,_getprops} from "../../../util/request";
import Box from '@material-ui/core/Box';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import './chart.css'
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
    select:{
        color:'#ccc',
        fontSize:'14px',
        fontFamily:'PingFangSC-Regular',
        marginLeft:'15px',
        fontWeight:400,
    },
    FormControl:{
        minWidth:'150px',
        border:'1px solid #41454C',
        borderRadius:'4px',
        marginLeft:'20px',
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
    ]
}
export const Charts= (props) => {
    /**/
    const [option, setOption] = useState(option_default);
    /*机器分类*/
    const [machine,setMachine]=useState([])
    /*选中机器*/
    const [machineindex,setMachineindex]=useState(0)
    /*筛选属性*/
    const [prop,setProp]=useState([])
    /*选中属性*/
    const [propindex,setPropindex]=useState(0)
    /*筛选时间*/
    const time=inittime()
    const [timeindex,setTimeindex]=useState(0)
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
        console.log(new_option)
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
        }
    },[props.machineid])
    /*触发条件重置*/
    useEffect(()=>{
        if(props.pageindex===1){
            /*section1显示*/
            reset()
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
    const handleMachineChange=async (event)=>{
        let machineindex=event.target.value;
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
     * 属性改变事件
     * */
    const handlePropChange=(event)=>{
        setPropindex(event.target.value)
    }
    /*
     * 时间改变事件
     * */
    const handleTimeChange=(event)=>{
        setTimeindex(event.target.value)
    }

    const classes = Styles();
    return (
        <div>
            <div className={classes.title}>设备趋势</div>
            <div className={classes.container}>
                <div className={classes.selectcomp}>
                    <Box sx={{ minWidth: 120 }}>
                    <FormControl className={classes.FormControl}>
                        {/*设备二级分类*/}
                        <Select
                            className={classes.select}
                            id="cate-select"
                            onChange={handleMachineChange}
                            value={machineindex}
                            labelId="cate-select-id"
                            label="">
                            {machine.map((item,index) => (
                                <MenuItem  key={item.id} value={index}>{item.title}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    </Box>
                    <FormControl className={classes.FormControl}>
                        {/*设备属性*/}
                        <Select
                            displayEmpty
                            className={classes.select}
                            id="cate-select"
                            onChange={handlePropChange}
                            value={propindex}
                            labelId="cate-select-id"
                            label="">
                            {prop.map((item,index) => (
                                <MenuItem key={item.id} value={index}>{item.title}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.FormControl}>
                        {/*设备时间*/}
                        <Select
                            displayEmpty
                            className={classes.select}
                            id="cate-select"
                            onChange={handleTimeChange}
                            labelId="cate-select-id"
                            value={timeindex}
                            label="">
                            {time.map((item,index) => (
                                <MenuItem key={item.id} value={index}>{item.title}</MenuItem>
                            ))}
                        </Select>
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