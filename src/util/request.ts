import axios from 'axios';
import {httpOrigin} from "../config/config";
axios.defaults.url=httpOrigin;
/*
* section 1
* */
export function _getbanner(data){
    return axios.get("/endpoints",data)
}



/*
* section 2
* */

export function _getmachine(data){
    return axios.get("/endpoints",data)
}

export function _getprops(data){
    return axios.get("/endpoints",data)
}

/*
* section 3
* */
export function _message(data){
    return axios.get("/endpoints",data)
}


