import * as React from "react";
import MainNavigation from "../Components/Layout/MainNavigation";
import Grid from "@mui/material/Grid";
import UserCard from "../Components/UserCard";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useEffect } from "react";
import Pusher from "pusher-js";
import { useHistory } from "react-router";

function MessagesPage() {
  const history = new useHistory();
  const username = localStorage.getItem("full_name");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  let allMessages = [];

  useEffect(() => {
    const is_authenticated = localStorage.getItem("is_authenticated");
    if (is_authenticated === "false") {
      history.push("/");
    }

    Pusher.logToConsole = true;

    const pusher = new Pusher("88b8b9f2f7269cc451cd", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("my-channel");
    channel.bind("message", function (data) {
      allMessages.push(data);
      setMessages(allMessages);
    });
  }, []);

  const submit = async (e) => {
    const authorization = localStorage.getItem("token");
    console.log(username);
    console.log(message);
    await fetch("https://todotasks.tk/api/auth/message", {
      method: "POST",
      headers: { accepts: "application/json", Authorization: authorization },
      body: new URLSearchParams({
        username: username,
        message: message,
      }),
    });
    setMessage("");
  };

  return (
    <div style={{ height: "100vh", backgroundColor: "#f5f5f5" }}>
      <MainNavigation />
      <Grid container sx={{ paddingTop: "20px", backgroundColor: "#f5f5f5" }}>
        <Grid item xs>
          <UserCard></UserCard>
        </Grid>
        <Grid
          item
          xs={12}
          lg={9}
          style={{ position: "relative", height: "680px" }}
        >
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
                  Chit Chat
                </Typography>
              </Box>
              <div
                id="messages_div"
                style={{
                  height: "580px",
                  overflow: "auto",
                  background: "#fff",
                }}
              >
                {messages.map((message) => {
                  return (
                    <div
                      style={{
                        backgroundColor: "#1976d2",
                        inlineSize: "70%",
                        height: "wrap-content",
                        borderRadius: "5px",
                        marginTop: "10px",
                        marginLeft: "30px",
                        color: "white",
                        fontFamily: "Roboto",
                      }}
                    >
                      <h4
                        style={{
                          paddingLeft: "10px",
                          paddingTop: "5px",
                          color: "#000",
                        }}
                      >
                        {message.username}
                      </h4>
                      <p style={{ paddingLeft: "15px" }}>{message.message}</p>
                    </div>
                  );
                })}
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "0px",
                  paddingBottom: "15px",
                  display: "flex",
                  flexDirection: "row",
                  width: "95%",
                  alignItems: "center",
                  gap: "10px",
                  height: "60px",
                  backgroundColor: "#ffffff",
                }}
              >
                <TextField
                  id="outlined-multiline-flexible"
                  label="Send a message"
                  variant="standard"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ width: "89%", marginRight: "120px", left: "10px" }}
                />

                <Button
                  onClick={submit}
                  variant="contained"
                  endIcon={<SendIcon />}
                  style={{
                    flex: "1",
                    height: "40px",
                    position: "absolute",
                    right: "25px",
                    width: "10%",
                    marginLeft: "5px",
                  }}
                >
                  Send
                </Button>
              </div>
            </Container>
          </React.Fragment>
        </Grid>
      </Grid>
    </div>
  );
}

export default MessagesPage;
