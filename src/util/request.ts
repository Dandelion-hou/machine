import axios from 'axios';
import {httpOrigin} from "../config/config";
axios.defaults.url=httpOrigin;
/*
* section 0
* */
export function _getbanner(data){
    return axios.get("/endpoints",data)

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
            {id:'0',title:'请选择'},
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
* */
export function _message(data){
    return axios.get("/endpoints",data)
}


