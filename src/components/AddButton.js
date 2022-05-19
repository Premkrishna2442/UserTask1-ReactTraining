
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import {Link } from "react-router-dom";
import React, { Component } from 'react'

 class FloatingActionButtonSize extends Component {
  
    fabStyle = {
    position: "fixed",
    bottom: 40,
    right: 20,
    color:'white',
  };
 
  render() {
    return (
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <Fab color="primary" aria-label="add" style={this.fabStyle}>
        <div >
          <Link to='/add'>
          <AddIcon style={{color:'white'}}/>
          </Link>
          
        </div>
      </Fab>
    </Box>
    )
  }
}

export default FloatingActionButtonSize