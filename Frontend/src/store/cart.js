import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";


const initialState = {
  totalItems: 0,
  items: [],
};



const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart(state, action) {
      let fruit = action.payload;
      if (!state.items.find((item) => item.id === fruit.id)) {
        state.items.push({
          id: fruit.id,
          name: fruit.name,
          price: fruit.price,
          quantity: 1,
        });
      } else {
        state.items.find((item) => item.id === fruit.id).quantity += 1;
      }
      state.totalItems += 1;
    },

    removeFromCart(state, action) {
      let fruit = action.payload;
      // console.log("hell")
      state.totalItems = state.totalItems - 1;
      state.items.find((item) => item.id === fruit.id).quantity -= 1;
    },

    replaceCart(state, action) {
      state.totalItems = action.payload.totalItems;
      state.items = action.payload.items;
    }
  },
});

export function removeFromCart(item) {

  return async (dispatch) => {
    dispatch(
      cartActions.removeFromCart({id:item.id,name:item.name})
    );
    
    fetch("http://localhost:8000/api/removefromcart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://localhost:5173",
        "X-Requested-With": "XMLHttpRequest",
        "Authorization": "Bearer " + localStorage.getItem("auth_token"),
      },
      body: JSON.stringify({product_id: item.id}),
      quantity: 1,
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      } else {
        console.log(response);
        
      }
    });
  }
}

export function addToCart(item) {
  return async (dispatch) => {
    axios.post("http://localhost:8000/api/addtocart", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://localhost:5173",
        "X-Requested-With": "XMLHttpRequest",
        "Authorization": "Bearer " + localStorage.getItem("auth_token"),
      },
      product_id: item.id,
      quantity: 1,
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      } else {
        console.log(response);
        dispatch(
          cartActions.addToCart({id:item.id,name:item.name,price:item.price})
        );
      }
    });
  }
}


export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
