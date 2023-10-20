import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import train from "../../../images/train.png";
import { useParams, Link } from "react-router-dom";

function UpdateTrainReservation() {
  const { id } = useParams();

  const [state, setState] = useState({
    id: id,
    name: "",
    date: "",
    startTime: "",
    startLocation: "",
    destination: "",
    trainclass: "",
    seatCount: 0,
    remainingSeats: 0,
    isActive: 0,
    stoppingStations: [],
    stationNameInput: "",
    arrivalTimeInput: "",
    departureTimeInput: "",
  });

  useEffect(() => {
    retrieveTrainDetails();
  }, [id]);

  const retrieveTrainDetails = () => {
    axios
      .get(`/api/trains/${id}`)
      .then((res) => {
        if (res.status === 200) {
          const trainData = res.data[0];
          setState((prevState) => ({
            ...prevState,
            name: trainData.name,
            date: trainData.date,
            startTime: trainData.startTime,
            startLocation: trainData.startLocation,
            destination: trainData.destination,
            trainclass: trainData.trainClass,
            seatCount: trainData.seatCount,
            remainingSeats: trainData.remainingSeats,
            stoppingStations: trainData.stoppingStations || [],
            isActive: trainData.isActive,
          }));
        } else {
          console.error("API request did not return a successful status.");
        }
      })
      .catch((error) => {
        console.error("API request failed:", error);
      });
  };

  const addStoppingStation = () => {
    const {
      stationNameInput,
      arrivalTimeInput,
      departureTimeInput,
      stoppingStations,
    } = state;

    if (stationNameInput && arrivalTimeInput && departureTimeInput) {
      setState((prevState) => ({
        ...prevState,
        stoppingStations: [
          ...prevState.stoppingStations,
          {
            stationName: stationNameInput.trim(),
            arrivalTime: arrivalTimeInput.trim(),
            departureTime: departureTimeInput.trim(),
          },
        ],
        stationNameInput: "",
        arrivalTimeInput: "",
        departureTimeInput: "",
      }));
    }
  };

  const removeStoppingStation = (index) => {
    const updatedStoppingStations = [...state.stoppingStations];
    updatedStoppingStations.splice(index, 1);
    setState((prevState) => ({
      ...prevState,
      stoppingStations: updatedStoppingStations,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTimeInputChange = (e, index, field) => {
    const value = e.target.value;

    if (field === "startTime") {
      setState((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    } else {
      setState((prevState) => {
        const stoppingStations = [...prevState.stoppingStations];
        stoppingStations[index][field] = value;
        return { ...prevState, stoppingStations };
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setState((prevState) => ({
        ...prevState,
        isActive: 1,
        remainingSeats: state.seatCount,
      }));

      const {
        name,
        date,
        startTime,
        startLocation,
        destination,
        trainclass,
        seatCount,
        stoppingStations,
        isActive,
      } = state;

      const originalRemainingSeats = state.remainingSeats;

      const data = {
        name,
        date,
        startTime,
        startLocation,
        destination,
        trainclass,
        seatCount,
        stoppingStations,
        isActive,
        remainingSeats: originalRemainingSeats,
      };

      axios
        .put(`/api/trains/update/${id}`, data)
        .then((res) => {
          console.log("Response from PUT request:", res);

          swal("Success", "Train Updated Successfully", "success");
          window.location.href = `/alltrains`;
        })
        .catch((error) => {
          swal("Error", "An error occurred.", "error");
        });
    }
  };

  const validateForm = () => {
    const {
      name,
      date,
      startTime,
      startLocation,
      destination,
      trainclass,
      seatCount,
      stoppingStations,
    } = state;

    if (
      !name ||
      !date ||
      !startTime ||
      !startLocation ||
      !destination ||
      !trainclass ||
      !seatCount ||
      stoppingStations.length === 0
    ) {
      swal("Validation Error", "All fields are required.", "error");
      return false;
    }

    return true;
  };

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
              style={{ maxWidth: "550px", height: "550px" }}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div
            className="card"
            style={{ marginTop: "20px", width: "105%", marginBottom: "30px" }}
          >
            <div className="card-body">
              <h1 className="text-center topic1 text1">Update Train</h1>
              <form className="needs-validation form" noValidate>
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Train Name: </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={state.name}
                    style={{ width: "100%" }}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Date: </label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={state.date}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Start Time: </label>
                  <input
                    type="time"
                    className="form-control"
                    name="startTime"
                    value={state.startTime}
                    style={{ width: "100%" }}
                    onChange={(e) =>
                      this.handleTimeInputChange(e, 0, "startTime")
                    }
                    required
                    step="1800"
                  />
                </div>
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Start Location:</label>
                  <select
                    className="form-control"
                    name="startLocation"
                    value={state.startLocation}
                    onChange={handleInputChange}
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
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Destination:</label>
                  <select
                    className="form-control"
                    name="destination"
                    value={state.destination}
                    onChange={handleInputChange}
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
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Train Class: </label>
                  <select
                    className="form-control"
                    name="trainclass"
                    value={state.trainclass}
                    style={{ width: "100%" }}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Train Class</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Seat Count: </label>
                  <input
                    type="number"
                    className="form-control"
                    name="seatCount"
                    value={state.seatCount}
                    style={{ width: "100%" }}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>
                    Stopping Station (Format: Station Name, Arrival Time,
                    Departure Time):
                  </label>
                  <div className="row">
                    <div className="col-4">
                      <select
                        className="form-control"
                        name="stationNameInput"
                        value={state.stationNameInput}
                        onChange={handleInputChange}
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
                    <div className="col-4">
                      <input
                        type="time"
                        className="form-control"
                        name="arrivalTimeInput"
                        value={state.arrivalTimeInput}
                        onChange={handleInputChange}
                        placeholder="Arrival Time"
                      />
                    </div>
                    <div className="col-4">
                      <input
                        type="time"
                        className="form-control"
                        name="departureTimeInput"
                        value={state.departureTimeInput}
                        onChange={handleInputChange}
                        placeholder="Departure Time"
                      />
                    </div>
                    <div
                      className="col-4"
                      style={{ marginTop: "10px", marginLeft: "350px" }}
                    >
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={addStoppingStation}
                        style={{ width: "100%" }}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
                <br />
                <br />
                <div style={{ marginBottom: "15px", fontSize: "14px" }}>
                  (Please add the stations in the order of the train route, also
                  add start station and destination)
                </div>

                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th>Station Name</th>
                      <th>Arrival Time</th>
                      <th>Departure Time</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.stoppingStations.map((station, index) => (
                      <tr key={index}>
                        <td>{index+1}</td>
                        <td>{station.stationName}</td>
                        <td>{station.arrivalTime}</td>
                        <td>{station.departureTime}</td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => removeStoppingStation(index)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  className="btn btn-primary btn-lg"
                  type="button"
                  onClick={onSubmit}
                  style={{
                    marginTop: "15px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                  }}
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateTrainReservation;
