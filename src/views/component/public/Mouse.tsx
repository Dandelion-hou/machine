import { makeStyles } from '@material-ui/core';
import mouseIcon from '../../../static/ic_mouse.png';
const useFooterStyles = makeStyles((theme) => ({
    mousecontainer:{
        position: 'absolute',
        bottom:'-12px',
        left:'49vw',
        width:'20px',
        height:'32px'
    },
    mouse:{
        width:'20px',
        height:'32px'
    },
}));

export const Mouse = () => {
    const classes = useFooterStyles();
    return (
        <div className={classes.mousecontainer}>
            <img src={mouseIcon} className={classes.mouse} alt="鼠标" />
        </div>
    );
};
