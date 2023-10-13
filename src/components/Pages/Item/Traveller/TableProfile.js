import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert"; // Correct the import statement
import { Link } from "react-router-dom";

class TableProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  retrievePosts() {
    axios.get("/api/travelers/getall").then((res) => {
      console.log(res.data); // Log the response to inspect its structure

      // Check if the response status is successful
      if (res.status === 200) {
        // Assuming the data is an array of reservations with a "destination" property
        const reservations = res.data; // Modify this based on your API response structure
        this.setState({
          posts: reservations,
        });
      } else {
        console.error("API request did not return a successful status.");
      }
    }).catch((error) => {
      // Handle API request errors here (e.g., display an error message).
      console.error("API request failed:", error);
    });
  }

  onDelete = (id) => {
    axios.delete(`/delete/${id}`).then((res) => {
      if (res.data.success) {
        swal("Deleted Successful", "Category is removed", "success");
        this.retrievePosts();
      } else {
        swal("Deleted Successful", "Category is removed", "success");
      }
    });
  };

  render() {
    return (
      <div className="tabl">
        <div>
          <br />
          <h2 className="text1">Travellers Profile Details</h2>

          <div>
            <table className="table table-striped table-bordered table-hover">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Sup ID</th>
                  <th scope="col">NIC</th>
                  <th scope="col">Name</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Dob</th>
                  <th scope="col">Email</th>
                  <th scope="col">Password</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.posts.map((post, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{post.nic}</td>
                    <td>{post.name}</td>
                    <td>{post.phone}</td>
                    <td>{post.dob}</td>
                    <td>{post.email}</td>
                    <td>{post.password}</td>
                    <td>{post.status}</td>
                    <td>
                      <a className="btn btn-success" href={`/tprofile/${post._id}`}>
                        <i className="fas fa-eye"></i>&nbsp;View
                      </a>

                      <a className="btn btn-warning" href={`/supplier/update/${post._id}`}>
                        <i className="fas fa-edit"></i>&nbsp;Edit
                      </a>
                      <a
                        className="btn btn-danger"
                        href="#"
                        onClick={() => this.onDelete(post._id)}
                      >
                        <i className="fas fa-edit"></i>&nbsp;Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default TableProfile;
