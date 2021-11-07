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
import { useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

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

export default function UserEducation(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [degree, setDegree] = useState(props.degree);
  const [university, setUniversity] = useState(props.university);
  const [major, setMajor] = useState(props.major);
  const [year, setYear] = useState(props.year);
  const [years, setYears] = useState([]);

  const handleEditDegree = (e) => {
    setDegree(e.target.value);
  }
  const handleEditMajor = (e) => {
    setMajor(e.target.value);
  }
  const handleEditUniversity = (e) => {
    setUniversity(e.target.value);
  }
  const handleEditYear = (e) => {
    setYear(e.target.value);
  }

  useEffect(() => {
    populateYears();
  },[]);

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
      .then()
      .catch((error) => {
        console.log(error.message);
      });
  }

  const populateYears = () => {
    const today = new Date();
    const max_year = today.getFullYear();

    const years_select = [];


    for (var i = 1990 ; i <= max_year; i++){
       years_select[i] = i;
    }
    setYears(years_select);

  }

  async function updateEducationAPI() {
    const id = props.id;
    const authorization = localStorage.getItem("token");

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
      .then()
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
        style={{ fontFamily: "Roboto" }}
        avatar={
          <Avatar sx={{ bgcolor: "primary.dark" }} aria-label="Education">
            <StarIcon />
          </Avatar>
        }
        title={
          <Typography>
            <h4>
              {degree} in {major}
            </h4>
            <p>
              {university} ({year})
            </p>
          </Typography>
        }
      />
      <Stack sx={{ display: "flex", flexDirection: "row" }}>
        <IconButton
          style={{ color: "#1976d2" }}
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
                <Box sx={style} noValidate autoComplete="off">
                  <form onSubmit={handleUpdate}>
                  <Typography id="title" variant="h6">
                    Edit Education
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
                      onChange={handleEditDegree}
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
                      value={major}
                      onChange={handleEditMajor}
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
                      value={university}
                      onChange={handleEditUniversity}
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
                      onChange={handleEditYear}
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
    </Card>
  );
}
