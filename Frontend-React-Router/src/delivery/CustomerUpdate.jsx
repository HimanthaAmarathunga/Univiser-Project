import axios from "axios";
import React, { Component } from "react";
import Swal from "sweetalert2";
import "./CustomerUpdate.css";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class CustomerUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      email: "",
      points: 0,
      customer: [],
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  async componentDidMount() {
    let id = localStorage.getItem("id");
    await axios
      .get("http://localhost:8080/api/customers/" + id)
      .then((result) => {
        this.setState({
          name: result.data.name,
          email: result.data.email,
          points: result.data.points,
        });
        console.log("The Result" + result);
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let id = localStorage.getItem("id");
    const data = {
      id: id,
      name: this.state.name,
      email: this.state.email,
      points: this.state.points,
    };

    axios.put("http://localhost:8080/api/customers/" + id, data).then(() => {
      Swal.fire({
        icon: "success",
        title: "Successfully Updated!",
      }).then(() => {
        window.location = "/customerList";
      });
    });
  };

  render() {
    return (
      <div>
        <div className="UpdateCustomerContainer">
          <h2>Update Customer</h2>
          <hr className="horizonalLine" />
          <div
            className="updateContainer"
            style={{ border: "1px solid red", borderRadius: "30px" }}
          >
            <form className="updateForm" onSubmit={this.handleSubmit}>
              <div className="messages"></div>
              <div className="controls">
                <div className="row">
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label for="form_name">Name</label>
                      <input
                        id="form_name"
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter Name"
                        required="required"
                        data-error="Name is required."
                        value={this.state.name}
                        onChange={this.handleChange}
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label for="form_name">Email</label>
                      <input
                        id="form_name"
                        type="text"
                        name="email"
                        className="form-control"
                        placeholder="Enter Email"
                        required="required"
                        data-error="Email is required."
                        value={this.state.email}
                        onChange={this.handleChange}
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label for="form_name">Points</label>
                      <input
                        id="form_name"
                        type="number"
                        name="points"
                        className="form-control"
                        placeholder="Points"
                        required="required"
                        data-error="Points are required."
                        value={this.state.points}
                        onChange={this.handleChange}
                      />
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="clearfix"></div>
              <div className="row">
                <div className="input-field col s12">
                  <button type="submit" className="Button-Update">
                    <FontAwesomeIcon icon={faCheckCircle} /> Update Customer
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
