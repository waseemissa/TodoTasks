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
import WorkIcon from '@mui/icons-material/Work';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { display } from '@mui/system';
import { PinDropRounded } from '@mui/icons-material';

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

export default function UserExperience(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
     const [position, setPosition] = useState(props.position);
     const [company, setCompany] = useState(props.company);
     const [start_date, setStartDate] = useState(props.start_date);
     const [end_date, setEndDate] = useState(props.end_date);

     const handleEditPosition = () =>setPosition(document.getElementById('position').value);
     const handleEditCompany = () =>setCompany(document.getElementById('company').value);
     const handleEditStartDate = () =>setStartDate(document.getElementById('start_date').value);
     const handleEditEndDate = () =>setEndDate(document.getElementById('end_date').value);

     const handleDelete = () => {
       deleteExperience();
       document.getElementById(props.id).style.display = "none";
     }
   
     const handleUpdate = () => {
       updateExperience();
       handleClose();
     }
   
   
   
     function updateExperience(){
       updateExperienceAPI().then(update_response=>{
         console.log(update_response);
         
   }).catch(error => {
       console.log(error.message);
   });
   
   }
   
   
   async function updateExperienceAPI(){
     const id = props.id;
     const authorization = localStorage.getItem('token');
     console.log(id);
   
       const response = await fetch("https://todotasks.tk/api/auth/update-job", {
           method: 'POST',
           headers : {'accepts' : 'application/json', 'Authorization' : authorization},
           body: new URLSearchParams({
             'job_id' : id,
             'position': position,
             'company': company,
             'start_date': start_date,
             'end_date': end_date
   
           })
       });
   
       if(!response.ok){
         const message = "ERROR OCCURED";
         throw new Error(message);
     }
     
     const update_response = await response.json();
     return update_response;
   }
   
   function deleteExperience(){
     deleteExperienceAPI().then(delete_response=>{
       console.log(delete_response);
       
   }).catch(error => {
     console.log(error.message);
   });
   
   }
   
   
   async function deleteExperienceAPI(){
   const id = props.id;
   const authorization = localStorage.getItem('token');
   
   
     const response = await fetch("https://todotasks.tk/api/auth/delete-job", {
         method: 'POST',
         headers : {'accepts' : 'application/json', 'Authorization' : authorization},
         body: new URLSearchParams({
           'job_id' : id,
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
        <CardHeader 
        style={{fontFamily:'Roboto'}}
        sx={{flex:'5'}}
        avatar={
          <Avatar sx={{ bgcolor: 'primary.dark' }} aria-label="recipe">
            <WorkIcon />
          </Avatar>
        }
        title={<Typography>
          <p>{position} at {company}</p>
          <p>From {start_date} till {end_date}</p>
        </Typography>}
        />
        <Stack sx={{display:'flex', flexDirection:'row'}}>
        <IconButton onClick={handleOpen} style={{color:'#1976d2'}} aria-label="Edit" component="span" sx={{flex:'1'}}>
        <EditIcon />
        </IconButton>
        <IconButton onClick={handleDelete} color="error"aria-label="Edit" component="span" sx={{flex:'1'}}>
        <DeleteIcon  />
        </IconButton>
        </Stack>
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
            <Typography id="title" variant="h6">Edit Experience</Typography>
            <Box sx={{display:'flex', flexDirection:'column'}}>
            <TextField sx={{marginTop:'15px'}} id="position"  label="Position" variant="outlined" value={position} onChange={handleEditPosition}></TextField>
            <TextField sx={{marginTop:'15px'}} id="company" label="Company" variant="outlined" value={company} onChange={handleEditCompany} ></TextField>
            <TextField sx={{marginTop:'15px'}} id="start_date" label="Start Date" variant="outlined" value={start_date} onChange={handleEditStartDate} ></TextField>
            <TextField sx={{marginTop:'15px'}} id="end_date" label="End Date" variant="outlined" value={end_date} onChange={handleEditEndDate} ></TextField>
            <Button sx={{marginTop:'15px'}} variant="contained" onClick={handleUpdate}>Save</Button>
            </Box>
            </Box>
        </Modal>
        </Card>

  );
}