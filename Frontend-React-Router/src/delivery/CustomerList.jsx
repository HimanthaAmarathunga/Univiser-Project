import React, { Component } from "react";
import axios from "axios";
import "./CustomerList.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

export default class CustomerList extends Component {
  state = {
    id: "",
    name: "",
    email: "",
    points: "",
    customers: [],
  };

  async componentDidMount() {
    await axios.get(`http://localhost:8080/api/customers`).then((result) => {
      this.setState({
        customers: result.data,
      });
      console.log(result.data);
    });
  }

  async setData(data) {
    let { id, name, email, points } = data;
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("points", points);
    console.log("The data " + data);
  }

  async delete(id) {
    try {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Do you want to delete this record?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
              "Deleted",
              "Item has been deleted",
              "success"
            );
            axios
              .delete(
                `http://localhost:8080/api/customers/deleteCustomer/` + id
              )
              .then(() => {
                this.componentDidMount();
              });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire("Cancelled");
          }
        });
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  }

  async addPoints(e) {
    try {
      const { value: points } = await Swal.fire({
        title: "Enter the points you want to add",
        input: "number",
        inputPlaceholder: "Enter points",
        inputAttributes: {
          min: 1,
        },
        inputValidator: (value) => {
          if (!value) {
            return "You need to enter the points!";
          }
          if (value < 1) {
            return "Points must be greater than or equal to 1";
          }
        },
        showCancelButton: true,
        confirmButtonText: "Add Points",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      });

      if (points) {
        console.log("The Points = " + points);
        let id = localStorage.getItem("id");
        const data = {
          points: points,
        };
        axios
          .put("http://localhost:8080/api/customers/addPoints/" + id, data, {
            headers: { "Content-Type": "application/json" },
          })
          .then(() => {
            this.componentDidMount();
          });

        Swal.fire(
          "Points Added",
          "Points have been added to the customer.",
          "success"
        );
      }
    } catch (error) {
      console.error("Error adding points:", error);
    }
  }

  async redeemPoints(id) {
    try {
      const { value: points } = await Swal.fire({
        title: "Enter the points you want to redeem",
        input: "number",
        inputPlaceholder: "Enter points",
        inputAttributes: {
          min: 1,
        },
        inputValidator: (value) => {
          if (!value) {
            return "You need to enter the points!";
          }
          if (value < 1) {
            return "Points must be greater than or equal to 1";
          }
        },
        showCancelButton: true,
        confirmButtonText: "Redeem Points",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      });

      if (points) {
        let id = localStorage.getItem("id");
        const data = {
          points: points,
        };
        axios
          .put("http://localhost:8080/api/customers/redeemPoints/" + id, data, {
            headers: { "Content-Type": "application/json" },
          })
          .then(() => {
            this.componentDidMount();
          });

        Swal.fire(
          "Points Redeemed",
          "Points have been redeemed from the customer.",
          "success"
        );
      }
    } catch (error) {
      console.error("Error redeeming points:", error);
    }
  }

  render() {
    const { customers } = this.state;
    return (
      <div className="col s9">
        <div className="ReportRow">
          <Link to="/">
            <button className="addCusBtn">Add Customer</button>
          </Link>
        </div>
        <table className="responsive-table highlight">
          <tr>
            <th className="td">Name</th>
            <th className="td">Email</th>
            <th className="td"></th>
            <th className="td">Points</th>
            <th className="td">Add Points</th>
            <th className="td">Redeem Points</th>
            <th className="td"></th>
          </tr>
          {customers.map((customer) => {
            return (
              <tr key={customer._id} className="">
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td />
                <td>{customer.points}</td>
                <td>
                  <FontAwesomeIcon
                    size="1x"
                    icon={faPlus}
                    onClick={() => this.addPoints(customer.id)}
                  />
                </td>
                <td>
                  <FontAwesomeIcon
                    size="1x"
                    icon={faMinus}
                    onClick={() => this.redeemPoints(customer.id)}
                  />
                </td>
                <td>
                  <FontAwesomeIcon
                    size="1x"
                    icon={faEdit}
                    onClick={() => {
                      this.setData(customer);
                      window.location = "/customerUpdate/";
                    }}
                  />
                  <FontAwesomeIcon
                    size="1x"
                    icon={faTrash}
                    onClick={() => this.delete(customer.id)}
                  />
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  }
}
