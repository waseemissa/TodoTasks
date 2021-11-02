import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import FeedIcon from '@mui/icons-material/Feed';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import StarIcon from '@mui/icons-material/Star';
import ClassIcon from '@mui/icons-material/Class';
import { Link as RouterLink, MemoryRouter as Router } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from 'react';
import { useEffect } from 'react';

export default function UserCard() {
  const [id, setId] = useState(localStorage.getItem('todo_tasks_user_id'));
  const [name, setName] = useState(localStorage.getItem('todo_tasks_user_name'));
  const [profession, setProfession] = useState(localStorage.getItem('todo_tasks_user_profession'));
  const [picture, setPicture] = useState(localStorage.getItem('todo_tasks_user_picture'));


  useEffect(() => {
      setId(localStorage.getItem('todo_tasks_user_id'));
      setName(localStorage.getItem('todo_tasks_user_name'));
      setProfession(localStorage.getItem('todo_tasks_user_profession'));
      setPicture(localStorage.getItem('todo_tasks_user_picture'));
  },[]);

  const handleFollow = () =>{
      sendFollowRequest();
  }

  function sendFollowRequest(){
    sendFollowRequestAPI().then(add_response=>{
      console.log(add_response);
      document.getElementById('follow_label').style.display = "none";

      
  }).catch(error => {
    console.log(error.message);
  });
  
  }
  
  
  async function sendFollowRequestAPI(){
  const authorization = localStorage.getItem('token');
  
    const response = await fetch("http://127.0.0.1:8000/api/auth/send-follow-request", {
        method: 'POST',
        headers : {'accepts' : 'application/json', 'Authorization' : authorization},
        body: new URLSearchParams({
          'user2_id': id,
        })
    });
  
    if(!response.ok){
      const message = "ERROR OCCURED";
      throw new Error(message);
  }
  
  const add_response = await response.json();
  return add_response;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: "primary.dark", height: "100px" }}>
        <center><Avatar src={picture} sx={{ width: '100px', height:'100px', bottom:'-50px', position:'relative'}}>A</Avatar></center>
        <label id="follow_label" htmlFor="follow" style={{paddingLeft:'65%'}}>
        <IconButton onClick={handleFollow} color="primary" id="follow" aria-label="Follow" component="span">
        <AddCircleOutlineIcon />
        </IconButton>
        </label>
        </Box>
        <Box sx={{paddingTop: '40px', textAlign:'center'}}>
            <h3>{name}</h3>
            <p style={{marginTop: '-20px' }}>{profession}</p>
        </Box>
        <Box>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/feed">
              <ListItemIcon>
                <FeedIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Contact Info" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/experience">
              <ListItemIcon>
                <WorkIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Experience" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/education">
              <ListItemIcon>
                <SchoolIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Education" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/skills">
              <ListItemIcon>
                <StarIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Skills" />
            </ListItemButton>
          </ListItem>
        </List>
      <Divider />
        </Box>
      </Container>
    </React.Fragment>
  );
}
