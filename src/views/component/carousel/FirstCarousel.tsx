import React, { useEffect, useState } from 'react';
import { makeStyles} from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import frontSide from '../../../static/banner.png';
import SideDrawer from '../carousel/SideDrawer';
import {_getbanner} from "../../../util/request";
import {Mouse} from "../public/Mouse";
const Styles = makeStyles((theme) => ({
    info: {
        position: 'relative',
        left: '9.5vw',
        top: '34vh',
        textAlign: 'left'
    },
    title: {
        fontSize: '2rem',
        color: theme.palette.secondary.main,
        width: '195px',
        height: '90px',
        fontWeight: 500,
    },
    detail: {
        marginTop: '9px',
        width: '300px',
        height: '62px',
        color: '#838391',
        lineHeight: '20px',
        fontWeight: 400
    },
    carouselWrapper:{
        width: '40%',
        height: '71vh',
        margin: '0 auto',
        textAlign:'center',
    },
    imageBox: {

    },
    container:{
        marginTop:'auto',
    },
    image: {
        height: "55vh",
        width:'39vh',
    },
    /* 环形 */
    circle:{
        position: 'relative',
        marginTop: '-25px',
        marginLeft: '25px'
    },
    circlecenter:{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: '60rpx',
        height: '60rpx',
        opacity: '0',
        borderRadius: '50%',
        textAlign: 'center',
        lineHeight: '74rpx',
        marginLeft: '2rpx',
        backgroundColor:'transparent',
    },
    circle3:{
        animation: 'circle 3s linear 1.6s infinite'
    }
}));

export const FirstCarousel = (props) => {
    const classes = Styles();
    /*定义设备默认参数*/
    const defaultDevice={
        id:'',
        title:'',
        detail:'',
        banner:[],
        component:[],
    }
    const [drawer, setDrawer] = useState(false);
    const [device, setDevice] = useState(defaultDevice);

    const handleClick = (open) => {
        setDrawer(open);
    };
    /*初始化*/
    useEffect(() => {
        _getbanner().then(res=>{
            // @ts-ignore
            setDevice(res);
        })
    }, [])
    /*触发条件重置*/
    // useEffect(() => {
    //     setDrawer(false);
    // }, [props.pageindex])
    let customIcon=<div className='custom-icon'></div>
    return (
            <>
                <div >
                    <div className={classes.info}>
                        <div className={classes.title}>
                            {device.title}
                        </div>
                        <div className={classes.detail}>
                            {device.detail}
                        </div>
                    </div>
                    <Carousel
                        className={classes.carouselWrapper}
                        autoPlay={false}
                        duration={1000}
                        animation={'slide'}
                        cycleNavigation={true}
                        IndicatorIcon={customIcon}
                        navButtonsAlwaysInvisible={true}
                        indicatorIconButtonProps={{
                            style: {
                                background: '#767D87',
                                height: '12px',
                                margin:'5vh 8px 0',
                                borderRadius:'50%',
                                width: '12px'
                            }
                        }}
                        activeIndicatorIconButtonProps={{
                            style: {
                                background: '#44E7D5',
                            }
                        }}
                    >
                            {device.banner.map((item)=> {
                                return (
                                    <div className={classes.container} key={item.id}>
                                        <div className={classes.imageBox} >
                                            <img src={frontSide} className={classes.image}
                                             onClick={() => handleClick(true)}></img>
                                        </div>
                                    </div>
                                )
                            })}
                    </Carousel>
                </div>
                <div>
                    {drawer && (<SideDrawer component={device.component} open={drawer} onClick={(e) => handleClick(e)} />)}
                </div>
                <Mouse />
            </>
    );
};