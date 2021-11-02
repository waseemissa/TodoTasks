import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
export default function Comment() {
    return (
        <Box sx={{ display: 'flex', direction: 'row', paddingTop:'5px'}}>
        <TextField id="standard-basic" label="Type your comment" variant="standard" sx={{flex: '3'}}/>
        <Button variant="contained" >Post</Button>
        </Box>
    );
  }
  