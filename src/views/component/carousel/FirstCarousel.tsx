import React, { useState } from 'react';
import { makeStyles} from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import SideDrawer from '../carousel/SideDrawer';
import {Mouse} from "../public/Mouse";
import './cycle.css';
import Background from  '../../../static/bag_dvice_home.png';
const Styles = makeStyles((theme) => ({
    info: {
        position: 'absolute',
        left: '9.5vw',
        top: '34vh',
        zIndex:10,
        textAlign: 'left'
    },
    title: {
        fontSize: '2em',
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
        width: '35vw',
        height: '80vh',
        backgroundImage: "url(" +  Background  + ")",
        backgroundSize:'100%',
        backgroundRepeat:'no-repeat',
        margin: '6vh auto 0',
        textAlign:'center'
    },
    container:{
        height: '70vh',
    },
    imageBox: {
        height: "56vh",
        width:'39vh',
        margin:'0 auto',
        position: 'relative',
        top:'9vh',
    },
    image: {
        height: "56vh",
        width:'39vh',
    },
    /* 环形 */
    circlebox:{
        position: 'absolute',
        cursor:'pointer',
        top: '-25px',
        right: '-25px',
        width: '50px',
        height: '50px',
        color:'#fff',
        fontFamily: 'PingFangSC-Medium',
        fontSize: '12px'
    },
    circlecenter:{
        position: 'absolute',
        background:theme.palette.secondary.main,
        width: '26px',
        borderRadius:'50%',
        lineHeight:'26px',
        left:'7px',
        top:'7px',
        height: '26px',
    },
    circleanimation:{
        position: 'absolute',
        background:theme.palette.secondary.main,
        width: '40px',
        borderRadius:'50%',
        opacity:0,
        height: '40px',
        animation: 'circle 3s linear 1.6s infinite'
    },
    circleanimation2:{
        position: 'absolute',
        background:theme.palette.secondary.main,
        width: '40px',
        opacity:0,
        borderRadius:'50%',
        height: '40px',
        animation: 'circle2 3s linear 1.2s infinite'
    },
    circlewarn:{
        background:'#FF8533 !important',
    }
}));

export const FirstCarousel = (props) => {
    const classes = Styles();

    const [drawer, setDrawer] = useState(false);
    const handleClick = (open) => {
        props.fullpage_api.setAllowScrolling(!open);
        setDrawer(open);
    };
    let customIcon=<div className='custom-icon'></div>
    return (
            <>
                    <div className={classes.info}>
                        <div className={classes.title}>
                            {props.device.displayName}
                        </div>
                        <div className={classes.detail}>
                            {props.device.description}
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
                                margin:'1vh 8px 0',
                                borderRadius:'50%',
                                width: '12px'
                            }
                        }}
                        activeIndicatorIconButtonProps={{
                            style: {
                                background: '#44E7D5',
                            }
                        }}>
                            {props.device.banner.map((item,index)=> {
                                return (
                                    <div className={classes.container} key={index}>
                                            <div className={classes.imageBox} >
                                                <div className={classes.circlebox} onClick={() => handleClick(true)}>
                                                    <div className={[classes.circleanimation,props.device.state===1?classes.circlewarn:''].join(' ')}></div>
                                                    <div className={[classes.circleanimation2,props.device.state===1?classes.circlewarn:''].join(' ')}></div>
                                                    <div className={[classes.circlecenter,props.device.state===1?classes.circlewarn:''].join(' ')}>
                                                        {props.device.state===1?props.device.num:''}
                                                    </div>
                                                </div>
                                                <img alt={props.device.displayName} src={item} className={classes.image}></img>
                                            </div>
                                    </div>
                                )
                            })}
                    </Carousel>
                <div>
                    {drawer && (<SideDrawer machineid={props.device.id} open={drawer} onClick={(e) => handleClick(e)} />)}
                </div>
                <Mouse />
            </>
    );
};