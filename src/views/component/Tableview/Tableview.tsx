import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Paper from '@material-ui/core/Paper';
import record from '../../../static/record.png';
import arrowpng from '../../../static/arrow.png';
import { _getalertevents } from '../../../util/request'

const Styles = makeStyles((theme) => ({

    page: {
        textAlign: 'center',
        height: '100%',
        paddingTop: '7vh',
        background: 'rgba(28,33,40,0.95)'
    },
    title: {
        fontSize: '36px',
        color: '#fff',
        fontweight: '500',
    },
    tableView: {
        marginTop: '80px',
        width: '80%',
        textAlign: 'center',
        margin: '0 auto'
    },
    tableTitle: {
        color: '#fff',
        fontSize: '16px',
        height: '20px',
        letterSpacing: 0,
        fontWeight: 500,
        textAlign: 'left',
        marginBottom: '20px',
    },
    tableContainer: {
        maxHeight: '400px',
        '& .MuiTableContainer-root': {
            height: '',
        },
        '& .MuiPaper-root': {
            backgroudColor: '#282c33'
        },
        '& .MuiPaper-elevation1': {
            boxShadow: 0,
        }
    },
    select: {
        '&.MuiSelect-select:not([multiple]) option': {
            backgroundColor: '#282c33'
        },
    },
    table: {
        background: '#282C33',
        scrollManner: 'page-animation:true, step-animation:true, step:auto, page:auto',
    },
    tableHeader: {
        height: '46px',
        background: 'rgba(255, 255, 255,0.05)',
        boxShadow: '0px -1px 0px 0px rgba(65,69,76,1)',
    },
    arrow: {
        height: '16px',
        width: '16px',
        marginLeft: '5px',
        verticalAlign: 'text-bottom',
        filter: 'grayscale(100%)',
        opacity: 0.6,
        "&:hover": {
            cursor: 'pointer',
            filter: 'none',
            opacity: 1,
        }
    },
    tableRow: {
        height: '46px',
        textAlign: 'center',
        boxShadow: '0px 1px 0px 0px rgba(65,69,76,1)',
        "&:hover": {
            background: 'rgba(255, 255, 255,0.05)',
        }
    },
    tableCell: {
        color: '#fff',
        fontSize: '14px',
        textAlign: 'center',
        borderBottom: '1px solid #838391',
    },
    tableFooter: {

        textAlign: 'right',
        "&. TableRow": {
            textAlign: 'right',
        },
        '&. tableCell': {
            borderBottom: '1px solid #838391'
        },
        '& .MuiTablePagination-root:last-child': {
            border: 0,
        }

    },
    tablePagination: {
        color: '#fff',
        fontSize: '14px',
        '& .MuiIconButton-root.Mui-disabled': {
            color: '#fff'
        },
        '& .MuiSelect-select:not([multiple]) option, .MuiSelect-select:not([multiple]) optgroup': {
            backgroundColor: '#282c33',
        }
    },
    record: {
        width: '16px',
        height: '16px',
        marginRight: '15px',
    }
}));


function TableHeader(props) {
    const classes = Styles();
    const { page, rowsPerPage, totalNum } = props;
    const firstRecord = totalNum >= page * rowsPerPage + 1 ? page * rowsPerPage + 1 : 0;
    const lastRecord = totalNum > (page + 1) * rowsPerPage ? (page + 1) * rowsPerPage : totalNum;
    return (
        <div className={classes.tableTitle}>
            <img src={record} alt="" className={classes.record} />
            <a>告警历史 | 显示第 {firstRecord} 条到第 {lastRecord} 条记录，共 {totalNum} 条记录</a>
        </div>
    )
}
function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
                color="primary"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
                color="primary"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
                color="primary"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
                color="primary"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box >
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};


export default function BasicTable() {
    const classes = Styles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([]);
    const [totalNum, setTotalNum] = React.useState(0);
    const [order, setOrder] = React.useState('time');

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalNum) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleOrderByDesc = (event) => {
        setOrder('desc')
    }
    const handleOrderByTime = (event) => {
        setOrder('time')
    }
    useEffect(() => {
        _getalertevents({ page: page, size: rowsPerPage, sort: order }).then(res => {
            // 数据清洗
            // @ts-ignore
            setTotalNum(res.page.totalElements);
            // @ts-ignore
            setRows(res._embedded.alertEvents);
            console.log(rows);

        })
    }, [page, rowsPerPage, order])
    return (
        <div>
            <TableHeader page={page} rowsPerPage={rowsPerPage} totalNum={totalNum} />
            <TableContainer component={Paper} className={classes.tableContainer} >
                <Table className={classes.table}>
                    <TableHead >
                        <TableRow className={classes.tableHeader}>
                            <TableCell className={classes.tableCell}>设备名称</TableCell>
                            <TableCell align="right" className={classes.tableCell}>ID</TableCell>
                            <TableCell align="right" className={classes.tableCell} onClick={handleOrderByDesc}>告警描述<img src={arrowpng} alt="" className={classes.arrow} /></TableCell>
                            <TableCell align="right" className={classes.tableCell}>告警类型</TableCell>
                            <TableCell align="right" className={classes.tableCell} onClick={handleOrderByTime}>告警时间<img src={arrowpng} alt="" className={classes.arrow} /></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        )*/}
                        {rows.map((row) => (
                            <TableRow
                                key={row.variableId}
                                className={classes.tableRow}
                            >
                                <TableCell component="th" scope="row" className={classes.tableCell}>
                                    {row.properties.endpointName}
                                </TableCell>
                                <TableCell align="right" className={classes.tableCell}>{row.properties.uid}</TableCell>
                                <TableCell align="right" className={classes.tableCell}>{row.description}</TableCell>
                                <TableCell align="right" className={classes.tableCell}>{row.type}</TableCell>
                                <TableCell align="right" className={classes.tableCell}>{row.time}</TableCell>
                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter className={classes.tableFooter}>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: rows.length }]}
                                colSpan={6}
                                count={totalNum}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                                className={classes.tablePagination}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>

    );
}

export const Tableview = (props) => {
    const classes = Styles();
    return (
        <div className={classes.page}>
            <div className={classes.title}>报警历史</div>
            <div className={classes.tableView}>
                <div>
                    <BasicTable />
                </div>
            </div>
        </div>
    );
};