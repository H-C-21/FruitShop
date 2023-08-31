
import { Box, CardMedia, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {useState, useEffect} from 'react';
import axios from 'axios';
import CartItem from '../components/CartItem';
import { cartActions } from '../store/cart';
import { authActions, logoutHandler } from '../store/auth';
import OrderSummaryItem from '../components/OrderSummary';
import { useNavigate } from 'react-router-dom';

function CartPage(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loaded,setLoaded] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [placingOrder,setPlacingOrder] = useState(false);
    

    function getCartItem(){
        axios
          .get("http://localhost:8000/api/getcart", {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "https://localhost:5173",
              "X-Requested-With": "XMLHttpRequest",
              "Authorization": "Bearer " + localStorage.getItem("auth_token")
            },
          })
          .then((response) => {
    
            if(response.status === 401) {
              const logout = logoutHandler(dispatch);
              logout();
            }

            if (response.status !== 200) {
              throw new Error("Could not fetch cart data!");
            } else {
    
              let cart = response.data
              let cartItems = []
              let totalItems = 0;
              let totalPrice = 0;

              for (let i = 0; i < cart[0].length; i++) {

                cartItems[i] = {
                  id: cart[0][i][0].product_id,
                  name: cart[0][i][0].name,
                  price: cart[0][i][0].price,
                  quantity: cart[0][i].quantity,
                  image: cart[0][i][0].image1,
                }
                totalItems += cart[0][i].quantity
                totalPrice += cart[0][i].quantity * cart[0][i][0].price
              }
              setTotalPrice(totalPrice);
              setCartItems(cartItems);
              dispatch(cartActions.replaceCart({
                items: cartItems || [],
                totalItems: totalItems,
              }))
              
                console.log(cartItems)
                setLoaded(true);

            }
          });
    }

    function placeOrder(){

      if(cartItems.length != 0){
        setPlacingOrder('Placing Your Order...');
      fetch("http://localhost:8000/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://localhost:5173",
          "X-Requested-With": "XMLHttpRequest",
          "Authorization": "Bearer " + localStorage.getItem("auth_token"),
        },
        body: JSON.stringify({cartItems,totalPrice}),
      }).then((response) => {
        
        if (!response.ok) {
          setPlacingOrder('Your Order Could Not Be Placed, Please Try Again!');
        } else {
          setPlacingOrder('Your Order Has Been Placed!, Redirecting to Home Page...');
          setTimeout(() => {
          navigate('/');
          },2000)
        }
      });
      }
      }

    useEffect(() => {
        getCartItem();
      }, [])
    

    return(
        <div>
          <Grid container direction={'row'}sx={{padding: "1rem 4rem"}} gap={0}>
            <Grid item md={1} xs={false}></Grid>
            <Grid item xs={11} md={7}>
            <Grid container spacing={0} gap={0} direction={'column'}>
                {loaded && cartItems.length>0 && cartItems.map((item) => {
                  return( <CartItem key = {item.id} id={item.id} name={item.name} image={item.image} price={item.price} quantity={item.quantity}/>)
                })}
                {loaded && !cartItems.length && <Typography variant="h5" component="div" sx={{textAlign:'center', padding: '2rem 0'}}>Your cart is empty</Typography>}
                {!loaded && <CircularProgress sx={{margin:'2rem auto'}} />}

                {placingOrder && <Typography variant="h5" component="div" sx={{textAlign:'center', padding: '2rem 0'}}>{placingOrder}{placingOrder==='Placing Your Order...' && <CircularProgress/>}</Typography>}
             
            </Grid>
            </Grid>
            <Grid item md ={3} xs={11} sx={{padding: '1rem 1.2rem'}}>
                <Box>
                  <OrderSummaryItem tprice={totalPrice} placeOrder={placeOrder}/>
                </Box>
            </Grid>
            </Grid>
        </div>
    )
}


export default CartPage;