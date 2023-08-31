import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Outlet, useNavigate } from "react-router-dom";


function Protected({children}){

    let auth = useSelector(state => state.auth.isAuthenticated);
    const navigate = useNavigate();

    useEffect(()=>{
        if(auth == false){
            navigate('/login')
        }
    },[auth])

    console.log()
    return(
         <Fragment>
               {auth && children}
        </Fragment>
    )
}

export default Protected;