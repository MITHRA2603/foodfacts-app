
import { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Box,
} from '@mui/material';
import SearchBar from '../components/SearchBar';
import FoodList from '../components/FoodList';
import ErrorMessage from '../components/ErrorMessage';
import useFoodSearch from '../hooks/useFoodSearch';

function HomePage() {
  const [query, setQuery] = useState('');
  const { foods, loading, error, searchFoods } = useFoodSearch();
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery);
    setHasSearched(true);
    await searchFoods(searchQuery);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        FoodFacts
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Search food products and discover their nutrition information.
      </Typography>

      <SearchBar onSearch={handleSearch} loading={loading} />

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      <ErrorMessage message={error} />

      {!loading && !error && !hasSearched && (
        <Typography sx={{ mt: 3 }}>
          Search for apple, milk, or chocolate to get started.
        </Typography>
      )}

      {!loading && !error && foods.length > 0 && (
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {foods.map((food, index) => (
            <Grid item xs={12} sm={6} md={4} key={food.code || index}>
              <FoodList foods={[food]} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default HomePage;
