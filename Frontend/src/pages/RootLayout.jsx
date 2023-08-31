import { Fragment, useEffect} from "react";
import {Outlet} from "react-router-dom"
import { useSelector } from "react-redux/es/hooks/useSelector";
import HeaderBar from "../components/Header";
import SideBar from "../components/Sidebar";
import { ToastContainer } from "react-toastify";
import HeaderBarUnsigned from "../components/Header2";
import { Container } from "react-bootstrap";

import classes from './RootLayout.module.css'

function RootLayout(){
    
    let auth = useSelector(state => state.auth.isAuthenticated);
    let role = useSelector(state => state.auth.role);
    
    // let navigate = useNavigation();

    return(
    
    <Fragment>  
        <ToastContainer/>
        <div className={classes.topHeader}>
        <header style={{position: "sticky"}}>{auth && role=='user'&& <HeaderBar/>} {!auth && <HeaderBarUnsigned></HeaderBarUnsigned>}</header></div>

        <main style={{marginTop:"5rem"}}>
            {/* <aside><SideBar></SideBar></aside> */}
            <Outlet/>
        </main>
    </Fragment> 
    
    )
}

export default RootLayout;
