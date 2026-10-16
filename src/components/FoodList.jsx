
import FoodCard from './FoodCard';

function FoodList({ foods = [] }) {
  if (foods.length === 0) {
    return <p>No food products to display yet.</p>;
  }

  return (
    <div className="food-grid">
      {foods.map((food, index) => (
        <FoodCard
          key={food.code || index}
          food={food}
        />
      ))}
    </div>
  );
}

export default FoodList;
