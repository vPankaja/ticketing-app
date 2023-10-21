import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import train from "../../../images/traveler.jpg";
import { Link } from "react-router-dom";

export default class AddTraveler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nic: "",
      name: "",
      phone: "",
      dob: "",
      email: "",
      password: "",
      confirmpassword: "",
      status: 1,
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (
      this.validateForm() &&
      this.state.password === this.state.confirmpassword
    ) {
      this.setState({
        status: 1,
      });

      const {
        nic,
        name,
        phone,
        dob,
        email,
        password,
        confirmpassword,
        status,
      } = this.state;

      const data = {
        nic,
        name,
        phone,
        dob,
        email,
        password,
        confirmpassword,
        status,
      };
      console.log("Data to be sent in the POST request:", data);
      axios
        .post("/api/travelers/add", data)
        .then((res) => {
          console.log("Response from POST request:", res);

          this.setState({
            nic: "",
            name: "",
            phone: "",
            dob: "",
            email: "",
            password: "",
            confirmpassword: "",
            status: 1,
          });

          swal("Success", "Traveler Added Successfully", "success");

          window.location.href = "/tableprofile";
        })
        .catch((error) => {
          console.error("Error during POST request:", error);
          swal("Error", "An error occurred.", "error");
        });
    } else {
      console.log("Password and Confirm Password do not match.");
      swal(
        "Validation Error",
        "Password and Confirm Password do not match.",
        "error"
      );
    }
  };

  validateForm = () => {
    const { nic, name, phone, dob, email, password, confirmpassword } =
      this.state;

    if (
      !nic ||
      !name ||
      !phone ||
      !dob ||
      !email ||
      !password ||
      !confirmpassword
    ) {
      swal("Validation Error", "All fields are required.", "error");
      return false;
    }

    return true;
  };

  render() {
    return (
      <div className="container">
        <br />
        <div className="back-button-container">
          <Link
            to="#"
            onClick={() => window.history.back()}
            className="back-button"
          >
            &lt; Back
          </Link>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="col-md-6">
              <img
                src={train}
                alt="Item Image"
                className="img-fluid"
                style={{ maxWidth: "550px", height: "500px" }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="card"
              style={{ marginTop: "20px", width: "105%", marginBottom: "30px" }}
            >
              <div className="card-body">
                <h1 className="text-center topic1 text1">Add Traveler</h1>
                <form className="needs-validation form" noValidate>
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>NIC: </label>
                    <input
                      type="text"
                      id="nic"
                      className="form-control"
                      name="nic"
                      placeholder="NIC"
                      value={this.state.nic}
                      style={{ width: "100%" }}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>Name: </label>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      name="name"
                      placeholder="Name"
                      value={this.state.name}
                      style={{ width: "100%" }}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>Phone: </label>
                    <input
                      type="text"
                      id="phone"
                      className="form-control"
                      name="phone"
                      placeholder="Phone"
                      value={this.state.phone}
                      style={{ width: "100%" }}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>
                      Date of Birth:{" "}
                    </label>
                    <input
                      type="date"
                      id="dob"
                      className="form-control"
                      name="dob"
                      value={this.state.dob}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>Email: </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      value={this.state.email}
                      style={{ width: "100%" }}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>Password: </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      value={this.state.password}
                      style={{ width: "100%" }}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>
                      Confirm Password:{" "}
                    </label>
                    <input
                      type="password"
                      id="confirmpassword"
                      className="form-control"
                      name="confirmpassword"
                      placeholder="Confirm Password"
                      value={this.state.confirmpassword}
                      style={{ width: "100%" }}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                </form>
                <button
                  className="btn btn-primary btn-sm"
                  type="submit"
                  href="/allTrains"
                  onClick={this.onSubmit}
                  style={{
                    marginTop: "15px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                  }}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
