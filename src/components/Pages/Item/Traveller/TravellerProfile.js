import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./travell.css";
import loadingGif from "../../../images/loading.gif";

function TravellerProfile() {
  const { nic } = useParams();
  const [loading, setLoading] = useState(true);
  const userRole = localStorage.getItem("userRole");
  const [travelerData, setTravelerData] = useState({
    nic: "",
    name: "",
    phone: "",
    dob: "",
    email: "",
    // password: "",
    // confirmPassword: "",
    status: 0, // Assuming 0 means "Inactive" and 1 means "Active"
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (nic) {
      axios
        .get(`/api/travelers/get/${nic}`)
        .then((res) => {
          if (res.data && res.data.length > 0) {
            setTravelerData(res.data[0]);
            setLoading(false);
          } else {
            setError("Traveler not found");
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error("API request failed:", err);
          setError("Failed to fetch traveler data");
          setLoading(false);
        });
    }
  }, [nic]);

  const handleFormSubmit = () => {
  const status = travelerData.status === 1 ? 'deactive' : 'active'; // Toggle between 'active' and 'deactive'
  const apiUrl = status === 'active'
    ? `/api/travelers/update/active/${nic}`
    : `/api/travelers/update/deactive/${nic}`;

  axios.put(apiUrl, travelerData)
    .then((res) => {
      console.log('Traveler details updated:', res.data);
      window.location.reload();
    })
    .catch((err) => {
      console.error("API request failed:", err);
      setError("Failed to update traveler status");
    });
};

if (loading) {
  return (
    <div className="container text-center">
      <img src={loadingGif} alt="Loading..."
      style={{ height: "30%", width: "30%" }} />
    </div>
  );
}

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://unblast.com/wp-content/uploads/2020/03/Girl-Traveling-Illustration-1.jpg"
            alt="Item Image"
            className="img-fluid"
            style={{ height: "80%" }}
          />
        </div>
        <div className="col-md-6">
          <br />
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card" style={{ width: "500px", marginBottom: "60px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}>
                <div className="card-body">
                <div className="back-button-container">
        <Link
          to="#"
          onClick={() => window.history.back()}
          className="back-button"
        >
          &lt; Back
        </Link>
      </div>
                  <h1 className="text-center" style={{ color: '#FF5733', fontFamily: 'Baufra' }}>
                    <b>Traveller Details</b>
                  </h1>
                  <table className="table table-striped table-bordered table-hover">
                    <tbody>
                      <tr>
                        <td><strong>NIC:</strong></td>
                        <td>{travelerData.nic}</td>
                      </tr>
                      <tr>
                        <td><strong>Name:</strong></td>
                        <td>{travelerData.name}</td>
                      </tr>
                      <tr>
                        <td><strong>Phone:</strong></td>
                        <td>{travelerData.phone}</td>
                      </tr>
                      <tr>
                        <td><strong>DOB:</strong></td>
                        <td>{new Date(travelerData.dob).toLocaleDateString()}</td>
                      </tr>
                      <tr>
                        <td><strong>Email:</strong></td>
                        <td>{travelerData.email}</td>
                      </tr>
                      <tr>
                        <td><strong>Status:</strong></td>
                        <td>
                          <span className={travelerData.status === 1 ? "active-status" : "inactive-status"} style={{ fontWeight: "bold" }}>
                            {travelerData.status === 1 ? "Active" : "Inactive"}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {userRole==='BOfficer'&&
                  <div className="text-center">
                    
    <button
        className={`btn btn-sm ${travelerData.status === 1 ? 'green-button' : 'yellow-button'} mx-auto d-flex justify-content-center`}
        type="button"
        style={{
            marginTop: "15px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            borderRadius: "5px",
            fontWeight: "bold",
            padding: "5px 10px",
        }}
        onClick={() => handleFormSubmit()}>
        {travelerData.status === 1 ? "Deactivate" : "Activate"}
    </button>
</div>
}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TravellerProfile;
