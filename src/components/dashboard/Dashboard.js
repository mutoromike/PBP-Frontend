import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import MediaQuery from "react-responsive";
import { Redirect } from "react-router-dom";
import { url, headers } from "../../constants/Utils";
import Business from "./../business/Business";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      redirect: false,
      events: [],
      form: {
        name: "",
        category: "",
        location: "",
        date: "",
        description: "",
      },
    };
    this.getEvent = this.getEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
  }
  createBusiness = (event) => {
    const header = { ...headers, Authorization: localStorage.getItem("Token") };
    event.preventDefault();
    axios({
      method: "post",
      url: "createbusiness",
      headers: header,
      data: this.state.form,
    })
      .then((resp) => {
        toast.success(resp.data.message);
        this.getEvent();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  deleteBusiness = (eventId) => {
    const head = { ...headers, Authorization: localStorage.getItem("Token") };
    axios({
      method: "delete",
      url: `delete/businessId`,
      headers: head,
      data: this.state.form,
    })
      .then((resp) => {
        toast.success(resp.data.message);
        this.getEvent();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  getBusinesses = () => {
    const head = { ...headers, Authorization: localStorage.getItem("Token") };
    axios({
      method: "get",
      url: "getbusiness",
      headers: head,
    })
      .then((resp) => {
        this.setState({
          events: resp.data,
        });
      })
      .catch((err) => {
        toast.error("Please log in!");
      });
  };

  onChange = (event) => {
    const myState = this.state;
    myState.form[event.target.name] = event.target.value;
    this.setState(myState);
  };
  // Get all user events after the page has loaded
  componentWillMount() {
    this.getBusinesses();
  }

  render() {
    const { form } = this.state;
    if (this.state.redirect) {
      return <Redirect to={"/login"} />;
    }

    return (
      <div className="container page-content" style={{ marginTop: 100 }}>
        <ToastContainer
          hideProgressBar={true}
          newestOnTop={true}
          autoClose={3000}
        />
        <div className="row container">
          <div className="col-md-12">
            <MediaQuery minDeviceWidth={700}>
              {(matches) => {
                if (matches) {
                  return (
                    <div className="row">
                      <div className="col-md-8">
                        {/* {this.state.events.map((event) => (
                          <Event
                            key={event.id}
                            event={event}
                            onDelete={this.deleteEvent}
                            onGet={this.getEvent}
                          />
                        ))} */}
                      </div>
                      <div className="col-md-4">
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-toggle="modal"
                          data-target="#flipFlop"
                        >
                          Create New
                        </button>

                        {/* The modal  */}
                        <div
                          className="modal fade"
                          id="flipFlop"
                          tabIndex="-1"
                          role="dialog"
                          aria-labelledby="modalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog" role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title" id="modalLabel">
                                  Create Business
                                </h4>
                              </div>
                              <div className="modal-body">
                                {/* panel-heading */}
                                <div
                                  style={{ paddingTop: 30 }}
                                  className="panel-body"
                                >
                                  <form
                                    id="loginform"
                                    className="form-horizontal"
                                    onSubmit={this.createEvent}
                                  >
                                    <div
                                      style={{ marginBottom: 25 }}
                                      className="input-group "
                                    >
                                      <span className="input-group-addon"></span>
                                      <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        onChange={this.onChange}
                                        placeholder="Event Name"
                                        required
                                      />
                                    </div>

                                    <div
                                      style={{ marginBottom: 25 }}
                                      className="input-group "
                                    >
                                      <span className="input-group-addon"></span>
                                      <input
                                        type="text"
                                        name="category"
                                        className="form-control"
                                        onChange={this.onChange}
                                        placeholder="Category"
                                        required
                                      />
                                    </div>

                                    <div
                                      style={{ marginBottom: 25 }}
                                      className="input-group "
                                    >
                                      <span className="input-group-addon"></span>
                                      <input
                                        type="text"
                                        name="location"
                                        className="form-control"
                                        onChange={this.onChange}
                                        placeholder="Location"
                                        required
                                      />
                                    </div>

                                    <div
                                      style={{ marginBottom: 25 }}
                                      className="input-group "
                                    >
                                      <span className="input-group-addon"></span>
                                      <input
                                        type="date"
                                        name="date"
                                        className="form-control"
                                        onChange={this.onChange}
                                        placeholder="Date"
                                        required
                                      />
                                    </div>

                                    <div
                                      style={{ marginBottom: 25 }}
                                      className="input-group "
                                    >
                                      <div className="input-group-addon"></div>
                                      <textarea
                                        type="text"
                                        name="description"
                                        className="form-control"
                                        onChange={this.onChange}
                                        placeholder="Description"
                                        required
                                      ></textarea>
                                    </div>

                                    <div className="form-group">
                                      <div className="row">
                                        <div className="col-sm-8 col-sm-offset-4">
                                          <button
                                            type="submit"
                                            className="btn btn-primary"
                                          >
                                            Create Business
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-dismiss="modal"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* panel success */}
                      </div>
                    </div>
                  );
                }
                return (
                  <div className="row">
                    <div className="col-md-4" style={{ marginBottom: 30 }}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target="#flipFlop"
                      >
                        Create New
                      </button>

                      {/* The modal  */}
                      <div
                        className="modal fade"
                        id="flipFlop"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="modalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                              <h4 className="modal-title" id="modalLabel">
                                Create Business
                              </h4>
                            </div>
                            <div className="modal-body">
                              {/* panel-heading */}
                              <div
                                style={{ paddingTop: 30 }}
                                className="panel-body"
                              >
                                <form
                                  id="loginform"
                                  className="form-horizontal"
                                  onSubmit={this.createEvent}
                                >
                                  <div
                                    style={{ marginBottom: 25 }}
                                    className="input-group "
                                  >
                                    <span className="input-group-addon"></span>
                                    <input
                                      type="text"
                                      name="name"
                                      className="form-control"
                                      onChange={this.onChange}
                                      placeholder="Event Name"
                                      required
                                    />
                                  </div>

                                  <div
                                    style={{ marginBottom: 25 }}
                                    className="input-group "
                                  >
                                    <span className="input-group-addon"></span>
                                    <input
                                      type="text"
                                      name="category"
                                      className="form-control"
                                      onChange={this.onChange}
                                      placeholder="Category"
                                      required
                                    />
                                  </div>

                                  <div
                                    style={{ marginBottom: 25 }}
                                    className="input-group "
                                  >
                                    <span className="input-group-addon"></span>
                                    <input
                                      type="text"
                                      name="location"
                                      className="form-control"
                                      onChange={this.onChange}
                                      placeholder="Location"
                                      required
                                    />
                                  </div>

                                  <div
                                    style={{ marginBottom: 25 }}
                                    className="input-group "
                                  >
                                    <span className="input-group-addon"></span>
                                    <input
                                      type="date"
                                      name="date"
                                      className="form-control"
                                      onChange={this.onChange}
                                      placeholder="Date"
                                      required
                                    />
                                  </div>

                                  <div
                                    style={{ marginBottom: 25 }}
                                    className="input-group "
                                  >
                                    <div className="input-group-addon"></div>
                                    <textarea
                                      type="text"
                                      name="description"
                                      className="form-control"
                                      onChange={this.onChange}
                                      placeholder="Description"
                                      required
                                    ></textarea>
                                  </div>

                                  <div className="form-group">
                                    <div className="row">
                                      <div className="col-sm-8 col-sm-offset-4">
                                        <button
                                          type="submit"
                                          className="btn btn-primary"
                                        >
                                          Create Business
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* panel success */}
                    </div>
                    <div className="col-md-8">
                      {/* {this.state.events.map((event) => (
                        <Event
                          key={event.id}
                          event={event}
                          onDelete={this.deleteEvent}
                          onGet={this.getEvent}
                        />
                      ))} */}
                    </div>
                  </div>
                );
              }}
            </MediaQuery>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
