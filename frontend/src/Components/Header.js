import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";
import BButton from "./BButton";
import Input from "./Input";
import "../css/Header.css";

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const Header = ({ onSearch, currentPage }) => {
  const { data, loading, error } = useQuery(IS_LOGGED_IN);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (location.pathname === '/' && term) {
      navigate('/explore');
    }
    if (onSearch) {
      onSearch(term);
    }
  };

  const handleInputClick = () => {
    if (location.pathname === '/') {
      navigate('/explore');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading user info</div>;

  return (
    <div className="header">
      <Input 
        onSearch={handleSearch}
        placeholder={`Search ${currentPage || 'movies'}...`}
        onInputClick={handleInputClick}
      />
      <BButton isLoggedIn={data?.isLoggedIn} />
    </div>
  );
};

export default Header;
