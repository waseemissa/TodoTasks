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
import StarIcon from '@mui/icons-material/Star';



export default function UserSkill(props) {


  return (
    <Card id={props.id} sx={{display:'flex', flexDirection:'row', paddingTop:'5px'}}>
        <CardHeader sx={{flex:'5'}}
        avatar={
          <Avatar sx={{ bgcolor: 'primary.dark' }} aria-label="recipe">
            <StarIcon />
          </Avatar>
        }
        title={props.title}
        />
        </Card>
  );
}