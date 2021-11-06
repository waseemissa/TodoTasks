import * as React from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { useEffect } from "react";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import InfoIcon from "@mui/icons-material/Info";
import UserComment from "./UserComment";
import CheckIcon from "@mui/icons-material/Check";

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

export default function Project(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getProjectComments();
  }, []);

  const handleAddComment = () => {
    addComment();
    document.getElementById("comment_text").value = "";
  };

  const handleMarkAsDone = () => {
    markAsDone();
  };

  //mark as done
  function markAsDone() {
    markAsDoneAPI()
      .then(() => {
        document.getElementById("project_" + props.id).style.display = "none";
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  async function markAsDoneAPI() {
    const project_id = props.id;
    const authorization = localStorage.getItem("token");

    const response = await fetch("https://todotasks.tk/api/auth/mark-done", {
      method: "POST",
      headers: { accepts: "application/json", Authorization: authorization },
      body: new URLSearchParams({
        project_id: project_id,
      }),
    });

    if (!response.ok) {
      const message = "ERROR OCCURED";
      throw new Error(message);
    }

    const markAsDone_response = await response.json();
    return markAsDone_response;
  }

  //get project comments
  function getProjectComments() {
    getProjectCommentsAPI()
      .then((comments_response) => {
        setComments(comments_response.comments);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  async function getProjectCommentsAPI() {
    const project_id = props.id;
    const authorization = localStorage.getItem("token");

    const response = await fetch(
      "https://todotasks.tk/api/auth/get-project-comments",
      {
        method: "POST",
        headers: { accepts: "application/json", Authorization: authorization },
        body: new URLSearchParams({
          project_id: project_id,
        }),
      }
    );

    if (!response.ok) {
      const message = "ERROR OCCURED";
      throw new Error(message);
    }

    const comments_response = await response.json();
    return comments_response;
  }

  //add a comment
  function addComment() {
    addCommentAPI()
      .then(() => {
        getProjectComments();
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  async function addCommentAPI() {
    const project_id = props.id;
    const comment_text = document.getElementById("comment_text").value;
    const authorization = localStorage.getItem("token");

    const response = await fetch(
      "https://todotasks.tk/api/auth/add-project-comment",
      {
        method: "POST",
        headers: { accepts: "application/json", Authorization: authorization },
        body: new URLSearchParams({
          project_id: project_id,
          comment_text: comment_text,
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

  return (
    <Card
      id={"project_" + props.id}
      sx={{ display: "flex", flexDirection: "row", paddingTop: "5px" }}
    >
      <CardHeader
        sx={{ flex: "5" }}
        avatar={
          <Avatar sx={{ bgcolor: "primary.dark" }} aria-label="Project">
            <AccountTreeIcon />
          </Avatar>
        }
        title={
          <Typography>
            <p>{props.title}</p>
            <p>
              Due on {props.due_date} for {props.amount} USD
            </p>
          </Typography>
        }
      />
      <Stack sx={{ display: "flex", flexDirection: "row" }}>
        <IconButton
          onClick={handleOpen}
          style={{ color: "#1976d2" }}
          aria-label="Show details"
          component="span"
          sx={{ flex: "1" }}
        >
          <InfoIcon />
        </IconButton>
        <IconButton
          onClick={handleMarkAsDone}
          style={{ color: "#1976d2" }}
          aria-label="Mark as done"
          component="span"
          sx={{ flex: "1" }}
        >
          <CheckIcon />
        </IconButton>
      </Stack>
      <Modal open={open} onClose={handleClose} aria-labelledby="title">
        <Box component="form" sx={style} noValidate autoComplete="off">
          <Typography id="title" variant="h6">
            Project Details
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography>
              <p style={{ fontFamily: "Roboto" }}>{props.title}</p>
              <p style={{ fontFamily: "Roboto" }}>
                Due on {props.due_date} for {props.amount} USD
              </p>
            </Typography>
          </Box>
          <Typography id="title" variant="h6">
            Discussion
          </Typography>
          <div
            style={{
              overflow: "scroll",
              height: "300px",
              fontFamily: "Roboto",
            }}
          >
            {comments.map((comment) => (
              <UserComment
                picture={comment.picture[0].picture_url}
                name={comment.user.first_name + " " + comment.user.last_name}
                text={comment.comment}
              ></UserComment>
            ))}
          </div>
          <Box sx={{ display: "flex", direction: "row", paddingTop: "5px" }}>
            <TextField
              id="standard-basic"
              id="comment_text"
              label="Type your comment"
              variant="standard"
              sx={{ flex: "3" }}
            />
            <Button variant="contained" onClick={handleAddComment}>
              Post
            </Button>
          </Box>
        </Box>
      </Modal>
    </Card>
  );
}
