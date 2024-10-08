import {useAuthState} from "react-firebase-hooks/auth";
import {Outlet, Navigate} from "react-router-dom";
import {auth} from './firebase';

const PrivateRoutes=()=>{
    const [user, loading, error]=useAuthState(auth);

    console.log("User in PrivateRoutes:", user);
    if(loading){
        return <p>Loading...</p>;
    }else if (!user || error){
        return <Navigate to="/" replace />;
    }
    else{
        return <Outlet/>;
    }
};

export default PrivateRoutes;