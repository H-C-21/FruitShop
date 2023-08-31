import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { authActions } from "../store/auth";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import BasicInput from "../components/BasicInput";
import AlertBox from "../components/Alert";

const ValidatePhone = (inp) => {
  const validRegex = /^[0-9]+$/;
  if (inp.match(validRegex)) {
    return true;
  } else return false;
};

function validatePassword(password) {
  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  return pattern.test(password);
}

function ValidateUsername(input) {
  if (input.length > 0) {
    return true;
  } else return false;
}

function ValidateEmail(inp) {
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (inp.match(validRegex)) {
    return true;
  } else {
    return false;
  }
}

function SignupPage() {
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isLastnameValid, setIsLastNameValid] = useState(false);

  const [emailError, setEmailError] = useState("Invalid Email Address");
  const [phoneError, setPhoneError] = useState("Invalid Phone Number");

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const location = useLocation();

  let { error } = location.state || false;

  function submitHandler(event) {
    event.preventDefault();
    if (isUsernameValid && isEmailValid && isPhone && isPasswordValid) {
      const data = new FormData(event.target);
      const formdata = {
        firstname: data.get("fname"),
        lastname: data.get("lname"),
        email: data.get("email"),
        phone: data.get("pno"),
        password: data.get("pass"),
      };

      axios
        .post("http://localhost:8000/register", {
          headers: {
            "Content-Type": "json",
            "Access-Control-Allow-Origin": "http://localhost:5173",
            "X-Requested-With": "XMLHttpRequest",
          },
          ...formdata,
        })
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            setOpen(true);
            setTimeout(() => {
              setOpen(false);
              navigate("/login");
            }, 2500);
          }
        })
        .catch((error) => {
          const errors = error.response.data.errors;
          console.log(errors);
          if ("email" in errors) {
            setIsEmailValid(false);
            setEmailError("Email Already Taken");
          }
          if ("phone" in errors) {
            console.log("lol");
            setIsPhone(false);
            setPhoneError("Phone Number Already Taken");
          }

          setTimeout(() => {
            setPhoneError("Invalid Phone Number");
            setEmailError("Invalid Email Address");
          }, 4500);
        });
    }
  }

  return (
    <Fragment>
      {open && <AlertBox />}
      <Container
        component="main"
        maxWidth="md"
        sx={{ minWidth: "380px", maxWidth: "600px", marginBottom: "2rem" }}
      >
        {error && (
          <Typography component="h1" variant="h4" sx={{ color: "red" }}>
            Register
          </Typography>
        )}
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            // backgroundColor: '#0F1111',
            px: 4,
            py: 2,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{ color: "black", marginBottom: "2rem" }}
          >
            Sign Up
          </Typography>

          <Box noValidate sx={{ mt: 1, width: "100%" }}>
            <form onSubmit={submitHandler}>
              <Grid container spacing={4} justifyContent={"space-between"}>
                <Grid item sm={6}>
                  <BasicInput
                    key="fname"
                    name="fname"
                    type="text"
                    label="First Name"
                    err=""
                    validation={ValidateUsername}
                    valid={setIsUsernameValid}
                    status={isUsernameValid}
                  />
                </Grid>
                <Grid item sm={6}>
                  <BasicInput
                    key="lname"
                    name="lname"
                    type="text"
                    label="Last Name"
                    validation={ValidateUsername}
                    status={isLastnameValid}
                    valid={setIsLastNameValid}
                  />
                </Grid>
              </Grid>
              <BasicInput
                key="pno"
                name="pno"
                type="tel"
                label="Phone_Number"
                err={phoneError}
                validation={ValidatePhone}
                status={isPhone}
                valid={setIsPhone}
              ></BasicInput>
              <BasicInput
                key="email"
                name="email"
                type="email"
                label="E-mail"
                err={emailError}
                validation={ValidateEmail}
                valid={setIsEmailValid}
                status={isEmailValid}
              ></BasicInput>
              <BasicInput
                key="pass"
                type="password"
                name="pass"
                label="Enter Your Password"
                err="Password Must be 6 Character Long, must contain a small and capital letter and digit"
                validation={validatePassword}
                status={isPasswordValid}
                valid={setIsPasswordValid}
              ></BasicInput>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, minWidth: "52px", fontSize: "1.2rem" }}
              >
                Sign Up
              </Button>

              {/*                 
                <Grid container>
                </Grid> */}
            </form>
          </Box>
          <Grid container justifyContent={"flex-end"}>
            <Grid item><Link to = "/login">Already a User? Login</Link></Grid>
            </Grid>
        </Box>
      </Container>
    </Fragment>
  );
}

export default SignupPage;
