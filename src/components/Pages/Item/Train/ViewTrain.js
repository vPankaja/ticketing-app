import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import loadingGif from "../../../images/loading.gif";

function ViewTrain() {
  const { id } = useParams();
  const [train, setTrain] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/trains/${id}`)
      .then((res) => {
        if (res.data) {
          setTrain(res.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("API request failed:", error);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container text-center">
        <img
          src={loadingGif}
          alt="Loading..."
          style={{ height: "30%", width: "30%" }}
        />
      </div>
    );
  }

  if (!train || train.length === 0) {
    return <div>Loading...</div>;
  }

  const trainData = train[0];

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
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card" style={{ width: "700px" }}>
            <div className="card-body">
              <h1
                className="text-center"
                style={{ color: "blue", fontFamily: "Baufra" }}
              >
                Train Details
              </h1>
              <p>
                <strong>Name :</strong> {trainData.name || "N/A"}
              </p>
              <p>
                <strong>Date :</strong> {trainData.date || "N/A"}
              </p>
              <p>
                <strong>Start Time :</strong> {trainData.startTime || "N/A"}
              </p>
              <p>
                <strong>Start Location :</strong>{" "}
                {trainData.startLocation || "N/A"}
              </p>
              <p>
                <strong>Destination :</strong> {trainData.destination || "N/A"}
              </p>
              <p>
                <strong>Train Class :</strong> {trainData.trainClass || "N/A"}
              </p>
              <p>
                <strong>Seat Count :</strong> {trainData.seatCount || "N/A"}
              </p>
              <p>
                <strong>Remaining Seat Count :</strong>{" "}
                {trainData.remainingSeats || "N/A"}
              </p>

              {trainData.stoppingStations &&
                trainData.stoppingStations.length > 0 && (
                  <div>
                    <h3
                      className="text-center"
                      style={{ fontFamily: "Baufra" }}
                    >
                      Stopping Stations
                    </h3>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th>Station Name</th>
                          <th>Arrival Time</th>
                          <th>Departure Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {trainData.stoppingStations.map((station, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{station.stationName || "N/A"}</td>
                            <td>{station.arrivalTime || "N/A"}</td>
                            <td>{station.departureTime || "N/A"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

              <div className="text-center">
                <Link to={`/updatetrain/${id}`} className="btn btn-primary">
                  Edit
                </Link>
              </div>
            </div>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
}

export default ViewTrain;
