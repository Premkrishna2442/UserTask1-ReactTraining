import "../index.css";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { grey, green, pink, red } from "@mui/material/colors";

import React, { Component } from "react";

class Add extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disable: true,
      userDetails: { name: "", gender: "", email: "", status: "" },
      userErr: { nameErr: "", emailErr: "" },
    };
  }
  handleSubmit = (e) => {
    // navigate("/");
    // console.log(userDetails);
    axios
      .post("https://gorest.co.in/public/v2/users", this.state.userDetails, {
        headers: {
          Authorization:
            "Bearer ece8044b8a652c2fc64733c3872af8604f8126593e3b1b17b536754c584ac14c",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => response.data());
    // .then((json)=>console.log(json))
  };

  validateName = (e) => {
    if (this.state.userDetails.name.length > 25) {
      this.setState({ Disable: true });
      this.setState({userErr:{ ...this.state.userErr, nameErr: "Name should be less than 25 characters",}});
    } else if (this.state.userDetails.name.length < 8) {
      this.setState({ Disable: true });
      this.setState({userErr:{ ...this.state.userErr, nameErr: "Atleast 8 characters" }});
    } else {
      this.setState({ Disable: false });
      this.setState({userErr:{ ...this.state.userErr, nameErr: "" }});
    }
  };

  validateEmail = (e) => {
    const emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$";

    if (this.state.userDetails.email.match(emailPattern)) {
      this.setState({ disable: false });
      this.setState({userErr:{ ...this.state.userErr, emailErr: "" }});
    } else {
      this.setState({userErr:{ disable: true }});
      this.setState({userErr:{
        ...this.state.userErr,
        emailErr: "email pattern is wrong",
      }});
    }
  };
  render() {
    const { disable, userDetails, userErr } = this.state;
    return (
      <div>
        <div className="form">
          <h1 className="form-head"> Add User</h1>
          <input
            className="input-form"
            type="text"
            placeholder="Name"
            value={userDetails.name}
            onChange={(e) => {
              this.validateName(e);
              this.setState({ userDetails:{...userDetails, name: e.target.value} });
            }}
          />
          <div>{userErr.nameErr}</div>
          <br />
          <div className="gender">
            <FormControl className="radio-butt">
              <FormLabel id="demo-controlled-radio-buttons-group">
                Gender
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={userDetails.gender}
                onChange={(e) => {
                  this.setState({ userDetails : { ...userDetails, gender: e.target.value }});
                }}
              >
                <FormControlLabel
                  className="gender-lable"
                  value="male"
                  control={
                    <Radio
                      sx={{
                        color: grey[800],
                        "&.Mui-checked": {
                          color: green[600],
                        },
                      }}
                    />
                  }
                  label="Male"
                />
                <FormControlLabel
                  className="gender-lable"
                  value="female"
                  control={
                    <Radio
                      sx={{
                        color: grey[800],
                        "&.Mui-checked": {
                          color: pink[600],
                        },
                      }}
                    />
                  }
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <br />
          <input
            className="input-form"
            type="text"
            placeholder="E-mail"
            value={userDetails.email}
            onChange={(e) => {
              this.validateEmail(e);
              this.setState({ userDetails: {...userDetails, email: e.target.value}});
            }}
          />
          <div>{userErr.emailErr}</div>
          <br />
          <div className="gender">
            <FormControl className="radio-butt">
              <FormLabel id="demo-controlled-radio-buttons-group">
                Status
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={userDetails.status}
                onChange={(e) => {
                  this.setState({userDetails:{ ...userDetails, status: e.target.value }});
                }}
              >
                <FormControlLabel
                  className="gender-lable"
                  value="active"
                  control={
                    <Radio
                      sx={{
                        color: green[800],
                        "&.Mui-checked": {
                          color: green[600],
                        },
                      }}
                    />
                  }
                  label="Active"
                />
                <FormControlLabel
                  className="gender-lable"
                  value="inactive"
                  control={
                    <Radio
                      sx={{
                        color: red[800],
                        "&.Mui-checked": {
                          color: red[600],
                        },
                      }}
                    />
                  }
                  label="inActive"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <br />
          {disable ? (
            <button
              className="submit-button disabled"
              onClick={this.handleSubmit}
              disabled
            >
              Add
            </button>
          ) : (
            <button className="submit-button " onClick={this.handleSubmit}>
              Add
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Add;
