import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import BlockIcon from '@mui/icons-material/Block';
import { useHistory } from 'react-router-dom';



export default function Connection(props) {
  const history = new useHistory();

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
    unfollowAPI().then()
    .catch(error => {
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
    blockAPI().then()
    .catch(error => {
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

  const handleClick = () => {
    localStorage.setItem('todo_tasks_user_id', props.id);
    localStorage.setItem('todo_tasks_user_name', props.name);
    localStorage.setItem('todo_tasks_user_profession', props.profession);
    localStorage.setItem('todo_tasks_user_picture', props.picture);
    localStorage.setItem('todo_tasks_user_bio', props.bio);
    localStorage.setItem('todo_tasks_user_email', props.email);
    localStorage.setItem('todo_tasks_user_phone_number', props.phone_number);
    localStorage.setItem('is_friend', 'true');
    history.push('/feed/'+props.username);
    window.location.reload();
  }
  

  return (
    <Card id={"connection_"+props.id} sx={{display:'flex', flexDirection:'row', paddingTop:'5px'}}>
        <CardHeader sx={{flex:'5'}}
        onClick={handleClick}
        avatar={
          <Avatar aria-label="profile picture" src={props.picture}>
          </Avatar>
        }
        title={
          <Typography>
            <h4>
            {props.name}
            </h4>
          </Typography>
        }
        />
        <Stack sx={{display:'flex', flexDirection:'row'}}>
        <IconButton onClick={handleUnfollow} color="error" aria-label="Unfollow" component="span" sx={{flex:'1'}}>
        <PersonRemoveIcon  />
        </IconButton>
        <IconButton onClick={handleBlock} color="error"aria-label="Block" component="span" sx={{flex:'1'}}>
        <BlockIcon />
        </IconButton>
        </Stack>
        </Card>
  );
}