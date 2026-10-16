
import { NavLink } from 'react-router-dom';
import { useSavedFoods } from '../context/SavedContext';

function NavBar() {
  const { savedFoods } = useSavedFoods();

  return (
    <nav className="navbar">
      <NavLink to="/" end>Home</NavLink>

      <NavLink to="/saved">
        Saved Items ({savedFoods.length})
      </NavLink>
    </nav>
  );
}

export default NavBar;
