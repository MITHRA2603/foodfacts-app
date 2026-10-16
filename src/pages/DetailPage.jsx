

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function DetailPage() {
  const { barcode } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFood = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await axios.get(
          `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`
        );

        if (response.data.status === 1 && response.data.product) {
          setFood(response.data.product);
        } else {
          setError('Food product not found.');
        }
      } catch {
        setError('Unable to load nutrition information.');
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, [barcode]);

  if (loading) return <p>Loading nutrition details...</p>;
  if (error) return <p>{error}</p>;
  if (!food) return <p>Food information is unavailable.</p>;

  const nutrition = food.nutriments || {};

  return (
    <main className="container">
      <Link to="/">← Back to Home</Link>

      <h1>{food.product_name || 'Unknown food'}</h1>

      {food.image_front_url && (
        <img
          src={food.image_front_url}
          alt={food.product_name || 'Food product'}
          width="200"
        />
      )}

      <p>Brand: {food.brands || 'Not available'}</p>
      <p>Barcode: {food.code || barcode}</p>

      <h2>Nutrition per 100 g</h2>
      <ul>
        <li>Energy: {nutrition['energy-kcal_100g'] ?? 'N/A'} kcal</li>
        <li>Protein: {nutrition.proteins_100g ?? 'N/A'} g</li>
        <li>Carbohydrates: {nutrition.carbohydrates_100g ?? 'N/A'} g</li>
        <li>Fat: {nutrition.fat_100g ?? 'N/A'} g</li>
        <li>Sugars: {nutrition.sugars_100g ?? 'N/A'} g</li>
        <li>Fiber: {nutrition.fiber_100g ?? 'N/A'} g</li>
        <li>Salt: {nutrition.salt_100g ?? 'N/A'} g</li>
      </ul>
    </main>
  );
}

export default DetailPage;
