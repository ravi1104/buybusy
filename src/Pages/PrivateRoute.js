import { useSelector } from "react-redux";
import { loginSelector } from "../redux/reducers/loginReducer";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { loginData } = useSelector(loginSelector);

    console.log(loginData);
    if (!loginData.fname) return <Navigate to="/signin"
        replace={true} />;
    return children;
}


export default PrivateRoute;