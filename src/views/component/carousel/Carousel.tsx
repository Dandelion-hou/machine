import React, {useEffect, useState} from 'react';
import { makeStyles, withWidth } from '@material-ui/core';
import Slider from 'react-slider-light';
import 'react-slider-light/lib/index.css';
import frontSide from '../../../static/frontSide.png'
import backSide from '../../../static/frontSide.png'
import SideDrawer from '../carousel/SideDrawer'
import '../carousel/carousel.css'

const Styles = makeStyles((theme) => ({
    page: {
        height: '100%',
        paddingTop: '138px'
    },
    info: {
        position: 'fixed',
        left: 185,
        top: 379,
        textAlign: 'left'
    },
    title: {
        fontSize: '32px',
        color: '#44E7D5',
        width: '195px',
        height: '90px',
        fontWeight: 500,
        //zIndex: 1,

    },
    detail: {
        marginTop: '9px',
        width: '300px',
        height: '62px',
        color: '#838391',
        lineHeight: '20px',
        fontWeight: 400
    },
    carousel: {
        height: '100%',
        textAlign: 'center',
    },
    container: {
        height: '100%',
        width: '50%',
        margin: '0 auto'

    },
    devicePage: {
        height: "674px",
        cursor: "pointer"
    },
    test: {
        height: '100%',
    }

}));

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});


const device = {
    title: '网络设备数据监测分析',
    detail: '产品产品产品产品产品产品产品产品产品产品产品产品产品产品产品产品产品'
}
const Info = () => {
    const classes = Styles();
    return (
        <div className={classes.info}>
            <div className={classes.title}>
                {device.title}
            </div>
            <div className={classes.detail}>
                {device.detail}
            </div>
        </div>
    )
}

export const Carousel = (props) => {
    const classes = Styles();
    const [drawer, setDrawer] = useState(false);

    const handleClick = (open) => {
        setDrawer(open);
    };

    /*触发条件重置*/
    useEffect(()=>{
        setDrawer(false);
    },[props.pageindex])

    return (
        <div className="section">
            <div className={classes.page}>

                <div className={classes.carousel}>
                    <Info />
                    <Slider
                        isDots={true}
                        delay={5000}
                    >
                        <div className={classes.container}>
                            <img src={frontSide} className={classes.devicePage} onClick={() => handleClick(true)}></img>
                        </div>
                        {/* <div >
                            <img src={backSide} className={classes.devicePage}></img>
                        </div> */}
                    </Slider>

                </div>
                <div>
                    {drawer && (<SideDrawer open={drawer} onClick={(e) => handleClick(e)} />)}
                </div>
            </div>
        </div >

    );
};