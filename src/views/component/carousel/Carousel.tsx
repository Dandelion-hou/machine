import { makeStyles } from '@material-ui/core';
const Styles = makeStyles((theme) => ({
    h3:{
        fontSize: '5em',
        textAlign: 'center',
        color: '#fff',
        fontweight: '700'
    }
}));

export const Carousel= () => {
    const classes = Styles();
    return (
        <div className="section">
            <h3 className={classes.h3}>table section</h3>
        </div>
    );
};