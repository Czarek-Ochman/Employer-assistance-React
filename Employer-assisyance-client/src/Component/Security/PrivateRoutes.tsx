import {Outlet, Navigate} from 'react-router-dom'
import jwt_decode from "jwt-decode";

interface MyToken {
    exp: number;
}

const PrivateRoutes = () => {
    let auth = {'token': false}
    let authToken = {'expired': false}
    if (localStorage.getItem("accessToken")) {
        let token = localStorage.getItem("accessToken") || "";
        let decodedToken = jwt_decode<MyToken>(token);
        let currentDate = new Date();

        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            authToken = {'expired': true}
        } else {
            console.log("Valid token");
            auth = {'token': true}
        }

    } else {
        auth = {'token': false}
    }
    return (
        auth.token ? <Outlet/> : authToken.expired ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes