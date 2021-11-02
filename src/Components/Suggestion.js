import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { red } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useHistory } from 'react-router-dom';



export default function Suggestion(props) {
  const history = new useHistory();



  const handleSendRequest = () =>{
    sendFollowRequest();
    document.getElementById('suggestion_'+props.id).style.display= "none";
  }

  const handleClick = () => {
    localStorage.setItem('todo_tasks_user_id', props.id);
    localStorage.setItem('todo_tasks_user_name', props.name);
    localStorage.setItem('todo_tasks_user_profession', props.profession);
    localStorage.setItem('todo_tasks_user_picture', props.picture);
    localStorage.setItem('todo_tasks_user_bio', props.bio);
    localStorage.setItem('todo_tasks_user_email', props.email);
    localStorage.setItem('todo_tasks_user_phone_number', props.phone_number);
    history.push('/feed/'+props.username);
    window.location.reload();
  }


function sendFollowRequest(){
  sendFollowRequestAPI().then(add_response=>{
    console.log(add_response);

    
}).catch(error => {
  console.log(error.message);
});

}


async function sendFollowRequestAPI(){
const authorization = localStorage.getItem('token');

  const response = await fetch("https://todotasks.tk/api/auth/send-follow-request", {
      method: 'POST',
      headers : {'accepts' : 'application/json', 'Authorization' : authorization},
      body: new URLSearchParams({
        'user2_id': props.id,
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
        <Card id={'suggestion_'+props.id} sx={{display:'flex', flexDirection:'row', paddingTop:'5px'}}>
        <CardHeader 
        onClick={handleClick}
        sx={{flex:'5'}}
        style={{fontFamily:'Roboto'}}
        avatar={
          <Avatar src={props.picture} sx={{ bgcolor: red[500] }} aria-label="Profile Picture">
            
          </Avatar>
        }
        title={props.name}
        />
        <IconButton style={{color:'#1976d2'}} aria-label="Follow" component="span" sx={{flex:'1'}} onClick={handleSendRequest}>
        <AddCircleIcon />
        </IconButton>


        </Card>
    );
  }
  