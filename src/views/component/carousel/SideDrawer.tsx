import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Accordion from '@material-ui/core/Accordion';
import {theme} from "../../../theme";
import closeIcon from "../../../static/close.png";

const useStyles = makeStyles({
  override:{
    backgroundColor: 'rgba(29,34,39,0.60)',
    backdropFilter: 'blur(10px)',
  },
  drawerPaper: {
    width: '42vw',
    height:'100vh',
    padding: '0 40px 80px',
    '& .MuiPaper-root':{
      backgroundColor: 'rgba(255, 255, 255,0.05)'
    }
  },
  drawerClose:{
    marginTop: '4.2vh',
    display: 'flex',
    height: '5vh',
    alignContent: 'center',
    justifyContent: 'flex-end',
    '& img':{
      width:'2vh',
      height:'2vh',
      cursor:'pointer'
    }
  },
  accordion: {
    color: '#fff',
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(10px)',
    '&.MuiAccordion-root:before': {
      height: '12px',
      backgroundColor: 'transparent'
    },
    '& .MuiIconButton-root': {
      color: '#fff'
    }
  },
  table: {
    '& 	.MuiTable-root': {
      color: '#fafafa',
      backgroundColor: 'rgba(255,255,255,0.05) !important',
    }
  },
  tableRow: {
    borderBottom: '1px solid #838391',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  tableCell: {
    fintSize: '14px',
    textAlign: 'center',
    color: '#C8C8DF',
    fontFamily: 'PingFangSC-Regular',
    borderBottom: '1px solid #5d5d64',
  },

  normal:{
    width:'12px',
    height:'12px',
    borderRadius:'50%',
    marginRight:'5px',
    display:'inline-block',
    backgroundColor:'#44E7D5',
  },
  warning:{
    width:'12px',
    height:'12px',
    marginRight:'5px',
    borderRadius:'50%',
    display:'inline-block',
    backgroundColor:'#FF8533',
  }
});

export default function SwipeableTemporaryDrawer(props) {
  const classes = useStyles();
  return(
    <>
      <Drawer
          classes={{paper:classes.override}}
          anchor={"right"}
          open={props.open}
          onClose={() => props.onClick(false)} >
        <div className={classes.drawerPaper}>
          <div className={classes.drawerClose}>
            <img src={closeIcon} alt="关闭图标" onClick={()=>props.onClick(false)}/>
          </div>
          {props.component.map((block) => (
              <Accordion className={classes.accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id={block.id}
                >
                  <Typography >  <span className={block.state==0?classes.normal:classes.warning}></span> {block.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow className={classes.tableRow}>
                          <TableCell className={classes.tableCell}></TableCell>
                          <TableCell align="right" className={classes.tableCell}></TableCell>
                          <TableCell align="right" className={classes.tableCell}>低报值</TableCell>
                          <TableCell align="right" className={classes.tableCell}>高报值</TableCell>
                          <TableCell align="right" className={classes.tableCell}>周值特征</TableCell>
                          <TableCell align="right" className={classes.tableCell}>月值特征</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {block.content.map((row) => (
                            <TableRow key={row.id}>
                              <TableCell className={classes.tableCell} component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell align="right" className={classes.tableCell}>{row.default}</TableCell>
                              <TableCell align="right" className={classes.tableCell}>{row.low}</TableCell>
                              <TableCell align="right" className={classes.tableCell}>{row.high}</TableCell>
                              <TableCell align="right" className={classes.tableCell}>{row.week}</TableCell>
                              <TableCell align="right" className={classes.tableCell}>{row.month}</TableCell>
                            </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
          ))}
        </div>
      </Drawer>
    </>
  );
}
