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
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

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

export default function UserSkill(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState(props.title);

  const handleEditTitle = () =>
    setTitle(document.getElementById("skill_title").value);
  const handleDelete = () => {
    deleteSkill();
    document.getElementById(props.id).style.display = "none";
  };

  const handleUpdate = () => {
    updateSkill();
    handleClose();
  };

  function updateSkill() {
    updateSkillAPI()
      .then()
      .catch((error) => {
        console.log(error.message);
      });
  }

  async function updateSkillAPI() {
    const id = props.id;
    const authorization = localStorage.getItem("token");
    

    const response = await fetch("https://todotasks.tk/api/auth/update-skill", {
      method: "POST",
      headers: { accepts: "application/json", Authorization: authorization },
      body: new URLSearchParams({
        skill_id: id,
        title: title,
      }),
    });

    if (!response.ok) {
      const message = "ERROR OCCURED";
      throw new Error(message);
    }

    const update_response = await response.json();
    return update_response;
  }

  function deleteSkill() {
    deleteSkillAPI()
      .then()
      .catch((error) => {
        console.log(error.message);
      });
  }

  async function deleteSkillAPI() {
    const id = props.id;
    const authorization = localStorage.getItem("token");

    const response = await fetch("https://todotasks.tk/api/auth/delete-skill", {
      method: "POST",
      headers: { accepts: "application/json", Authorization: authorization },
      body: new URLSearchParams({
        skill_id: id,
      }),
    });

    if (!response.ok) {
      const message = "ERROR OCCURED";
      throw new Error(message);
    }

    const delete_response = await response.json();
    return delete_response;
  }

  return (
    <Card
      id={props.id}
      sx={{ display: "flex", flexDirection: "row", paddingTop: "5px" }}
    >
      <CardHeader
        sx={{ flex: "5" }}
        avatar={
          <Avatar sx={{ bgcolor: "primary.dark" }} aria-label="Skill">
            <StarIcon />
          </Avatar>
        }
        title={
          <Typography>
            <h4>
            {title}
            </h4>
          </Typography>
        }
      />
      <Stack sx={{ display: "flex", flexDirection: "row" }}>
        <IconButton
          onClick={handleOpen}
          style={{ color: "#1976d2" }}
          aria-label="Edit"
          component="span"
          sx={{ flex: "1" }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={handleDelete}
          color="error"
          aria-label="Delete"
          component="span"
          sx={{ flex: "1" }}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
      <Modal open={open} onClose={handleClose} aria-labelledby="title">
        <Box sx={style} noValidate autoComplete="off">
          <form onSubmit={handleUpdate}>
          <Typography id="title" variant="h6">
            Edit Skill
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              sx={{ marginTop: "15px" }}
              id="skill_title"
              label="Skill"
              required
              variant="outlined"
              placeholder="Write your skill"
              value={title}
              onChange={handleEditTitle}
              inputProps = {{ minLength: "3"}}
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
    </Card>
  );
}
