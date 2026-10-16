
import { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';

function SearchBar({ onSearch, loading = false }) {
  const [query, setQuery] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!query.trim()) {
      setValidationError('Please enter a food name.');
      return;
    }

    setValidationError('');
    onSearch(query.trim());
  };

  return (
    <Stack
      component="form"
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      onSubmit={handleSubmit}
      sx={{ mb: 3 }}
    >
      <TextField
        fullWidth
        label="Search food"
        placeholder="e.g. apple, milk, chocolate"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          if (event.target.value.trim()) setValidationError('');
        }}
        error={Boolean(validationError)}
        helperText={validationError}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        sx={{ minWidth: 120 }}
      >
        {loading ? 'Searching…' : 'Search'}
      </Button>
    </Stack>
  );
}

export default SearchBar;
