
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import FoodList from '../components/FoodList';
import ErrorMessage from '../components/ErrorMessage';
import useFoodSearch from '../hooks/useFoodSearch';

function HomePage() {
  const [query, setQuery] = useState('');
  const { foods, loading, error, searchFoods } = useFoodSearch();

  const handleSearch = (event) => {
    event.preventDefault();
    searchFoods(query);
  };

  return (
    <main className="container">
      <h1>FoodFacts</h1>
      <p>Search for food products and discover their nutrition.</p>

      <form onSubmit={handleSearch}>
        <SearchBar query={query} setQuery={setQuery} />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      <ErrorMessage message={error} />

      {loading && <p>Loading food products...</p>}

      <FoodList foods={foods} />
    </main>
  );
}

export default HomePage;
