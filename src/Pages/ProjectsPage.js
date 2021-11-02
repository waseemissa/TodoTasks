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
import Project from '../Components/Project';
import MainNavigation from '../Components/Layout/MainNavigation';
import { useState } from 'react';
import { useEffect } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';


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

function ProjectsPage(){
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [pendingRequests, setPendingRequests]  = useState([]);
  const [suggestions, setSuggestions]  = useState([]);
  const [projects, setProjects]  = useState([]);
  const [freelancers, setFreelancers] = useState([]);
  const [freelancerId, setFreelancerId] = useState('');

  useEffect(() => {
    getPendingRequests();
    getSuggestions();
    getFreelancers();
    getProjects();
  }, []);

  const handleChange = (event) => {
    setFreelancerId(event.target.value);
  };

  const handleSave = () => {
    handleClose();
    createProject();
  }

  //get freelancers

  function getFreelancers(){
    getFreelancersAPI().then(freelancers_response=>{
      console.log(freelancers_response);
      setFreelancers(freelancers_response.freelancers);
      
  }).catch(error => {
    console.log(error.message);
  });
  
  }
  
  
  async function getFreelancersAPI(){
  const user_id = localStorage.getItem('id');
  const authorization = localStorage.getItem('token');
  
    const response = await fetch("https://todotasks.tk/api/auth/get-followed-freelancers", {
        method: 'GET',
        headers : {'accepts' : 'application/json', 'Authorization' : authorization},
    });
  
    if(!response.ok){
      const message = "ERROR OCCURED";
      throw new Error(message);
  }
  
  const freelancers_response = await response.json();
  return freelancers_response;
  }

  //Create Project 

  function createProject(){
    createProjectAPI().then(add_response=>{
      console.log(add_response);
      getProjects();
      
  }).catch(error => {
    console.log(error.message);
  });
  
  }
  
  
  async function createProjectAPI(){
  const freelancer_user_id = freelancerId;
  const description = document.getElementById('description').value;
  const price = document.getElementById('price').value;
  const due_date = document.getElementById('due_date').value;
  const authorization = localStorage.getItem('token');
  
    const response = await fetch("https://todotasks.tk/api/auth/create-project", {
        method: 'POST',
        headers : {'accepts' : 'application/json', 'Authorization' : authorization},
        body: new URLSearchParams({
          'freelancer_user_id': freelancer_user_id,
          'description': description,
          'price': price,
          'due_date': due_date  
        })
    });
  
    if(!response.ok){
      const message = "ERROR OCCURED";
      throw new Error(message);
  }
  
  const add_response = await response.json();
  return add_response;
  }

  //get Projects
  function getProjects(){
    getProjectsAPI().then(projects_response=>{
      setProjects(projects_response);
      
  }).catch(error => {
    console.log(error.message);
  });
  
  }
  
  
  async function getProjectsAPI(){
  const authorization = localStorage.getItem('token');
  
    const response = await fetch("https://todotasks.tk/api/auth/get-projects", {
        method: 'GET',
        headers : {'accepts' : 'application/json', 'Authorization' : authorization},
    });
  
    if(!response.ok){
      const message = "ERROR OCCURED";
      throw new Error(message);
  }
  
  const projects_response = await response.json();
  return projects_response;
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

    return (
      <div>
        <MainNavigation />
      
  <Grid container spacing={3} sx={{paddingTop:"15px"}} >
  <Grid item xs>
    <UserCard></UserCard>
  </Grid>
  <Grid item xs={12} lg={6}>
  <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ height: '30px', display:'flex', flexDirection:'row', paddingBottom:'0px', marginBottom:'15px'}} >
          <Typography sx={{ mt: 4, mb: 2}} variant="h5" color="black" sx={{maxWidth:'900px',fontFamily:'Roboto'}}>
            Projects
          </Typography>
          <IconButton onClick={handleOpen} color="primary" aria-label="Edit" component="span" ><AddCircleIcon/></IconButton>
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
            <Typography id="title" variant="h6">Start Project</Typography>
            <Box sx={{display:'flex', flexDirection:'column'}}>
            <InputLabel id="demo-simple-select-label" sx={{marginTop:'15px'}}>Freelancer</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={freelancerId}
            onChange={handleChange}
              >
                {freelancers.map((freelancer) => (
            <MenuItem value={freelancer.info.id}>{freelancer.info.first_name+" "+ freelancer.info.last_name}</MenuItem>
                ))}
            </Select>
            <InputLabel id="demo-simple-select-label" sx={{marginTop:'15px'}}>Description</InputLabel>
            <TextField  id="description" variant="outlined" placeholder="What is your project?"></TextField>
            <InputLabel id="demo-simple-select-label" sx={{marginTop:'15px'}}>Price</InputLabel>
            <TextField  id="price" variant="outlined" placeholder="Amount in USD"></TextField>
            <InputLabel id="demo-simple-select-label" sx={{marginTop:'15px'}}>Due Date</InputLabel>
            <TextField id="due_date" variant="outlined" placeholder="Deadline"></TextField>
            <Button sx={{marginTop:'15px'}} variant="contained"  onClick={handleSave}>Save</Button>
            </Box>
            </Box>
        </Modal>
          <Stack direction="column" spacing={2}>
          {projects.map((project) => (
            <Project id={project.id} amount={project.price} title={project.description} due_date={project.due_date}></Project>
                ))}
          </Stack>
      </Container>
    </React.Fragment>

  </Grid>
  <Grid item xs>
  <Grid item >
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
            <Pending id={pendingRequest.info.id} username={pendingRequest.info.username} name={pendingRequest.info.first_name+' '+pendingRequest.info.last_name} picture={pendingRequest.picture[0].picture_url} profession={pendingRequest.info.profession} email={pendingRequest.info.email} bio={pendingRequest.info.bio} phone_number={pendingRequest.info.phone_number}></Pending>
          ))}
            </Stack>
      </Container>
    </React.Fragment>
  
  </Grid>
  <Grid item>

  <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{height: '30px', marginBottom:'15px'}} >
          <Typography sx={{ mt: 4, mb: 2 }} variant="h5" color="black" sx={{maxWidth:'900px',fontFamily:'Roboto'}}>
            Suggestions
          </Typography>
          </Box>
          <Stack direction="column" spacing={2}>
          {suggestions.map((suggestion) => (
            <Suggestion id={suggestion.info.id} username={suggestion.info.username} name={suggestion.info.first_name+' '+suggestion.info.last_name} picture={suggestion.picture[0].picture_url} profession={suggestion.info.profession} email={suggestion.info.email} bio={suggestion.info.bio} phone_number={suggestion.info.phone_number}></Suggestion>
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

export default ProjectsPage;