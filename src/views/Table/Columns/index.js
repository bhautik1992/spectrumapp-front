import { leadSourceLabels, leadStatusLabels, lowStockThreshold } from '../../../constants';
import { Edit } from "react-feather";
import { Badge } from 'reactstrap'

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

export const cusInsightsTableColumn = (currentPage, rowsPerPage) => [
    { 
        name: "Customer Name",
        selector: (row) => row.node.displayName, 
        sortable: true,
        cell: (row) => (
            <>
                {row.node.displayName}
            </>
        )
    },
    {
        name: "Phone",
        selector: (row) => row.node?.defaultPhoneNumber?.phoneNumber || '',
        sortable: true,
        cell: (row) => {
            return (
                <>
                    {row.node?.defaultPhoneNumber?.phoneNumber || ''}
                </>
            );
        },
        width: "170px"
    },
    {
        name: "Email",
        selector: (row) => row.node?.defaultEmailAddress?.emailAddress || '',
        sortable: false,
        cell: (row) => {
            return (
                <>
                    {row.node?.defaultEmailAddress?.emailAddress || ''}
                </>
            );
        }
    },
    {
        name: "Email subscription",
        selector: (row) => row.node?.defaultEmailAddress?.marketingState || '',
        sortable: true,
        cell: (row) => {
            const marketingState = row.node?.defaultEmailAddress?.marketingState || '';
            const colorMap = { SUBSCRIBED: 'success', UNSUBSCRIBED: 'warning'};
            const color = colorMap[marketingState] || 'secondary';

            return (
                <>
                    <Badge color={color} className='badge-sm' pill>
                        {marketingState}
                    </Badge>
                </>
            );
        },
        width: "220px"
    },
    {
        name: "Location",
        selector: (row) => row.node?.defaultAddress?.city || '',
        sortable: false,
        cell: (row) => {
            const city = row.node?.defaultAddress?.city || '';
            const country = row.node?.defaultAddress?.country || '';
            const location = [city, country].filter(Boolean).join(', ');        
            
            return (
                <>
                    {location}
                </>
            );
        }
    },
    {
        name: "Orders",
        selector: (row) => row.node?.numberOfOrders || '',
        sortable: true,
        cell: (row) => {
            return (
                <>
                    {row.node?.numberOfOrders || ''}
                </>
            );
        },
        width: "130px"
    },
    {
        name: "Amount Spent",
        selector: (row) => row.node?.amountSpent?.amount || '',
        sortable: true,
        cell: (row) => {
            const amount = row.node?.amountSpent?.amount || '';
            const code = row.node?.amountSpent?.currencyCode || '';

            const currencySymbols = {GBP: '£',USD: '$',EUR: '€',INR: '₹'};
            const symbol = currencySymbols[code] || code;

            return (
                <>
                    {amount && code ? `${symbol}${amount}` : ''}
                </>
            );
        },
        width: "180px"
    }
]

export const stockReportTableColumn = (currentPage, rowsPerPage) => [
    { 
        name: "Product",
        selector: (row) => row.node.title, 
        sortable: true,
        cell: (row) => (
            <>
                {row.node.title}
            </>
        )
    },
    { 
        name: "Status",
        selector: (row) => row.node?.status || '', 
        sortable: true,
        cell: (row) => {
            const status = row.node?.status || '';
            const colorMap = { ACTIVE:'success', DRAFT:'primary', ARCHIVED:'secondary'};
            const color = colorMap[status] || 'warning';

            return (
                <>
                    <Badge color={color} className='badge-sm' pill>
                        {status}
                    </Badge>
                </>
            );
        },
        width: "130px"
    },
    { 
        name: "Inventory",
        selector: (row) => row.node?.totalInventory, 
        sortable: true,
        cell: (row) => {
            if (!row.node?.tracksInventory) {
                return 'Inventory not tracked';
            }
              
            const totalInventory = row.node?.totalInventory ?? 0;
            const hasOnlyDefaultVariant = row.node?.hasOnlyDefaultVariant;
            const variantsCount = row.node?.variantsCount?.count ?? 0;
              
            if (hasOnlyDefaultVariant) {
                return `${totalInventory} in stock`;
            }
              
            return `${totalInventory} in stock for ${variantsCount} variant${variantsCount > 1 ? 's' : ''}`;
        }
    },
    { 
        name: "Category",
        selector: (row) => row.node?.category?.name || '', 
        sortable: true,
        cell: (row) => (
            <>
                {row.node?.category?.name || ''}
            </>
        )
    },
    { 
        name: "Type",
        selector: (row) => row.node?.productType || '', 
        sortable: true,
        cell: (row) => (
            <>
                {row.node?.productType || ''}
            </>
        )
    },
    { 
        name: "Vendor",
        selector: (row) => row.node?.vendor || '', 
        sortable: true,
        cell: (row) => (
            <>
                {row.node?.vendor || ''}
            </>
        )
    },
    { 
        name: "Low Stock",
        selector: (row) => row.node?.totalInventory || '', 
        sortable: true,
        cell: (row) => (
            <>
                {(row.node.totalInventory <= lowStockThreshold)?'Low Stock':'Not Low Stock'}
            </>
        )
    },
]


