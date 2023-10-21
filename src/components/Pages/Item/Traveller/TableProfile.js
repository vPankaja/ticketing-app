import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import loadingGif from "../../../images/loading.gif";
import jspdf from "jspdf";
import "jspdf-autotable";
import img from "../../../images/logo.png";

class TableProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios
      .get("/api/travelers/getall")
      .then((res) => {
        if (res.status === 200) {
          const reservations = res.data;
          this.setState({
            posts: reservations,
            loading: false,
          });
        } else {
          console.error("API request did not return a successful status.");
          this.setState({
            loading: false,
          });
        }
      })
      .catch((error) => {
        console.error("API request failed:", error);
        this.setState({
          loading: false,
        });
      });
  }

  onDelete = (nic) => {
    axios
      .delete(`/api/travelers/delete/${nic}`)
      .then((res) => {
        swal("Success", "Traveler Deleted Successful", "success");
        this.retrievePosts();
      })
      .catch((error) => {
        console.error("Axios Error:", error);
        swal("Network Error", "Failed to connect to the server", "error");
      });
  };

  togglePasswordVisibility = (index) => {
    const updatedPosts = [...this.state.posts];
    updatedPosts[index].passwordVisible = !updatedPosts[index].passwordVisible;
    this.setState({ posts: updatedPosts });
  };

  render() {
    const { posts } = this.state;

    const generatePDF = (Travelers) => {
      const doc = new jspdf();
      const tableColumn = [
        "Traveler NIC",
        "Name",
        "Phone",
        "Dob",
        "Email",
        "Status",
      ];
      const tableRows = [];

      Travelers.map((Traveler) => {
        const TravelerData = [
          Traveler.nic,
          Traveler.name,
          Traveler.phone,
          new Date(Traveler.dob).toLocaleDateString(),
          Traveler.email,
          Traveler.status === 1 ? "Active" : "Inactive",
        ];
        tableRows.push(TravelerData);
      });
      doc.text("All Travelers Report", 14, 15).setFontSize(12);
      doc.addImage(img, "JPEG", 185, 5, 15, 15);
      doc.text("E-TICKET", 180, 25).setFontSize(10);
      doc.autoTable(tableColumn, tableRows, {
        styles: { fontSize: 8 },
        startY: 35,
      });
      doc.save(`All_Travelers_Report`);
    };

    return (
      <div className="d-flex align-items-center justify-content-center h-100">
        <div className="container card p-5 m-5">
          <h1
            className="text-center"
            style={{ color: "#FF5733", fontFamily: "Baufra" }}
          >
            <b>All Travellers</b>
          </h1>

          <div className="container">
            <div className="button-container d-flex justify-content-between align-items-center">
              <Link to="/addtraveler" className="btn btn-primary mb-3">
                Add New Traveler
              </Link>
              <button
                type="button"
                onClick={() => generatePDF(this.state.posts)}
                className="btn btn-secondary btn-sm"
              >
                Generate Report
              </button>
            </div>
            {this.state.loading ? (
              <div className="text-center">
                <img src={loadingGif} alt="Loading..." />
              </div>
            ) : (
              <table class="table bordered">
                <thead>
                  <tr>
                    {" "}
                    <th scope="col">#</th>
                    <th scope="col">NIC</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Dob</th>
                    <th scope="col">Email</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{post.nic}</td>
                      <td>{post.name}</td>
                      <td>{post.phone}</td>
                      <td>{new Date(post.dob).toLocaleDateString()}</td>
                      <td>{post.email}</td>
                      <td>{post.status === 1 ? "Active" : "Inactive"}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Link
                            to={`/travellerprofile/${post.nic}`}
                            className="btn btn-outline-success mx-2"
                          >
                            <FontAwesomeIcon icon={faEye} />
                            &nbsp;View
                          </Link>
                          {post.status === 1 && (
                            <Link
                              to={`/edittravel/${post.nic}`}
                              className="btn btn-outline-dark mx-2"
                            >
                              <FontAwesomeIcon icon={faEdit} />
                              &nbsp;Edit
                            </Link>
                          )}
                          <button
                            className="btn btn-outline-danger mx-2"
                            onClick={() => this.onDelete(post.nic)}
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                            &nbsp;Delete
                          </button>{" "}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default TableProfile;
