import { leadSourceLabels, leadStatusLabels } from '../../../constants';
import { Edit } from "react-feather";

export const customersTableColumn = (currentPage, rowsPerPage, editRecord) => [
    // {
    //     name: "#", 
    //     selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1,
    //     sortable: false, 
    //     width: "60px" 
    // },
    { 
        name: "Shopify CID",
        selector: (row) => row.shopify_cus_id, 
        sortable: true,
        cell: (row) => (
            <>
                {row.shopify_cus_id}
            </>
        ),
        width: "155px"
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
        selector: (row) => row.full_name, 
        sortable: true,
        cell: (row) => (
            <>
                {row.full_name}
            </>
        ),
        width: "245px"
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
        width: "230px"
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
    },
    { 
        name: "Actions",
        ignoreRowClick: true,
        allowOverflow: true,
        cell: (row) => (
            <div className='d-flex'>
                <Edit size={18} className="pointer text-primary ms-1" onClick={() => editRecord(row)} />       
            </div>
        )
    }
];