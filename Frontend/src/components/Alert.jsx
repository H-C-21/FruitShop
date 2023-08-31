import { Alert, Box } from "@mui/material";

function AlertBox(){

    return(
        <Box sx={{position: "absolute", top: '5rem', right: '1rem'}} >
            <Alert severity="success">Success, Please Check Your Inbox For Verification. Redirecting to Login</Alert>
        </Box>
    )

}

export default AlertBox;