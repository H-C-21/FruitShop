import { Box, Button, Grid, Stack, Typography } from "@mui/material";

function OrderItemAdmin({ items, totalPrice, status, id,uid, date }) {


    function orderDispatch(){
        fetch('http://localhost:8000/api/admin/setorderstatus',{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "https://localhost:5173",
                "X-Requested-With": "XMLHttpRequest",
                "Authorization": "Bearer " + localStorage.getItem("auth_token"),
             },
                body:JSON.stringify({
                    order_id: id,
                    status: 'Dispatched'
                }),
        })
    }

    return (
        <Grid item sx={{ margin: "0.5rem ", padding: "0rem 2rem", minWidth: '35rem', backgroundColor: 'white', borderRadius: "1rem" }}>
            <Grid direction={'row'} spacing={0} justifyContent={'space-around'} container>

                <Grid item sx={{ padding: 0 }}>
                    <Stack direction={'column'} justifyContent={'space-between'}>
                        <Typography gutterBottom variant="h6" component="div">
                         Order ID: {id}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                         User ID: {uid}
                        </Typography>
                        <Box><Typography gutterBottom variant="h6" component="div">
                         Date: {date.slice(0,10)}
                         <br></br>
                         Time: {date.slice(11,19)}
                        </Typography></Box>
                        
                    </Stack>
                </Grid>
                <Grid item>
                    <Typography gutterBottom variant="h5">Ordered Items</Typography>
                    {items.map((item) => {return (<div key={item.id}>{item.name}= {item.quantity}</div>)})}

                </Grid>
                <Grid item>
                    <Typography gutterBottom variant="h5">Price</Typography>
                    {items.map((item) => {return (<div key={item.id}>{item.price}</div>)})}

                </Grid>

                <Grid item>
                    <Box>
                    </Box></Grid>
                <Grid item sx={{ margin: "0px 6px" }}>
                <Typography gutterBottom variant="h5">Details</Typography>
                    <Stack direction={'column'} justifyContent={'space-between'} sx={{margin:'0px'}}>
                        <Typography gutterBottom variant="h5" component="div">
                            {name}
                        </Typography>
                        <Box>Status: {status}</Box>
                        <Box>Total Price: {totalPrice} </Box>
                    </Stack>
                </Grid>
           
            <Grid item sx={{margin:'auto 0'}}>
                <Button onClick={orderDispatch}>Dispatch Order</Button>
            </Grid>
           
            </Grid>

        </Grid>
    )
}



export default OrderItemAdmin;