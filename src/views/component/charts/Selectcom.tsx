import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {makeStyles} from "@material-ui/core/styles";
import {useEffect, useState} from "react";
const Styles = makeStyles((theme) => ({
    selectcomp:{
        display:'flex',
        justifyContent: 'flex-end',
        paddingRight:'40px'
    },
    select:{
        color:'#ccc',
        fontSize:'14px',
        fontFamily:'PingFangSC-Regular',
        marginLeft:'15px',
        fontWeight:400,
    },
    FormControl:{
        minWidth:'160px',
        border:'1px solid #41454C',
        borderRadius:'4px',
        marginLeft:'20px',
    },
}));
/*定义当前组件传过来的类型*/
interface MachineProps {
    id: string;

}
/*定义函数式组件*/
export const Selectcom=(props:MachineProps)=>{
    const classes = Styles();
    let id=props.id
    /*机器分类*/
    const [machine,setMachine]=useState([])
    /*筛选属性*/
    const [prop,setProp]=useState([])
    /*筛选时间*/
    const [time,setTime]=useState([])
    /*初次加载的时候需要*/
    useEffect(()=>{
        
    })
    /*
    * 二级分类结构体
    * */
    const names = [
        {id:1,title:'SRU路由交换器1'},
        {id:2,title:'SRU路由交换器2'},
        {id:3,title:'SRU路由交换器3'},
        {id:1,title:'SRU路由交换器1'},
        {id:2,title:'SRU路由交换器2'},
        {id:3,title:'SRU路由交换器3'},
        {id:1,title:'SRU路由交换器1'},
        {id:2,title:'SRU路由交换器2'},
        {id:3,title:'SRU路由交换器3'},
        {id:1,title:'SRU路由交换器1'},
        {id:2,title:'SRU路由交换器2'},
        {id:3,title:'SRU路由交换器3'},
        {id:1,title:'SRU路由交换器1'},
        {id:2,title:'SRU路由交换器2'},
        {id:3,title:'SRU路由交换器3'},
    ];

    /*
    * 二级分类改变事件
    * */
    const handleChange=()=>{
        return
    }
    /*
    * 二级分类改变事件
    * */

    return(
        <div className={classes.selectcomp}>
        <FormControl className={classes.FormControl}>
            {/*设备二级分类*/}
            <Select
                displayEmpty
                className={classes.select}
                id="cate-select"
                onChange={handleChange}
                labelId="cate-select-id"
                label="">
                {names.map((item) => (
                    <MenuItem value={item.id}>{item.title}</MenuItem>
                ))}
            </Select>
        </FormControl>
        <FormControl className={classes.FormControl}>
            {/*设备属性*/}
            <Select
                displayEmpty
                className={classes.select}
                id="cate-select"
                onChange={handleChange}
                labelId="cate-select-id"
                label="">
                {names.map((item) => (
                    <MenuItem value={item.id}>{item.title}</MenuItem>
                ))}
            </Select>
        </FormControl>
        <FormControl className={classes.FormControl}>
            {/*设备时间*/}
            <Select
                displayEmpty
                className={classes.select}
                id="cate-select"
                onChange={handleChange}
                labelId="cate-select-id"
                label="">
                {names.map((item) => (
                    <MenuItem value={item.id}>{item.title}</MenuItem>
                ))}
            </Select>
        </FormControl>
        </div>
    )
}
