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
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -45%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #1976d2",
  borderRadius: "35px",
  boxShadow: 24,
  p: 4,
};

export default function EducationPage() {
  const history = new useHistory();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [degree, setDegree] = useState("");
  const [years, setYears] = useState([]);
  const [year, setYear] = useState("");

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
    populateYears();
  }, []);

  const populateYears = () => {
    const today = new Date();
    const max_year = today.getFullYear();

    const years_select = [];


    for (var i = 1990 ; i <= max_year; i++){
       years_select[i] = i;
    }
    setYears(years_select);

  }

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
    const major = document.getElementById("major").value;
    const university = document.getElementById("university").value;
    const authorization = localStorage.getItem("token");

    const response = await fetch(
      "https://todotasks.tk/api/auth/add-education",
      {
        method: "POST",
        headers: { accepts: "application/json", Authorization: authorization },
        body: new URLSearchParams({
          'degree': degree,
          'major': major,
          'university': university,
          'year': year,
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

  const handleDegreeChange = (event) => {
    setDegree(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  }

  const handleSave = () => {
    addEducation();
    getUserEdcuation();
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
                <Box sx={style} noValidate autoComplete="off">
                  <form onSubmit={handleSave}>
                  <Typography id="title" variant="h6">
                    Add Education
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <InputLabel
                      sx={{ marginTop: "15px" }}
                    >
                      Degree
                    </InputLabel>
                    <Select
                      id="degree"
                      required
                      value={degree}
                      onChange={handleDegreeChange}
                    >                      
                        <MenuItem value="Associate Degree">
                          Associate Degree
                        </MenuItem>
                        <MenuItem value="Bachelor's Degree">
                          Bachelor's Degree
                        </MenuItem>
                        <MenuItem value="Master's Degree">
                          Master's Degree
                        </MenuItem>
                        <MenuItem value="Doctoral Degree">
                          Doctoral Degree
                        </MenuItem>
                    </Select>
                    <InputLabel
                      sx={{ marginTop: "15px" }}
                    >
                      Major
                    </InputLabel>
                    <TextField
                      id="major"
                      required
                      variant="outlined"
                    ></TextField>
                    <InputLabel
                      sx={{ marginTop: "15px" }}
                    >
                      University
                    </InputLabel>
                    <TextField
                      id="university"
                      required
                      variant="outlined"
                    ></TextField>
                    <InputLabel
                      sx={{ marginTop: "15px" }}
                    >
                      Graduation Year
                    </InputLabel>
                    <Select
                      id="year"
                      required
                      value={year}
                      onChange={handleYearChange}
                    >
                      {years.map((year) => (
                        <MenuItem value={year}
                        >{year}</MenuItem>
                      ))}
                    </Select>
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

