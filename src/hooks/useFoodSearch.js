
import { useState } from 'react';
import axios from 'axios';

function useFoodSearch() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchFoods = async (query) => {
    if (!query.trim()) {
      setFoods([]);
      setError('Please enter a food name.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(
        `https://world.openfoodfacts.org/cgi/search.pl`,
        {
          params: {
            search_terms: query,
            search_simple: 1,
            action: 'process',
            json: 1,
            page_size: 12,
          },
        }
      );

      setFoods(response.data.products || []);

      if (!response.data.products?.length) {
        setError('No food products found. Try another name.');
      }
    } catch (err) {
      setError('Unable to fetch food data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { foods, loading, error, searchFoods };
}

export default useFoodSearch;
