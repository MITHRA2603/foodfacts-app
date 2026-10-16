
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import { addItem, removeItem } from '../store/savedSlice';
import NutritionRow from '../components/NutritionRow';

function DetailPage() {
  const { barcode } = useParams();
  const dispatch = useDispatch();
  const savedItems = useSelector((state) => state.saved.items);

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function fetchFood() {
      setLoading(true);
      setError('');

      try {
        const response = await axios.get(
          `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`
        );

        if (!active) return;

        if (response.data.status === 1 && response.data.product) {
          setFood(response.data.product);
        } else {
          setError('Food product not found.');
        }
      } catch {
        if (active) setError('Unable to load nutrition information.');
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchFood();

    return () => {
      active = false;
    };
  }, [barcode]);

  if (loading) {
    return <CircularProgress sx={{ m: 4 }} />;
  }

  if (error) {
    return <Typography color="error" sx={{ m: 4 }}>{error}</Typography>;
  }

  if (!food) return null;

  const nutrition = food.nutriments || {};
  const isSaved = savedItems.some((item) => item.code === food.code);

  const handleSave = () => {
    if (isSaved) {
      dispatch(removeItem(food.code));
    } else {
      dispatch(addItem(food));
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button component={Link} to="/" sx={{ mb: 2 }}>
        ← Back to Home
      </Button>

      <Paper elevation={2} sx={{ p: { xs: 2, sm: 4 } }}>
        <Typography variant="h4" gutterBottom>
          {food.product_name || 'Unknown food'}
        </Typography>

        {food.image_front_url && (
          <Box
            component="img"
            src={food.image_front_url}
            alt={food.product_name || 'Food product'}
            sx={{ width: '100%', maxWidth: 250, objectFit: 'contain' }}
          />
        )}

        <Typography>Brand: {food.brands || 'Not available'}</Typography>
        <Typography>Barcode: {food.code || barcode}</Typography>

        <Button
          variant="contained"
          onClick={handleSave}
          sx={{ my: 2 }}
        >
          {isSaved ? 'Remove from Saved' : 'Save Food'}
        </Button>

        <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
          Nutrition per 100 g
        </Typography>

        <NutritionRow label="Energy" value={nutrition['energy-kcal_100g']} unit="kcal" />
        <NutritionRow label="Protein" value={nutrition.proteins_100g} unit="g" />
        <NutritionRow label="Carbohydrates" value={nutrition.carbohydrates_100g} unit="g" />
        <NutritionRow label="Fat" value={nutrition.fat_100g} unit="g" />
        <NutritionRow label="Sugars" value={nutrition.sugars_100g} unit="g" />
        <NutritionRow label="Fiber" value={nutrition.fiber_100g} unit="g" />
        <NutritionRow label="Salt" value={nutrition.salt_100g} unit="g" />
      </Paper>
    </Container>
  );
}

export default DetailPage;
