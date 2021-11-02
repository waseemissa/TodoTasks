import * as React from 'react';
import MainNavigation from "../Components/Layout/MainNavigation";
import Grid from '@mui/material/Grid';
import UserCard from "../Components/UserCard";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useEffect } from 'react';
import Pusher from 'pusher-js';
import UserComment from '../Components/UserComment';


function MessagesPage(){

  const username = localStorage.getItem('full_name');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  let allMessages = [];

  useEffect(() => {

    Pusher.logToConsole = true;

    const pusher = new Pusher('88b8b9f2f7269cc451cd', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('my-channel');
    channel.bind('message', function(data) {
      allMessages.push(data);
      setMessages(allMessages);
    });
  },[])

  const submit = async e =>{
    const authorization = localStorage.getItem('token');
    console.log(username);
    console.log(message);
    await fetch('https://todotasks.tk/api/auth/message',{
      method : 'POST',
      headers : {'accepts' : 'application/json', 'Authorization' : authorization},
      body : new URLSearchParams({
        'username' : username,
        'message' : message
      })

    })
    setMessage('');
  }

    return (
        <div>
            <MainNavigation />
            <Grid container spacing={3} sx={{paddingTop:"15px"}}>
  <Grid item xs>
    <UserCard></UserCard>
  </Grid>
  <Grid item xs={12} lg={9} style={{position: 'relative',height:'680px'}}>
  <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
      <Box sx={{ height: '30px', display:'flex', flexDirection:'row', paddingBottom:'0px', marginBottom:'15px'}} >
          <Typography sx={{ mt: 4, mb: 2}} variant="h5" color="black" sx={{maxWidth:'900px',fontFamily:'Roboto'}}>
            Chat with Everyone on Todo Tasks
          </Typography>
          </Box>
          <div id="messages_div" style={{height:'500px',overflow:'auto',background:'#fff'}}>
            {messages.map(message => {
              return(
                <UserComment picture="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" name={message.username} text={message.message}/>
                );
            })}
          
            
            
            </div>
            <div style={{position: 'absolute', bottom: '0px' , paddingBottom:'20px', display:'flex', flexDirection:'row', width:'90%',alignItems:'center', gap:'10px', height:'40px'}}>
            <TextField
          id="outlined-multiline-flexible"
          label="Send a message"
          variant="standard"
          value={message}
          onChange={e=> setMessage(e.target.value)}
          style={{ width:'89%'}}
        />
                
            
            <Button onClick={submit} variant="contained" endIcon={<SendIcon />} style={{flex:'1',height:'40px', position:'absolute', right:'0', width:'10%', marginLeft:'5px'}}>
                 Send
                </Button>
            </div>
            
      </Container>
    </React.Fragment>

  </Grid>

</Grid>
        </div>
    )

}

export default MessagesPage;