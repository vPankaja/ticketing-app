import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import loadingGif from "../../../images/loading.gif";
import jspdf from "jspdf";
import "jspdf-autotable";
import img from "../../../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";


class UsersTable extends Component {
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
    axios.get("/api/users/getAll")
      .then((res) => {
        console.log(res.data); 
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




  onDelete = (id) => {
    axios.delete(`/api/users/delete/${id}`).then((res) => {
      
        swal("Success", "User Deleted Successful", "success");
        this.retrievePosts();
      })
        .catch((error) => {
          console.error("Axios Error:", error);
          swal("Network Error", "Failed to connect to the server", "error");
        });
      
    
  };




  render() {

    const generatePDF = (Users) => {
      const doc = new jspdf();
      const tableColumn = [
        "User NIC",
        "Name",
        "Phone",
        "Dob",
        "Email",
        "Role",
        "Status",
      ];
      const tableRows = [];

      Users.map((User) => {
        const UserData = [
          User.nic,
          User.name,
          User.phone,
          new Date(User.dob).toLocaleDateString(),
          User.email,
          User.role,
          User.status === 1 ? "Active" : "Inactive",
        ];
        tableRows.push(UserData);
      });
      doc.text("All Users Report", 14, 15).setFontSize(12);
      doc.addImage(img, "JPEG", 185, 5, 15, 15);
      doc.text("E-TICKET", 180, 25).setFontSize(10);
      doc.autoTable(tableColumn, tableRows, {
        styles: { fontSize: 8 },
        startY: 35,
      });
      doc.save(`All_Users_Report`);
    };

    return (
      <div className="d-flex align-items-center justify-content-center h-100">
        <div className="container card p-5 m-5">
          <h1
            className="text-center"
            style={{ color: "#FF5733", fontFamily: "Baufra" }}
          >
            <b>All Users</b>
          </h1>

          <div className="container">
            <div className="button-container d-flex justify-content-between align-items-center">
              <Link to="/adduser" className="btn btn-primary mb-3">
                Add New Travel Agent
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
            <th scope="col">#</th>
                    <th scope="col">NIC</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Dob</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
             
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td style={{ display: "none" }}>{post.id}</td>
                <td>{post.nic }</td>
                <td>{post.name }</td>
                <td>{post.phone }</td>
                <td>{new Date(post.dob).toLocaleDateString()}</td>
                <td>{post.email }</td>
                <td>{post.role }</td>
                <td>{post.status === 1 ? "Active" : "Inactive"}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          
                          {post.status === 1 && (
                            <Link
                              to={`/updateuser/${post.id}`}
                              className="btn btn-outline-dark mx-2"
                            >
                              <FontAwesomeIcon icon={faEdit} />
                              &nbsp;Edit
                            </Link>
                          )}
                          <button
                            className="btn btn-outline-danger mx-2"
                            onClick={() => this.onDelete(post.id)}
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

export default UsersTable;
