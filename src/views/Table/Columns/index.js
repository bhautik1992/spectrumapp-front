const leadSourceLabels = {
    1: "Web",
    2: "Phone Inquiry",
    3: "Partner - Referral",
    4: "Purchased - List",
    5: "Other"
};

const leadStatusLabels = {
    1: "Open - Not Contacted",
    2: "Working - Contacted",
    3: "Closed - Converted",
    4: "Closed - Not Converted"
};

export const customersTableColumn = (currentPage, rowsPerPage) => [
    {
        name: "#", 
        selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1,
        sortable: false, 
        width: "60px" 
    },
    { 
        name: "Shopify Id",
        selector: (row) => row.shopify_id, 
        sortable: true,
        cell: (row) => (
            <>
                {row.shopify_id}
            </>
        ),
        width: "150px"
    },
    { 
        name: "Salesforce Lead Id",
        selector: (row) => row.salesforce_lead_id, 
        sortable: true,
        cell: (row) => (
            <>
                {row.salesforce_lead_id}
            </>
        ),
        width: "220px"
    },
    {
        name: "Name",
        selector: (row) => `${row.lead_first_name || ''} ${row.lead_last_name || ''}`.trim(),
        sortable: true,
        cell: (row) => (
            <>
                {(row.lead_first_name || '') + ' ' + (row.lead_last_name || '')}
            </>
        ),
        width: "250px"
    },
    { 
        name: "Company",
        selector: (row) => row.lead_company, 
        sortable: true,
        cell: (row) => (
            <>
                {row.lead_company}
            </>
        ),
        width: "200px"
    },
    { 
        name: "Email",
        selector: (row) => row.lead_email, 
        sortable: true,
        cell: (row) => (
            <>
                {row.lead_email}
            </>
        ),
        width: "250px"
    },
    { 
        name: "Phone",
        selector: (row) => row.lead_phone, 
        sortable: true,
        cell: (row) => (
            <>
                {row.lead_phone}
            </>
        ),
        width: "150px"
    },
    { 
        name: "Source",
        selector: (row) => row.lead_source, 
        sortable: true,
        cell: (row) => (
            <>
                {leadSourceLabels[row.lead_source] || "Unknown"}
            </>
        ),
        width: "150px"
    },
    { 
        name: "Status",
        selector: (row) => row.lead_status, 
        sortable: true,
        cell: (row) => (
            <>
                {leadStatusLabels[row.lead_status] || "Unknown"}
            </>
        ),
        width: "150px"
    }
];