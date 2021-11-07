import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";

export default function Pending(props) {
  const handleApproval = () => {
    acceptFollowRequest();
    document.getElementById("pending_" + props.id).style.display = "none";
  };

  const handleRejection = () => {
    deleteFollowRequest();
    document.getElementById("pending_" + props.id).style.display = "none";
  };

  function acceptFollowRequest() {
    acceptFollowRequestAPI()
      .then()
      .catch((error) => {
        console.log(error.message);
      });
  }

  async function acceptFollowRequestAPI() {
    const user2_id = document.getElementById("user2_id").value;
    const authorization = localStorage.getItem("token");

    const response = await fetch(
      "https://todotasks.tk/api/auth/accept-follow-request",
      {
        method: "POST",
        headers: { accepts: "application/json", Authorization: authorization },
        body: new URLSearchParams({
          user2_id: user2_id,
        }),
      }
    );

    if (!response.ok) {
      const message = "ERROR OCCURED";
      throw new Error(message);
    }

    const accept_response = await response.json();
    return accept_response;
  }

  function deleteFollowRequest() {
    deleteFollowRequestAPI()
      .then()
      .catch((error) => {
        console.log(error.message);
      });
  }

  async function deleteFollowRequestAPI() {
    const user2_id = document.getElementById("user2_id").value;
    const authorization = localStorage.getItem("token");

    const response = await fetch(
      "https://todotasks.tk/api/auth/delete-follow-request",
      {
        method: "POST",
        headers: { accepts: "application/json", Authorization: authorization },
        body: new URLSearchParams({
          user2_id: user2_id,
        }),
      }
    );

    if (!response.ok) {
      const message = "ERROR OCCURED";
      throw new Error(message);
    }

    const delete_response = await response.json();
    return delete_response;
  }

  return (
    <Card
      id={"pending_" + props.id}
      sx={{ display: "flex", flexDirection: "row", paddingTop: "5px" }}
    >
      <CardHeader
        sx={{ flex: "10" }}
        style={{ fontFamily: "Roboto" }}
        avatar={
          <Avatar
            aria-label="profile picture"
            src={props.picture}
          ></Avatar>
        }
        title={
          <Typography>
            <h4>
            {props.name}
            </h4>
          </Typography>
        }
      />
      <button hidden id="user2_id" value={props.id}></button>
      <Stack direction="row" sx={{ flex: "1" }}>
        <IconButton
          style={{ color: "#1976d2" }}
          aria-label="Approve"
          onClick={handleApproval}
        >
          <CheckIcon />
        </IconButton>
        <IconButton
          color="error"
          aria-label="Decline"
          onClick={handleRejection}
        >
          <CancelIcon />
        </IconButton>
      </Stack>
    </Card>
  );
}
