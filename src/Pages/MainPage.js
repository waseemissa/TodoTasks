import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Suggestion from "../Components/Suggestion";
import Pending from "../Components/Pending";
import Typography from "@mui/material/Typography";
import UserCard from "../Components/UserCard";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import MainNavigation from "../Components/Layout/MainNavigation";
import { useState } from "react";
import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import ClassIcon from "@mui/icons-material/Class";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useHistory } from "react-router";

import Avatar from "@mui/material/Avatar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #1976d2",
  borderRadius: "35px",
  boxShadow: 24,
  p: 4,
};

function MainPage() {
  const history = new useHistory();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [profession, setProfession] = useState(
    localStorage.getItem("profession")
  );
  const [bio, setBio] = useState(localStorage.getItem("bio"));
  const [phone_number, setPhoneNumber] = useState(
    localStorage.getItem("phone_number")
  );
  const email = localStorage.getItem("email");
  const [pendingRequests, setPendingRequests] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const handleEditBio = (e) => {
    if(e.target.value=="" || e.target.value=="Tell the world about yourself" ){
      setBio("");
      localStorage.setItem("bio", "Tell the world about yourself");
      document.getElementById("bio_p").innerHTML = "Tell the world about yourself";
    }
    else{
    setBio(e.target.value);
    document.getElementById("bio_p").innerHTML =
      e.target.value;
    localStorage.setItem("bio", e.target.value);
    }
  };

  const handleEditProfession = (e) => {
    if(e.target.value=="" || e.target.value=="Add your profession" ){
      setProfession("");
      localStorage.setItem("profession", "");
      document.getElementById("profession_p").innerHTML ="Add your profession";
    }
    else{
      setProfession(e.target.value);
      document.getElementById("profession_p").innerHTML =
        e.target.value;
      document.getElementById("profession_p_card").innerHTML =
        e.target.value;
      localStorage.setItem("profession", e.target.value);
    }
  };

  const handleEditPhoneNumber = (e) => {
    if(e.target.value=="" || e.target.value=="Add your phone number" ){
      setPhoneNumber("");
      localStorage.setItem("phone_number", "Add your phone number");
      document.getElementById("phone_p").innerHTML = "Add your phone number";
    }
    else{
      setPhoneNumber(e.target.value);
      document.getElementById("phone_p").innerHTML =
      e.target.value;
      localStorage.setItem("phone_number", e.target.value);
    }
  };

  const handleEdit = () => {
    handleClose();
    editProfile();
  };

  useEffect(() => {
    const is_authenticated = localStorage.getItem("is_authenticated");
    if (is_authenticated === "false") {
      history.push("/");
    }
    if(localStorage.getItem("bio")=="null"){
      setBio("Tell The world about yourself");
    }
    else{
      setBio(localStorage.getItem("bio"));
    }
    if(localStorage.getItem("phone_number")=="null"){
      setPhoneNumber("Add your phone number");
    }
    else{
      setPhoneNumber(localStorage.getItem("phone_number"))
    }
    if(localStorage.getItem("bio")=="null"){
      setProfession("Add your profession");
    }
    else{
      setProfession(localStorage.getItem("profession"));
    }
    getPendingRequests();
    getSuggestions();
  }, []);

  function editProfile() {
    editProfileAPI()
      .then()
      .catch((error) => {
        console.log(error.message);
      });
  }

  async function editProfileAPI() {
    const authorization = localStorage.getItem("token");

    const response = await fetch("https://todotasks.tk/api/auth/edit-profile", {
      method: "POST",
      headers: { accepts: "application/json", Authorization: authorization },
      body: new URLSearchParams({
        'bio': bio,
        'profession': profession,
        'phone_number': phone_number,
      }),
    });

    if (!response.ok) {
      const message = "ERROR OCCURED";
      throw new Error(message);
    }

    const edit_response = await response.json();
    return edit_response;
  }

  //pending Requests
  function getPendingRequests() {
    getPendingRequestsAPI()
      .then((pending_response) => {
        setPendingRequests(pending_response.pending_connections);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  async function getPendingRequestsAPI() {
    const authorization = localStorage.getItem("token");

    const response = await fetch(
      "https://todotasks.tk/api/auth/get-pending-requests",
      {
        method: "GET",
        headers: { accepts: "application/json", Authorization: authorization },
      }
    );

    if (!response.ok) {
      const message = "ERROR OCCURED";
      throw new Error(message);
    }

    const pending_response = await response.json();
    return pending_response;
  }

  //Suggestions
  function getSuggestions() {
    getSuggestionsAPI()
      .then((suggestions_response) => {
        setSuggestions(suggestions_response.suggestions);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  async function getSuggestionsAPI() {
    const authorization = localStorage.getItem("token");

    const response = await fetch(
      "https://todotasks.tk/api/auth/get-suggestions",
      {
        method: "GET",
        headers: { accepts: "application/json", Authorization: authorization },
      }
    );

    if (!response.ok) {
      const message = "ERROR OCCURED";
      throw new Error(message);
    }

    const suggestions_response = await response.json();
    return suggestions_response;
  }

  return (
    <div style={{ height: "100vh", backgroundColor: "#f5f5f5" }}>
      <MainNavigation />
      <Grid container sx={{ paddingTop: "20px", backgroundColor: "#f5f5f5" }}>
        <Grid item xs={12} md={3} sm={3}>
          <UserCard></UserCard>
        </Grid>
        <Grid item xs={12} md={6} sm={6}>
          <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
              <Box
                sx={{
                  height: "30px",
                  display: "flex",
                  flexDirection: "row",
                  paddingBottom: "0px",
                  marginBottom: "15px",
                }}
              >
                <Typography
                  sx={{ mt: 4, mb: 2 }}
                  variant="h5"
                  color="black"
                  sx={{ maxWidth: "900px", fontFamily: "Roboto" }}
                >
                  Contact Info
                </Typography>
                <IconButton
                  onClick={handleOpen}
                  color="primary"
                  aria-label="Edit"
                  component="span"
                  sx={{ alignSelf: "center" }}
                >
                  <EditIcon />
                </IconButton>
              </Box>
              <Modal open={open} onClose={handleClose} aria-labelledby="title">
                <Box sx={style} noValidate autoComplete="off">
                  <form onSubmit={handleEdit}>
                  <Typography id="title" variant="h6">
                    Edit Info
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <TextField
                      sx={{ marginTop: "15px" }}
                      id="profession"
                      label="Profession"
                      variant="outlined"
                      value={profession}
                      onChange={handleEditProfession}
                    ></TextField>
                    <TextField
                      sx={{ marginTop: "15px" }}
                      id="phone_number"
                      label="Phone Number"
                      variant="outlined"
                      value={phone_number}
                      onChange={handleEditPhoneNumber}
                    ></TextField>
                    <TextField
                      sx={{ marginTop: "15px" }}
                      id="bio"
                      label="Bio"
                      variant="outlined"
                      value={bio}
                      multiline
                      onChange={handleEditBio}
                    ></TextField>
                    <Button
                      sx={{ marginTop: "15px" }}
                      variant="contained"
                      type="submit"
                    >
                      Save
                    </Button>
                  </Box>
                  </form>
                </Box>
              </Modal>
              <Stack direction="column" spacing={2}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "10px",
                  }}
                >
                  <CardHeader
                    sx={{ flex: "5" }}
                    avatar={
                      <Avatar
                        sx={{ bgcolor: "primary.dark" }}
                        aria-label="Bio"
                      >
                        <InfoIcon />
                      </Avatar>
                    }
                    title={
                      <Typography>
                        <h3>Bio</h3>
                        <p
                          id="bio_p"
                          style={{ marginTop: "-20px", fontFamily: "roboto" }}
                        >
                          {bio}
                        </p>
                      </Typography>
                    }
                  />
                </Card>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "10px",
                  }}
                >
                  <CardHeader
                    sx={{ flex: "5" }}
                    avatar={
                      <Avatar
                        sx={{ bgcolor: "primary.dark" }}
                        aria-label="Profession"
                      >
                        <ClassIcon />
                      </Avatar>
                    }
                    title={
                      <Typography>
                        <h3>Profession</h3>
                        <p
                          id="profession_p"
                          style={{ marginTop: "-20px", fontFamily: "Roboto" }}
                        >
                          {profession}
                        </p>
                      </Typography>
                    }
                  />
                </Card>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "10px",
                  }}
                >
                  <CardHeader
                    sx={{ flex: "5" }}
                    avatar={
                      <Avatar
                        sx={{ bgcolor: "primary.dark" }}
                        aria-label="E-mail Address"
                      >
                        <EmailIcon />
                      </Avatar>
                    }
                    title={
                      <Typography>
                        <h3>E-mail Address</h3>
                        <p style={{ marginTop: "-20px", fontFamily: "roboto" }}>
                          {email}
                        </p>
                      </Typography>
                    }
                  />
                </Card>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "10px",
                  }}
                >
                  <CardHeader
                    sx={{ flex: "5" }}
                    avatar={
                      <Avatar
                        sx={{ bgcolor: "primary.dark" }}
                        aria-label="Phone Number"
                      >
                        <LocalPhoneIcon />
                      </Avatar>
                    }
                    title={
                      <Typography>
                        <h3>Phone Number</h3>
                        <p
                          id="phone_p"
                          style={{ marginTop: "-20px", fontFamily: "roboto" }}
                        >
                          {phone_number}
                        </p>
                      </Typography>
                    }
                  />
                </Card>
              </Stack>
            </Container>
          </React.Fragment>
        </Grid>
        <Grid item xs={12} md={3} sm={3}>
          <Grid item>
            <React.Fragment>
              <CssBaseline />
              <Container maxWidth="lg">
                <Box sx={{ height: "30px", marginBottom: "15px" }}>
                  <Typography
                    variant="h5"
                    color="black"
                    sx={{ maxWidth: "900px", fontFamily: "Roboto" }}
                  >
                    Pending Requests
                  </Typography>
                </Box>
                <Stack direction="column" spacing={2}>
                  {pendingRequests.length==0?
                  <h4 style={{color: "#1976d2" }}>No Requests</h4>
                  :
                  pendingRequests.map((pendingRequest) => (
                    <Pending
                      id={pendingRequest.info.id}
                      username={pendingRequest.info.username}
                      name={
                        pendingRequest.info.first_name +
                        " " +
                        pendingRequest.info.last_name
                      }
                      picture={pendingRequest.picture[0].picture_url}
                      profession={pendingRequest.info.profession}
                      email={pendingRequest.info.email}
                      bio={pendingRequest.info.bio}
                      phone_number={pendingRequest.info.phone_number}
                    ></Pending>
                  ))}
                </Stack>
              </Container>
            </React.Fragment>
          </Grid>
          <Grid item>
            <React.Fragment>
              <CssBaseline />
              <Container maxWidth="lg">
                <Box sx={{ height: "30px", marginBottom: "15px" }}>
                  <Typography
                    sx={{ mt: 4, mb: 2 }}
                    variant="h5"
                    color="black"
                    sx={{ maxWidth: "900px", fontFamily: "Roboto" }}
                  >
                    Suggestions
                  </Typography>
                </Box>
                <Stack direction="column" spacing={2}>
                  {suggestions.length==0?
                  <h4 style={{color: "#1976d2" }}>No Suggestions</h4>
                  :
                  suggestions.map((suggestion) => (
                    <Suggestion
                      id={suggestion.info.id}
                      username={suggestion.info.username}
                      name={
                        suggestion.info.first_name +
                        " " +
                        suggestion.info.last_name
                      }
                      picture={suggestion.picture[0].picture_url}
                      profession={suggestion.info.profession}
                      email={suggestion.info.email}
                      bio={suggestion.info.bio}
                      phone_number={suggestion.info.phone_number}
                    ></Suggestion>
                  ))}
                </Stack>
              </Container>
            </React.Fragment>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default MainPage;
