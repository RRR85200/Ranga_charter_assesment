import React, {useEffect, useReducer, useState} from 'react';
import CustomerTransactionsTable from "../customerTransactionsTable/customerTransactionsTable";
import CustomerFilter from '../customersFilter/CustomersFilter';
import uniqBy from 'lodash/uniqBy';
import UserRewardsSummary from "../userRewardsSummary/userRewardsSummary";

/*
* In this components I have used mostly.This is like the page where we display all the transactions in a table
* */

const initialTransactionData = {
    selectedCustomer: {
        name: ''
    },
    transactions: []
}
/*Reducer function for UseReducer Hook
*  update select customer and add data
* */
 const reducer = (state,action) => {
    switch (action.type) {
        case 'select_customer':
            return {...state, selectedCustomer: action.payload};
        case 'add_data':
            return {...state, transactions: action.payload};
        case 'reset':
            return {...state, selectedCustomer: null};
        default:
            throw new Error();
    }
};

const noTransactions = {
    color: 'white',
    backgroundColor: 'red',
    padding: "10px",
    fontFamily: "Arial"
};

const TransactionList = (props) => {

/*The number useState hooks are increasing and since state is getting complex changes to useReducer Hook*/

    const [state, dispatch] = useReducer(reducer, initialTransactionData);
    const [hasError, setError] = useState(false);
    const noUserSelected = {
        name: ''
    }
 /*Perform side effects like fetching the transactions data
 * Current data is stored in the pubic jason folder
 * Used fetch instead of axios just to reduce the bundle size
 * */

    const myHeaders = new Headers({
        'Content-Type': "application/json",
        Accept: "application/json"
    });

    useEffect(() => {
        const fetchTransactionList = async () => {
            try {
                const response = await fetch('/transactionsData.json', { headers: myHeaders});
                const transactionData = await response.json();
                dispatch({type:'add_data', payload: transactionData.data});

                if(hasError){
                    setError(false);
                }
            } catch (e) {
                setError(true);
            }
        };

        fetchTransactionList();
    }, [hasError]);

    /*Filter Based on selected customer*/

    const getSelectedUserActivity = (selectedCustomerName) => {
       return state.transactions.filter(activity => {
            return activity.customerName === selectedCustomerName
        });
    }

    /* Filter and set the table props data*/
    const getTransactionsTableProps = () => {
        const selectedCustomerName = state.selectedCustomer.name;
        let filteredTransactions = [];

        if (selectedCustomerName) {
            filteredTransactions = getSelectedUserActivity(selectedCustomerName);
        } else {
            filteredTransactions = state.transactions;
        }

        return {
            data: filteredTransactions
        }
    };

    /*Get all the customer Names , if w have unique id for customer, could filtered based on that
    * Just used lodash to show the familiarity with that library
    * */
    const getUniqCustomerNames = () => {
        const customersList = [];
        uniqBy(state.transactions, 'customerName').forEach(customer => {
            customersList.push({
                name: customer.customerName,
            })
        });

        return customersList;
    };

    /*Handling the state and dispatching acting on user selection changed*/

    const handleFilterChange= (selectedUser) => {
        const payload = selectedUser ? selectedUser : noUserSelected;
         dispatch({type: 'select_customer', payload: payload});
    };

    const error = (hasError ? <div>Error Retreiving Transactions Data</div> : null);

    /*Currently displaying the user summary only if a specific user is selected */

    const userRewardsSummary = () => {
        const selectedUser = state.selectedCustomer.name;

        return (
            selectedUser ? <UserRewardsSummary transactionData={getSelectedUserActivity(selectedUser)}/> : null
        )
    };

    const renderTable= () => {
       return  (getTransactionsTableProps().data.length > 0)  ?
            <CustomerTransactionsTable {...getTransactionsTableProps()}/> :
            <div style={noTransactions}>No Results Found !!</div>
    };

    /*Try changing the url to see the error*/
    return (
        <>
            {error}
            <CustomerFilter
                selectedItem={state.selectedCustomer}
                data={getUniqCustomerNames()}
                onChange={handleFilterChange}
                label='name'
            />
            {renderTable()}
            {userRewardsSummary()}
        </>
    )
};

export default TransactionList;
