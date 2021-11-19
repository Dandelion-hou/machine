import { makeStyles } from '@material-ui/core/styles';
import Badge from  '@material-ui/core/Badge';
import database from '../../../static/ic_device_normal.png';
const Styles = makeStyles((theme) => ({
    navbar: {
        width:"100%",
        display: 'flex',
        padding:'3vh 3vw 0',
        boxSizing:"border-box",
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    database:{
        height:'32px',
        width:'32px'
    },
    right: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        cursor:'pointer',
        justifyContent: 'flex-end',
        '& .MuiBadge-badge':{
            color:'#fff',
            background:'#FF3333'
        }
    },
}));
export const Nav = (props) => {
    const classes = Styles();
    const clickbtn=()=>{
        props.onSelectedChange()
    }
    return (
        <div className={classes.navbar}>
                <div />
                <div className={classes.right} onClick={()=>clickbtn()}>
                        <Badge badgeContent={4}
                               anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                               }}

                        >
                            <img
                                className={classes.database}
                                src={database}
                                alt={"machine"}
                                loading="lazy"
                            />
                        </Badge>
                </div>
         </div>
    );
};
