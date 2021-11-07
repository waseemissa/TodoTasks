import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

export default function Blocked(props) {
  const handleUnblock = () => {
    unblock();
  };

  //unblock
  function unblock() {
    unblockAPI()
      .then(() => {
        document.getElementById("blocked_" + props.id).style.display = "none";
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  async function unblockAPI() {
    const user2_id = props.id;
    const authorization = localStorage.getItem("token");

    const response = await fetch("https://todotasks.tk/api/auth/unblock", {
      method: "POST",
      headers: { accepts: "application/json", Authorization: authorization },
      body: new URLSearchParams({
        user2_id: user2_id,
      }),
    });

    if (!response.ok) {
      const message = "ERROR OCCURED";
      throw new Error(message);
    }

    const block_response = await response.json();
    return block_response;
  }

  return (
    <Card
      id={"blocked_" + props.id}
      sx={{ display: "flex", flexDirection: "row", paddingTop: "5px" }}
    >
      <CardHeader
        sx={{ flex: "5" }}
        avatar={<Avatar aria-label="profile pic" src={props.picture}></Avatar>}
        title={
          <Typography>
            <h4>
              {props.name}
            </h4>
          </Typography>
        }
      />
      <Stack sx={{ display: "flex", flexDirection: "row" }}>
        <IconButton
          onClick={handleUnblock}
          style={{ color: "#1976d2" }}
          aria-label="unblock"
          component="span"
          sx={{ flex: "1" }}
        >
          <PersonRemoveIcon />
        </IconButton>
      </Stack>
    </Card>
  );
}
