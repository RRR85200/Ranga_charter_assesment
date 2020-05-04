import React from 'react';
import { Container } from '@material-ui/core';
import TransactionList from './components/transactionsList/transactionsList';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        padding: 15,
    },
}));

const App = () => {
    const classes = useStyles();

    return (
        <Container>
            <AppBar position="static">
                <Typography variant="h4" className={classes.title}>
                    Customer Transactions & Rewards
                </Typography>
            </AppBar>
            <TransactionList />
        </Container>
    );
};

export default App;
