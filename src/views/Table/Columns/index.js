import { leadSourceLabels, leadStatusLabels, lowStockThreshold, ABANDONED_CHECKOUT_SEGMENT_ID } from '../../../constants';
import { Edit } from "react-feather";
import { Badge } from 'reactstrap'

export const customersTableColumn = (currentPage, rowsPerPage, editRecord) => [
    // {
    //     name: "#", 
    //     selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1,
    //     sortable: false, 
    //     width: "60px" 
    // },
    // { 
    //     name: "Shopify CID",
    //     selector: (row) => row.shopify_cus_id, 
    //     sortable: true,
    //     cell: (row) => (
    //         <>
    //             {row.shopify_cus_id}
    //         </>
    //     ),
    //     width: "200px"
    // },
    // { 
    //     name: "Salesforce Lead Id",
    //     selector: (row) => row.salesforce_lead_id, 
    //     sortable: true,
    //     cell: (row) => (
    //         <>
    //             {row.salesforce_lead_id}
    //         </>
    //     ),
    //     width: "220px"
    // },
    { 
        name: "Name",
        selector: (row) => row.full_name, 
        sortable: true,
        cell: (row) => (
            <>
                {row.full_name}
            </>
        ),
        width: "250px"
    },
    // { 
    //     name: "Company",
    //     selector: (row) => row.lead_company, 
    //     sortable: true,
    //     cell: (row) => (
    //         <>
    //             {row.lead_company}
    //         </>
    //     ),
    //     width: "200px"
    // },
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
    // { 
    //     name: "Source",
    //     selector: (row) => row.lead_source, 
    //     sortable: true,
    //     cell: (row) => (
    //         <>
    //             {leadSourceLabels[row.lead_source] || "Unknown"}
    //         </>
    //     ),
    //     width: "200px"
    // },
    { 
        name: "Orders",
        selector: (row) => row.orders_count, 
        sortable: true,
        cell: (row) => (
            <>
                {row.orders_count ?? 0}
            </>
        ),
        width: "150px"
    },
    { 
        name: "Amount Spent",
        selector: (row) => row.amount_spent, 
        sortable: true,
        cell: (row) => (
            <>
                £{row.amount_spent || '0.00'}
            </>
        ),
        width: "200px"
    },
    { 
        name: "Last Order",
        selector: (row) => row.last_order_date, 
        sortable: true,
        cell: (row) => {
            if (!row.last_order_date) return '-';
            const date = new Date(row.last_order_date);
            return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
        },
        width: "200px"
    },
    { 
        name: "Created At",
        selector: (row) => row.customer_added_date, 
        sortable: true,
        cell: (row) => {
            if (!row.customer_added_date) return '-';
            const date = new Date(row.customer_added_date);
            return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
        },
        width: "150px"
    },
    { 
        name: "Status",
        selector: (row) => row.lead_status, 
        sortable: true,
        cell: (row) => {
            const colorMap = { 1: 'primary', 2: 'warning', 3: 'success', 4: 'secondary'};
            const color = colorMap[row.lead_status] || 'secondary';

            return (
                <>
                    <Badge color={color} className='badge-sm' pill>
                        {leadStatusLabels[row.lead_status] || "Unknown"}
                    </Badge>
                </>
            );
        },
        width: "150px"
    },
    { 
        name: "Actions",
        ignoreRowClick: true,
        allowOverflow: true,
        cell: (row) => {
            return(
                <div className='d-flex'>
                    <Edit size={18} className="pointer text-primary ms-1" onClick={() => editRecord(row)} />       
                </div>
            )
        }
    }
];

const formatInsightDate = (value) => {
    if (!value) return '';

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';

    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()] || '';
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;
};

export const cusInsightsTableColumn = (currentPage, rowsPerPage, selectedSegment) => {
    const useAbandonedCheckoutDate = selectedSegment === ABANDONED_CHECKOUT_SEGMENT_ID;

    return [
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
        name: useAbandonedCheckoutDate ? "Abandoned Checkout Date" : "Added Date",
        selector: (row) => useAbandonedCheckoutDate ? (row.node?.abandoned_checkout_date || '') : (row.node?.createdAt || ''),
        sortable: true,
        cell: (row) => {
            const dateValue = useAbandonedCheckoutDate ? row.node?.abandoned_checkout_date : row.node?.createdAt;
            const formattedDate = formatInsightDate(dateValue);

            return (
                <>
                    {formattedDate}
                </>
            );
        },
        width: "150px"
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
    ];
};

export const stockReportTableColumn = (currentPage, rowsPerPage, filterVal) => {
    let columns = [
        {
            name: "Product",
            selector: (row) => row.node?.title || row.title,
            sortable: true,
            cell: (row) => (
                <>
                    {row.node?.title || row.title || "—"}
                </>
            )
        },
        {
            name: "Status",
            selector: (row) => row.node?.status || '',
            sortable: true,
            cell: (row) => {
                const status = row.node?.status || '';
                const colorMap = { ACTIVE: 'success', DRAFT: 'primary', ARCHIVED: 'secondary' };
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

                if (String(filterVal) === '1') {
                    const variants = row.node?.variants?.edges || [];

                    if (row.node?.hasOnlyDefaultVariant) {
                        const qty = variants[0]?.node?.inventoryQuantity ?? 0;
                        return `${qty} in stock`;
                    }

                    const lowStockVariants = variants.filter(
                        (variant) => (variant.node?.inventoryQuantity ?? 0) <= lowStockThreshold
                    );

                    return (
                        <div>
                            {lowStockVariants.map((variant) => (
                                <div key={variant.node.id}>
                                    <strong>{variant.node.title}</strong> - {variant.node.inventoryQuantity}
                                </div>
                            ))}
                        </div>
                    );
                }

                if (['2', '3'].includes(String(filterVal))) {
                    const variants = row.node?.variants?.edges || [];

                    return (
                        <div>
                            {variants.map((variant) => (
                                <div key={variant.node.id}>
                                    <strong>{variant.node.title}</strong> - {variant.node.inventoryQuantity}
                                </div>
                            ))}
                        </div>
                    );
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
        // {
        //     name: "Low Stock",
        //     selector: (row) => row.node?.totalInventory || '',
        //     sortable: true,
        //     cell: (row) => (
        //         <>
        //             {(row.node.totalInventory <= lowStockThreshold) ? 'Low Stock' : 'Not Low Stock'}
        //         </>
        //     )
        // },
    ];

    if (filterVal > 1) {
        const qtyColumn = {
            name: "Qty",
            selector: (row) => row.node?.qty || 0,
            sortable: true,
            cell: (row) => row.node?.qty || '0',
            width: "100px"
        };

        columns = [
            ...columns.slice(0, 2),
            qtyColumn,
            ...columns.slice(2)
        ];

        if (['2', '3'].includes(String(filterVal))) {
            const soldVariantColumn = {
                name: "Variant Sold",
                minWidth: "250px",
                sortable: false,
                cell: (row) => {
                    const soldVariants = row.node?.soldVariants || [];

                    if (!soldVariants.length) {
                        return '-';
                    }

                    return (
                        <div>
                            {soldVariants.map((variant) => (
                                <div key={variant.id}>
                                    <strong>{variant.title}</strong> - Sold {variant.quantity}
                                </div>
                            ))}
                        </div>
                    );
                }
            };

            columns = [
                ...columns.slice(0, 3),
                soldVariantColumn,
                ...columns.slice(3)
            ];
        }
    }

    return columns;
};

export const quarterComparisonColumns = [
    {
        name: "Product",
        selector: row => row.title,
        sortable: true,
        wrap: true
    },
    {
        name: "Current Quarter Sold Qty",
        selector: row => row.currentQty,
        center: true,
        wrap: true
    },
    {
        name: "Previous Year Quarter Sold Qty",
        selector: row => row.prevQty,
        center: true,
        wrap: true,
        minWidth: "290px"
    },
    {
        name: "Difference",
        selector: row => row.difference,
        center: true,
        wrap: true
    },
    {
        name: "Percentage Change",
        center: true,
        wrap: true,
        cell: row => {
            if (row.percentage === null || row.percentage === undefined) {
                return "—";
            }

            const value = Number(row.percentage).toFixed(1);

            const color =
                row.percentage > 0 ? "#28a745" :
                row.percentage < 0 ? "#dc3545" :
                "#6c757d";

            return (
                <span style={{ fontWeight: "bold", color }}>
                    {value}%
                </span>
            );
        }
    },
    {
        name: "Trend",
        center: true,
        wrap: true,
        cell: row => (
            <span
                style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color:
                        row.trend === "up"
                            ? "#28a745"
                            : row.trend === "down"
                            ? "#dc3545"
                            : "#6c757d"
                }}
            >
                {row.trend === "up"
                    ? "↑"
                    : row.trend === "down"
                    ? "↓"
                    : "–"}
            </span>
        )
    }
];


