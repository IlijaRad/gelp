import { useEffect } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { API_PATH } from "../contants/api";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";
import { Rating } from "@mui/material";

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
    <div className="container">
      <div className="container-reviews">
        {selectedRestaurant && (
          <>
            <h1 className="page-title">{selectedRestaurant.restaurant.name}</h1>
            <Rating
              value={Math.round(selectedRestaurant.restaurant.average_rating)}
              readOnly
              className="centered"
            />
            <div className="restaurant-reviews">
              <Reviews reviews={selectedRestaurant.reviews} />
            </div>
          </>
        )}
        <AddReview />
      </div>
    </div>
  );
};
export default Restaurant;
