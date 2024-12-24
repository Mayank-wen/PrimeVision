import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

const GET_USER_AVATAR = gql`
  query {
    me {
      avatar
    }
  }
`;

const BButton = ({ isLoggedIn }) => {
  const [avatar, setAvatar] = useState(null);
  
  const { data } = useQuery(GET_USER_AVATAR, {
    skip: !isLoggedIn
  });

  useEffect(() => {
    if (data?.me?.avatar) {
      setAvatar(data.me.avatar);
    }
  }, [data]);

  return (
    <StyledWrapper>
      {isLoggedIn ? (
        <div className="avatar">
          {avatar ? (
            <img src={avatar} alt="User Avatar" className="avatar__image" />
          ) : (
            <div className="avatar__placeholder">No Avatar</div>
          )}
        </div>
      ) : (
        <Link to="/login" className="btn">
          Login
        </Link>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .btn {
    font-size: 1.2rem;
    margin-right:20pz ;
    padding: 10px 20px;
    border: none;
    outline: none;
    border-radius: 0.4rem;
    cursor: pointer;
    text-transform: uppercase;
    background-color: rgb(14, 14, 26);
    color: rgb(234, 234, 234);
    font-weight: 700;
    transition: 0.6s;
    box-shadow: 0px 0px 60px #1f4c65;
    -webkit-box-reflect: below 10px
      linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
    text-decoration: none;
  

  }

  .btn:active {
    scale: 0.92;
  }

  .btn:hover {
    background: rgb(2, 29, 78);
    background: linear-gradient(
      270deg,
      rgba(2, 29, 78, 0.681) 0%,
      rgba(31, 215, 232, 0.873) 60%
    );
    color: rgb(4, 4, 38);
  }

  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .avatar__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .avatar__placeholder {
    font-size: 12px;
    color: #666;
    text-align: center;
  }
`;

export default BButton;
