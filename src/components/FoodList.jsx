
import FoodCard from './FoodCard';

function FoodList({ foods = [] }) {
  return (
    <>
      {foods.map((food, index) => (
        <FoodCard key={food.code || index} food={food} />
      ))}
    </>
  );
}

export default FoodList;
