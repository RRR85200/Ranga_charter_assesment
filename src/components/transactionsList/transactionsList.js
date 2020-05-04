import React, {useEffect, useReducer, useState} from 'react';
import CustomerTransactionsTable from "../customerTransactionsTable/customerTransactionsTable";
import CustomerFilter from '../customersFilter/CustomersFilter';
import uniqBy from 'lodash/uniqBy';
import UserRewardsSummary from "../userRewardsSummary/userRewardsSummary";

const initialTransactionData = {
    selectedCustomer: {
        name: ''
    },
    transactions: []
}

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
}

const TransactionList = (props) => {

    const [state, dispatch] = useReducer(reducer, initialTransactionData);
    const [hasError, setError] = useState(false);
    const noUserSelected = {
        name: ''
    }

    useEffect(() => {
        const fetchTransactionList = async () => {
            try {
                const response = await fetch('/transactionsData.json');
                const transactionData = await response.json();
                dispatch({type:'add_data', payload: transactionData.data})
                console.log(transactionData.data);
                if(hasError){
                    setError(false);
                }
            } catch (e) {
                setError(true);
            }
        };
        fetchTransactionList();
    }, [hasError]);

    const getSelectedUserActivity = (selectedCustomerName) => {
       return state.transactions.filter(activity => {
            return activity.customerName === selectedCustomerName
        });
    }

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

    const getUniqCustomerNames = () => {
        const customersList = [];
        uniqBy(state.transactions, 'customerName').forEach(customer => {
            customersList.push({
                name: customer.customerName,
            })
        });

        return customersList;
    };

    const handleFilterChange= (selectedUser) => {
        const payload = selectedUser ? selectedUser : noUserSelected;
         dispatch({type: 'select_customer', payload: payload});
    };

    const error = (hasError ? <div>Error Retreiving Transactions Data</div> : null);

    const userRewardsSummary = () => {
        const selectedUser = state.selectedCustomer.name;

        return (
            selectedUser ? <UserRewardsSummary transactionData={getSelectedUserActivity(selectedUser)}/> : null
        )
    };


    return (
        <>
            {error}
            <CustomerFilter
                selectedItem={state.selectedCustomer}
                data={getUniqCustomerNames()}
                onChange={handleFilterChange}
                label='name'
            />
            <CustomerTransactionsTable {...getTransactionsTableProps()}/>
            {userRewardsSummary()}
        </>
    );
};

export default TransactionList;
