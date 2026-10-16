
import { AppBar, Toolbar, Typography, Button, Badge, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function NavBar() {
  const savedItems = useSelector((state) => state.saved.items);

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          FoodFacts
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button color="inherit" component={NavLink} to="/" end>
            Home
          </Button>

          <Button color="inherit" component={NavLink} to="/saved">
            <Badge badgeContent={savedItems.length} color="secondary">
              Saved Items
            </Badge>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
