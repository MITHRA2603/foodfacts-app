
import { Link } from 'react-router-dom';
import FoodList from '../components/FoodList';
import { useSavedFoods } from '../context/SavedContext';

function SavedPage() {
  const { savedFoods } = useSavedFoods();

  return (
    <main className="container">
      <h1>Saved Items</h1>

      {savedFoods.length === 0 ? (
        <p>No saved foods yet. Go home and save a food product!</p>
      ) : (
        <>
          <p>{savedFoods.length} saved food(s)</p>
          <FoodList foods={savedFoods} />
        </>
      )}

      <Link to="/">← Back to Home</Link>
    </main>
  );
}

export default SavedPage;
