import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '6px',
    },
    heading: {
        // fontSize: theme.typography.pxToRem(15),
        // fontWeight: theme.typography.fontWeightRegular,
        fontFamily: 'PingFangSC-Regular',
        fontSize: '14px',
        letterSpacing: '2px'
    },
    accordion: {

        //height: '46px',
        // marginBottom: '12px'
    },
    table: {
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    tableRow: {
        borderBottom: '1px solid #838391'
    },
    tableCell: {
        fintSize: '14px',
        textAlign: 'center',
        color: '#C8C8DF',
        fontFamily: 'PingFangSC-Regular',
        borderBottom: '1px solid #838391;',
    },
}));
const rows = [
    { id: '1', name: '状态', default: '正常', low: '', high: '', week: '', month: '' },
    { id: '2', name: '告警状态', default: '电压异常', low: '', high: '', week: '', month: '' },
    { id: '3', name: '电压值', default: '12V', low: '0', high: '10', week: '1', month: '' },
    { id: '4', name: '电流值', default: '6.1V', low: '0', high: '10', week: '5', month: '2' },
    { id: '5', name: '温度', default: '6.1V', low: '0', high: '10', week: '5', month: '2' },
];
const component = [
    { id: '1', title: '部件名称1', content: rows },
    { id: '2', title: '部件名称2', content: rows },
    { id: '3', title: '部件名称3', content: rows },
    { id: '4', title: '部件名称4', content: rows }

]



export default function SimpleAccordion() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {(component
            ).map((block) => (
                <Accordion className={classes.root}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id={block.id}
                    >
                        <Typography className={classes.heading}>{block.title}</Typography>
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
            {/* <Accordion className={classes.accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Accordion 1</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>Accordion 2</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>Accordion 2</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion> */}
        </div>
    );
}
