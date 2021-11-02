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
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import BlockIcon from '@mui/icons-material/Block';
import { useState } from 'react';



export default function Connection(props) {
  

  const handleUnfollow = () =>{
    unfollow();
    document.getElementById('connection_'+props.id).style.display = "none";
  }

  const handleBlock = () => {
    block();
    document.getElementById('connection_'+props.id).style.display = "none";
  }

  //unfollow
  function unfollow(){
    unfollowAPI().then(unfollow_response=>{
      console.log(unfollow_response);
      
  }).catch(error => {
    console.log(error.message);
  });
  
  }
  
  
  async function unfollowAPI(){
  const user2_id = props.id;
  const authorization = localStorage.getItem('token');
  
    const response = await fetch("https://todotasks.tk/api/auth/unfollow", {
        method: 'POST',
        headers : {'accepts' : 'application/json', 'Authorization' : authorization},
        body: new URLSearchParams({
          'user2_id': user2_id
        })
    });
  
    if(!response.ok){
      const message = "ERROR OCCURED";
      throw new Error(message);
  }
  
  const unfollow_response = await response.json();
  return unfollow_response;
  }

  //block
  function block(){
    blockAPI().then(block_response=>{
      console.log(block_response);
      
  }).catch(error => {
    console.log(error.message);
  });
  
  }
  
  
  async function blockAPI(){
  const user2_id = props.id;
  const authorization = localStorage.getItem('token');
  
    const response = await fetch("https://todotasks.tk/api/auth/block", {
        method: 'POST',
        headers : {'accepts' : 'application/json', 'Authorization' : authorization},
        body: new URLSearchParams({
          'user2_id': user2_id
        })
    });
  
    if(!response.ok){
      const message = "ERROR OCCURED";
      throw new Error(message);
  }
  
  const block_response = await response.json();
  return block_response;
  }
  

  return (
    <Card id={"connection_"+props.id} sx={{display:'flex', flexDirection:'row', paddingTop:'5px'}}>
        <CardHeader sx={{flex:'5'}}
        avatar={
          <Avatar aria-label="profile pic" src={props.picture}>
          </Avatar>
        }
        title={props.name}
        />
        <Stack sx={{display:'flex', flexDirection:'row'}}>
        <IconButton onClick={handleUnfollow} color="error" aria-label="Edit" component="span" sx={{flex:'1'}}>
        <PersonRemoveIcon  />
        </IconButton>
        <IconButton onClick={handleBlock} color="error"aria-label="Edit" component="span" sx={{flex:'1'}}>
        <BlockIcon />
        </IconButton>
        </Stack>
        </Card>
  );
}