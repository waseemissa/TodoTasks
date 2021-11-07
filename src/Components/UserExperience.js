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
import WorkIcon from "@mui/icons-material/Work";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
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

export default function UserExperience(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [position, setPosition] = useState(props.position);
  const [company, setCompany] = useState(props.company);
  const [start_date, setStartDate] = useState(props.start_date);
  const [end_date, setEndDate] = useState(props.end_date);

  const handleEditPosition = () =>
    setPosition(document.getElementById("position").value);
  const handleEditCompany = () =>
    setCompany(document.getElementById("company").value);
  const handleEditStartDate = (newValue) =>
    setStartDate(formatNewDate(newValue));
  const handleEditEndDate = (newValue) =>
    setEndDate(formatNewDate(newValue));

  const handleDelete = () => {
    deleteExperience();
    document.getElementById(props.id).style.display = "none";
  };

  const handleUpdate = () => {
    updateExperience();
    handleClose();
  };

  function updateExperience() {
    updateExperienceAPI()
      .then()
      .catch((error) => {
        console.log(error.message);
      });
  }

  function formatDisplayDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('-');
  }

  function formatNewDate(date) {
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

  async function updateExperienceAPI() {
    const id = props.id;
    const authorization = localStorage.getItem("token");

    const response = await fetch("https://todotasks.tk/api/auth/update-job", {
      method: "POST",
      headers: { accepts: "application/json", Authorization: authorization },
      body: new URLSearchParams({
        job_id: id,
        position: position,
        company: company,
        start_date: start_date,
        end_date: end_date,
      }),
    });

    if (!response.ok) {
      const message = "ERROR OCCURED";
      throw new Error(message);
    }

    const update_response = await response.json();
    return update_response;
  }

  function deleteExperience() {
    deleteExperienceAPI()
      .then()
      .catch((error) => {
        console.log(error.message);
      });
  }

  async function deleteExperienceAPI() {
    const id = props.id;
    const authorization = localStorage.getItem("token");

    const response = await fetch("https://todotasks.tk/api/auth/delete-job", {
      method: "POST",
      headers: { accepts: "application/json", Authorization: authorization },
      body: new URLSearchParams({
        job_id: id,
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
        style={{ fontFamily: "Roboto" }}
        sx={{ flex: "5" }}
        avatar={
          <Avatar sx={{ bgcolor: "primary.dark" }} aria-label="Experience">
            <WorkIcon />
          </Avatar>
        }
        title={
          <Typography>
            <h4>
              {position} at {company}
            </h4>
            <p>
              From {formatDisplayDate(start_date)}
            </p>
            <p>
              Till {formatDisplayDate(end_date)}
            </p>
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
                <Box  sx={style} noValidate autoComplete="off">
                  <form onSubmit={handleUpdate}>
                  <Typography id="title" variant="h6">
                    Edit Experience
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
                      value={position}
                      onChange={handleEditPosition}
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
                      value={company}
                      onChange={handleEditCompany}
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
                    onChange={handleEditStartDate}
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
                    onChange={handleEditEndDate}
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
    </Card>
  );
}
