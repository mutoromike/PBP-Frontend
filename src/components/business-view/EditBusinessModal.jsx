import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { url, headers } from "../../constants/Utils";

class EditBusinessModal extends Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
    this.inputChanged = this.inputChanged.bind(this);
    this.editBusiness = this.editBusiness.bind(this);
    this.state = {
      open: true,
      form: {
        name: props.business.name,
        address: props.business.address,
        country: props.business.country,
        countries: props.business.countries.join(","),
        accounting_software: props.business.accounting_software,
        revenue: props.business.revenue,
        entity: props.business.entity,
        abbreviated_name: props.business.abbreviated_name,
      },
    };
  }
  editBusiness = (e, business) => {
    const head = { ...headers, Authorization: localStorage.getItem("Token") };
    e.preventDefault();
    axios({
      method: "put",
      url: url["base-url"] + `/api/v1/business/${business.uuid}`,
      headers: head,
      data: this.state.form,
    })
      .then((resp) => {
        toast.success(resp.data.message);
        this.props.onGet();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  onClose() {
    this.setState({ open: false });
    this.props.onClose();
  }
  inputChanged(e) {
    const { value, name } = e.target;
    this.setState({
      form: Object.assign({}, this.state.form, { [name]: value }),
    });
  }
  render() {
    const { open, form } = this.state;
    const { business, onGet } = this.props;
    return (
      <div>
        <div className="col-md-4" show={open} onHide={this.onClose}>
          {/* The modal  */}
          <div
            className="modal fade"
            id="flipFlip"
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
                    Edit Business Details
                  </h4>
                </div>
                <div className="modal-body">
                  {/* panel-heading */}
                  <div style={{ paddingTop: 30 }} className="panel-body">
                    <form
                      id="loginform"
                      className="form-horizontal"
                      onSubmit={(e) => this.editBusiness(e, business)}
                    >
                      <div>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          value={this.state.form.name}
                          onChange={this.inputChanged}
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
                          value={this.state.form.abbreviated_name}
                          onChange={this.inputChanged}
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
                          value={this.state.form.address}
                          onChange={this.inputChanged}
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
                          value={this.state.form.country}
                          onChange={this.inputChanged}
                          placeholder="Country"
                          required
                        />
                      </div>
                      <br />
                      <div>
                        <input
                          type="text"
                          name="countries"
                          className="form-control"
                          value={this.state.form.countries}
                          onChange={this.inputChanged}
                          placeholder="Countries of Operation"
                          required
                        ></input>
                      </div>
                      <br />
                      <div>
                        <input
                          type="text"
                          name="revenue"
                          className="form-control"
                          value={this.state.form.revenue}
                          onChange={this.inputChanged}
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
                          value={this.state.form.entity}
                          onChange={this.inputChanged}
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
                          value={this.state.form.accounting_software}
                          onChange={this.inputChanged}
                          placeholder="Accounting Software"
                          required
                        ></input>
                      </div>
                      <br />
                      <div className="form-group">
                        <div className="row">
                          <div className="col-sm-8 col-sm-offset-4">
                            <button type="submit" className="btn btn-primary">
                              Save
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
}

export default EditBusinessModal;
