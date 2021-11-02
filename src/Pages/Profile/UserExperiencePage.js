import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Suggestion from "../../Components/Suggestion";
import Pending from "../../Components/Pending";
import Typography from "@mui/material/Typography";
import UserCard from "../../Components/ProfileComponents/UserCard";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import UserExperience from "../../Components/ProfileComponents/UserExperience";
import { useState } from 'react';
import { useEffect } from 'react';


import MainNavigation from "../../Components/Layout/MainNavigation";

function UserExperiencePage() {
  const [pendingRequests, setPendingRequests]  = useState([]);
  const [suggestions, setSuggestions]  = useState([]);
  const [experiences, setExperiences]  = useState([]);
  
  useEffect(() => {
    getPendingRequests();
    getSuggestions();
    getUserExperience();
  }, []);

  function getUserExperience(){
    getUserExperienceAPI().then(experience_response=>{
      console.log(experience_response);
      setExperiences(experience_response.jobs);
      
}).catch(error => {
    console.log(error.message);
});

}


async function getUserExperienceAPI(){
  const user_id = localStorage.getItem('todo_tasks_user_id');
  const authorization = localStorage.getItem('token');

    const response = await fetch("https://todotasks.tk/api/auth/user-jobs", {
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
  
  const experience_response = await response.json();
  return experience_response;
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
      <Grid container spacing={3} sx={{ paddingTop: "15px" }}>
        <Grid item xs>
          <UserCard></UserCard>
        </Grid>
        <Grid item xs={12} lg={6}>
          <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
            <Box sx={{ height: '30px', display:'flex', flexDirection:'row', paddingBottom:'0px', marginBottom:'15px'}} >
              <Typography sx={{ mt: 4, mb: 2}} variant="h5" color="black" sx={{maxWidth:'900px',fontFamily:'Roboto'}}>
                  Experience
                </Typography>
              </Box>
              <Stack direction="column" spacing={2}>
              {experiences.map((experience) => (
        <UserExperience id={experience.id} company={experience.company} position={experience.position} start_date={experience.start_date} end_date={experience.end_date}></UserExperience>
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
      <Container maxWidth="lg" sx={{paddingTop:'15px'}}>
      <Box sx={{height: '30px', marginBottom:'15px'}} >
          <Typography variant="h5" color="black" sx={{maxWidth:'900px',fontFamily:'Roboto'}}>
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
  );
}

export default UserExperiencePage;
