import React, { useState } from 'react';
import '../styles.css';

const Searchbar = ({ handleFilter }) => {
  const [search, setSearch] = useState('');

  const handleChange = evt => {
    setSearch(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const optimizeValue = search.trim().toLowerCase();
    handleFilter(optimizeValue);
    setSearch('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">GO</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={search}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;
