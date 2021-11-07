import * as React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import background from "../Images/bg.jpg";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";


export default function LoginPage() {
  const history = useHistory();

  useEffect(() => {
    const is_authenticated = localStorage.getItem("is_authenticated");
    if (is_authenticated === "true") {
      history.push("/projects");
    } else {
      localStorage.setItem("is_authenticated", "false");
    }
  }, []);

  function login() {
    loginAPI()
      .then((login_response) => {
        localStorage.setItem("token", "bearer " + login_response.access_token);
        localStorage.setItem("id", login_response.user.id);
        localStorage.setItem(
          "full_name",
          login_response.user.first_name + " " + login_response.user.last_name
        );
        localStorage.setItem("username", login_response.user.username);
        localStorage.setItem("email", login_response.user.email);
        localStorage.setItem("phone_number", login_response.user.phone_number);
        localStorage.setItem(
          "profile_picture",
          login_response.picture[0].picture_url
        );
        localStorage.setItem("profession", login_response.user.profession);
        localStorage.setItem("bio", login_response.user.bio);
        localStorage.setItem("is_authenticated", "true");
        history.push("/projects");
      })
      .catch((error) => {
        alert(
          "Please check your credentials!"
        );
        console.log(error);
      });
  }

  async function loginAPI() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const token = localStorage.getItem("device_token");

    const response = await fetch("https://todotasks.tk/api/login", {
      method: "POST",
      body: new URLSearchParams({
        email: email,
        password: password,
        token: token,
      }),
    });

    if (!response.ok) {
      const message = "ERROR OCCURED";
      throw new Error(message);
    }

    const login_response = await response.json();
    return login_response;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    login();
  };
  return (
    <div style={{ height: "100vh", backgroundImage: `url(${background})`, marginTop:'-20px'}}>
    <center><h1 style={{fontFamily: "Roboto", color:'#1976d2' }}>Todo Tasks</h1></center>
    <center>
              <Grid item xs
                md={5}
                xs={12}
                style={{
                  border: "1px solid #1976d2",
                  backgroundColor: "white",
                  borderRadius: "35px",
                  marginTop: "100px",
                  marginLeft: "15px",
                  marginRight: "15px",
                  fontFamily: "Roboto",
                }}
              >
                <h1 style={{ fontFamily: "Roboto" }}>Login</h1>
                <form onSubmit={handleLogin}>
                <TextField
                  required
                  type="email"
                  id="email"
                  label="Email Address"
                  placeholder="someone@example.com "
                  style={{ width: "80%", marginTop: '15px' }}
                />
                <TextField
                  required
                  type="password"
                  id="password"
                  label="Password"
                  placeholder="your password"
                  style={{ width: "80%", marginTop: '15px' }}
                  inputProps = {{ minLength: "6"}}
                />
                <Button
                  variant="contained"
                  style={{ width: "80%", marginTop: '15px' }}
                  type="submit"
                >
                  Login
                </Button>
                </form>
                <p>
                  New to Todo Tasks?{" "}
                  <Link component={RouterLink} to="/register">
                    Register
                  </Link>{" "}
                </p>
              </Grid>
        </center>
        </div>
  );
}
