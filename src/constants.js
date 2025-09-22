export const leadSourceLabels = {
    1: "Web",
    2: "Phone Inquiry",
    3: "Partner - Referral",
    4: "Purchased - List",
    5: "Other",
    6: "Shopify Registration",
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

export const stockReportFilter = [
    { value: '0', label: 'All' },
    { value: '1', label: 'What is low (Threshold <=5)' },
    { value: '2', label: 'Selling well' },
    { value: '3', label: 'Not selling' },
];

export const lowStockThreshold = 5;
