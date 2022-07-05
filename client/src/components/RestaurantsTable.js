import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantsTableRow from "./RestaurantsTableRow";
import Fuse from "fuse.js";
import { API_PATH } from "../contants/api";
import Checkbox from "./Checkbox";
import TableHeader from "./TableHeader";
import DataSort from "react-data-sort";

const SORT_OPTIONS = {
  NAME: "name",
  LOCATION: "location",
  PRICE_RANGE: "price_range",
  AVERAGE_RATING: "average_rating",
  COUNT: "count",
};

const SORT_DIRECTIONS = {
  ASC: "asc",
  DESC: "desc",
};

const RestaurantsTable = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  const [allRestaurants, setAllRestaurants] = useState(restaurants);
  const [restaurantSearch, setRestaurantSearch] = useState("");
  const [checked, setChecked] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [uncheckedBySingle, setUncheckedBySingle] = useState(false);
  const [currentSortOption, setCurrentSortOption] = useState(SORT_OPTIONS.NAME);
  const [sortDirection, setSortDirection] = useState(SORT_DIRECTIONS.ASC);

  useEffect(() => {
    async function getRestaurants() {
      try {
        const result = await fetch(API_PATH);
        const json = await result.json();
        setAllRestaurants(json.data.restaurants);
        setRestaurants(json.data.restaurants);
      } catch (err) {
        console.log(err);
      }
    }
    getRestaurants();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (allRestaurants && allRestaurants.length > 0) {
      const fuse = new Fuse(allRestaurants, {
        keys: ["name", "location"],
        threshold: 0.0,
      });
      const results = fuse.search(restaurantSearch).map(({ item }) => item);
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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_PATH}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setRestaurants((restaurants) =>
          restaurants.filter((restaurant) => {
            return restaurant.id !== id;
          })
        );
        setAllRestaurants((allRestaurants) =>
          allRestaurants.filter((restaurant) => {
            return restaurant.id !== id;
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteSelected = () => {
    selectedIds.forEach(async (selectedId) => {
      await handleDelete(selectedId);
    });
  };

  return (
    <div className="w-full sm:px-6">
      <div className="px-4 md:px-8 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
        <div className="flex flex-wrap items-center justify-between gap-4 md:my-0 my-2">
          <div className="basis-full md:basis-[45%]">
            <div className="relative w-full md:w-auto grow shrink">
              <input
                type="text"
                value={restaurantSearch}
                onChange={(e) => setRestaurantSearch(e.target.value)}
                className="rounded min-w-[300px] h-full w-full py-2 px-3 pr-8 text-gray-800"
                maxLength={255}
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
          </div>
          <div className="flex items-center">
            <div className="mr-4 hidden md:block shrink-0">Group actions: </div>
            <div
              onClick={handleDeleteSelected}
              className="mr-6 hidden md:flex border items-center justify-center hover:bg-gray-200 cursor-pointer rounded p-1.5 border-slate-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#1E293B"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
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

          <div className="flex md:hidden items-center">
            <div className="mr-3 md:mr-4 shrink-0">Group actions: </div>
            <div
              onClick={handleDeleteSelected}
              className="flex border items-center hover:bg-gray-200 justify-center cursor-pointer rounded p-1.5 border-slate-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#1E293B"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white overflow-x-scroll overflow-y-hidden shadow px-4 md:px-8 pt-4 md:pt-7 pb-5">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="h-16 w-full text-sm leading-none text-gray-800">
              <TableHeader className="pl-4">
                <Checkbox
                  setUncheckedBySingle={setUncheckedBySingle}
                  checked={checked}
                  setChecked={setChecked}
                />
              </TableHeader>
              <TableHeader
                className="pl-4"
                chevron={true}
                chevronEvent={() => setCurrentSortOption(SORT_OPTIONS.NAME)}
                setSortDirection={setSortDirection}
              >
                <span>Restaurant</span>
              </TableHeader>
              <TableHeader
                className="pl-12"
                chevron={true}
                chevronEvent={() => setCurrentSortOption(SORT_OPTIONS.LOCATION)}
                setSortDirection={setSortDirection}
              >
                <span>Location</span>
              </TableHeader>
              <TableHeader
                className="pl-12"
                chevron={true}
                chevronEvent={() =>
                  setCurrentSortOption(SORT_OPTIONS.PRICE_RANGE)
                }
                setSortDirection={setSortDirection}
              >
                <span>Price Range</span>
              </TableHeader>
              <TableHeader
                className="pl-12"
                chevron={true}
                chevronEvent={() =>
                  setCurrentSortOption(SORT_OPTIONS.AVERAGE_RATING)
                }
                setSortDirection={setSortDirection}
              >
                <span>Ratings</span>
              </TableHeader>
            </tr>
          </thead>
          <tbody className="w-full">
            {restaurants.length > 0 && (
              <DataSort
                data={restaurants}
                sortBy={currentSortOption}
                direction={sortDirection}
                render={({ data, pages }) => {
                  return (
                    <>
                      {data.map(
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
                            id={String(id)}
                            name={name}
                            location={location}
                            price_range={price_range}
                            average_rating={average_rating}
                            count={count}
                            handleDelete={handleDelete}
                            allChecked={checked}
                            setAllChecked={setChecked}
                            selectedIds={selectedIds}
                            setSelectedIds={setSelectedIds}
                            uncheckedBySingle={uncheckedBySingle}
                            setUncheckedBySingle={setUncheckedBySingle}
                          />
                        )
                      )}
                    </>
                  );
                }}
              />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RestaurantsTable;
