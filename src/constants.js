export const leadSourceLabels = {
    1: "Web",
    2: "Phone Inquiry",
    3: "Partner - Referral",
    4: "Purchased - List",
    5: "Other",
    6: "Shopify Registration",
    7: "Migrated Customer",
};

export const leadStatusLabels = {
    1: "Open - Not Contacted",
    2: "Working - Contacted",
    3: "Closed - Converted",
    4: "Closed - Not Converted"
};

export const leadStatusOptions = [
    { value: 1, label: 'Open - Not Contacted' },
    { value: 2, label: 'Working - Contacted' },
    { value: 3, label: 'Closed - Converted' },
    { value: 4, label: 'Closed - Not Converted' }
];

const getQuarterLabelWithYears = () => {
    const today        = new Date();
    const month        = today.getMonth() + 1;
    const currentYear  = today.getFullYear();
    const previousYear = currentYear - 1;

    let range = "";

    if (month >= 1 && month <= 3) range = "Jan–Mar";
    else if (month >= 4 && month <= 6) range = "Apr–Jun";
    else if (month >= 7 && month <= 9) range = "Jul–Sep";
    else range = "Oct–Dec";

    return `${range} ${currentYear} vs ${range} ${previousYear}`;
};

export const getStockReportFilter = () => {
    const quarterLabel = getQuarterLabelWithYears();

    return [
        { value: '0', label: 'All' },
        { value: '1', label: 'What is low (Threshold <=5)' },
        { value: '2', label: 'Selling well' },
        { value: '3', label: 'Not selling' },
        { value: '4', label: `Quarterly Comparison (${quarterLabel})` },
    ];
};

export const stockReportFilter = getStockReportFilter();

export const lowStockThreshold = 5;


