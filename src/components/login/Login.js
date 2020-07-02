import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { url, headers } from "../../constants/Utils";

class Login extends Component {
  state = {
    message: "",
    form: {
      email: "",
      password: "",
    },
    redirect: false,
  };
  loginSubmit = (event) => {
    event.preventDefault(); // prevent form auto-reloads
    axios({
      method: "post",
      url: url["base-url"] + "/api/v1/auth/login",
      headers,
      data: this.state.form,
    })
      .then((resp) => {
        toast.success(resp.data.message);
        if (resp.data.token) {
          localStorage.setItem("Token", resp.data.token);
          this.props.history.replace("/dashboard");
        } else {
          this.setState({ redirect: false });
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  onChange = (event) => {
    const myState = this.state;
    myState.form[event.target.name] = event.target.value;
    this.setState(myState);
  };
  render() {
    const { form } = this.state;
    // if (localStorage.getItem("Token")) {
    //   return <Redirect to={"/myEvents"} />;
    // }
    return (
      <div className="container page-content" style={{ marginTop: 100 }}>
        <ToastContainer
          hideProgressBar={true}
          newestOnTop={true}
          autoClose={3000}
        />
        <div
          id="loginbox"
          className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2"
        >
          <div className="panel panel-login " id="heading">
            <div className="panel-heading">
              <div className="row">
                <div className="col-xs-12">
                  <a className="active">Login</a>
                </div>
              </div>
              <hr />
            </div>
            <div style={{ paddingTop: 30 }} className="panel-body">
              <form
                id="loginform"
                onSubmit={this.loginSubmit}
                method="post"
                className="form-horizontal"
              >
                <div style={{ marginBottom: 25 }} className="input-group ">
                  <span className="input-group-addon">
                    <i className="glyphicon glyphicon-envelope"></i>
                  </span>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    onChange={this.onChange}
                    placeholder="Email"
                    required
                  />
                </div>

                <div style={{ marginBottom: 25 }} className="input-group">
                  <span className="input-group-addon">
                    <i className="glyphicon glyphicon-lock"></i>
                  </span>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    onChange={this.onChange}
                    placeholder="Password "
                    required
                  />
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-6 col-sm-offset-3">
                      <input
                        type="submit"
                        className="form-control btn btn-primary"
                        value="Log In"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group text-center">
                  <Link to="/register" className="forgot-password">
                    Don't have an account?Register
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
