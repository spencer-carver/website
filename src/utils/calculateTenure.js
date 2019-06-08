function calculateTenure(startDate, endDate) {
    const startMillis = startDate.getTime();
    const endMillis = (endDate ? endDate : new Date()).getTime();
    const differenceInYears = (endMillis - startMillis) / (1000 * 60 * 60 * 24 * 365.25);
    return Math.floor(differenceInYears);
}

export default calculateTenure;
