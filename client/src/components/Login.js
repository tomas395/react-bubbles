import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

// Lambda School
// i<3Lambd4

class Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: ""
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  login = e => {
    e.preventDefault();

    axiosWithAuth()
      .post("/login", this.state.credentials)
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.data.payload);
        this.props.history.push("/protected");
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <legend>Please Login</legend>
        <form onSubmit={this.login}>
          <input
            type="text"
            name="username"
            placeholder="Enter Name"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <button>Log in</button>
          {this.state.isFetching && "logging in"}
        </form>
      </div>
    );
  }
}

export default Login;
