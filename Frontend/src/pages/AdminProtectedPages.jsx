import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {  useNavigate } from "react-router-dom";


function Protected({children}){

    let auth = useSelector(state => state.auth.isAuthenticated);
    let role = useSelector(state => state.auth.role);
    const navigate = useNavigate();
    const[valid,setValid] = useState(false)

    useEffect(()=>{
        if(auth == false){
            navigate('/login')
        }if(role == 'user'){
            navigate('/')
        }

        if(role == 'admin' && auth == true){
            setValid(true);
        }
    },[auth,role,navigate])



    console.log()
    return(
         <Fragment>
               {valid && children}
        </Fragment>
    )
}

export default Protected;