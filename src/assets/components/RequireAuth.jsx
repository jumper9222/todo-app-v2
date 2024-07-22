import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

export default function RequireAuth({ children }) {
    const { token } = useContext(UserContext)

    if (!token) {
        return (<Navigate to='/login' replace />)
    }
    return children
}