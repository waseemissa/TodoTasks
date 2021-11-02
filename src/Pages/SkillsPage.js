import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Suggestion from "../Components/Suggestion";
import Pending from "../Components/Pending";
import Typography from '@mui/material/Typography';
import UserCard from "../Components/UserCard";
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import UserSkill from '../Components/UserSkill';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import MainNavigation from '../Components/Layout/MainNavigation';
import { useEffect } from 'react';


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


function SkillsPage(){


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [skills, setSkills]  = useState([]);
  const [pendingRequests, setPendingRequests]  = useState([]);
  const [suggestions, setSuggestions]  = useState([]);

  
  useEffect(() => {
    getUserSkills();
    getPendingRequests();
    getSuggestions();
  }, []);

  function getUserSkills(){
    getUserSkillsAPI().then(skills_response=>{
      setSkills(skills_response.skills);
      
}).catch(error => {
    console.log(error.message);
});

}


async function getUserSkillsAPI(){
  const user_id = localStorage.getItem('id');
  const authorization = localStorage.getItem('token');

    const response = await fetch("https://todotasks.tk/api/auth/get-user-skills", {
        method: 'POST',
        headers : {'accepts' : 'application/json', 'Authorization' : authorization},
        body: new URLSearchParams({
          'user_id' : user_id,
        })
    });

    if(!response.ok){
      const message = "ERROR OCCURED";
      throw new Error(message);
  }
  
  const skills_response = await response.json();
  return skills_response;
}

function addSkill(){
  addSkillAPI().then(add_response=>{
    console.log(add_response);
    getUserSkills();
    
}).catch(error => {
  console.log(error.message);
});

}


async function addSkillAPI(){
const skill_title = document.getElementById('skill_title').value;
const authorization = localStorage.getItem('token');

  const response = await fetch("https://todotasks.tk/api/auth/add-skill", {
      method: 'POST',
      headers : {'accepts' : 'application/json', 'Authorization' : authorization},
      body: new URLSearchParams({
        'title': skill_title

      })
  });

  if(!response.ok){
    const message = "ERROR OCCURED";
    throw new Error(message);
}

const update_response = await response.json();
return update_response;
}

//pending Requests

function getPendingRequests(){
  getPendingRequestsAPI().then(pending_response=>{
    setPendingRequests(pending_response.pending_connections);
    
}).catch(error => {
  console.log(error.message);
});

}


async function getPendingRequestsAPI(){
const user_id = localStorage.getItem('id');
const authorization = localStorage.getItem('token');

  const response = await fetch("https://todotasks.tk/api/auth/get-pending-requests", {
      method: 'GET',
      headers : {'accepts' : 'application/json', 'Authorization' : authorization},
  });

  if(!response.ok){
    const message = "ERROR OCCURED";
    throw new Error(message);
}

const pending_response = await response.json();
return pending_response;
}

  //Suggestions

  function getSuggestions(){
    getSuggestionsAPI().then(suggestions_response=>{
      setSuggestions(suggestions_response.suggestions);
      
  }).catch(error => {
    console.log(error.message);
  });
  
  }
  
  
  async function getSuggestionsAPI(){
  const user_id = localStorage.getItem('id');
  const authorization = localStorage.getItem('token');
  
    const response = await fetch("https://todotasks.tk/api/auth/get-suggestions", {
        method: 'GET',
        headers : {'accepts' : 'application/json', 'Authorization' : authorization},
    });
  
    if(!response.ok){
      const message = "ERROR OCCURED";
      throw new Error(message);
  }
  
  const suggestions_response = await response.json();
  return suggestions_response;
  }



  const handleSave = () => {
    addSkill();
    handleClose();
  }

    return (
      <div><MainNavigation />
  <Grid container spacing={3} paddingTop="15px">
  <Grid item xs >
    <UserCard></UserCard>
  </Grid>
  <Grid item xs={12} lg={6}>
  <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
      <Box sx={{ height: '30px', display:'flex', flexDirection:'row', paddingBottom:'0px', marginBottom:'15px'}} >
          <Typography sx={{ mt: 4, mb: 2}} variant="h5" color="black" sx={{maxWidth:'900px',fontFamily:'Roboto'}}>
            Skills
          </Typography>
          <IconButton onClick={handleOpen} color="primary" aria-label="Edit" component="span" sx={{alignSelf:'center'}}><AddCircleIcon/></IconButton>
          </Box>
          <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="title"
        >
            <Box
            component="form"
            sx={style}
            noValidate
            autoComplete="off"
            >
            <Typography id="title" variant="h6">Add Skill</Typography>
            <Box sx={{display:'flex', flexDirection:'column'}}>
            <TextField sx={{marginTop:'15px'}} id="skill_title"  label="Title" variant="outlined" placeholder="What is your skill?"></TextField>
            <Button sx={{marginTop:'15px'}} variant="contained" onClick={handleSave}>Save</Button>
            </Box>
            </Box>
        </Modal>
          <Stack id="skills" direction="column" spacing={2}>
          {skills.map((skill) => (
        <UserSkill id={skill.id} title={skill.title}></UserSkill>
          ))}
            

          </Stack>
      </Container>
    </React.Fragment>

  </Grid>
  <Grid item xs>
  <Grid item>
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
      <Box sx={{height: '30px', marginBottom:'15px'}} >
          <Typography variant="h5" color="black" sx={{maxWidth:'900px',fontFamily:'Roboto'}}>
            Pending Requests
          </Typography>
          </Box>
          <Stack direction="column" spacing={2}>
          {pendingRequests.map((pendingRequest) => (
            <Pending id={pendingRequest.info.id} name={pendingRequest.info.first_name+' '+pendingRequest.info.last_name} picture={pendingRequest.picture[0].picture_url}></Pending>
          ))}
            </Stack>
      </Container>
    </React.Fragment>
  
  </Grid>
  <Grid item>

  <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{paddingTop:'15px'}}>
      <Box sx={{height: '30px', marginBottom:'15px'}} >
          <Typography variant="h5" color="black" sx={{maxWidth:'900px',fontFamily:'Roboto'}}>
            Suggestions
          </Typography>
          </Box>
          <Stack direction="column" spacing={2}>
          {suggestions.map((suggestion) => (
            <Suggestion id={suggestion.info.id} name={suggestion.info.first_name+' '+suggestion.info.last_name} picture={suggestion.picture[0].picture_url}></Suggestion>
          ))}
            </Stack>
      </Container>
    </React.Fragment>
  </Grid>
  
  </Grid>
</Grid>
</div>
    )

}

export default SkillsPage;