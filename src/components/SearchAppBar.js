import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link} from 'react-router-dom';
import React, { Component } from 'react'

class SearchAppBar extends Component {
  render() {
    return (
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            
          >
            <Link to='/'>
            <AccountCircleIcon/>
            </Link>
           
          
            
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display:'flex' ,justifyContent:'left'}}
          >
           Rently Users
          </Typography>
         
        </Toolbar>
      </AppBar>
    </Box>
    )
  }
}

export default SearchAppBar



  