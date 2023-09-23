import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

const SearchDrugForm = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Handle drug search logic
  };

  return (
    <div>
      <Typography variant="h4">Search Drug</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Search Drug"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <Button variant="contained" color="primary" type="submit">
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchDrugForm;