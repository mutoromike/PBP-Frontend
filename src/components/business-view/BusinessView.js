import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { url, headers } from "../../constants/Utils";
import EditBusinessModal from "./EditBusinessModal";

class BusinessView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      message: "",
      form: {
        name: props.name,
        address: props.address,
        country: props.country,
        countries: props.countries,
        accounting_software: props.accounting_software,
        revenue: props.revenue,
        entity: props.entity,
        abbreviated_name: props.abbreviated_name,
      },
      business: [],
    };
    this.inputChanged = this.inputChanged.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    // this
  }
  onDelete = (e, business) => {
    const head = { ...headers, Authorization: localStorage.getItem("Token") };
    e.preventDefault();
    axios({
      method: "delete",
      url: url["base-url"] + `/api/v1/business/${business.uuid}`,
      headers: head,
      data: this.state.form,
    })
      .then((resp) => {
        toast.success(resp.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  inputChanged(e) {
    const { value, name } = e.target;
    this.setState({
      form: Object.assign({}, ...this.state.form, { [name]: value }),
    });
  }

  onModalClose() {
    this.setState({ showModal: false });
  }
  render() {
    const { business, onGet } = this.props;
    return (
      <div className="panel panel-success" id="heading">
        <div className="panel-heading">
          <h2 className="panel-title">Business Details</h2>
        </div>
        {/* panel-heading */}

        <table className="table table-hover" id="activity-table">
          <tbody>
            <tr className="row">
              <label style={{ width: "60%" }}>
                <td>
                  <span>Business Name</span>
                  <div className="form-group">{business.name}</div>
                </td>
              </label>
              <label style={{ width: "40%" }}>
                <td>
                  <span>Business Abbreviation</span>
                  <div className="form-group">{business.abbreviated_name}</div>
                </td>
              </label>
            </tr>
            <tr className="row">
              <label style={{ width: "60%" }}>
                <td>
                  <span>Company Address</span>
                  <div className="form-group">{business.address}</div>
                </td>
              </label>
              <label style={{ width: "40%" }}>
                <td>
                  <span>Country</span>
                  <div className="form-group">{business.country}</div>
                </td>
              </label>
            </tr>
            <tr className="row">
              <label style={{ width: "100%" }}>
                <td>
                  <span>Countries of Operation</span>
                  <div className="form-group">
                    {business.countries.join(", ")}
                  </div>
                </td>
              </label>
            </tr>
            <tr className="row">
              <label style={{ width: "60%" }}>
                <td>
                  <span>Annual Sales Revenue</span>
                  <div className="form-group">{business.name}</div>
                </td>
              </label>
              <label style={{ width: "40%" }}>
                <td>
                  <span>Entity</span>
                  <div className="form-group">{business.abbreviated_name}</div>
                </td>
              </label>
            </tr>
            <tr className="row">
              <label style={{ width: "100%" }}>
                <td>
                  <span>Accounting Software</span>
                  <div className="form-group">
                    {business.accounting_software}
                  </div>
                </td>
              </label>
            </tr>
          </tbody>
        </table>
        <table className="table table-hover" id="activity-table">
          <tbody>
            <tr className="row">
              <td className="col-md-8 col-xs-12"></td>
              <td className="col-md-4 col-xs-12">
                <h5>
                  {/* Edit icon */}
                  <i
                    onClick={() => this.setState({ showModal: true })}
                    className="glyphicon glyphicon-edit pull-right"
                    style={{ marginRight: "4%" }}
                    data-toggle="modal"
                    data-target="#flipFlip"
                  />
                  {/* The modal  */}
                  {this.state.showModal && (
                    <EditBusinessModal
                      onClose={this.onModalClose}
                      business={business}
                      key={business.id}
                      onGet={onGet}
                    />
                  )}

                  <div className="iconSize">
                    <a>
                      <i
                        className="glyphicon glyphicon-trash pull-right"
                        data-toggle="modal"
                        style={{ marginRight: "4%" }}
                        data-target="#deleteEvent"
                      ></i>
                    </a>
                  </div>
                  <div
                    className="modal fade"
                    id="deleteEvent"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="deleteEventLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="deleteEventLabel">
                            Delete Event
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          Are you sure you wish to delete this event?
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Cancel
                          </button>
                          <a onClick={(e) => this.onDelete(e, business)}>
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-dismiss="modal"
                            >
                              Delete
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </h5>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default BusinessView;
