import { makeStyles } from '@material-ui/core/styles';
import ReactEcharts from  'echarts-for-react';
import React, {useEffect, useState} from 'react';
import {_getchart, _getprop, _getcomponet, _getall} from "../../../util/request";
import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Mouse} from "../public/Mouse";
import 'antd/dist/antd.css';
import { CaretDownOutlined } from '@ant-design/icons';
import { Cascader } from 'antd';
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
        justifyContent: 'flex-start',
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
    down:{
        color:"#ccc"
    }
}));

const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${[year, month, day].map(formatNumber).join('-')}`
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : `0${n}`
}

const inittime=()=>{
    let date=new Date()
    let endtime=date.getTime()
    let endtimedate=formatTime(date)
    let pre_oneday=formatTime(new Date(endtime-86400*1))
    let pre_sevenday=formatTime(new Date(endtime-86400*7))
    let pre_month=formatTime(new Date(date.setMonth(date.getMonth()-1)))
    return [
        {id:1,title:'近一天',starttime:pre_oneday,endtime:endtimedate},
        {id:2,title:'近一周',starttime:pre_sevenday,endtime:endtimedate},
        {id:3,title:'近一月',starttime:pre_month,endtime:endtimedate},
    ]
}
export const Charts= (props) => {
    /*图表默认配置*/
    const [option,setOption]=useState(option_default)
    /*设备分类*/
    const [machine,setMachine]=useState([])
    const [showmachine,setShowmachine]=useState(false)

    /*筛选属性*/
    const [prop,setProp]=useState([])
    const [propindex,setPropindex]=useState(-1)
    const [showprop,setShowprop]=useState(false)
    const [propvalue,setPropvalue]=useState('')

    /*筛选时间*/
    const time=inittime()
    const [timeindex,setTimeindex]=useState(-1)
    const [showtime,setShowtime]=useState(false)
    const [timevalue,setTimevalue]=useState('')

    const refreshoption=async ()=>{
        let starttime=time[timeindex].starttime
        let endtime=time[timeindex].endtime
        let variableId=prop[propindex].id
        let chartdata=await _getchart({variableId,starttime,endtime})
        // @ts-ignore
        if(chartdata.result!=='success'){
            return
        }
        // @ts-ignore
        let x_data=Object.keys(chartdata.payload),y_data=Object.values(chartdata.payload)
        /*可能需要深拷贝---这里浅拷贝*/
        let new_option=lodash.cloneDeep(option_default)
        // @ts-ignore
        new_option.xAxis.data=x_data
        // @ts-ignore
        new_option.series[0].data=y_data
        setOption(new_option)
    }




    /*初始化*/
    useEffect(()=>{
        init()
    },[])

    /*
    *重新绘图
    * */
    useEffect(()=>{
        if(propindex!==-1&&timeindex!==-1){
            refreshoption()
        }
    },[propindex,timeindex])

    /*
     * 属性改变事件
     * */
    const handleShowPropChange=()=>{
        props.fullpage_api.setAllowScrolling(showprop);
        setShowprop(!showprop)
    }
    const handlePropChange=(event)=>{
        setShowprop(false)
        props.fullpage_api.setAllowScrolling(true);
        let propindex=prop.findIndex(item=>{
            return item.name===event.name
        })
        setPropvalue(event.name)
        setPropindex(propindex)
    }


    /*
    * 获取跟设备
    */
    const init=async ()=>{
        _getall({}).then(res=>{
            // 数据清洗
            // @ts-ignore
            let data=res._embedded.endpoints
            data=data.map((item)=>{
                return {
                    id:item.id,
                    value: item.displayName,
                    label: item.displayName,
                    loading:false,
                    isLeaf: false
                }
            })
            setMachine(data)
        })
    }
    /*
    * 加载子分类事件
    * */
    const loadData = async (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        let machinelist=await _getcomponet({parentId: targetOption.id})
        // 数据清洗
        // @ts-ignore
        let machineitem=machinelist._embedded.endpoints
        targetOption.loading = false;
        targetOption.children = machineitem.map((item)=>{
            return {
                id:item.id,
                value: item.displayName,
                label: item.displayName,
                loading:false,
                isLeaf: false
            }
        })

        targetOption.children.unshift({
            id:targetOption.id,
            value: targetOption.value,
            label: targetOption.label,
            isLeaf: true,
            loading:false,
        })
        setMachine([...machine]);
    };


    const handleMachineChange=async (value, selectedOptions)=>{
        props.fullpage_api.setAllowScrolling(true);
        console.log('value',value, 'selectedOptions',selectedOptions);
        let machineid=selectedOptions[selectedOptions.length-1].id
        let propslist=await _getprop({endpointId: machineid,size:1000})
        // 数据清洗
        // @ts-ignore
        let propsitem=propslist.payload
        propsitem=propsitem.map((item)=>{
            return item
        })
        setProp(propsitem)
        setPropvalue('')
        setPropindex(-1)
        setTimevalue('')
        setTimeindex(-1)
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
        props.fullpage_api.setAllowScrolling(true);
    }

    /*
     * 时间改变事件
     * */
    const handleShowTimeChange=()=>{
        props.fullpage_api.setAllowScrolling(showtime);
        setShowtime(!showtime)
    }
    const handleTimeChange=(event)=>{
        setShowtime(false)
        props.fullpage_api.setAllowScrolling(true);
        let timeindex=time.findIndex(item=>{
            return item.title===event.title
        })
        setTimevalue(event.title)
        setTimeindex(timeindex)
    }
    // Just show the latest item.
    function displayRender(label) {
        return label[label.length - 1];
    }

    const classes = Styles();
    return (
        <div>
            <div className={classes.fullpage} style={{display:(showtime||showmachine)?'block':'none'}} onClick={()=>closeallselect()}></div>
            <div className={classes.title}>设备趋势</div>
            <div className={classes.container}>
                <div className={classes.selectcomp}>

                    <FormControl className={classes.FormControl}>
                        <Cascader
                            options={machine}
                            loadData={loadData}
                            suffixIcon={
                                <CaretDownOutlined className={classes.down} />
                            }
                            onChange={handleMachineChange}
                            displayRender={displayRender}
                            placeholder="Please select" />
                    </FormControl>
                    <FormControl className={classes.FormControl}>
                        {/*设备属性*/}
                        <Autocomplete
                            id="grouped-demo-2"
                            options={prop}
                            disabled={true}
                            selectOnFocus
                            open={showprop}
                            onChange={(e,newValue)=>handlePropChange(newValue)}
                            getOptionLabel={(option) => option.name}
                            inputValue={propvalue}
                            className={classes.autocomplete}
                            closeIcon={null}
                            renderInput={(params) => <TextField {...params} placeholder={'请选择'}   className={classes.color} disabled={true} />}
                        />
                        <div className={classes.occupy} onClick={()=>handleShowPropChange()}></div>
                    </FormControl>
                    <FormControl className={classes.FormControl}>
                        {/*设备时间段分类*/}
                        <Autocomplete
                            id="grouped-demo-3"
                            options={time}
                            disabled={true}
                            selectOnFocus
                            open={showtime}
                            onChange={(e, newValue)=>handleTimeChange(newValue)}
                            getOptionLabel={(option) => option.title}
                            inputValue={timevalue}
                            className={classes.autocomplete}
                            closeIcon={null}
                            renderInput={(params) => <TextField {...params}   placeholder={'请选择'}   className={classes.color} disabled={true} />}
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