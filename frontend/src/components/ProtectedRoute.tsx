import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute: React.FC = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) return null;

    const { isAuthenticated, isAuthLoading } = authContext;

    if (isAuthLoading) {
        // return null; // Or loading spinner
        return <div className="text-center py-10">Checking authentication...</div>;
    }
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;



// old code, apparently there was a race condition on the return, where it was checking before isAuthenticated was set in AuthContext, meriting the addition of the isAuthLoading const (checked now in the new code above)
// import { Navigate, Outlet } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// const ProtectedRoute: React.FC = () => {
//     const authContext = useContext(AuthContext);
//     return authContext?.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
// };

// export default ProtectedRoute;