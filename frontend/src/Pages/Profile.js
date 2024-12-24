import React from 'react';
import { useQuery, gql } from '@apollo/client';
import ProfileCard from '../Components/ProfileCard';

const GET_USER_PROFILE = gql`
  query GetUserProfile {
    me {
      avatar
      username
      email
    }
  }
`;

const Profile = () => {
  const { data, loading, error } = useQuery(GET_USER_PROFILE);

  if (loading) {
    return <p>Loading...</p>;
  }
  
  if (error) {
    return <p>Error loading user data!</p>;
  }
  
  if (data?.me) {
    const { avatar, username, email } = data.me;

    return (
      <div className="profile">
        <h1>Profile Page</h1>
        <ProfileCard avatar={avatar} name={username} email={email} />
      </div>
    );
  }

  return <p>User not logged in</p>;
};

export default Profile;
