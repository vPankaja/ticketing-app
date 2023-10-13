import React from "react";

const TrainList = ({ trains }) => {
  return (
    <div>
      {trains.map((train, index) => (
        <div key={index} className="card">
          <div className="card-body">
            <h5 className="card-title">{train.trainName}</h5>
            <p className="card-text">From: {train.startLocation}</p>
            <p className="card-text">To: {train.destination}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrainList;
