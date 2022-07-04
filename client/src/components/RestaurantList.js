import { useContext, useEffect } from "react";
import { API_PATH } from "../contants/api";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantsTable from "./RestaurantsTable";

const RestaurantList = () => {
  const { setRestaurants } = useContext(RestaurantsContext);

  useEffect(() => {
    async function getRestaurants() {
      try {
        const result = await fetch(API_PATH);
        const json = await result.json();
        setRestaurants(json.data.restaurants);
      } catch (err) {
        console.log(err);
      }
    }
    getRestaurants();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="max-w-[1400px] mx-auto mt-12">
      <RestaurantsTable />
    </div>
  );
};
export default RestaurantList;
