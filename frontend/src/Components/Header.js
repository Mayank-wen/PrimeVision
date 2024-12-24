import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
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

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (onSearch) {
      onSearch(term);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading user info</div>;

  return (
    <div className="header">
      <Input 
        onSearch={handleSearch}
        placeholder={`Search ${currentPage || 'movies'}...`}
      />
        <BButton isLoggedIn={data?.isLoggedIn} />
    </div>
  );
};

export default Header;
