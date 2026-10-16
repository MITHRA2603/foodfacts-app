
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Button,
  Box,
} from '@mui/material';
import { removeItem } from '../store/savedSlice';

function SavedPage() {
  const savedItems = useSelector((state) => state.saved.items);
  const dispatch = useDispatch();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Saved Items
      </Typography>

      {savedItems.length === 0 ? (
        <Typography>
          No saved foods yet. Search for a food and save it!
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {savedItems.map((food, index) => (
            <Grid item xs={12} sm={6} md={4} key={food.code || index}>
              <Card>
                <CardActionArea
                  component={Link}
                  to={`/product/${food.code}`}
                >
                  {food.image_front_url && (
                    <CardMedia
                      component="img"
                      height="180"
                      image={food.image_front_url}
                      alt={food.product_name || 'Food product'}
                      sx={{ objectFit: 'contain' }}
                    />
                  )}

                  <CardContent>
                    <Typography variant="h6">
                      {food.product_name || 'Unknown food'}
                    </Typography>
                    <Typography color="text.secondary">
                      {food.brands || 'Brand not available'}
                    </Typography>
                  </CardContent>
                </CardActionArea>

                <Box sx={{ p: 2, pt: 0 }}>
                  <Button
                    color="error"
                    onClick={() => dispatch(removeItem(food.code))}
                  >
                    Remove
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default SavedPage;
