import React, { useState, useEffect } from "react";
import "./travell.css";
import profile from "../../../images/profile.png";
import { useParams } from "react-router-dom";
import axios from "axios";

const TravellerProfile = () => {
  const { id } = useParams();
  const [state, setState] = useState({
    nic: "",
    name: "",
    phone: "",
    dob: "",
    email: "",
    password: "",
    status: "",
  });

  useEffect(() => {
    axios
      .get(`/api/travelers/${id}`)
      .then((res) => {
        if (res.data.success) {
          setState({
            nic: res.data.post.nic,
            name: res.data.post.name,
            phone: res.data.post.phone,
            dob: res.data.post.dob,
            email: res.data.post.email,
            password: res.data.post.password,
            status: res.data.post.status,
          });
        }
      })
      .catch((error) => {
        console.error("API request failed:", error);
      });
  }, [id]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://media.istockphoto.com/id/1191901922/vector/client-profile-customer-vector.jpg?s=170667a&w=0&k=20&c=7BQ9JM3bcfZA3dSjstDNXsZP_WDnqUBMw6TBmv2bLlQ="
            alt="Item Image"
            className="img-fluid"
            style={{ height: "80%" }}
          />
        </div>
        <div className="col-md-6">
          <div className="profile-container">
            <div className="profile-header">
              <img
                src={profile}
                alt="Profile Picture"
                className="profile-image"
                style={{
                  width: "80%",
                  height: "40vh",
                  objectFit: "cover",
                  borderRadius: "10%",
                  marginTop: "20px",
                }}
              />
              <div>
                <h1>{state.name}</h1>
                <p>Travel Enthusiast</p>
              </div>
            </div>
            <div className="profile-details">
              <div>
                <h3>NIC:</h3>
                <h5>{state.nic}</h5>
              </div>

              <div>
                <h3>Name:</h3>
                <h5>{state.name}</h5>
              </div>

              <div>
                <h3>Phone:</h3>
                <h5>{state.phone}</h5>
              </div>

              <div>
                <h3>Date of Birth:</h3>
                <h5>{state.dob}</h5>
              </div>

              <div>
                <h3>Email:</h3>
                <h5>{state.email}</h5>
              </div>

              <div>
                <h3>Password:</h3>
                <h5>{state.password}</h5>
              </div>

              <div>
                <h3>Status:</h3>
                <h5>{state.status}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravellerProfile;
