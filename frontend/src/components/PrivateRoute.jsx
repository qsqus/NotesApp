import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import Loader from "./Loader";

function PrivateRoute(props) {
    const { isAuthenticated, isLoading } = useAuth();

    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Loader />
            </div>
        );
    }

    if (isAuthenticated) {
        return (props.children);
    } else {
        navigate('/login');
    }

}

export default PrivateRoute;