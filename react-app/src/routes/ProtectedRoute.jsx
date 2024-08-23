// Imports
import React from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "../components/hooks/actions";



// Protected route to secure the user is authenticated
function ProtectedRoute({children}) {
    const user = getUser();

    return user ? <>{children}</> : <Navigate to="/login"/>
};



// Export
export default ProtectedRoute;


