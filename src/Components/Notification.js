import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import { red } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function Notification(props) {

   const handleDelete = () => {
     deleteNotification();
     document.getElementById(props.id).style.display= "none";
    }

    function deleteNotification(){
      deleteNotificationAPI().then(delete_response=>{
        console.log(delete_response);
        
    }).catch(error => {
      console.log(error.message);
    });
    
    }
    
    
    async function deleteNotificationAPI(){
    const id = props.id;
    const authorization = localStorage.getItem('token');
    
    
      const response = await fetch("https://todotasks.tk/api/auth/delete-notification", {
          method: 'POST',
          headers : {'accepts' : 'application/json', 'Authorization' : authorization},
          body: new URLSearchParams({
            'notification_id' : id,
          })
      });
    
      if(!response.ok){
        const message = "ERROR OCCURED";
        throw new Error(message);
    }
    
    const delete_response = await response.json();
    return delete_response;
    }

  return (
      <Card id={props.id} sx={{display:'flex', flexDirection:'row', paddingTop:'5px'}}>
        <CardHeader sx={{flex:'5'}}
        avatar={
          <Avatar sx={{ bgcolor: 'primary.dark' }} aria-label="notification">
            <NotificationsIcon />
          </Avatar>
        }
        title={<Typography>
          <p>{props.text}</p>
        </Typography>}
        />
        <Stack sx={{display:'flex', flexDirection:'row'}}>
        <IconButton color="error" onClick={handleDelete} aria-label="Delete" component="span" sx={{flex:'1'}}>
        <DeleteIcon  />
        </IconButton>
        </Stack>
        </Card>



        
  );
}