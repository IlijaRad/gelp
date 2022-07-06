import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantsTableRow from "./RestaurantsTableRow";
import Fuse from "fuse.js";
import { API_PATH } from "../contants/api";
import Checkbox from "./Checkbox";
import TableHeader from "./TableHeader";
import DataSort from "react-data-sort";
import Trashcan from "../assets/icons/Trashcan";
import Pagination from "./Pagination";

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
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(15);

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
        threshold: 0.2,
      });
      const results = fuse.search(restaurantSearch).map(({ item }) => item);
      if (restaurantSearch.length > 1 && results.length > 0) {
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
      {restaurants.length > 0 && (
        <DataSort
          key={perPage}
          data={restaurants}
          sortBy={currentSortOption}
          direction={sortDirection}
          activePage={currentPage}
          paginate={true}
          itemsPerPage={perPage}
          render={({ data, pages }) => {
            return (
              <>
                <div className="rounded-tl-lg rounded-tr-lg border-t border-l border-r border-gray-200 bg-white px-4 py-4 md:px-8 md:py-7">
                  <div className="my-2 flex flex-wrap items-center justify-between gap-4 md:my-0">
                    <div className="basis-full md:basis-[45%]">
                      <div className="relative w-full shrink grow md:w-auto">
                        <input
                          type="text"
                          value={restaurantSearch}
                          onChange={(e) => setRestaurantSearch(e.target.value)}
                          className="h-[40px] w-full min-w-[300px] rounded border border-gray-100 bg-gray-200/70 py-2 px-3 pr-8 text-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-300"
                          maxLength={255}
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="absolute right-2 top-[50%] h-4 w-4 -translate-y-[50%]"
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
                      <div className="mr-4 hidden shrink-0 md:block">
                        Group actions:{" "}
                      </div>
                      <div
                        onClick={handleDeleteSelected}
                        className="group mr-6 hidden cursor-pointer items-center justify-center rounded border border-red p-1.5 transition hover:bg-red md:flex"
                      >
                        <Trashcan className="h-5 w-5 stroke-red transition group-hover:stroke-white" />
                      </div>
                      <Link
                        to={"/restaurants/new"}
                        className="rounded bg-blue px-6 py-2 font-medium text-white transition hover:bg-blueDark first-letter:focus:outline-none"
                      >
                        New Restaurant
                      </Link>
                    </div>

                    <div className="flex items-center md:hidden">
                      <div className="mr-3 shrink-0 md:mr-4">
                        Group actions:{" "}
                      </div>
                      <div
                        onClick={handleDeleteSelected}
                        className="group flex cursor-pointer items-center justify-center rounded border border-red p-1.5 transition hover:bg-red"
                      >
                        <Trashcan className="h-5 w-5 stroke-red transition group-hover:stroke-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="overflow-y-hidden overflow-x-scroll border bg-white pt-4 md:pt-7">
                  <table className="w-full  whitespace-nowrap">
                    <thead>
                      <tr className="h-16 w-full text-sm leading-none text-gray-800">
                        <TableHeader className="pl-8">
                          <Checkbox
                            setUncheckedBySingle={setUncheckedBySingle}
                            checked={checked}
                            setChecked={setChecked}
                          />
                        </TableHeader>
                        <TableHeader
                          className="pl-4"
                          chevron={true}
                          chevronEvent={() =>
                            setCurrentSortOption(SORT_OPTIONS.NAME)
                          }
                          setSortDirection={setSortDirection}
                        >
                          <span>Restaurant</span>
                        </TableHeader>
                        <TableHeader
                          className="pl-12"
                          chevron={true}
                          chevronEvent={() =>
                            setCurrentSortOption(SORT_OPTIONS.LOCATION)
                          }
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
                      )}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  totalPages={pages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  perPage={perPage}
                  setPerPage={setPerPage}
                />
              </>
            );
          }}
        />
      )}
    </div>
  );
};

export default RestaurantsTable;
