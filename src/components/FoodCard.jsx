
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Box,
} from '@mui/material';
import { addItem, removeItem } from '../store/savedSlice';

function FoodCard({ food }) {
  const dispatch = useDispatch();
  const savedItems = useSelector((state) => state.saved.items);
  const isSaved = savedItems.some((item) => item.code === food.code);

  const calories = food.nutriments?.['energy-kcal_100g'];

  const handleSave = () => {
    if (isSaved) {
      dispatch(removeItem(food.code));
    } else {
      dispatch(addItem(food));
    }
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea component={Link} to={`/product/${food.code}`}>
        {food.image_front_url && (
          <CardMedia
            component="img"
            height="180"
            image={food.image_front_url}
            alt={food.product_name || 'Food product'}
            sx={{ objectFit: 'contain', p: 1 }}
          />
        )}

        <CardContent>
          <Typography variant="h6" gutterBottom>
            {food.product_name || 'Unknown food'}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {food.brands || 'Brand not available'}
          </Typography>

          {calories != null && (
            <Box sx={{ mt: 2 }}>
              <Chip
                label={`${calories} kcal / 100 g`}
                color="primary"
                size="small"
              />
            </Box>
          )}
        </CardContent>
      </CardActionArea>

      <Box sx={{ p: 2, pt: 0, mt: 'auto' }}>
        <Button
          variant={isSaved ? 'outlined' : 'contained'}
          fullWidth
          disabled={!food.code}
          onClick={handleSave}
        >
          {isSaved ? 'Remove from Saved' : 'Save Food'}
        </Button>
      </Box>
    </Card>
  );
}

export default FoodCard;
