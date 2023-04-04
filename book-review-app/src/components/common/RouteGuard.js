import { Navigate, Outlet } from "react-router-dom";

import { useAuthContext } from "../../contexts/authContext";

export const RouteGuard = ({
    children,
}) => {
    const { isAuthenticated } = useAuthContext();

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    return children ? children : <Outlet /> // Works with or without children
};

//// Works only with children as props
// export const RouteGuard = ({
//     children,
// }) => {
//     const { isAuthenticated } = useAuthContext();

//     if (!isAuthenticated) {
//         return <Navigate to="/login" />
//     }

//     return (
//         <>
//             {children}
//         </>
//     );
// };