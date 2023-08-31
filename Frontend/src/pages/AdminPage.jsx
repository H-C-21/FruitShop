import { useState } from "react";
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Box, Button, Container, Dialog, DialogTitle, InputAdornment, MenuItem } from "@mui/material";

import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { logoutHandler } from "../store/auth";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";



function AdminPage(){


    const [isNumberValid,setIsNumberValid] = useState(true);
    const [open,setOpen] = useState(false)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const mode = [
        {
          value: 'Fruit',
          label: 'Fruit',
        },
        {
          value: 'Vegetable',
          label: 'Vegetable',
        }
      ];

      function ValidateRegistration(num){

      if (/^[A-Z]+$/.test(num)){
          setIsNumberValid(true)
          return (true)
        }
          setIsNumberValid(false)
          return (false)
      }

    //   function ValidateEmail(mail){
    //       if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
    //           setIsEmailValid(true)
    //           return (true)
    //         }
    //         setIsEmailValid(false)
    //           return (false)
    //       }

    // function submitHandler(event){
    //   event.preventDefault();
    //   setOpen(true)
    //   if(isEmailValid && isNumberValid){
        
    //   }
    // }

    function logoutHandler(){
      dispatch(authActions.logout());
      navigate('/')
    }

    function close(){
      setOpen(false);
    }

    function closeHandler(event){
      setOpen(false);
      event.preventDefault();
      const data = new FormData(event.target);
      
          const formdata = {
            ProductName: data.get('name'),
            image1: data.get('vehicle'),
            image2: data.get('issue'),
            price: data.get('fee'),
            category: 'Fruit',
            description: data.get('comments')
          }
      fetch("http://localhost:8000/api/admin/addproduct",{
        method: "POST",
        headers:{
          "Content-Type": "application/json",
         "Access-Control-Allow-Origin": "https://localhost:5173",
         "X-Requested-With": "XMLHttpRequest",
         "Authorization": "Bearer " + localStorage.getItem("auth_token"),        
       },
        body: JSON.stringify(formdata)
      }).then((response)=>{
        if(response.status == 200){
          setOpen("Product Added Successfully! Redirecting to DashBoard!")
        }else{
          setOpen("Error Please Try Again")
        }
      })
    }

    return(
        <React.Fragment>
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
        <Container sx={{mt: '1rem', padding: '1rem 3rem'}}>
        <Box sx={{padding: '2rem 4rem', border: '1px solid black', backgroundColor: 'white'}}>
            <Typography variant="h4" gutterBottom sx={{paddingBottom:'18px'}}>
                Add New Item.
            </Typography>

        <form onSubmit={closeHandler}>    
        <Grid container spacing={4}>
            
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Name"
            name="name"
            label="Product Name"
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
      

        <Grid item xs={12} sm={6}>
            <TextField
             id="lead"
             select
             label="Select"
             defaultValue="Fruit"
             fullWidth
            >
            {mode.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </Grid>

   

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="vehicle"
            name="vehicle"
            label="Image 1 Url"
            fullWidth
          />
        </Grid>
       
        <Grid item xs={12} sm={6}>
          <TextField
            id="issue"
            name="issue"
            label="Image 2 Url"
            fullWidth
          />
        </Grid>

       

        <Grid item xs={12} sm={6}>
          <TextField
            type="number"
            id="fee"
            name="fee"
            label="Price"
            fullWidth 
            InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="comments"
            name="comments"
            label="Description"
            fullWidth
            multiline
            minRows={6}
          />
        </Grid>

        <Grid item xs={12} sx={{display: 'flex', justifyContent: "flex-end"}}>
        <Button color="secondary" type="submit" variant="contained" sx={{height:'3.4rem', width: '8rem', margin: '10px'}}>Add Product.</Button>
        </Grid>
        </Grid>
      </form>
              
        </Box>
      
        
      </Container>

       
      <Dialog
        onClose={closeHandler}
        open={open}
        aria-labelledby="alert-dialog-title"
      >
       {isNumberValid && <DialogTitle id="alert-dialog-title" sx={{padding: '2rem', color: '#4caf50'}}>
         {open}
        </DialogTitle> }

        <Button  sx={{padding: '0px 8px'}} onClick={close}>Close</Button>
         </Dialog>
         </React.Fragment> 
    )
}

export default AdminPage;

