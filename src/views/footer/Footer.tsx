import { makeStyles } from '@material-ui/core';
const useFooterStyles = makeStyles((theme) => ({
  cusfooter:{
    display: 'flex',
    flexDirection:'column',
    justifyContent:'center',
    height:'140px',
    fontFamily: 'PingFangSC-Regular',
    color:'#999',
    fontSize:'14px',
    background: '#1C2128'
  },
  line:{
    lineHeight:'22px',
    margin:'0',
    textAlign:'center',
  },
}));

export const Footer = () => {
  const classes = useFooterStyles();
  return (
    <div className={classes.cusfooter}>
      <div>
        <p className={classes.line}>Copyright&copy;上海XXXX有限公司&copy;沪ICP备11000297号-10</p>
        <p className={classes.line}>沪ICP备11000297号-10&copy;3101010200302531010102003025</p>
      </div>
    </div>
  );
};
