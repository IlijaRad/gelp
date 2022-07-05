import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { API_PATH } from "../contants/api";
import Reviews from "../components/Reviews";

const Restaurant = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);

  useEffect(() => {
    async function getRestaurant() {
      try {
        const result = await fetch(`${API_PATH}/${id}`);
        const json = await result.json();
        setSelectedRestaurant(json.data);
      } catch (err) {
        console.log(err);
      }
    }
    getRestaurant();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="my-8">
      {selectedRestaurant && (
        <div className="flex flex-col items-center">
          <h1 className="text-center font-medium text-gray-800 text-3xl md:text-[42px]">
            {selectedRestaurant.restaurant.name}
          </h1>
          <div className="flex mb-8">
            {[
              ...Array(
                Math.round(selectedRestaurant.restaurant.average_rating)
              ),
            ].map((_, i) => (
              <span className="text-yellow-500 text-2xl" key={i}>
                ★
              </span>
            ))}
            {[
              ...Array(
                5 - Math.round(selectedRestaurant.restaurant.average_rating)
              ),
            ].map((_, i) => (
              <span className="text-gray-500 text-2xl" key={i}>
                ★
              </span>
            ))}
          </div>
          <Reviews reviews={selectedRestaurant.reviews} />
        </div>
      )}
    </div>
  );
};
export default Restaurant;
