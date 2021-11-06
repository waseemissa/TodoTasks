import * as React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import background from "../Images/bg.jpg";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Link from "@mui/material/Link";
import { Link as RouterLink} from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router-dom";


export default function RegisterPage() {
  const history = useHistory();

  const [is_freelancer, setIsFreelancer] = useState("");

  const handleChange = (event) => {
    setIsFreelancer(event.target.value);
  };

  function register() {
    registerAPI()
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        console.log(error.message);
        alert(
          "Registration fail, you should:\nFill all the fields \nBe at least 18 years old\nHave a unique email and username\nProvide a confirmed password of at least 6 characters"
        );
      });
  }

  async function registerAPI() {
    const first_name = document.getElementById("first_name").value;
    const last_name = document.getElementById("last_name").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const password_confirmation = document.getElementById("password_confirmation").value;

    const response = await fetch("https://todotasks.tk/api/register", {
      method: "POST",
      body: new URLSearchParams({
        first_name: first_name,
        last_name: last_name,
        username: username,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
        is_freelancer: is_freelancer,
      }),
    });

    if (!response.ok) {
      const message = "ERROR OCCURED";
      throw new Error(message);
    }

    const register_response = await response.json();
    return register_response;
  }

  const handleRegistration = async (e) => {
    e.preventDefault();
    register();
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
            height: "680px",
            backgroundImage: `url(${background})`,
          }}
        >
          <h1 style={{ color: "#1976d2", fontFamily: "Roboto" }}>Todo Tasks</h1>
          <div
            style={{
              marginTop: "35px",
              backgroundColor: "#1976d2",
              borderRadius: "20px",
              maxWidth: "50%",
              float: "left",
              marginLeft: "10px",
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
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <center>
              <div
                style={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  border: "1px solid #1976d2",
                  backgroundColor: "white",
                  borderRadius: "35px",
                  width: "80%",
                  fontFamily: "Roboto",
                }}
              >
                <h1 style={{ fontFamily: "Roboto" }}>Registration</h1>
                <TextField
                  required
                  id="first_name"
                  type="text"
                  label="First Name"
                  placeholder="John"
                  sx={{ fontFamily: "Roboto" }}
                  style={{ width: "80%" }}
                />
                <TextField
                  required
                  id="last_name"
                  type="text"
                  label="Last Name"
                  placeholder="Smith"
                  style={{ width: "80%" }}
                />
                <TextField
                  required
                  id="username"
                  type="text"
                  label="Username"
                  placeholder="john.smith"
                  style={{ width: "80%" }}
                />
                <TextField
                  required
                  id="email"
                  type="email"
                  label="Email Address"
                  placeholder="someone@example.com "
                  style={{ width: "80%" }}
                />
                <TextField
                  required
                  type="password"
                  id="password"
                  label="Password"
                  placeholder="At least 6 characters"
                  style={{ width: "80%" }}
                />
                <TextField
                  required
                  type="password"
                  id="password_confirmation"
                  label="Confirm Password"
                  placeholder="Should match password"
                  style={{ width: "80%" }}
                />
                <FormControl component="fieldset" sx={{ width: "80%" }}>
                  <FormLabel component="legend">
                    Are you a freelancer?
                  </FormLabel>
                  <RadioGroup
                    required
                    aria-label="is_freelancer"
                    name="radio-buttons-group"
                    id="is_freelancer"
                    value={is_freelancer}
                    onChange={handleChange}
                    sx={{ display: "flex", flexDirection: "row" }}
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
                <Button
                  variant="contained"
                  style={{ width: "80%" }}
                  type="submit"
                  onClick={handleRegistration}
                >
                  Sign Up
                </Button>
                <p>
                  Already on Todo Tasks?{" "}
                  <Link component={RouterLink} to="/">
                    Login.
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
