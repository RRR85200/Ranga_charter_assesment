import React from 'react';
import { monthNames, calculateRewardsByMonthInCurrentYear} from '../utils/calculateRewards';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';

/*
* Functional Component just to represent the Account summary for selected Customer
* Here planned to use Material UI but wanted to use plain css to style the elements
* */

const UserRewardsSummary = (props) => {
    const currentMonth = new Date().getMonth();
    const currentMonthRewards = calculateRewardsByMonthInCurrentYear(props.transactionData, currentMonth);
    const previousMonthRewards = calculateRewardsByMonthInCurrentYear(props.transactionData, currentMonth - 1);
    const rewardsEarnedTwoMonthsAgo = calculateRewardsByMonthInCurrentYear(props.transactionData, currentMonth - 2);

    const useStyles = makeStyles({
        rewards_summary: {
            width: '100%',
            padding: 20
        },
        summary_type: {
            margin: 15,
            display: 'flex',
            justifyContent: 'flex-end',
            alignContent: 'center'
        },
        type: {
            fontWeight: 300,
            paddingRight: 20
        },
        type_rewards: {
            fontWeight: 500
        }
    });
    const classes = useStyles();
    return (
        <div className={classes.rewards_summary}>
            <h2> Selected User Rewards Summary</h2>
            <div className={classes.summary_type}>
                <div className={classes.type}>Rewards Earned in Current Months</div>
                <div className={classes.type_rewards}>{currentMonthRewards}</div>
            </div>

            <div className={classes.summary_type}>
                <div className={classes.type}>Rewards Earned in Previous Month</div>
                <div className={classes.type_rewards}>{previousMonthRewards}</div>
            </div>

            <div className={classes.summary_type}>
                <div className={classes.type}>{'Rewards Earned in ' + monthNames[(currentMonth - 2)] + 'Month'} </div>
                <div className={classes.type_rewards}>{calculateRewardsByMonthInCurrentYear(props.transactionData, currentMonth - 2)}</div>
            </div>

            <hr />

            <div className={classes.summary_type}>
                <div className={classes.type}>Total Rewards Earned in last 3 Months </div>
                <div className={classes.type_rewards}>{currentMonthRewards + previousMonthRewards + rewardsEarnedTwoMonthsAgo}</div>
            </div>
        </div>
    )
};

UserRewardsSummary.propTypes = {
    transactionData: PropTypes.arrayOf(
        PropTypes.shape({
            customerName: PropTypes.string,
            id: PropTypes.number,
            date: PropTypes.string,
            amount: PropTypes.number,
            category: PropTypes.string
        })
    ).isRequired
};

export default UserRewardsSummary;
