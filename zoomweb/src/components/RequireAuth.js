import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./Auth";

export default function RequireAuth({ children }) {
    const auth = useContext(AuthContext);
    if (Object.keys(auth.user).length === 0) {
        return (
            <>
                {sessionStorage.clear()}
                <Navigate to="/" replace={true} />
            </>
        );
    }
    else {
        return (<>{children}</>);
    }
}