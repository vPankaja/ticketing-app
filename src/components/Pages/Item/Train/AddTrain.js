import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import train from "../../../images/train.png";

export default class AddTrainReservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      date: "",
      startTime: "",
      startLocation: "",
      destination: "",
      trainclass: "",
      seatCount: 0,
      remainingSeats: 0,
      isActive: 0,
      stoppingStations: [
        {
          stationName: "",
          stationCount: 0,
          arrivalTime: "",
          departureTime: "",
        },
      ],
    };
  }

  addStoppingStation = () => {
    const currentStationCount = this.state.stoppingStations.length;

    // Add a new station with an incremented station count
    this.setState((prevState) => ({
      stoppingStations: [
        ...prevState.stoppingStations,
        {
          stationName: "",
          stationCount: currentStationCount,
          arrivalTime: "",
          departureTime: "",
        },
      ],
    }));
  };

  removeStoppingStation = (index) => {
    this.setState((prevState) => ({
      stoppingStations: [
        ...prevState.stoppingStations.slice(0, index),
        ...prevState.stoppingStations.slice(index + 1),
      ],
    }));
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleTimeInputChange = (e, index, field) => {
    const value = e.target.value;

    if (field === "startTime") {
      this.setState({
        [field]: value,
      });
    } else {
      this.setState((prevState) => {
        const stoppingStations = [...prevState.stoppingStations];
        stoppingStations[index][field] = value;
        return { stoppingStations };
      });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (this.validateForm()) {
      this.setState({
        isActive: 1,
        remainingSeats: this.state.seatCount,
      });

      const {
        name,
        date,
        startTime,
        startLocation,
        destination,
        trainclass,
        seatCount,
        stoppingStations,
      } = this.state;

      const data = {
        name,
        date,
        startTime,
        startLocation,
        destination,
        trainclass,
        seatCount,
        stoppingStations,
      };

      // Make a POST request to your API endpoint
      axios
        .post("/api/trains/add", data)
        .then((res) => {
          console.log("Response from POST request:", res); // Add this line

          if (res.data.success) {
            this.setState({
              name: "",
              date: "",
              startTime: "",
              startLocation: "",
              destination: "",
              trainclass: "",
              seatCount: 0,
              remainingSeats: 0,
              isActive: 0,
              stoppingStations: [
                {
                  stationName: "",
                  stationCount: 0,
                  arrivalTime: "",
                  departureTime: "",
                },
              ],
            });

            // Use SweetAlert to show a success message
            swal
              .fire({
                icon: "success",
                title: "Success",
                text: "Train Added Successful",
              })
              .then(() => {
                // Redirect to the "/alltrains" page
                window.location.href = "/alltrains";
              });
          }
        })
        .catch((error) => {
          console.log("Error in POST request:", error); // Add this line

          // Use SweetAlert to show an error message
          swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred.",
          });
        });
    }
  };

  // Validation function
  validateForm = () => {
    const {
      name,
      date,
      startTime,
      startLocation,
      destination,
      trainclass,
      seatCount,
      stoppingStations,
    } = this.state;

    if (
      !name ||
      !date ||
      !startTime ||
      !startLocation ||
      !destination ||
      !trainclass ||
      !seatCount ||
      !stoppingStations
    ) {
      swal.fire("Validation Error", "All fields are required.", "error");
      return false;
    }

    // Add more specific validation rules here
    return true;
  };

  render() {
    const locations = [
      "Galle",
      "Weligama",
      "Matara",
      "Beliaththa",
      "Hikkaduwa",
      "Ambalangoda",
      "Aluthgama",
      "Kalutara",
      "Panadura",
      "Moratuwa",
      "Dehiwala",
      "Bambalapitiya",
      "Colombo Fort",
    ];

    const stationNames = [
      "Galle",
      "Weligama",
      "Matara",
      "Beliaththa",
      "Hikkaduwa",
      "Ambalangoda",
      "Aluthgama",
      "Kalutara",
      "Panadura",
      "Moratuwa",
      "Dehiwala",
      "Bambalapitiya",
      "Colombo Fort",
    ];

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
                    <h1 className="text-center topic1 text1">Add Trains</h1>
                    <form className="needs-validation form" noValidate>
                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <label style={{ marginBottom: "5px" }}>
                          Train Name:{" "}
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="form-control"
                          name="name"
                          placeholder="Train Name"
                          value={this.state.name}
                          style={{ width: "100%" }}
                          onChange={this.handleInputChange}
                          required
                        />
                      </div>
                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <label style={{ marginBottom: "5px" }}>Date: </label>
                        <input
                          type="date"
                          className="form-control"
                          name="date"
                          placeholder="Date"
                          value={this.state.date}
                          onChange={this.handleInputChange}
                          required
                        />
                      </div>
                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <label style={{ marginBottom: "5px" }}>
                          Start Time:{" "}
                        </label>
                        <input
                          type="time"
                          className="form-control"
                          name="startTime"
                          value={this.state.startTime}
                          style={{ width: "100%" }}
                          onChange={(e) =>
                            this.handleTimeInputChange(e, 0, "startTime")
                          }
                          required
                          step="1800"
                        />
                      </div>

                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <label style={{ marginBottom: "5px" }}>
                          Start Location:
                        </label>
                        <select
                          className="form-control"
                          name="startLocation"
                          value={this.state.startLocation}
                          onChange={this.handleInputChange}
                          required
                        >
                          <option value="">Select Start Location</option>
                          {locations.map((location, index) => (
                            <option key={index} value={location}>
                              {location}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <label style={{ marginBottom: "5px" }}>
                          Destination:
                        </label>
                        <select
                          className="form-control"
                          name="destination"
                          value={this.state.destination}
                          onChange={this.handleInputChange}
                          required
                        >
                          <option value="">Select Destination</option>
                          {locations.map((location, index) => (
                            <option key={index} value={location}>
                              {location}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <label style={{ marginBottom: "5px" }}>
                          Train Class:{" "}
                        </label>
                        <select
                          id="trainclass"
                          className="form-control"
                          name="trainclass"
                          value={this.state.trainclass}
                          style={{ width: "100%" }}
                          onChange={this.handleInputChange}
                          required
                        >
                          <option value="">Select Train Class</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                        </select>
                      </div>

                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <label style={{ marginBottom: "5px" }}>
                          Seat Count:{" "}
                        </label>
                        <input
                          type="number"
                          id="seatCount"
                          className="form-control"
                          name="seatCount"
                          placeholder="Seat Count"
                          value={this.state.seatCount}
                          style={{ width: "100%" }}
                          onChange={this.handleInputChange}
                          required
                        />
                      </div>

                      {/* Stopping Stations */}
                      {this.state.stoppingStations.map((station, index) => (
                        <div key={index}>
                          <h2>Stopping Station {station.stationCount + 1}</h2>
                          <div
                            className="form-group"
                            style={{ marginBottom: "15px" }}
                          >
                            <label style={{ marginBottom: "5px" }}>
                              Station Name:
                            </label>
                            <select
                              className="form-control"
                              name="stationName"
                              value={
                                this.state.stoppingStations[index].stationName
                              }
                              onChange={(e) =>
                                this.handleTimeInputChange(
                                  e,
                                  index,
                                  "stationName"
                                )
                              }
                              required
                            >
                              <option value="">Select Station Name</option>
                              {stationNames.map((stationName, stationIndex) => (
                                <option key={stationIndex} value={stationName}>
                                  {stationName}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div
                            className="form-group"
                            style={{ marginBottom: "15px" }}
                          >
                            <label style={{ marginBottom: "5px" }}>
                              Arrival Time:{" "}
                            </label>
                            <input
                              type="time"
                              className="form-control"
                              name="arrivalTime"
                              value={station.arrivalTime}
                              style={{ width: "100%" }}
                              onChange={(e) =>
                                this.handleTimeInputChange(
                                  e,
                                  index,
                                  "arrivalTime"
                                )
                              }
                              required
                              step="1800"
                            />
                          </div>
                          <div
                            className="form-group"
                            style={{ marginBottom: "15px" }}
                          >
                            <label style={{ marginBottom: "5px" }}>
                              Departure Time:{" "}
                            </label>
                            <input
                              type="time"
                              className="form-control"
                              name="departureTime"
                              value={station.departureTime}
                              style={{ width: "100%" }}
                              onChange={(e) =>
                                this.handleTimeInputChange(
                                  e,
                                  index,
                                  "departureTime"
                                )
                              }
                              required
                              step="1800"
                            />
                          </div>

                          {index !== 0 && (
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => this.removeStoppingStation(index)}
                            >
                              Remove Station
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={this.addStoppingStation}
                      >
                        Add Station
                      </button>
                      <br />
                      <br />
                      <button
                        className="btn btn-primary btn-lg"
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
