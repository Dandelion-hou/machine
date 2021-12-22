import axios,{AxiosResponse} from 'axios';
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

/**
 * 获取所有设备
 * */
export function _getall(data){
    return new Promise(resolve => {
        axios.get("/api/v1.0/endpoints/search/getRootEndpoints",{}).then((res: AxiosResponse<any>)=>{
            resolve(res.data)
        })
    })
}
/**
 * 获取设备组件列表
 * */
export function _getallcomponet(data){
    return new Promise(resolve => {
        axios.get("/api/v1.0/endpoints/getAllEndpointsByParent",{params:data}).then((res: any)=>{
            if(res.data.errorCode==='500') res.data.payload=[]
            resolve(res.data)
        })
    })
}

/**
 * 获取设备组件列表
 * */
export function _getcomponet(data){
    return new Promise(resolve => {
        axios.get("/api/v1.0/endpoints/search/getEndpointsByParent",{params:data}).then((res: AxiosResponse<Model.ResponseValue<any>>)=>{
            resolve(res.data)
        })
    })
}
/**
 * 获取组件属性列表
 * */
export function _getprop(data){
    return new Promise(resolve => {
        axios.get("/api/v1.0/variables/search/getAllByEndpointId",{params:data}).then((res: AxiosResponse<Model.ResponseValue<any>>)=>{
            resolve(res.data)
        })
    })
}
/**
 * 获取图形
 * */
export function _getchart(data){
    // data.propid='618205d77b5ecc20aaa99657'
    // data.starttime='2021-06-09'
    // data.endtime='2021-09-12'
    /**
     * 进一日
     * */
    if(data.starttime===data.endtime){
        return new Promise(resolve => {
            axios.get("/api/v1.0/trend/hours",{params:{
                    variableId:data.propid,
                    date:data.starttime
                }}).then((res: AxiosResponse<Model.ResponseValue<any>>)=>{
                resolve(res.data)
            })
        })
    }else{
        /**
         * 时间区间
         * */
        return new Promise(resolve => {
            axios.get("/api/v1.0/trend/daily",{params:{
                    variableId:data.propid,
                    from:data.starttime,
                    to:data.endtime
                }}).then((res: AxiosResponse<Model.ResponseValue<any>>)=>{
                resolve(res.data)
            })
        })
    }

}

/*
* section 2
*
* */

export function getMessage(params = {}) {
    return new Promise((resolve, reject) => {
        // axios.get('./mock/message.json', {
        //     params: params,
        // }).then((response) => {
        //     resolve(response.data);
        //     console.log(response.data)
        // }).catch((error) => {
        //         reject(error);
        // });
        resolve([
            {
                "id": 1,
                "name": "SRU路由交换版",
                "location": "1",
                "event": "低报",
                "type": "警告",
                "time": "2017-07-31 12：33：22"
            },
            {
                "id": 2,
                "name": "SRU路由交换版",
                "location": "1",
                "event": "低报",
                "type": "警告",
                "time": "2017-07-31 12：33：22"
            },
            {
                "id": 3,
                "name": "SRU路由交换版",
                "location": "1",
                "event": "低报",
                "type": "警告",
                "time": "2017-07-31 12：33：22"
            },
            {
                "id": 4,
                "name": "SRU路由交换版",
                "location": "1",
                "event": "低报",
                "type": "警告",
                "time": "2017-07-31 12：33：22"
            },
            {
                "id": 5,
                "name": "SRU路由交换版",
                "location": "1",
                "event": "低报",
                "type": "警告",
                "time": "2017-07-31 12：33：22"
            },
            {
                "id": 6,
                "name": "SRU路由交换版",
                "location": "1",
                "event": "低报",
                "type": "警告",
                "time": "2017-07-31 12：33：22"
            },
            {
                "id": 7,
                "name": "SRU路由交换版",
                "location": "1",
                "event": "低报",
                "type": "警告",
                "time": "2017-07-31 12：33：22"
            },
            {
                "id": 8,
                "name": "SRU路由交换版",
                "location": "1",
                "event": "低报",
                "type": "警告",
                "time": "2017-07-31 12：33：22"
            },
            {
                "id": 9,
                "name": "SRU路由交换版",
                "location": "1",
                "event": "低报",
                "type": "警告",
                "time": "2017-07-31 12：33：22"
            },
            {
                "id": 10,
                "name": "SRU路由交换版",
                "location": "1",
                "event": "低报",
                "type": "警告",
                "time": "2017-07-31 12：33：22"
            },
            {
                "id": 11,
                "name": "SRU路由交换版",
                "location": "1",
                "event": "低报",
                "type": "警告",
                "time": "2017-07-31 12：33：22"
            },
            {
                "id": 12,
                "name": "SRU路由交换版",
                "location": "1",
                "event": "低报",
                "type": "警告",
                "time": "2017-07-31 12：33：22"
            },
            {
                "id": 13,
                "name": "SRU路由交换版",
                "location": "1",
                "event": "低报",
                "type": "警告",
                "time": "2017-07-31 12：33：22"
            },
            {
                "id": 14,
                "name": "SRU路由交换版",
                "location": "1",
                "event": "低报",
                "type": "警告",
                "time": "2017-07-31 12：33：22"
            },
            {
                "id": 15,
                "name": "SRU路由交换版",
                "location": "1",
                "event": "低报",
                "type": "警告",
                "time": "2017-07-31 12：33：22"
            },
            {
                "id": 16,
                "name": "SRU路由交换版",
                "location": "1",
                "event": "低报",
                "type": "警告",
                "time": "2017-07-31 12：33：22"
            },
            {
                "id": 17,
                "name": "SRU路由交换版",
                "location": "1",
                "event": "低报",
                "type": "警告",
                "time": "2017-07-31 12：33：22"
            },
            {
                "id": 18,
                "name": "SRU路由交换版",
                "location": "1",
                "event": "低报",
                "type": "警告",
                "time": "2017-07-31 12：33：22"
            },
            {
                "id": 19,
                "name": "SRU路由交换版",
                "location": "1",
                "event": "低报",
                "type": "警告",
                "time": "2017-07-31 12：33：22"
            },
            {
                "id": 20,
                "name": "SRU路由交换版",
                "location": "1",
                "event": "低报",
                "type": "警告",
                "time": "2017-07-31 12：33：22"
            },
            {
                "id": 21,
                "name": "SRU路由交换版",
                "location": "1",
                "event": "低报",
                "type": "警告",
                "time": "2017-07-31 12：33：22"
            }
        ])
    });
}


