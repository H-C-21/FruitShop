import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate,Link } from "react-router-dom";
import OrderItem from "../components/OrderItem";

import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";
import OrderItemAdmin from "../components/OrderItemAdmin";

function AdminOrdersPage() {

  const [orderData,setOrderData] = useState([]);
  const [loaded,setLoaded] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function logoutHandler(){
    dispatch(authActions.logout());
    navigate('/')
  }

  async function getOrders(){
    let response = await fetch("http://localhost:8000/api/admin/getorders",{
        headers:{
             "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://localhost:5173",
            "X-Requested-With": "XMLHttpRequest",
            "Authorization": "Bearer " + localStorage.getItem("auth_token"),        
        }
    })
        return response;
    }

    useEffect(()=>{

      fetch("http://localhost:8000/api/admin/getorders",{
        headers:{
             "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://localhost:5173",
            "X-Requested-With": "XMLHttpRequest",
            "Authorization": "Bearer " + localStorage.getItem("auth_token"),        
        }
      }).then((response)=>{

        response.json().then((data)=>{
          
          setOrderData(data.orders)
          setLoaded(true)
        
        })
        // console.log(response)
        // console.log(response.data)
    })
      },[])
  
  
  // useEffect(()=>{
  //   setOrderData(loader.data)
  //   setLoaded(true)
  // },[loader])

  return (
    <Container>
        <Grid container direction={"row"}>
            <Grid item xs={3}>
              <Typography variant="h3" gutterBottom sx={{padding: '1rem 3rem'}}><Link to='/admin/getorders'>Orders</Link></Typography>
            </Grid>
            <Grid item xs = {3}>
              <Typography variant="h3" gutterBottom sx={{padding: '1rem 3rem'}}><Link to='/admin/newproduct'>Add Product</Link></Typography>
            </Grid>
            <Grid item xs = {3}>
              <Typography variant="h3" gutterBottom sx={{padding: '1rem 3rem'}}><Link onClick={logoutHandler}>Logout</Link></Typography>
            </Grid>
          </Grid>
    <Grid container direction={'column'} gap={5} sx={{margin:'0rem 2rem'}}>
      <Grid item xs={4} sm={12} lg={12}>
        <Box sx={{textAlign: 'left'}}><Typography fontWeight={600} color={'#3CDFFF'} fontSize={'1.4rem'} variant="body1" component="span" sx={{ borderColor:'blue',border:'solid 4px blue', padding:'12px'}}>YOUR ORDERS</Typography> </Box>
      </Grid>
      <Grid item>
        <Grid container direction={'column'} spacing={2} margin={'4px 2rem'} display={'flex'} width={'auto'} justifyContent={'flex-start'}>
        {loaded && orderData.map((orders)=>{return(<OrderItemAdmin uid={orders.user_id} items = {orders.order_items} status={orders.status} totalPrice={orders.total} key={orders.id} id = {orders.order_id} date={orders.date}/> )}) }
        </Grid>

      </Grid>
    </Grid>
    </Container>
  )
}

    

export default AdminOrdersPage;