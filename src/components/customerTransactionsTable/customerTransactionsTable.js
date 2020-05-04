import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';


/*
* THis component is build using MAterial UI
* The table header is fixed and we can scroll the data and we can choose the rows per page and navigate along the ros
* */
const CustomerTransactionsTable = (props) => {
    const rows = props.data;
    const useStyles = makeStyles({
        paper: {
            width: '100%',
        },
        container: {
            maxHeight: 350,
        },
        headerBg: {
            backgroundColor: 'black',
            color: 'white'
        }
    });
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

/*For Now dynamically building the headers*/
    const headers = () => {
        const headerItems = [];
        if(rows.length >= 1) {
            for(const key in rows[0]) {
                headerItems.push({
                    id: key,
                    label: key,
                    format: (value) => key === 'date' ? formatDate(value) : value,
                    align: 'left'
                })
            }
        }

        return headerItems;
    };

    /*Custoum date formatter instead of using moment library to format the data*/

    const formatDate = (date) => {
        const activityDate = new Date(date);

        return activityDate.getMonth() + '/' + activityDate.getDate() + '/' + activityDate.getFullYear();
    };

    const handlePageChange = (e, newpage) => {
       setPage(newpage);
    };

    /*setting page number to zero when number of rows per page is changed*/

    const onChangeRowsPerPage = (e) => {
        setRowsPerPage(e.target.value);
        setPage(0);
    };

    return (
        <>
            <Paper className={classes.paper}>
            <TableContainer className={classes.container}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow className={classes.headerBg}>
                            {headers().map((col, index) => (
                                <TableCell key={index}>
                                    {col.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((tableRow) => {
                            return (
                                <TableRow tabIndex={-1} key={tableRow.id}>
                                    {headers().map((col, index) => {
                                        const value = tableRow[col.label];
                                        return (
                                            <TableCell key={index} align={col.align}>
                                                {col.format && typeof value === 'string' ? col.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={onChangeRowsPerPage}
            />
        </Paper>
        </>

    );
};

// naming the transactions as data to make the component more independent
CustomerTransactionsTable.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            customerName: PropTypes.string,
            id: PropTypes.number,
            date: PropTypes.string,
            amount: PropTypes.number,
            category: PropTypes.string
        })
    ).isRequired
};

export default CustomerTransactionsTable;
