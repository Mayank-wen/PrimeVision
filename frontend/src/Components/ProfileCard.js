import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useApolloClient, gql } from "@apollo/client"; 

const ProfileCard = ({ avatar, name, email }) => {
  const navigate = useNavigate();
  const client = useApolloClient(); 

  const handleAddMovieClick = () => {
    navigate("/NewMovie");
  };

  const handleLogoutClick = async () => {
    localStorage.removeItem('token');
    client.writeQuery({
      query: gql`
        query GetIsLoggedIn {
          isLoggedIn @client
        }
      `,
      data: {
        isLoggedIn: false
      }
    });
    await client.clearStore();
     navigate('/');
  };

  return (
    <StyledWrapper>
      <div className="card">
        <div className="card__img"></div>
        <div className="card__avatar">
          <img src={avatar} alt="Avatar" />
        </div>
        <div className="card__title">{name}</div>
        <div className="card__subtitle">{email}</div>
        <button className="card__button" onClick={handleAddMovieClick}>
          Add Movie
        </button>
        <ButtonAsLink onClick={handleLogoutClick}>Logout</ButtonAsLink>
      </div>
    </StyledWrapper> 
  );
};
const StyledWrapper = styled.div`
  .card {
    background-color: rgba(26, 60, 226, 0.1);
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 16px;
    height: 500px;
    width: 400px;
    margin: 100px 350px;
  }

  .card__img {
    width: 100%;
    height: 150px;
    background: url("https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&w=600");
    border-radius: 8px;
  }

  .card__avatar {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    margin: -30px auto 10px;
    overflow: hidden;
    background-color: #f0f0f0; /* Placeholder for avatar */
    justify-content:center;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;      /* Makes image cover the container */
      object-position: center; /* Centers the image */
    }
  }

  .card__title {
    font-size: 18px;
    text-align: center;
    font-family: fantasy;
  }

  .card__subtitle {
    padding: 10px;
    font-size: 16px;
    text-align: center;
    margin: 5px 0;
    font-family: cursive;
  }

  .card__button {
    display: block;
    width: 100px;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
    margin-left: 150px;

  }

  .card__button:hover {
    background-color: #0056b3;
  }
`;
const ButtonAsLink = styled.button`
  display: block;
  width: 100px;
  padding: 10px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  margin: 10px auto;

  &:hover {
    background-color: #c82333;
  }
`;

export default ProfileCard;
