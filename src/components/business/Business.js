import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import getLabels from "react-select-country-list";
import axios from "axios";
import MediaQuery from "react-responsive";
import { Redirect } from "react-router-dom";
import { url, headers } from "../../constants/Utils";
import BusinessView from "./../business-view/BusinessView";

const animatedComponents = makeAnimated();
class Business extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      redirect: false,
      business: [],
      options: [],
      countries: [],
      form: {
        name: "",
        address: "",
        country: "",
        abbreviated_name: "",
        revenue: "",
        accounting_software: "",
        entity: "",
      },
    };
    this.getBusiness = this.getBusiness.bind(this);
  }
  createBusiness = (event) => {
    const header = { ...headers, Authorization: localStorage.getItem("Token") };
    const countries = { countries: this.state.countries.join() };
    event.preventDefault();
    axios({
      method: "post",
      url: url["base-url"] + "/api/v1/business",
      headers: header,
      data: { ...this.state.form, ...countries },
    })
      .then((resp) => {
        toast.success(resp.data.message);
        this.getBusiness();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  getBusiness = () => {
    const head = { ...headers, Authorization: localStorage.getItem("Token") };
    axios({
      method: "get",
      url: url["base-url"] + "/api/v1/business",
      headers: head,
    })
      .then((resp) => {
        this.setState({
          business: Object.values(resp.data),
        });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  changeHandler = (value) => {
    this.setState((state) => {
      return {
        ...state,
        countries: value,
      };
    });
  };
  onChange = (event) => {
    const myState = this.state;
    myState.form[event.target.name] = event.target.value;
    this.setState(myState);
  };
  componentWillMount() {
    this.getBusiness();
    const data = getLabels();
    const myState = this.state;
    myState.options = Object.values(data.valueMap);
    this.setState(myState);
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
                        {this.state.business.map((business) => (
                          <BusinessView
                            key={business.id}
                            business={business}
                            onDelete={this.deleteEvent}
                            onGet={this.getBusiness}
                          />
                        ))}
                      </div>
                      <div className="col-md-4">
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-toggle="modal"
                          data-target="#flipFlop"
                        >
                          Create New Business
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
                                    onSubmit={this.createBusiness}
                                  >
                                    <div>
                                      <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        onChange={this.onChange}
                                        placeholder="Business Name"
                                        required
                                      />
                                    </div>

                                    <br />
                                    <div>
                                      <input
                                        type="text"
                                        name="abbreviated_name"
                                        className="form-control"
                                        onChange={this.onChange}
                                        placeholder="Business Abbreviation"
                                        required
                                      />
                                    </div>
                                    <br />
                                    <div>
                                      <input
                                        type="text"
                                        name="address"
                                        className="form-control"
                                        onChange={this.onChange}
                                        placeholder="Company Address"
                                        required
                                      />
                                    </div>
                                    <br />
                                    <div>
                                      <input
                                        type="text"
                                        name="country"
                                        className="form-control"
                                        onChange={this.onChange}
                                        placeholder="Country"
                                        required
                                      />
                                    </div>
                                    <br />
                                    <div>
                                      <Select
                                        closeMenuOnSelect={false}
                                        options={this.state.options}
                                        value={this.state.form.countries}
                                        isMulti
                                        placeholder={"Countries of Operation"}
                                        onChange={this.changeHandler}
                                        getOptionLabel={(option) => option}
                                        getOptionValue={(option) => option}
                                        components={animatedComponents}
                                      />
                                    </div>
                                    <br />
                                    <div>
                                      <input
                                        type="text"
                                        name="revenue"
                                        className="form-control"
                                        onChange={this.onChange}
                                        placeholder="Annual Sales Revenue"
                                        required
                                      ></input>
                                    </div>
                                    <br />
                                    <div>
                                      <input
                                        type="text"
                                        name="entity"
                                        className="form-control"
                                        onChange={this.onChange}
                                        placeholder="Entity"
                                        required
                                      ></input>
                                    </div>
                                    <br />
                                    <div>
                                      <input
                                        type="text"
                                        name="accounting_software"
                                        className="form-control"
                                        onChange={this.onChange}
                                        placeholder="Accounting Software"
                                        required
                                      ></input>
                                    </div>
                                    <br />
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
                        Create New Business
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
                                  <div>
                                    <input
                                      type="text"
                                      name="name"
                                      className="form-control"
                                      onChange={this.onChange}
                                      placeholder="Business Name"
                                      required
                                    />
                                  </div>
                                  <br />
                                  <div>
                                    <input
                                      type="text"
                                      name="abbreviated_name"
                                      className="form-control"
                                      onChange={this.onChange}
                                      placeholder="Business Abbreviation"
                                      required
                                    />
                                  </div>
                                  <br />
                                  <div>
                                    <input
                                      type="text"
                                      name="address"
                                      className="form-control"
                                      onChange={this.onChange}
                                      placeholder="Company Address"
                                      required
                                    />
                                  </div>
                                  <br />
                                  <div>
                                    <input
                                      type="text"
                                      name="country"
                                      className="form-control"
                                      onChange={this.onChange}
                                      placeholder="Country"
                                      required
                                    />
                                  </div>
                                  <br />
                                  <div>
                                    <Select
                                      closeMenuOnSelect={false}
                                      options={this.state.options}
                                      value={this.state.form.countries}
                                      isMulti
                                      placeholder={"Countries of Operation"}
                                      onChange={this.changeHandler}
                                      getOptionLabel={(option) => option}
                                      getOptionValue={(option) => option}
                                      components={animatedComponents}
                                    />
                                  </div>
                                  <br />
                                  <div>
                                    <input
                                      type="text"
                                      name="revenue"
                                      className="form-control"
                                      onChange={this.onChange}
                                      placeholder="Annual Sales Revenue"
                                      required
                                    ></input>
                                  </div>
                                  <br />
                                  <div>
                                    <input
                                      type="text"
                                      name="entity"
                                      className="form-control"
                                      onChange={this.onChange}
                                      placeholder="Entity"
                                      required
                                    ></input>
                                  </div>
                                  <br />
                                  <div>
                                    <input
                                      type="text"
                                      name="accounting_software"
                                      className="form-control"
                                      onChange={this.onChange}
                                      placeholder="Accounting Software"
                                      required
                                    ></input>
                                  </div>
                                  <br />

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
                      {this.state.business.map((business) => (
                        <BusinessView
                          key={business.id}
                          business={business}
                          onDelete={this.deleteEvent}
                          onGet={this.getBusiness}
                        />
                      ))}
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

export default Business;
