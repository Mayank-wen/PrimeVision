import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";

const SIGNIN_USER = gql`
  mutation signIn($username: String!, $email: String!, $password: String!) {
    signIn(username: $username, email: $email, password: $password)
  }
`;

const Login = () => {
  useEffect(() => {
    document.title = "Login";
  }, []);

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: (data) => {
      localStorage.setItem("token", data.signIn);
      console.log("Token set:", data.signIn);
      navigate("/");
      window.location.reload();
    },
    onError: (error) => {
      if (error.message.includes("Error signing in")) {
        alert("No existing user found. Redirecting to signup...");
        navigate("/signup");
      }
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    signIn({
      variables: { username, email, password },
    });
  };

  return (
    <StyledWrapper>
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <p className="title">Login Form</p>
          <input
            placeholder="Username"
            className="username input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Email"
            className="email input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            className="password input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn" type="submit" disabled={loading}>
            Login
          </button>
          <p>OR</p>
          <button 
            className="btn signup-btn" 
            type="button" 
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
          {error && <p>Error: {error.message}</p>}  
        </form>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  ::selection {
    background-color: gray;
  }

  .container {
    margin: 100px auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form {
    width: 400px;
    height: 500px;
    background-image: linear-gradient(to bottom, #424242, #212121);
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 0.5rem;
  }

  .title {
   color: #00d4ff;
    margin: 3rem 0;
    font-size: 2rem;
  }

  .input {
    margin: 0.5rem 0;
    padding: 1rem 0.5rem;
    width: 20rem;
    background-color: inherit;
    color:white;
    border: none;
    outline: none;
    border-bottom: 1px solid  #00d4ff;;
    transition: all 400ms;
  }

  .input:hover {
    background-color: #424242;
    border: none;
    border-radius: 0.5rem;
  }

  .btn {
    height: 3rem;
    width: 20rem;
    margin-top: 0.5rem;
    border: 2px solid #00d4ff;
    border-radius: 0.5rem;  
    background-color:transparent;
    color: #00d4ff;
    font-size: 1.2rem;
    transition: all 400ms;
    cursor: pointer;
  }

  .signup-btn {
    background-color: transparent;
    border: 2px solid #00d4ff;
    color: #00d4ff;
  margin-top:-5px;
  }

  .signup-btn:hover {
    background-color: #00d4ff;
    color :black;
  }

  .btn:hover {
    background-color:#00d4ff; ;
    box-shadow: none;
    color:black;
  }
`;

export default Login;
