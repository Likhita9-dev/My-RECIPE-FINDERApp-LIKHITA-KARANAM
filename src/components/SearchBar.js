import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search by ingredient, cuisine, or keyword"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
