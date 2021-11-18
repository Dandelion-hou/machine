import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
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
import './tableView.css'
import record from '../../../static/record.png'

const Styles = makeStyles((theme) => ({
    page: {
        textAlign: 'center',
        height: '100%',
        paddingTop: '162px',
        background: 'rgba(28,33,40,0.95)'
    },
    title: {
        fontSize: '36px',
        color: '#fff',
        fontweight: '500',

    },
    tableView: {
        marginTop: '80px',
        width: '1529px',
        //textAlign: 'center',
        margin: '0 auto'
    },
    tableTitle: {
        color: '#fff',
        fontSize: '16px',
        letterSpacing: 0,
        fontWeight: 500,
        textAlign: 'left',
        marginBottom: '20px',
    },
    tableContainer: {

    },
    table: {
        //backgroundColor: '#000',
        width: '1529px',
        background: '#282C33',
    },
    tableHeader: {
        height: '46px',
        background: 'rgba(255, 255, 255,0.05)',
        // opacity: '0.05',
        boxShadow: '0px -1px 0px 0px rgba(65,69,76,1)',
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
        fintSize: '14px',
        textAlign: 'center',
    },
    tableFooter: {
        textAlign: 'right',
        "&TableRow": {
            textAlign: 'right',
        }
    },
    tablePagination: {
        color: '#fff',
    },
    record: {
        width: '18px',
        height: '18px',
        marginRight: '15px'
    }
}));







function createData(name: string, id: string, location: string, event: string, type: string, time: string) {
    return { name, id, location, event, type, time };
}

const rows = [
    createData('SRU路由交换版', '16842753', '1/1', '低报', '警告', '2017-07-31 12：33：22'),
    createData('SRU路由交换版', '16842754', '1/1', '低报', '警告', '2017-07-31 12：33：22'),
    createData('SRU路由交换版', '16842755', '1/1', '低报', '警告', '2017-07-31 12：33：22'),
    createData('SRU路由交换版', '16842756', '1/1', '低报', '警告', '2017-07-31 12：33：22'),
    createData('SRU路由交换版', '16842757', '1/1', '低报', '警告', '2017-07-31 12：33：22'),
    createData('SRU路由交换版', '16842758', '1/1', '低报', '警告', '2017-07-31 12：33：22'),

];
function TableHeader(props) {
    const classes = Styles();
    const { page, rowsPerPage } = props;
    const firstRecord = page * rowsPerPage + 1;
    const lastRecord = rows.length > (page + 1) * rowsPerPage ? (page + 1) * rowsPerPage : rows.length;
    return (
        <div className={classes.tableTitle}>
            <img src={record} alt="" className={classes.record} />
            告警历史 | 显示第 {firstRecord} 条到第 {lastRecord} 条记录，共 {rows.length} 条记录
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

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <div>
            <TableHeader page={page} rowsPerPage={rowsPerPage} />
            <TableContainer component={Paper} className={classes.tableContainer} >
                <Table className={classes.table}>
                    <TableHead >
                        <TableRow className={classes.tableHeader}>
                            <TableCell className={classes.tableCell}>设备名称</TableCell>
                            <TableCell align="right" className={classes.tableCell}>ID</TableCell>
                            <TableCell align="right" className={classes.tableCell}>Location</TableCell>
                            <TableCell align="right" className={classes.tableCell}>告警事件</TableCell>
                            <TableCell align="right" className={classes.tableCell}>告警类型</TableCell>
                            <TableCell align="right" className={classes.tableCell}>告警时间</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row) => (
                            <TableRow
                                key={row.id}
                                className={classes.tableRow}
                            >
                                <TableCell component="th" scope="row" className={classes.tableCell}>
                                    {row.name}
                                </TableCell>
                                <TableCell align="right" className={classes.tableCell}>{row.id}</TableCell>
                                <TableCell align="right" className={classes.tableCell}>{row.location}</TableCell>
                                <TableCell align="right" className={classes.tableCell}>{row.event}</TableCell>
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
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={6}
                                count={rows.length}
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

export const Tableview = () => {
    const classes = Styles();
    return (
        <div className={classes.page}>
            <div className={classes.title}>报警历史</div>
            <div className={classes.tableView}>
                {/* <div className={classes.tableTitle}>
                    告警历史 | 显示第 1 条到第 1 条记录，共 1234 条记录
                </div> */}
                <div>
                    <BasicTable />
                </div>
            </div>
        </div>
    );
};