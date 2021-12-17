import axios from 'axios';
import {httpOrigin} from "../config/config";
axios.defaults.url=httpOrigin;
/*
* section 0
* */
export function _getbanner(){
    // return axios.get("/endpoints",data)
    return new Promise(resolve => {
        resolve(
            {id:'xx1',
                title:'网络设备数据监测分析',
                detail:'产品产品产品产品产品产品产品产品产品产品产品产品产品产品产品产品产品',
                state:0,
                num:1,
                banner:['',''],
                component:[
                    { id: '1', title: '部件名称1',state:0, content: [
                            { id: '1', name: '状态', default: '正常', low: '', high: '', week: '', month: '' },
                            { id: '2', name: '告警状态', default: '电压异常', low: '', high: '', week: '', month: '' },
                            { id: '3', name: '电压值', default: '12V', low: '0', high: '10', week: '1', month: '' },
                            { id: '4', name: '电流值', default: '6.1V', low: '0', high: '10', week: '5', month: '2' },
                            { id: '5', name: '温度', default: '6.1V', low: '0', high: '10', week: '5', month: '2' },
                    ]},
                    { id: '2', title: '部件名称2',state:1, content: [
                            { id: '1', name: '状态', default: '正常', low: '', high: '', week: '', month: '' },
                            { id: '2', name: '告警状态', default: '电压异常', low: '', high: '', week: '', month: '' },
                            { id: '3', name: '电压值', default: '12V', low: '0', high: '10', week: '1', month: '' },
                            { id: '4', name: '电流值', default: '6.1V', low: '0', high: '10', week: '5', month: '2' },
                            { id: '5', name: '温度', default: '6.1V', low: '0', high: '10', week: '5', month: '2' },
                    ]},
                    { id: '3', title: '部件名称3',state:1, content: [
                        { id: '1', name: '状态', default: '正常', low: '', high: '', week: '', month: '' },
                        { id: '2', name: '告警状态', default: '电压异常', low: '', high: '', week: '', month: '' },
                        { id: '3', name: '电压值', default: '12V', low: '0', high: '10', week: '1', month: '' },
                        { id: '4', name: '电流值', default: '6.1V', low: '0', high: '10', week: '5', month: '2' },
                        { id: '5', name: '温度', default: '6.1V', low: '0', high: '10', week: '5', month: '2' },
                    ]},
                    { id: '4', title: '部件名称4',state:0, content:[
                        { id: '1', name: '状态', default: '正常', low: '', high: '', week: '', month: '' },
                        { id: '2', name: '告警状态', default: '电压异常', low: '', high: '', week: '', month: '' },
                        { id: '3', name: '电压值', default: '12V', low: '0', high: '10', week: '1', month: '' },
                        { id: '4', name: '电流值', default: '6.1V', low: '0', high: '10', week: '5', month: '2' },
                        { id: '5', name: '温度', default: '6.1V', low: '0', high: '10', week: '5', month: '2' },
                    ]}

                ]
            }
        )
    })

}

export function _getall(data){
    // return axios.get("/endpoints",data)
    return new Promise(resolve => {
        resolve([
            {id:'xx1',title:'设备1'},
            {id:'xx2',title:'设备2'},
            {id:'xx3',title:'设备3'},
            {id:'xx4',title:'设备4'},
        ])
    })
}

/*
* section 1
* */
export function _getmachine(data){
    // return axios.get("/endpoints",data)
    return new Promise(resolve => {
        resolve([
            {id:'xx1',title:'设备1'},
            {id:'xx2',title:'设备2'},
            {id:'xx3',title:'设备3'},
            {id:'xx4',title:'设备4'},
        ])
    })
}
export function _getprops(data){
    // return axios.get("/endpoints",data)
    return new Promise(resolve => {
        resolve([
            {id:'xx1',title:'属性1'},
            {id:'xx2',title:'属性2'},
            {id:'xx3',title:'属性3'},
            {id:'xx4',title:'属性4'},
            {id:'xx5',title:'属性2'},
            {id:'xx6',title:'属性3'},
            {id:'xx7',title:'属性4'},
            {id:'xx8',title:'属性4'},
            {id:'xx9',title:'属性4'},
            {id:'xx10',title:'属性4'},
        ])
    })
}
export function _getchart(data){
    // return axios.get("/endpoints",data)
    return new Promise(resolve => {
        resolve({
            x_data:['Mon', 'Tue', 'Wed','Mon', 'Tue', 'Wed','Mon','Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            y_data:[820, 932, 901,820, 932, 901,820, 932, 901, 934, 1290, 1330, 1320]
        })
    })
}

/*
* section 2
*
* */

export function getMessage(params = {}) {
    return new Promise((resolve, reject) => {
        axios.get('./mock/message.json', {
            params: params,
        }).then((response) => {
            resolve(response.data);
            console.log(response.data)
        }).catch((error) => {
                reject(error);
        });
    });
}


