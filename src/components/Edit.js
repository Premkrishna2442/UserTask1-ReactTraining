import React, { useState } from "react";
import "../index.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { grey ,green,pink,red} from '@mui/material/colors';

function Edit() {
  const id = useLocation();

  const [userDetails, setUserdetails] = useState({
    name: id.state.name,
    gender: id.state.gender,
    email: id.state.email,
    status: "active",
  });
  const [disable, setDisable] = useState(true);
  const [userErr, setuserErr] = useState({
    nameErr: "",
    emailErr: "",
  });

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    navigate("/");
    // console.log(id.state.ids);
    axios
      .put(`https://gorest.co.in/public/v2/users/${id.state.ids}`, userDetails, {
        headers: {
          Authorization:
            "Bearer ece8044b8a652c2fc64733c3872af8604f8126593e3b1b17b536754c584ac14c",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => response.data())
      // .then((json) => console.log(json));
  };
  const validateName = (e) => {
    if(userDetails.name.length > 25) {
     setDisable(true);
     setuserErr({ ...userErr, nameErr: "Name should be less than 25 characters" });
   }else if(userDetails.name.length < 8) {
     setDisable(true);
     setuserErr({ ...userErr, nameErr: "Atleast 8 characters" });
   }else {
     setDisable(false);
     setuserErr({ ...userErr, nameErr: "" });
   } 
 };

 const validateEmail = (e) => {
   const emailPattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"

   if (userDetails.email.match(emailPattern)) {
     setDisable(false);
     setuserErr({ ...userErr, emailErr: "" });
   } else {
     setDisable(true);
     setuserErr({ ...userErr, emailErr: "email pattern is wrong" });
   }
 };

  return (
    <div>
      <div className="form">
        <h1 className="form-head"> Edit User</h1>

        <input
          type="text"
          className="input-form"
          placeholder="Name"
          value={userDetails.name}
          onChange={(e) => {
            validateName(e);
            setUserdetails({ ...userDetails, name: e.target.value });
          }}
        />
      <div>{userErr.nameErr}</div>


     
        <div className="gender"> 
        <FormControl className="radio-butt">
      <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={userDetails.gender}
        onChange={(e) => {
          setUserdetails({ ...userDetails, gender: e.target.value });
        }}
      >
        <FormControlLabel className='gender-lable' value="male" control={<Radio sx={{
          color: grey[800],
          '&.Mui-checked': {
            color: green[600],
          },
        }}/>} label="Male" />
        <FormControlLabel className='gender-lable' value="female" control={<Radio sx={{
          color: grey[800],
          '&.Mui-checked': {
            color: pink[600],
          },
        }}/>} label="Female" />
      </RadioGroup>
    </FormControl>
    </div>
        <input
          type="text"
          className="input-form"
          placeholder="E-mail"
          value={userDetails.email}
          onChange={(e) => {
            validateEmail(e);
            setUserdetails({ ...userDetails, email: e.target.value });
          }}
        />
        <div>{userErr.emailErr}</div>
      
        <div className="gender">
        <FormControl className="radio-butt">
      <FormLabel id="demo-controlled-radio-buttons-group">Status</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={userDetails.status}
        onChange={(e) => {
          setUserdetails({ ...userDetails, status: e.target.value });
        }}
      >
        <FormControlLabel className='gender-lable' value="active" control={<Radio sx={{
          color: green[800],
          '&.Mui-checked': {
            color: green[600],
          },
        }}/>} label="Active" />
        <FormControlLabel className='gender-lable' value="inactive" control={<Radio sx={{
          color: red[800],
          '&.Mui-checked': {
            color: red[600],
          },
        }}/>} label="inActive" />
      </RadioGroup>
    </FormControl>
    </div>
    {disable ? (
          <button
            className="submit-button disabled"
            onClick={handleSubmit}
            disabled
          >
            Add
          </button>
        ) : (
          <button className="submit-button " onClick={handleSubmit}>
            Add
          </button>
        )}
      </div>
    </div>
  );
}

export default Edit;
