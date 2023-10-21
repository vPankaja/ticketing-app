import React from 'react';
import { useState, useEffect } from 'react';

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const backgroundStyle = {
    backgroundImage: 'login_background.jpg',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    /* Other styles if needed */
  };


  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Regular expression for password validation (at least 3 characters with number and letter)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,}$/;
    return passwordRegex.test(password);
  };

  useEffect(() => {

  }, []);

  const handleSubmit = async (e) => {
      // e.preventDefault();

      try {

            // Validate email
            if (!validateEmail(email)) {
                setEmailError('Invalid email address');
            } else {
                setEmailError('');
            }
        
            // Validate password
            if (!validatePassword(password)) {
                setPasswordError('Password must be at least 3 characters and contain at least one letter and one number');
            } else {
                setPasswordError('');
            }

                // Proceed with login logic if both email and password are valid
            if (validateEmail(email) && validatePassword(password)) {
                const response = await fetch(`https://ead-backend-da0fe1e8ac2c.herokuapp.com/api/users/login?email=${email}&password=${password}`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });

                  const data = await response.json();
                  console.log(data);
          
                  if (response.ok) {
                    const userRole = data.userRole;
                    localStorage.setItem("userRole", userRole);
                    setLoggedIn(true);
                    alert("Login Successful!");
                    window.location.href='/'
                  } else {
                    alert(`Error: ${data.message}`);
                  }
            }
            

      } catch (error) {
        console.error("Error:", error);
      }
    };


    


    return (
      <div className="d-flex align-items-center justify-content-center h-100">
        <div className="container card p-5 m-5">
          <h1 className="text-center" style={{ color: "#FF5733", fontFamily: "Baufra" }}>
            <b>Sign In</b>
          </h1><br />
          <div className="container">
            <div className="form-outline mb-2">
              <input
                type="email"
                id="form3Example3"
                className={`form-control ${emailError ? 'border-danger' : ''} custom-input`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="form-label mb-1" htmlFor="form3Example3">Email address</label>
              <small className="text-danger">{emailError}</small>
            </div>
  
            <div className="form-outline mb-2">
              <input
                type="password"
                id="form3Example4"
                className={`form-control ${passwordError ? 'border-danger' : ''} custom-input`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="form-label mb-1" htmlFor="form3Example4">Password</label>
              <small className="text-danger">{passwordError}</small>
            </div>
  
            <div className="d-flex justify-content-center">
              <button type="button" className="btn btn-primary btn-sm" onClick={handleSubmit}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Login;