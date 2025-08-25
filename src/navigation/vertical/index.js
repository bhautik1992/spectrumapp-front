import { Users, Home, FileText, Grid, Calendar } from "react-feather";

export default [
    {
        id: "home",
        title: "Home",
        icon: <Home size={20} />,
        navLink: "/home",
    },
    {
        id: "customers",
        title: "Customers",
        icon: <Users size={20} />,
        navLink: "/customers",
    },
    {
        id: "customer_insights",
        title: "Customer Insights",
        icon: <FileText size={20} />,
        navLink: "/customer-insights",
    },
    {
        id: "stock_report",
        title: "Stock Report",
        icon: <Grid size={20} />,
        navLink: "/stock-report",
    },
    {
        id: "calender",
        title: "Calender",
        icon: <Calendar size={20} />,
        navLink: "/calender",
    },
];
