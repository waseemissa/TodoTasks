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
import UserExperience from "../Components/UserExperience";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import MainNavigation from "../Components/Layout/MainNavigation";
import { useEffect } from "react";
import { useHistory } from "react-router";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

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

function ExperiencePage() {
  const history = new useHistory();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [experiences, setExperiences] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [start_date, setStartDate] = useState(formatDate(new Date("11-02-2012")));
  const [end_date, setEndDate] = useState(formatDate(new Date()));

  useEffect(() => {
    const is_authenticated = localStorage.getItem("is_authenticated");
    if (is_authenticated === "false") {
      history.push("/");
    }
    getUserExperience();
    getPendingRequests();
    getSuggestions();
  }, []);

  function getUserExperience() {
    getUserExperienceAPI()
      .then((experience_response) => {
        setExperiences(experience_response.jobs);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  async function getUserExperienceAPI() {
    const user_id = localStorage.getItem("id");
    const authorization = localStorage.getItem("token");

    const response = await fetch("https://todotasks.tk/api/auth/user-jobs", {
      method: "POST",
      headers: { accepts: "application/json", Authorization: authorization },
      body: new URLSearchParams({
        user_id: user_id,
      }),
    });

    if (!response.ok) {
      const message = "ERROR OCCURED";
      throw new Error(message);
    }

    const experience_response = await response.json();
    return experience_response;
  }

  function addExperience() {
    addExperienceAPI()
      .then(()=>{
        getUserExperience();
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  async function addExperienceAPI() {
    const position = document.getElementById("position").value;
    const company = document.getElementById("company").value;
    const authorization = localStorage.getItem("token");

    const response = await fetch("https://todotasks.tk/api/auth/add-job", {
      method: "POST",
      headers: { accepts: "application/json", Authorization: authorization },
      body: new URLSearchParams({
        'position': position,
        'company': company,
        'start_date': start_date,
        'end_date': end_date,
      }),
    });

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

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

  const handleStartDateChange = (newValue)=>{
    setStartDate(formatDate(newValue));
  }

  const handleEndDateChange = (newValue)=>{
    setEndDate(formatDate(newValue));
  }

  const handleSave = () => {
    addExperience();
    getUserExperience();
    handleClose();
  };

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
                  Experience
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
                <Box  sx={style} noValidate autoComplete="off">
                  <form onSubmit={handleSave}>
                  <Typography id="title" variant="h6">
                    Add Experience
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column"}}>
                  <LocalizationProvider dateAdapter={DateAdapter}>
                    <InputLabel
                      sx={{ marginTop: "15px" }}
                    >
                      Position
                    </InputLabel>
                    <TextField
                      id="position"
                      variant="outlined"
                      required
                    ></TextField>
                    <InputLabel
                      sx={{ marginTop: "15px" }}
                    >
                      Company
                    </InputLabel>
                    <TextField
                      id="company"
                      variant="outlined"
                      required
                    ></TextField>
                    <InputLabel
                      sx={{ marginTop: "15px" }}
                    >
                      Start Date
                    </InputLabel>
                    <DesktopDatePicker
                    id="start_date"
                    required
                    value={start_date}
                    onChange={handleStartDateChange}
                    maxDate={new Date()}
                    helperText="Please enter start date"
                    renderInput={(params) => <TextField {...params} />}
                    />
                    <InputLabel
                      sx={{ marginTop: "15px" }}
                    >
                      End Date
                    </InputLabel>
                    <DesktopDatePicker
                    required
                    id="end_date"
                    value={end_date}
                    onChange={handleEndDateChange}
                    maxDate={new Date()}
                    helperText="Please enter end date"
                    renderInput={(params) => <TextField {...params} />}
                    />
                    <Button
                      sx={{ marginTop: "15px" }}
                      variant="contained"
                      type="submit"
                    >
                      Save
                    </Button>
                    </LocalizationProvider>
                  </Box>
                  </form>
                </Box>
              </Modal>
              <Stack direction="column" spacing={2}>
                {experiences.map((experience) => (
                  <UserExperience
                    id={experience.id}
                    company={experience.company}
                    position={experience.position}
                    start_date={experience.start_date}
                    end_date={experience.end_date}
                  ></UserExperience>
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

export default ExperiencePage;
