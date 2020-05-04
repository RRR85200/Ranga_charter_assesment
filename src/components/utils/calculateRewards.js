export const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

/*Given an transaction Activity Calculate the rewards earned*/
export const calculateRewardsForEachActivity = (activityAmount) => {
    let rewardsAbove100 = 0;
    let rewardsAbove50 = 0;

    if (activityAmount / 50 === 1) {
        rewardsAbove50 = activityAmount - 50;
    } else if (activityAmount / 50 > 1) {
        rewardsAbove50 = 1 * 50;
        rewardsAbove100 = 2 * (activityAmount - 100);
    }
    return rewardsAbove100 + rewardsAbove50;
};

// Assuming the activities are with last 3 months
/*Given an transactions Activity Calculate the rewards earned in a given month*/

export const calculateRewardsByMonthInCurrentYear = (transactions, month) => {
    const activityInAGivenMonth = transactions.filter(activity => {
        return new Date(activity.date).getMonth() === month;
    });

   return activityInAGivenMonth.reduce((accumulator, currentValue) => accumulator + calculateRewardsForEachActivity(currentValue['amount']), 0);
}
