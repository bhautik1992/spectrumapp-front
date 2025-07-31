import { Fragment, lazy } from "react";
import { Navigate } from "react-router-dom";
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";
import PublicRoute from "@components/routes/PublicRoute";
import { isObjEmpty } from "@utils";
import PrivateRoute from '../../views/PrivateRoute';
import AccessibleRoute from '../../views/AccessibleRoute';

const getLayout = {
    blank: <BlankLayout />,
    vertical: <VerticalLayout />,
    horizontal: <HorizontalLayout />,
};

// ** Document title
const TemplateTitle = "%s - Spectrum One Hair Extensions";

// ** Default Route
const DefaultRoute = "/login";

const Login = lazy(() => import("../../views/Login"));
const ForgotPassword = lazy(() => import("../../views/ForgotPassword"));
const Error = lazy(() => import("../../views/Error"));
const NoRecord = lazy(() => import("../../views/NoRecord"));
const NotAuthorized = lazy(() => import("../../views/NotAuthorized"));
const Home = lazy(() => import("../../views/Home"));
const Customers = lazy(() => import("../../views/Customers"));
const CustomerInsights = lazy(() => import("../../views/CustomerInsights"));
const StockReport = lazy(() => import("../../views/StockReport"));
const Settings = lazy(() => import("../../views/Settings"));

// ** Merge Routes
const Routes = [
    {
        path: "/",
        index: true,
        element: <Navigate replace to={DefaultRoute} />,
    },
    {
        path: "/home",
        element: (
            <PrivateRoute>
                <Home />
            </PrivateRoute>
        ),
    },
    {
        path: "/customers",
        element: (
            <PrivateRoute>
                <Customers />
            </PrivateRoute>
        ),
    },
    {
        path: "/customer-insights",
        element: (
            <PrivateRoute>
                <CustomerInsights />
            </PrivateRoute>
        ),
    },
    {
        path: "/stock-report",
        element: (
            <PrivateRoute>
                <StockReport />
            </PrivateRoute>
        ),
    },
    {
        path: "/settings",
        element: (
            <PrivateRoute>
                <Settings />
            </PrivateRoute>
        ),
    },
    {
        path: "/login",
        element: (
            <AccessibleRoute>
                <Login />
            </AccessibleRoute>
        ),
        meta: {
            layout: "blank",
        },
    },
    {
        path: "/forgot_password",
        element: (
            <AccessibleRoute>
                <ForgotPassword />
            </AccessibleRoute>
        ),
        meta: {
            layout: "blank",
        },
    },
    {
        path: "/not-found",
        element: <NoRecord />,
        meta: {
            layout: "blank",
        },
    },
    {
        path: "/not-authorized",
        element: <NotAuthorized />,
        meta: {
            layout: "blank",
        },
    },
    {
        path: "*",
        element: <Error />,
        meta: {
            layout: "blank",
        },
    }
];

const getRouteMeta = (route) => {
    if (isObjEmpty(route.element.props)) {
        if (route.meta) {
            return { routeMeta: route.meta };
        } else {
            return {};
        }
    }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
    const LayoutRoutes = [];

    if (Routes) {
        Routes.filter((route) => {
            let isBlank = false;
            // ** Checks if Route layout or Default layout matches current layout
            if (
                (route.meta && route.meta.layout && route.meta.layout === layout) ||
                ((route.meta === undefined || route.meta.layout === undefined) &&
                    defaultLayout === layout)
            ) {
                const RouteTag = PublicRoute;

                // ** Check for public or private route
                if (route.meta) {
                    route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
                }
                
                if (route.element) {
                    const Wrapper =
                        // eslint-disable-next-line multiline-ternary
                        isObjEmpty(route.element.props) && isBlank === false
                            ? // eslint-disable-next-line multiline-ternary
                            LayoutWrapper
                            : Fragment;

                    route.element = (
                        <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
                            <RouteTag route={route}>{route.element}</RouteTag>
                        </Wrapper>
                    );
                }

                // Push route to LayoutRoutes
                LayoutRoutes.push(route);
            }
            return LayoutRoutes;
        });
    }
    return LayoutRoutes;
};

const getRoutes = (layout) => {
    const defaultLayout = layout || "vertical";
    const layouts = ["vertical", "horizontal", "blank"];

    const AllRoutes = [];

    layouts.forEach((layoutItem) => {
        const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

        AllRoutes.push({
            path: "/",
            element: getLayout[layoutItem] || getLayout[defaultLayout],
            children: LayoutRoutes,
        });
    });
    return AllRoutes;
};

export { DefaultRoute, TemplateTitle, Routes, getRoutes };
