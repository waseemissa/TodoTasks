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
          "Please choose an option in the 'Are you a freelancer?' area, if that doesn't work try another username and email"
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
<div style={{ height: "120vh", backgroundImage: `url(${background})`, marginTop:'-20px'}}>
    <center><h1 style={{fontFamily: "Roboto", color:'#1976d2' }}>Todo Tasks</h1></center>
    <center>
              <Grid item xs
                md={5}
                xs={12}
                style={{
                  border: "1px solid #1976d2",
                  backgroundColor: "white",
                  borderRadius: "35px",
                  marginTop: "20px",
                  marginLeft: "15px",
                  marginRight: "15px",
                  marginBottom: "20px",
                  fontFamily: "Roboto",
                }}
              >
                <h1 style={{ fontFamily: "Roboto" }}>Registration</h1>
                <form onSubmit={handleRegistration}>
                <TextField
                  required
                  id="first_name"
                  type="text"
                  label="First Name"
                  placeholder="John"
                  sx={{ fontFamily: "Roboto" }}
                  style={{ width: "80%", marginTop: '15px' }}
                  inputProps = {{ minLength: "3"}}
                />
                <TextField
                  required
                  id="last_name"
                  type="text"
                  label="Last Name"
                  placeholder="Smith"
                  style={{ width: "80%", marginTop: '15px' }}
                  inputProps = {{ minLength: "3"}}
                />
                <TextField
                  required
                  id="username"
                  type="text"
                  label="Username"
                  placeholder="john.smith"
                  style={{ width: "80%", marginTop: '15px' }}
                  inputProps = {{ minLength: "6"}}
                />
                <TextField
                  required
                  id="email"
                  type="email"
                  label="Email Address"
                  placeholder="someone@example.com "
                  style={{ width: "80%", marginTop: '15px' }}
                />
                <TextField
                  required
                  type="password"
                  id="password"
                  label="Password"
                  placeholder="At least 6 characters"
                  style={{ width: "80%", marginTop: '15px' }}
                  inputProps = {{ minLength: "6"}}
                />
                <TextField
                  required
                  type="password"
                  id="password_confirmation"
                  label="Confirm Password"
                  placeholder="Should match password"
                  style={{ width: "80%", marginTop: '15px' }}
                  inputProps = {{ minLength: "6"}}
                />
                <FormControl component="fieldset" style={{ width: "80%", marginTop: '15px' }}>
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
                  style={{ width: "80%", marginTop: '15px' }}
                  type="submit"
                >
                  Sign Up
                </Button>
                </form>
                <p>
                  Already on Todo Tasks?{" "}
                  <Link component={RouterLink} to="/">
                    Login
                  </Link>{" "}
                </p>
              </Grid>
        </center>
        </div>
  );
}
