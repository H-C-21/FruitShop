import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import OrderItem from "../components/OrderItem";



function OrdersPage() {

  const [orderData,setOrderData] = useState([]);
  const [loaded,setLoaded] = useState(false);


  async function getOrders(){
    let response = await fetch("http://localhost:8000/api/myorders",{
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

      fetch("http://localhost:8000/api/myorders",{
        headers:{
             "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://localhost:5173",
            "X-Requested-With": "XMLHttpRequest",
            "Authorization": "Bearer " + localStorage.getItem("auth_token"),        
        }
      }).then((response)=>{

        response.json().then((data)=>{
          console.log(data)
          setOrderData(data.orders)
          console.log(orderData)
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
    <Grid container direction={'column'} gap={5} sx={{margin:'8rem 3rem'}}>
      <Grid item xs={4} sm={12} lg={12}>
        <Box sx={{textAlign: 'left'}}><Typography fontWeight={600} color={'#3CDFFF'} fontSize={'1.4rem'} variant="body1" component="span" sx={{ borderColor:'blue',border:'solid 4px blue', padding:'12px'}}>YOUR ORDERS</Typography> </Box>
      </Grid>
      <Grid item>
        <Grid container direction={'column'} spacing={2} margin={'4px 2rem'} display={'flex'} width={'auto'} justifyContent={'flex-start'}>
        {loaded && orderData.map((orders)=>{return(<OrderItem items = {orders.order_items} status={orders.status} totalPrice={orders.total} key={orders.id} id = {orders.order_id} date={orders.date}/> )}) }
        </Grid>

      </Grid>
    </Grid>
    </Container>
  )
}

export function loader(){
    async function getOrders(){
    let response = await fetch("http://localhost:8000/api/myorders",{
        headers:{
             "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://localhost:5173",
            "X-Requested-With": "XMLHttpRequest",
            "Authorization": "Bearer " + localStorage.getItem("auth_token"),        
        }
    })
        return response;
    }

    return 1;
}
    

export default OrdersPage;