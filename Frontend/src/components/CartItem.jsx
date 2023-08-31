
import { Box, CardMedia, Grid, Stack, Typography } from '@mui/material';



function CartItem({id,name,image,price,quantity}){
    return(
        <Grid item sx={{margin: "0.5rem auto", padding: "0rem 2rem", minWidth: '35rem', backgroundColor:'white', borderRadius: "1rem"}}>
                    <Grid direction={'row'} spacing={0} justifyContent={'space-around'} container>
                        
                           <Grid item sx={{padding: 0}}> 
                           <CardMedia
                                component="img"
                                alt="green iguana"
                                height="90"
                                image={image}
                                sx={{ objectFit: "contain", paddingRight: "1rem", margin: "0", width: 'auto', marginBottom: '1rem' }} />
                            </Grid>
                        <Grid item>
                        <Box>
                            </Box></Grid>
                    <Grid item sx={{margin: "auto 6px"}}>
                        <Stack direction={'column'} justifyContent={'space-between'}>
                        <Typography gutterBottom variant="h5" component="div">
                        {name}
                        </Typography>
                            <Box>Quantity: {quantity}</Box>
                            <Box>Total Price: {quantity*price} </Box>
                        </Stack>
                        </Grid>
                </Grid>
            </Grid>
    )
}

export default CartItem;