import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import FeedIcon from "@mui/icons-material/Feed";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import StarIcon from "@mui/icons-material/Star";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { Link as RouterLink, MemoryRouter as Router } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import axios from "axios";

const Input = styled("input")({
  display: "none",
});

export default function UserCard() {
  const name = localStorage.getItem("full_name");
  const profession = localStorage.getItem("profession");
  const [user_picture, setUserPicture] = useState(
    localStorage.getItem("profile_picture")
  );

  const fileUploadHandler = (event) => {
    let picture = event.target.files[0];
    let fd = new FormData();
    fd.append("picture", picture);
    const authorization = localStorage.getItem("token");
    console.log(picture);
    axios
      .post("https://todotasks.tk/api/auth/upload-profile-picture", fd, {
        headers: {
          Authorization: authorization,
          accepts: "application/json",
        },
      })
      .then((res) => {
        document.getElementById("user_image").src = res.data.picture.picture_url;
        localStorage.setItem("profile_picture", res.data.picture.picture_url);
        setUserPicture(res.data.picture.picture_url);
      });
  };

  return (
    <React.Fragment style={{ width: "80%" }}>
      <CssBaseline />
      <Container maxWidth="sm" lg={{ marginLeft: "20px", marginRight: "20px" }}>
        <Box sx={{ bgcolor: "#1976d2", height: "100px" }}>
          <center>
            <Avatar
              id="user_image"
              src={user_picture}
              sx={{
                width: "100px",
                height: "100px",
                bottom: "-50px",
                position: "relative",
              }}
            ></Avatar>
          </center>
          <label htmlFor="profile_image" style={{ paddingLeft: "65%" }}>
            <Input
              accept="image/*"
              id="profile_image"
              type="file"
              onChange={(e) => {
                fileUploadHandler(e);
              }}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </Box>
        <Box sx={{ paddingTop: "40px", textAlign: "center" }}>
          <h3 style={{ fontFamily: "Roboto" }}>{name}</h3>
          <p
            id="profession_p_card"
            style={{ marginTop: "-20px", fontFamily: "Roboto" }}
          >
            {profession}
          </p>
        </Box>
        <Box>
          <List style={{ fontFamily: "Roboto" }}>
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to="/user-feed">
                <ListItemIcon>
                  <FeedIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Contact Info" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to="/projects">
                <ListItemIcon>
                  <AccountTreeIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Projects" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to="/connections">
                <ListItemIcon>
                  <PersonIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Connections" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to="/blocked">
                <ListItemIcon>
                  <PersonOffIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Blocked Contacts" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to="/user-experience">
                <ListItemIcon>
                  <WorkIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Experience" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to="/user-education">
                <ListItemIcon>
                  <SchoolIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Education" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to="/user-skills">
                <ListItemIcon>
                  <StarIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Skills" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Container>
    </React.Fragment>
  );
}
