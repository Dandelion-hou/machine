import { makeStyles } from '@material-ui/core/styles';
import ReactEcharts from  'echarts-for-react';
import React, {useEffect, useState} from 'react';
import {Selectcom} from "./Selectcom";
import {Nav} from '../public/Nav';
import './chart.css'
// @ts-ignore
import withAxios from 'react-axios';
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
    title:{
        fontSize: '36px',
        textAlign: 'center',
        fontFamily:'PingFangSC-Medium',
        marginBottom: '50px',
        letterSpacing:'2px',
        marginTop: '50px',
        color: '#fff',
        fontweight:'500',
    },
    container:{
        width:'80%',
        boxSizing:'border-box',
        margin:'0 auto',
    },
}));
export const Charts= () => {
    const [option, setOption] = useState(option_default);
    const refreshoption=()=>{
        let x_data=['Mon', 'Tue', 'Wed','Mon', 'Tue', 'Wed','Mon','Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        let y_data=[820, 932, 901,820, 932, 901,820, 932, 901, 934, 1290, 1330, 1320]
        /*可能需要深拷贝---这里浅拷贝*/
        let new_option=lodash.cloneDeep(option_default)
        new_option.xAxis.data=x_data
        new_option.series[0].data=y_data
        console.log(new_option)
        setOption(new_option)
    }
    useEffect(()=>{
        refreshoption()
    })
    let id
    /*
    * 选择设备刷新当前页面
    * 重新请求二级分类
    * 清空充值选择项
    * 重置图
    */
    const reset=()=>{
        /*重新请求二级分类*/
        getchild()
        /*重置图*/
        let new_option=lodash.cloneDeep(option_default)
        setOption(new_option)
    }
    /*
    * 重新请求二级分类
    * */
    const getchild=()=>{}

    const classes = Styles();
    return (
        <div className="section" >
            <Nav />
            <div className={classes.title}>设备趋势</div>
            <div className={classes.container}>
                <Selectcom id={'13'}/>
                <ReactEcharts
                    option={option}
                    style={{ height: '450px',width:'100%'}}
                />
            </div>
        </div>
    );
};