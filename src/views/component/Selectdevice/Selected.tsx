import React from 'react';
import Carousel from 'react-material-ui-carousel';
import './select.css';
import closeIcon from '../../../static/close.png';
import deviceFont from '../../../static/banner.png';



export const Selected=(props)=>{
    let datatmp=props.machinelist
    const pagesize=4 //每页显示4个
    /*
    * 切片函数
    * */
    const arrReduceWidthNumber=(arr: any[], count: number)=>{
        return arr.reduce((sum: any[], item: any, index: number, arr:string[])=>{
            const curStep = arr.slice(sum.length * count, (sum.length + 1) * count);
            if(!!curStep.length){
                sum.push(curStep);
            }
            return sum;
        },[])
    }
    const data=arrReduceWidthNumber(datatmp,pagesize)
    /*
    * 自定义按钮
    * */
    let customIcon=<div className='custom-icon'></div>
    return (
        <div className="select-page">
            <div className='select-close' >
                <img src={closeIcon} alt="关闭图标" onClick={()=>props.onCloseChange()}/>
            </div>
            <div className='select-title'>设备选择</div>
            <Carousel
                className='select-wrapper'
                autoPlay={false}
                duration={1000}
                cycleNavigation={true}
                IndicatorIcon={customIcon}
                animation={'slide'}
                indicatorIconButtonProps={{
                    style: {
                        background: '#767D87',
                        height: '2px',
                        borderRadius:'0',
                        padding:'0',
                        margin:'0 4px',
                        width: '15px'
                    }
                }}
                activeIndicatorIconButtonProps={{
                    style: {
                        background: '#44E7D5',
                        borderRadius:'0',
                        padding:'2px 9px'
                    }
                }}
                navButtonsAlwaysVisible={true}
                navButtonsProps={{
                    style:{
                        color:'#999',
                        backgroundColor: "rgba(143,131,131,0.6)",
                    }
                }}
                navButtonsWrapperProps={{
                    style:{
                        color:'#999',
                    }
                }}
            >
                {data.map((item,index)=>{
                    return (<div className='select-list' key={index}>
                            {item.map((v)=>{
                                return (<div key={v.id} className='select-item' onClick={()=> props.onChooseMachine(v.id)}>
                                            <img className='select-image' src={deviceFont} alt={v.title} />
                                             <div className='select-desc'>{v.title}</div>
                                </div>)
                            })}
                        </div>)
                })}
            </Carousel>
        </div>
    )
}

