import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

let status = false

if(localStorage.getItem('auth')){
  status = localStorage.getItem('auth');
}

const initialAuthState = {
  isAuthenticated: status,
  auth_token: localStorage.getItem('auth_token'),
  role: localStorage.getItem('role')

};

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {

      state.isAuthenticated = true;
      localStorage.setItem('auth_token',action.payload.accessToken);
      localStorage.setItem('auth', 'true');
      localStorage.setItem('role', action.payload.user);
      state.role = action.payload.user;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.role = null;
      localStorage.removeItem('auth_token');
      localStorage.removeItem('role');
      localStorage.removeItem('auth');
    },

  },
});


export const logoutHandler = () =>{
  return (dispatch) => {
  let token = localStorage.getItem('auth_token');
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  axios.post('http://localhost:8000/logout',{
    headers: {
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:5173",
      'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true
  }).then((res)=>{
    console.log(res);
    dispatch(authActions.logout())
    window.location.reload()
  })
  }  
}

export const authActions = authSlice.actions;

export default authSlice.reducer;