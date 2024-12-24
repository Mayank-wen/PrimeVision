import React from "react";
import { Navigate } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const PrivateRoute = ({ element: Element }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return data.isLoggedIn ? Element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
