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
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #1976d2',
  borderRadius: '35px',
  boxShadow: 24,
  p: 4,
};

export default function UserEducation(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [degree, setDegree] = useState(props.degree);
  const [university, setUniversity] = useState(props.university);
  const [major, setMajor] = useState(props.major);
  const [year, setYear] = useState(props.year);

  const handleEditDegree = () =>
    setDegree(document.getElementById("degree").value);
  const handleEditMajor = () =>
    setMajor(document.getElementById("major").value);
  const handleEditUniversity = () =>
    setUniversity(document.getElementById("university").value);
  const handleEditYear = () => setYear(document.getElementById("year").value);

  const handleDelete = () => {
    deleteEducation();
    document.getElementById(props.id).style.display = "none";
  };

  const handleUpdate = () => {
    updateEducation();
    handleClose();
  };

  function updateEducation() {
    updateEducationAPI()
      .then((update_response) => {
        console.log(update_response);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  async function updateEducationAPI() {
    const id = props.id;
    const authorization = localStorage.getItem("token");
    console.log(id);

    const response = await fetch(
      "https://todotasks.tk/api/auth/update-education",
      {
        method: "POST",
        headers: { accepts: "application/json", Authorization: authorization },
        body: new URLSearchParams({
          education_id: id,
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

    const update_response = await response.json();
    return update_response;
  }

  function deleteEducation() {
    deleteEducationAPI()
      .then((delete_response) => {
        console.log(delete_response);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  async function deleteEducationAPI() {
    const id = props.id;
    const authorization = localStorage.getItem("token");

    const response = await fetch(
      "https://todotasks.tk/api/auth/delete-education",
      {
        method: "POST",
        headers: { accepts: "application/json", Authorization: authorization },
        body: new URLSearchParams({
          education_id: id,
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
      id={props.id}
      sx={{ display: "flex", flexDirection: "row", paddingTop: "5px" }}
    >
      <CardHeader
        sx={{ flex: "5" }}
        style={{fontFamily:'Roboto'}}
        avatar={
          <Avatar sx={{ bgcolor: "primary.dark" }} aria-label="recipe">
            <StarIcon />
          </Avatar>
        }
        title={
          <Typography>
            <p>
              {degree} in {major}
            </p>
            <p>
              {university} ({year})
            </p>
          </Typography>
        }
      />
      <Stack sx={{ display: "flex", flexDirection: "row" }}>
        <IconButton
          style={{color:'#1976d2'}}
          onClick={handleOpen}
          aria-label="Edit"
          component="span"
          sx={{ flex: "1" }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="error"
          onClick={handleDelete}
          aria-label="Delete"
          component="span"
          sx={{ flex: "1" }}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
      <Modal open={open} onClose={handleClose} aria-labelledby="title">
        <Box component="form" sx={style} noValidate autoComplete="off">
          <Typography id="title" variant="h6">
            Edit Education
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              sx={{ marginTop: "15px" }}
              id="degree"
              label="Degree"
              variant="outlined"
              value={degree}
              onChange={handleEditDegree}
            ></TextField>
            <TextField
              sx={{ marginTop: "15px" }}
              id="major"
              label="Major"
              variant="outlined"
              value={major}
              onChange={handleEditMajor}
            ></TextField>
            <TextField
              sx={{ marginTop: "15px" }}
              id="university"
              label="University"
              variant="outlined"
              value={university}
              onChange={handleEditUniversity}
            ></TextField>
            <TextField
              sx={{ marginTop: "15px" }}
              id="year"
              label="Year"
              variant="outlined"
              value={year}
              onChange={handleEditYear}
            ></TextField>
            <Button
              sx={{ marginTop: "15px" }}
              variant="contained"
              onClick={handleUpdate}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </Card>
  );
}
