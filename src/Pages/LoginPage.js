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
          "Please Check If you're entering the correct email and password!"
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
    <Box sx={{ flexGrow: 1 }}>
      <Grid container style={{ backgroundColor: "#f5f5f5" }}>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          sx={{ textAlign: "center", color: "white" }}
          style={{
            position: "relative",
            height: "100vh",
            backgroundImage: `url(${background})`,
          }}
        >
          <h1 style={{ color: "#1976d2" }}>Todo Tasks</h1>
          <div
            style={{
              marginTop: "35px",
              backgroundColor: "#1976d2",
              borderRadius: "20px",
              marginLeft: "10px",
              maxWidth: "50%",
              float: "left",
              padding: "3px",
            }}
          >
            <p style={{ fontSize: "13pt", fontFamily: "Roboto" }}>
              What is the perfect platform for freelancing?
            </p>
          </div>
          <div
            style={{
              marginTop: "35px",
              backgroundColor: "#1976d2",
              borderRadius: "20px",
              maxWidth: "50%",
              float: "right",
              marginRight: "10px",
              padding: "3px",
            }}
          >
            <p style={{ fontSize: "13pt", fontFamily: "Roboto" }}>
              Todo Tasks is a map for you if you're searching for a freelancer.
            </p>
          </div>
          <div
            style={{
              marginTop: "10px",
              maxWidth: "50%",
              backgroundColor: "#1976d2",
              borderRadius: "20px",
              float: "right",
              marginRight: "10px",
              padding: "3px",
            }}
          >
            <p style={{ fontSize: "13pt", fontFamily: "Roboto" }}>
              And your home if you are a freelancer and you want to work
              comfortably.
            </p>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "0px",
              display: "flex",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <div
              style={{
                flex: "8",
                backgroundColor: "white",
                border: "1px solid #1976d2",
                borderRadius: "20px",
                textAlign: "left",
                margin: "10px",
                paddingLeft: "10px",
                height: "40px",
              }}
            >
              <p style={{ color: "black", fontFamily: "Roboto" }}>
                By Waseem Issa on Behalf of SE Factory
              </p>
            </div>
            <div style={{ flex: "1", marginLeft: "-20px" }}>
              <p
                style={{
                  color: "#1976d2",
                  fontSize: "10pt",
                  marginBottom: "5px",
                  paddingRight: "10px",
                  paddingLeft: "10px",
                }}
              >
                <SendIcon sx={{ width: "35px", height: "35px" }} />
              </p>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6} sx={{ textAlign: "center" }}>
          <Box
            component="form"
            xs={{ marginBottom: "10px" }}
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <center>
              <div
                style={{
                  border: "1px solid #1976d2",
                  backgroundColor: "white",
                  borderRadius: "35px",
                  marginTop: "100px",
                  width: "80%",
                  fontFamily: "Roboto",
                }}
              >
                <h1 style={{ fontFamily: "Roboto" }}>Login</h1>
                <TextField
                  required
                  type="email"
                  id="email"
                  label="Email Address"
                  placeholder="someone@example.com "
                  style={{ width: "80%" }}
                />
                <TextField
                  required
                  type="password"
                  id="password"
                  label="Password"
                  placeholder="your password"
                  style={{ width: "80%" }}
                />
                <Button
                  variant="contained"
                  style={{ width: "80%" }}
                  onClick={handleLogin}
                >
                  Login
                </Button>
                <p>
                  New to Todo Tasks?{" "}
                  <Link component={RouterLink} to="/register">
                    Register.
                  </Link>{" "}
                </p>
              </div>
            </center>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
