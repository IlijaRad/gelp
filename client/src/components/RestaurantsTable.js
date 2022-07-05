import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantsTableRow from "./RestaurantsTableRow";
import Fuse from "fuse.js";

const RestaurantsTable = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  const [allRestaurants, setAllRestaurants] = useState(restaurants);
  const [restaurantSearch, setRestaurantSearch] = useState("");

  useEffect(() => {
    if (allRestaurants && allRestaurants.length > 0) {
      const fuse = new Fuse(allRestaurants, {
        keys: ["name", "location"],
        threshold: 0.0,
      });
      const results = fuse.search(restaurantSearch).map(({ item }) => item);
      console.log(results, restaurantSearch, restaurants);
      if (restaurantSearch.length > 3 && results.length > 0) {
        setRestaurants(results);
      } else if (restaurantSearch.length > 0 && results.length === 0) {
        setRestaurants([]);
      } else {
        setRestaurants(allRestaurants);
      }
    }
    //eslint-disable-next-line
  }, [restaurantSearch, allRestaurants]);

  return (
    <div className="w-full sm:px-6">
      <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
        <div className="flex flex-wrap justify-between gap-4 md:my-0 my-2">
          <div className="relative basis-full md:basis-[30%]">
            <input
              type="text"
              value={restaurantSearch}
              onChange={(e) => setRestaurantSearch(e.target.value)}
              className="rounded min-w-[320px] h-full w-full py-2 px-3 pr-8 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-600  ring-offset-gray-100"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 absolute right-2 top-[50%] -translate-y-[50%]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#9CA3AF"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <Link
            to={"/restaurants/new"}
            className="font-medium text-white px-6 py-2 bg-blue-600 hover:bg-blue-700 focus:outline-none rounded"
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
                    allRestaurants={allRestaurants}
                    setAllRestaurants={setAllRestaurants}
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
