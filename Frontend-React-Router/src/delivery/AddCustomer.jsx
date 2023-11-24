import React, { Component } from "react";
import "./AddCustomer.css";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Link } from "react-router-dom";

class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      points: 0,
    };
    this.state = { customer: [] };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: this.state.name,
      email: this.state.email,
      points: this.state.points,
    };
    console.log("Data to send", data);

    axios
      .post("http://localhost:8080/api/customers", data)
      .then((res) => console.log(res.data));

    this.setState({
      name: "",
      email: "",
      points: 0,
    });
  };

  componentDidMount() {
    axios
      .get("http://localhost:8080/api/customers")
      .then((response) => {
        this.setState({ customer: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <div className="CustomerContainer">
          <h2 className="h2-class">Add Customer</h2>
          <div
            className="container"
            style={{ border: "1px solid red", borderRadius: "30px" }}
          >
            <div className="ReportRow">
              <Link to="/customerList">
                <button className="addCusBtn1">Customer List</button>
              </Link>
            </div>
            <form onSubmit={this.handleSubmit}>
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
                  <input
                    type="submit"
                    className="Button-Add"
                    to="./customerList"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddCustomer;
