import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";


class UsersTable extends Component {
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
    axios.get("/api/v1/authenticate/register")
      .then((res) => {
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
      })
      .catch((error) => {
        // Handle API request errors here (e.g., display an error message).
        console.error("API request failed:", error);
      });
  }




  onDelete = (id) => {
    axios.delete(`http://localhost:8000/item/delete/${id}`).then((res) => {
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
        <h2 className="text1">Users Details</h2>


        <div >
     <table className="table table-striped table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">NIC</th>
              <th scope="col">Phone</th>
              <th scope="col">DOB</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col">Role</th>
              <th scope="col">Status</th>
             
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post, index) => (
              <tr key={index}>
                <td>{post.Id }</td>
                <td>{post.Name }</td>
                <td>{post.NIC }</td>
                <td>{post.Phone }</td>
                <td>{post.DOB }</td>
                <td>{post.Email }</td>
                <td>{post.Password }</td>
                <td>{post.Role }</td>
                <td>{post.Status }</td>
                
                <td>
                  <a className="btn btn-warning" href={`/supplier/update/${post._id}`}>
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </a>
                  &nbsp;
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
    </div >
    </div>
  );
  }

}

export default UsersTable;
