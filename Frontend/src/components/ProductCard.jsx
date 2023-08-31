import { Card, CardActions, CardContent, CardMedia, Container, Grid, Typography, Button, Icon, Stack, IconButton, StepIcon, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { cartActions } from "../store/cart";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../store/cart";
import axios from "axios";
// import {AddIcon} from "@mui/icons-material/Add";

// import { Button } from "bootstrap";




function ProductCard(props){

  let cart = useSelector(state => state.cart.items);

  const dispatch = useDispatch();
  const[item,setItem] = useState(0);
  const navigate = useNavigate();

  useEffect(()=>{
    
    const targetObject = cart.find(obj => obj.id === props.id);
    setItem(targetObject?.quantity || 0)
  },[cart])

  const auth = useSelector(state => state.auth.isAuthenticated)


  function addToCartHandler(){
    if(!localStorage.getItem('auth')){
      navigate('/login')
      return ;
    }
    setItem((curr)=> {return curr+1});
    
    const formdata = {
      product_id: props.id,
      quantity: 1,
    }
    dispatch(
      cartActions.addToCart({id:props.id,name:props.name,price:props.price})
    );

     fetch("http://localhost:8000/api/addtocart", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "https://localhost:5173",
        "X-Requested-With": "XMLHttpRequest",
        "Authorization": "Bearer " + localStorage.getItem("auth_token"),
      },
      body:JSON.stringify(formdata),

    }).then((response) => {
      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      } else {
        console.log(response);
      }
    })
  }

  const removeFromCartState = removeFromCart({id:props.id,name:props.name,price:props.price})

  function removeFromCartHandler(){

    if(item>0){
    setItem((curr)=> {return curr-1});
  
    // const removeFromCartHandler = removeFromCart({id:props.id,name:props.name,price:props.price})
    // dispatch(cartActions.removeFromCart({id:props.id,name:props.name,price:props.price}));
    removeFromCartState(dispatch);
  }
    else{
      setItem(0);
    }
  }

    return(
        <Card sx={{ maxWidth: 325 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image = {props.coverimg}
        sx={{ objectFit: "contain", margin: "0 auto" }}
      />
      <CardContent sx={{padding: '0em auto'}}>
        <Container sx={{margin: '0px auto'}}>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography></Container>
        <Typography variant="body2" color="text.secondary" sx={{whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis'}}>
         {'$'+props.price}
        </Typography>
      </CardContent>
      <CardActions>
        
         {item==0 && <Container><Button variant="contained" onClick={addToCartHandler}>Add To Cart</Button></Container>}
         {item>0 &&  <Stack direction="row" spacing={1} width={'100%'} padding={'0 1rem'} justifyContent={'space-between'}>
      <Button variant="container"  color="warning" onClick={removeFromCartHandler} sx={{backgroundColor: '#CE2029'}}>
        -
      </Button>
      <Box>{item}</Box>
      <Button variant="contained" color="success" onClick={addToCartHandler}>
        +
      </Button>
    </Stack>}
      </CardActions>
    </Card>
    )
}

export default ProductCard;