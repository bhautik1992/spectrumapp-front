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
        )
    },
    { 
        name: "Salesforce Lead Id",
        selector: (row) => row.salesforce_lead_id, 
        sortable: true,
        cell: (row) => (
            <>
                {row.salesforce_lead_id}
            </>
        )
    },
    { 
        name: "First Name",
        selector: (row) => row.lead_first_name, 
        sortable: true,
        cell: (row) => (
            <>
                {row.lead_first_name}
            </>
        )
    },
    { 
        name: "Last Name",
        selector: (row) => row.lead_last_name, 
        sortable: true,
        cell: (row) => (
            <>
                {row.lead_last_name}
            </>
        )
    },
    { 
        name: "Email",
        selector: (row) => row.lead_email, 
        sortable: true,
        cell: (row) => (
            <>
                {row.lead_email}
            </>
        )
    },
    { 
        name: "Phone",
        selector: (row) => row.lead_phone, 
        sortable: true,
        cell: (row) => (
            <>
                {row.lead_phone}
            </>
        )
    }
];