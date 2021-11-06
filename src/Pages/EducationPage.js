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
import AddCircleIcon from "@mui/icons-material/AddCircle";
import UserEducation from "../Components/UserEducation";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import MainNavigation from "../Components/Layout/MainNavigation";
import { useEffect } from "react";
import { useHistory } from "react-router";

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

function EducationPage() {
  const history = new useHistory();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [educations, setEducations] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const is_authenticated = localStorage.getItem("is_authenticated");
    if (is_authenticated === "false") {
      history.push("/");
    }
    getUserEdcuation();
    getPendingRequests();
    getSuggestions();
  }, []);

  function getUserEdcuation() {
    getUserEdcuationAPI()
      .then((education_response) => {
        setEducations(education_response.education);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  async function getUserEdcuationAPI() {
    const user_id = localStorage.getItem("id");
    const authorization = localStorage.getItem("token");

    const response = await fetch(
      "https://todotasks.tk/api/auth/user-education",
      {
        method: "POST",
        headers: { accepts: "application/json", Authorization: authorization },
        body: new URLSearchParams({
          user_id: user_id,
        }),
      }
    );

    if (!response.ok) {
      const message = "ERROR OCCURED";
      throw new Error(message);
    }

    const education_response = await response.json();
    return education_response;
  }

  function addEducation() {
    addEducationAPI()
      .then(() => {
        getUserEdcuation();
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  async function addEducationAPI() {
    const degree = document.getElementById("degree").value;
    const major = document.getElementById("major").value;
    const university = document.getElementById("university").value;
    const year = document.getElementById("year").value;
    const authorization = localStorage.getItem("token");

    const response = await fetch(
      "https://todotasks.tk/api/auth/add-education",
      {
        method: "POST",
        headers: { accepts: "application/json", Authorization: authorization },
        body: new URLSearchParams({
          degree: degree,
          major: major,
          university: university,
          year: year,
        }),
      }
    );

    if (!response.ok) {
      const message = "ERROR OCCURED";
      throw new Error(message);
    }

    const add_response = await response.json();
    return add_response;
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

  const handleSave = () => {
    addEducation();
    handleClose();
  };

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
                  Education
                </Typography>
                <IconButton
                  onClick={handleOpen}
                  color="primary"
                  aria-label="Add"
                  component="span"
                  sx={{ alignSelf: "center" }}
                >
                  <AddCircleIcon />
                </IconButton>
              </Box>
              <Modal open={open} onClose={handleClose} aria-labelledby="title">
                <Box component="form" sx={style} noValidate autoComplete="off">
                  <Typography id="title" variant="h6">
                    Add Education
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <TextField
                      sx={{ marginTop: "15px" }}
                      id="degree"
                      label="Degree"
                      variant="outlined"
                    ></TextField>
                    <TextField
                      sx={{ marginTop: "15px" }}
                      id="major"
                      label="Major"
                      variant="outlined"
                    ></TextField>
                    <TextField
                      sx={{ marginTop: "15px" }}
                      id="university"
                      label="University"
                      variant="outlined"
                    ></TextField>
                    <TextField
                      sx={{ marginTop: "15px" }}
                      id="year"
                      label="Year"
                      variant="outlined"
                    ></TextField>
                    <Button
                      sx={{ marginTop: "15px" }}
                      variant="contained"
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                  </Box>
                </Box>
              </Modal>
              <Stack direction="column" spacing={2}>
                {educations.map((education) => (
                  <UserEducation
                    id={education.id}
                    degree={education.degree}
                    major={education.major}
                    university={education.university}
                    year={education.year}
                  ></UserEducation>
                ))}
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
                  {pendingRequests.map((pendingRequest) => (
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
              <Container maxWidth="lg" sx={{ paddingTop: "15px" }}>
                <Box sx={{ height: "30px", marginBottom: "15px" }}>
                  <Typography
                    variant="h5"
                    color="black"
                    sx={{ maxWidth: "900px", fontFamily: "Roboto" }}
                  >
                    Suggestions
                  </Typography>
                </Box>
                <Stack direction="column" spacing={2}>
                  {suggestions.map((suggestion) => (
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

export default EducationPage;
