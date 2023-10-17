import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ViewTrain() {
  const { id } = useParams();
  const [train, setTrain] = useState(null);

  useEffect(() => {
    axios.get(`/api/trains/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setTrain(res.data);
        } else {
          console.error("API request did not return a successful status.");
        }
      })
      .catch((error) => {
        console.error("API request failed:", error);
      });
  }, [id]);

  console.log("Rendered with train:", train);

  if (!train) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Train Details</h1>
      <p>Name: {train.name || 'N/A'}</p>
      <p>Date: {train.date || 'N/A'}</p>
      <p>Start Time: {train.startTime || 'N/A'}</p>
      <p>Start Location: {train.startLocation || 'N/A'}</p>
      <p>Destination: {train.destination || 'N/A'}</p>
      <p>Train Class: {train.trainclass || 'N/A'}</p>
      <p>Seat Count: {train.seatCount || 'N/A'}</p>
      <p>Remaining Seat Count: {train.remainingSeats || 'N/A'}</p>
  
      {train.stoppingStations && train.stoppingStations.length > 0 && (
        <div>
          <h2>Stopping Stations</h2>
          <table>
            <thead>
              <tr>
                <th>Station Name</th>
                <th>Arrival Time</th>
                <th>Departure Time</th>
              </tr>
            </thead>
            <tbody>
              {train.stoppingStations.map((station, index) => (
                <tr key={index}>
                  <td>{station.stationName || 'N/A'}</td>
                  <td>{station.arrivalTime || 'N/A'}</td>
                  <td>{station.departureTime || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
  
  
}

export default ViewTrain;
