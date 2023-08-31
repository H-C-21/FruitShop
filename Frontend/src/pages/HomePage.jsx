import { Box, Grid } from "@mui/material";
import Carousel from "react-multi-carousel";
import ProductCard from "../components/ProductCard";
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart";
import axios from "axios";


function HomePage() {

  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const getProducts = async () => {
    axios.get("http://localhost:8000/api/productsall", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://localhost:5173",
        'X-Requested-With': 'XMLHttpRequest',
      },
    }).then(async (response) => {
      setProducts(response.data.products);
      console.log(response)
    });
  }

  useEffect(() => {
    getProducts();
    setLoaded(true);
  }, []);

  useEffect(() => {
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

        if (response.status !== 200) {
          throw new Error("Could not fetch cart data!");
        } else {

          // const cart = JSON.parse(response.data.items);

          let cart = response.data
          let cartItems = []
          let totalItems = 0;
          for (let i = 0; i < cart[0].length; i++) {


            cartItems[i] = {
              id: cart[0][i][0].product_id,
              name: cart[0][i][0].name,
              price: cart[0][i][0].price,
              quantity: cart[0][i].quantity,
            }
            totalItems += cart[0][i].quantity
          }

          dispatch(cartActions.replaceCart({
            items: cartItems || [],
            totalItems: totalItems,
          }));
        }
      });
  }, [])



  return (
    <Fragment>
      <Box sx={{ flexGrow: 1, marginBottom: "4rem" }}></Box>
      <Grid container spacing={2}>
        {loaded && products.map((product) => {
          return (
            <Grid item xs={4} md={2} key={product.product_id}>
              <ProductCard key={product.product_id} id={product.product_id} price={product.price} name={product.name} desc={product.description}
                coverimg={product.image1} />
            </Grid>
          );
        })
        }
      </Grid>
    </Fragment>
  );
}


export function loader(){
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

    if (response.status !== 200) {
      throw new Error("Could not fetch cart data!");
    } else {

      // const cart = JSON.parse(response.data.items);

      let cart = response.data
      let cartItems = []
      let totalItems = 0;
      for (let i = 0; i < cart[0].length; i++) {
        cartItems[i] = {
          id: cart[0][i][0].product_id,
          name: cart[0][i][0].name,
          price: cart[0][i][0].price,
          quantity: cart[0][i].quantity,
        }
        totalItems += cart[0][i].quantity
      }
      return cartItems;
  }
})
}

export default HomePage;
