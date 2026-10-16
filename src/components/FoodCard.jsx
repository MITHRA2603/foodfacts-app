
import { Link } from 'react-router-dom';
import { useSavedFoods } from '../context/SavedContext';

function FoodCard({ food }) {
  const { toggleSaved, isSaved } = useSavedFoods();
  const saved = isSaved(food.code);

  return (
    <article className="food-card">
      <Link to={`/product/${food.code}`} className="food-card-link">
        {food.image_front_url && (
          <img
            src={food.image_front_url}
            alt={food.product_name || 'Food product'}
          />
        )}
        <h3>{food.product_name || 'Unknown food'}</h3>
      </Link>

      <p>Brand: {food.brands || 'Not available'}</p>
      <p>
        Energy: {food.nutriments?.['energy-kcal_100g'] ?? 'N/A'} kcal per 100 g
      </p>

      <button
        type="button"
        onClick={() => toggleSaved(food)}
        disabled={!food.code}
      >
        {saved ? '♥ Remove from Saved' : '♡ Save Food'}
      </button>
    </article>
  );
}

export default FoodCard;
