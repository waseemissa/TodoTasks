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
import { useState } from "react";
import MainNavigation from "../Components/Layout/MainNavigation";
import { useEffect } from "react";
import Blocked from "../Components/Blocked";
import { useHistory } from "react-router";

function BlockedContacts() {
  const history = new useHistory();
  const [blockedContacts, setBlockedContacts] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const is_authenticated = localStorage.getItem("is_authenticated");
    if (is_authenticated === "false") {
      history.push("/");
    }
    getPendingRequests();
    getSuggestions();
    getBlockedContacts();
  }, []);

  function getBlockedContacts() {
    getBlockedContactsAPI()
      .then((blocked_response) => {
        setBlockedContacts(blocked_response.blocked_contacts);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  async function getBlockedContactsAPI() {
    const authorization = localStorage.getItem("token");

    const response = await fetch(
      "https://todotasks.tk/api/auth/get-blocked-contacts",
      {
        method: "GET",
        headers: { accepts: "application/json", Authorization: authorization },
      }
    );

    if (!response.ok) {
      const message = "ERROR OCCURED";
      throw new Error(message);
    }

    const blocked_response = await response.json();
    return blocked_response;
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
                  Blocked Contacts
                </Typography>
              </Box>

              <Stack id="connections" direction="column" spacing={2}>
                {blockedContacts.length==0?
                <h4 style={{color: "#1976d2" }}>People you blocked appear here</h4>
                :
                blockedContacts.map((contact) => (
                  <Blocked
                    id={contact.info.id}
                    name={
                      contact.info.first_name + " " + contact.info.last_name
                    }
                    picture={contact.picture[0].picture_url}
                  ></Blocked>
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

export default BlockedContacts;
