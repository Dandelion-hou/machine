import axios,{AxiosResponse} from 'axios';

/**
 * 获取所有设备
 * */
export function _getall(data){
    return new Promise(resolve => {
        axios.get("/api/v1.0/endpoints/search/getRootEndpoints",{}).then((res: any)=>{
            resolve(res.data)
        })
    })
}
/**
 * 获取设备所有的异常数量
 * */
export function _getalertnum(data){
    return new Promise(resolve => {
        axios.get("/api/v1.0/alerts/alertNum",{params:data}).then((res: any)=>{

            resolve(res.data)
        })
    })
}

/**
 * 获取多个设备的异常数量
 * */
export function _getalertnums(data){
    return new Promise(resolve => {
        axios.get("/api/v1.0/alerts/alertNums",{params:data}).then((res: any)=>{
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
        axios.get("/api/v1.0/endpoints/search/getEndpointsByParent",{params:data}).then((res: any)=>{
            resolve(res.data)
        })
    })
}
/**
 * 获取组件属性列表
 * */
export function _getprop(data){
    return new Promise(resolve => {
        axios.get("/api/v1.0/variables/numericVariable",{params:data}).then((res:any)=>{
            console.log('_getprop',res)
            resolve(res.data)
        })
    })
}
/**
 * 获取图形
 * */
export function _getchart(data){
    /**
     * 进一日
     * */
    if(data.starttime===data.endtime){
        return new Promise(resolve => {
            axios.get("/api/v1.0/trend/hours",{params:{
                    variableId:data.variableId,
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
                    variableId:data.variableId,
                    from:data.starttime,
                    to:data.endtime
                }}).then((res: AxiosResponse<Model.ResponseValue<any>>)=>{
                resolve(res.data)
            })
        })
    }

}

/*
* 预警
*
* */
export function _getalertevents(data) {
    return new Promise(resolve => {
        axios.get("/api/v1.0/alertEvents", {
            params: data
        }).then((res: AxiosResponse<Model.ResponseValue<any>>) => {
            resolve(res.data)
        })
    })
}

