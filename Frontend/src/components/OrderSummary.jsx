import React from "react";
// import { makeStyles } from "@material-ui/core/styles";


import classes from './OrderSummary.module.css'
import { Button, Card, CardActions, CardContent, CircularProgress, Grid, Typography } from "@mui/material";

export default function OrderSummaryItem({tprice,placeOrder}) {
//   const classes = useStyles();

  return (
    <Card elevation={15}>
      <CardContent>

        <Typography variant="div" component="h2" sx={{textAlign:'left'}}>
          Order Summary
        </Typography>
        <Typography variant="subtitle2">
          <hr />
        </Typography>
        <Grid container sx={{padding: '4px 6px'}}>
        <Grid item xs={9} sm={9} lg={9}>
            <Typography variant="body1" component="div" sx={{textAlign:'left'}}>
              Price
            </Typography>
          </Grid>
          <Grid item xs={3} sm={3}  lg={3}>
            <Typography variant="h6" component="div">
              ${tprice}
            </Typography>
          </Grid>
          <Grid item xs={9} sm={9} lg={9}>
            <Typography variant="body1" component="div" sx={{textAlign:'left'}}>
              Shipping
            </Typography>
          </Grid>
          <Grid item xs={3} sm={3} lg={3}>
            <Typography variant="h6" component="div" className={classes.pricetag}>
              0
            </Typography>
          </Grid>
          <Grid item xs={9} sm={9}  lg={9}>
            <Typography variant="body1" component="div" sx={{textAlign:'left'}}>
              Total
            </Typography>
          </Grid>
          <Grid item xs={3} sm={3} lg={3}>
            <Typography variant="h6" component="div">
             ${tprice}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions sx={{justifyContent:'flex-end'}}>
        <Button size="large" color="secondary" variant="contained" onClick={placeOrder}>
          BUY
        </Button>
      </CardActions>
    </Card>
  );
}