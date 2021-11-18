import { Link } from '@material-ui/core';
import { makeStyles, emphasize } from '@material-ui/core/styles';
import Tooltip from  '@material-ui/core/Tooltip';
import Badge from  '@material-ui/core/Badge';
import database from '../../../static/database_white.png'
import huawei from '../../../static/record.png'
const Styles = makeStyles((theme) => ({
    navbar: {
        position:"absolute",
        width:"100%",
        display: 'flex',
        padding:'0 2em',
        boxSizing:"border-box",
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    huawei:{
        height:'42px',
        width:'52px'
    },
    database:{
        height:'25px',
        width:'25px'
    },
    left: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    link: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    right: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    onDarkBackground: {
        '&:hover': {
            backgroundColor: emphasize(theme.palette.secondary.main, 0.08),
        },
    },
}));
export const Machinelist = () => {
    const classes = Styles();
    return (
        <div className={classes.navbar}>
            <div className={classes.left}>
                <Tooltip title="Back to the homepage">
                    <Link  className={classes.link} color="inherit">
                        <img
                            className={classes.huawei}
                            src={huawei}
                            loading="lazy"
                        />
                    </Link>
                </Tooltip>
            </div>
            <div className={classes.right}>
                <Link href="https://www.eclipse.org/sirius" rel="noopener noreferrer" target="_blank" color="inherit">
                    <Badge badgeContent={4}  color="secondary">
                        <img
                            className={classes.database}
                            src={database}
                            loading="lazy"
                        />
                    </Badge>
                </Link>
            </div>
        </div>
    );
};
