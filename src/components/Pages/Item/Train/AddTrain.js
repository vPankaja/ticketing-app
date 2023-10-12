import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert2";
import train from "../../../images/train.png";

export default class AddTrainReservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      travelerID: "",
      reservationDate: "",
      bookingDate: "",
      trainID: "",
      startLocation: "",
      destination: "",
      trainClass: "",
      departureTime: "",
      price: "",
      seatCount: 0,
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

    // Data validation
    if (this.validateForm()) {
      const {
        travelerID,
        reservationDate,
        bookingDate,
        trainID,
        startLocation,
        destination,
        trainClass,
        departureTime,
        price,
        seatCount,
        status,
      } = this.state;

      const data = {
        travelerID,
        reservationDate,
        bookingDate,
        trainID,
        startLocation,
        destination,
        trainClass,
        departureTime,
        price,
        seatCount,
        status,
      };

      // Make a POST request to your API endpoint
      axios
        .post("/api/trainreservations/add", data) // Adjust the endpoint to your actual API
        .then((res) => {
          if (res.data.success) {
            this.setState({
              travelerID: "",
              reservationDate: "",
              bookingDate: "",
              trainID: "",
              startLocation: "",
              destination: "",
              trainClass: "",
              departureTime: "",
              price: "",
              seatCount: 0,
              status: 1,
            });
            swal.fire(
              "Reservation Added Successfully!",
              "New reservation is added to the system",
              "success"
            );
          }
        })
        .catch((error) => {
          swal.fire("Error", "An error occurred.", "error");
        });
    }
  };

  // Validation function
  validateForm = () => {
    const {
      travelerID,
      reservationDate,
      bookingDate,
      trainID,
      startLocation,
      destination,
      trainClass,
      departureTime,
      price,
      seatCount,
      status,
    } = this.state;

    if (
      !travelerID ||
      !reservationDate ||
      !bookingDate ||
      !trainID ||
      !startLocation ||
      !destination ||
      !trainClass ||
      !departureTime ||
      !price ||
      !seatCount ||
      !status
    ) {
      swal.fire("Validation Error", "All fields are required.", "error");
      return false;
    }

    // Add more specific validation rules here

    return true;
  };

  render() {
    return (
      <div>
        <div className="container1 form1">
          <div className="row">
            <div className="col-md-6">
              <img
                src={train}
                alt="Train Image"
                className="img-fluid"
                style={{ height: "80%" }}
              />
            </div>

            <div className="col-md-6">
              <div className="card1" style={{ width: "85%" }}>
                <div className="card-body">
                  <div className="col-md-8 mt-4 mx-auto">
                    <h1 className="text-center topic1 text1">Add Train Reservation Form</h1>
                    <form className="needs-validation form" noValidate>
                      {/* Add form inputs for travelerID, reservationDate, etc. */}
                      <div className="form-group" style={{ marginBottom: "15px" }}>
                        <label style={{ marginBottom: "5px" }}>Traveler ID: </label>
                        <input
                          type="text"
                          id="travelerID"
                          className="form-control"
                          name="travelerID"
                          placeholder="Traveler ID"
                          value={this.state.travelerID}
                          style={{ width: "100%" }}
                          onChange={this.handleInputChange}
                          required
                        />
                      </div>

                      {/* Add more form input fields for other data */}
                      {/* ... */}

                      <button
                        className="btn btn-primary btn-lg"
                        type="submit"
                        onClick={this.onSubmit}
                        style={{
                          marginTop: "15px",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                          borderRadius: "5px",
                          fontWeight: "bold",
                          padding: "10px 20px",
                        }}
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>
    );
  }
}
