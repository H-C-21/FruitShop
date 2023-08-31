import { Box, Grid, Stack, Typography } from "@mui/material";

function OrderItem({ items, totalPrice, status, id, date }) {
    return (
        <Grid item sx={{ margin: "0.5rem ", padding: "0rem 2rem", minWidth: '35rem', backgroundColor: 'white', borderRadius: "1rem" }}>
            <Grid direction={'row'} spacing={0} justifyContent={'space-around'} container>

                <Grid item sx={{ padding: 0 }}>
                    <Stack direction={'column'} justifyContent={'space-between'}>
                        <Typography gutterBottom variant="h6" component="div">
                         Order ID: {id}
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
            </Grid>

        </Grid>
    )
}



export default OrderItem;