import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_PATH } from "../contants/api";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantsTableRow from "./RestaurantsTableRow";

const RestaurantsTable = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);

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
    <div className="w-full sm:px-6">
      <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
        <div className="flex md:justify-end md:my-0 my-2">
          <Link
            to={"/restaurants/new"}
            className="font-medium leading-none text-white px-6 py-3 bg-blue-600 hover:bg-blue-700 focus:outline-none rounded"
          >
            New Restaurant
          </Link>
        </div>
      </div>
      <div className="bg-white overflow-x-scroll overflow-y-hidden shadow px-4 md:px-10 pt-4 md:pt-7 pb-5">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="h-16 w-full text-sm leading-none text-gray-800">
              <th className="font-normal text-left pl-4">Restaurant</th>
              <th className="font-normal text-left pl-12">Location</th>
              <th className="font-normal text-left pl-12">Price Range</th>
              <th className="font-normal text-left pl-12">Ratings</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {restaurants &&
              restaurants.map(
                ({
                  id,
                  name,
                  location,
                  price_range,
                  average_rating,
                  count,
                }) => (
                  <RestaurantsTableRow
                    key={id}
                    id={id}
                    name={name}
                    location={location}
                    price_range={price_range}
                    average_rating={average_rating}
                    count={count}
                    restaurants={restaurants}
                    setRestaurants={setRestaurants}
                  />
                )
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RestaurantsTable;
