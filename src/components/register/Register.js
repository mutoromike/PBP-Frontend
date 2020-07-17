import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { url, headers } from "../../constants/Utils";

class Register extends Component {
  state = {
    message: "",
    form: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    redirect: false,
  };
  
  registerSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: url["base-url"] + "/api/v1/auth/register",
      headers,
      data: this.state.form,
    })
      .then((resp) => {
        toast.success(resp.data.message);
        if (resp.data.token) {
          localStorage.setItem("Token", resp.data.token);
          this.props.history.push("/business");
        } else {
          this.setState({ redirect: false });
        }
      })
      .catch((err) => {
        console.log(err);
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
    return (
      <div className="container page-content" style={{ marginTop: 100 }}>
        <ToastContainer
          hideProgressBar={true}
          newestOnTop={true}
          autoClose={6000}
        />
        <div className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
          <div className="panel panel-login" id="heading">
            <div className="panel-heading">
              <div className="row">
                <div className="col-xs-12">
                  <a className="active" id="register-form-link">
                    Sign Up
                  </a>
                </div>
              </div>
              <hr />
            </div>
            <div className="panel panel-body">
              <div className="row">
                <div className="col-lg-12">
                  <form
                    id="register-form"
                    onSubmit={this.registerSubmit}
                    method="post"
                  >
                    <div className="input-group" style={{ marginBottom: 16 }}>
                      <span className="input-group-addon">
                        <i className="glyphicon glyphicon-user"></i>
                      </span>
                      <input
                        type="text"
                        name="first_name"
                        onChange={this.onChange}
                        className="form-control"
                        placeholder="First name"
                        required
                      />
                    </div>
                    <div className="input-group" style={{ marginBottom: 16 }}>
                      <span className="input-group-addon">
                        <i className="glyphicon glyphicon-user"></i>
                      </span>
                      <input
                        type="text"
                        name="last_name"
                        onChange={this.onChange}
                        className="form-control"
                        placeholder="Last name"
                        required
                      />
                    </div>
                    <div className="input-group" style={{ marginBottom: 16 }}>
                      <span className="input-group-addon">
                        <i className="glyphicon glyphicon-envelope"></i>
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        onChange={this.onChange}
                        placeholder="Email Address"
                        required
                      />
                    </div>
                    <div className="input-group" style={{ marginBottom: 16 }}>
                      <span className="input-group-addon">
                        <i className="glyphicon glyphicon-lock"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={this.onChange}
                        placeholder="Password"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-sm-6 col-sm-offset-3">
                          <input
                            type="submit"
                            ref="register-submit"
                            id="register-submit"
                            className="form-control btn btn-primary"
                            value="Register Now"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group text-center">
                      <Link to="/login" className="page-scroll">
                        Already have an account?Login
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;
