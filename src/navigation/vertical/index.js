import { Users, Home } from "react-feather";

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
];
