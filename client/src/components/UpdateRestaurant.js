import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { API_PATH } from "../contants/api";

const UpdateRestaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [selectedPriceRange, setSelectedPrinceRange] = useState(1);

  useEffect(() => {
    async function getRestaurant() {
      try {
        const result = await fetch(`${API_PATH}/${id}`);
        const json = await result.json();
        setRestaurants([json.data.restaurant]);
        const { name, location, price_range } = json.data.restaurant;
        setName(name);
        setLocation(location);
        setSelectedPrinceRange(price_range);
      } catch (err) {
        console.log(err);
      }
    }
    getRestaurant();
    //eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    async function updateRestaurants() {
      const res = await fetch(`${API_PATH}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          location,
          price_range: selectedPriceRange,
        }),
      });
      if (res.ok) {
        navigate("/");
      }
    }
    updateRestaurants();
  };

  if (!restaurants) return null;

  return (
    <div className="mx-auto mt-12 w-full max-w-3xl px-6">
      <form className="w-full" onSubmit={handleSubmit}>
        <label htmlFor="name" className="text-gray-800 mb-1 block text-sm">
          Name
        </label>
        <input
          className="border-gray-300 text-gray-800 focus:border-transparent focus:ring-gray-300 mb-4 block w-full rounded border py-2 px-3 focus:outline-none focus:ring-2"
          type="text"
          placeholder="Name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={50}
        />
        <label htmlFor="location" className="text-gray-800 mb-1 block text-sm">
          Location
        </label>
        <input
          className="border-gray-300 text-gray-800 focus:border-transparent focus:ring-gray-300 mb-4 block w-full rounded border py-2 px-3 focus:outline-none focus:ring-2"
          type="text"
          placeholder="Location"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          maxLength={50}
        />
        <label className="text-gray-800 mb-1 block text-sm">Price Range</label>
        <select
          className="border-gray-300 bg-white text-gray-800 focus:border-transparent focus:ring-gray-300 mb-6 block w-full rounded border py-2 px-3 focus:outline-none focus:ring-2"
          value={selectedPriceRange}
          onChange={(e) => setSelectedPrinceRange(e.target.value)}
        >
          {[1, 2, 3, 4, 5].map((option) => (
            <option value={option} key={option}>
              {"$".repeat(option)}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="text-white rounded bg-green px-9 py-[9px] font-medium transition hover:bg-greenDark"
        >
          Update
        </button>
      </form>
    </div>
  );
};
export default UpdateRestaurant;
