import { Navigate } from "react-router-dom";
import { useAuth } from "../feature/auth/context/AuthContext";
export function ProtectedRoutes({ children }) {
    const { user, authloading } = useAuth();
    if (authloading) {
        return <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
            <p className="text-white">Loading...</p>
        </div>
    }
    if (!user) {
        return <Navigate to="/login" />
    }

    return children
}