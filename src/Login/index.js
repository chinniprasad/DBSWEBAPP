import React, { Component } from "react";
import "./index.css";
import swal from "sweetalert"
import axios from "axios"

class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    };
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  //when user enter then submit this function
  formSubmit = (event) => {
    if (event.key === "Enter") {
      this.onSubmitLogin(event)
    }
  }
  //when user login call this api
  onSubmitLogin = async () => {
    let { username, password } = this.state;
    try {
      let config = {
        method: "get",
        url: `http://localhost:5000/v1/users/login/${username}/${encodeURIComponent(password)}`
      };
      let { data } = await axios(config)
      if (data.success) {
        sessionStorage.setItem("userData", JSON.stringify(data))
        swal({
          title: "Success",
          text: data.message,
          icon: "success",
          buttons: false,
          timer: 2000
        })
        window.location.href = "/home"
      }
    } catch (error) {
      console.log(error);
      swal({
        title: "Error!",
        text: "Please Provide Valid Credentials",
        icon: "error",
        buttons: false,
        timer: 2000
      })
    }
  };

  render() {
    return (
      <div className="form">
        <div className="form-login">
          <div className="form-title">Login</div>
          <div className="form-row">
            <input type="text" name="username" placeholder="Email" onChange={this.handleChange} onKeyPress={(e) => { this.formSubmit(e) }} />
          </div>
          <div className="form-row">
            <input type="password" name="password" placeholder="Password" onChange={this.handleChange} onKeyPress={(e) => { this.formSubmit(e) }} />
          </div>
          <div className="form-row">
            <button onClick={this.onSubmitLogin}>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;