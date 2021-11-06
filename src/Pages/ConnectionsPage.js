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
import Connection from "../Components/Connection";
import { useHistory } from "react-router";

function ConnectionsPage() {
  const history = new useHistory();
  const [connections, setConnections] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const is_authenticated = localStorage.getItem("is_authenticated");
    if (is_authenticated === "false") {
      history.push("/");
    }
    getPendingRequests();
    getSuggestions();
    getConnections();
  }, []);

  function getConnections() {
    getConnectionsAPI()
      .then((connections_response) => {
        setConnections(connections_response.connections);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  async function getConnectionsAPI() {
    const authorization = localStorage.getItem("token");

    const response = await fetch(
      "https://todotasks.tk/api/auth/get-connections",
      {
        method: "GET",
        headers: { accepts: "application/json", Authorization: authorization },
      }
    );

    if (!response.ok) {
      const message = "ERROR OCCURED";
      throw new Error(message);
    }

    const connections_response = await response.json();
    return connections_response;
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
                  Connections
                </Typography>
              </Box>

              <Stack id="connections" direction="column" spacing={2}>
                {connections.map((connection) => (
                  <Connection
                    id={connection.info.id}
                    username={connection.info.username}
                    name={
                      connection.info.first_name +
                      " " +
                      connection.info.last_name
                    }
                    picture={connection.picture[0].picture_url}
                    profession={connection.info.profession}
                    email={connection.info.email}
                    bio={connection.info.bio}
                    phone_number={connection.info.phone_number}
                  ></Connection>
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
                      name={
                        pendingRequest.info.first_name +
                        " " +
                        pendingRequest.info.last_name
                      }
                      picture={pendingRequest.picture[0].picture_url}
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

export default ConnectionsPage;
