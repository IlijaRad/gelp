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
    <div className="max-w-3xl w-full mx-auto mt-12 px-6">
      <form className="w-full" onSubmit={handleSubmit}>
        <label htmlFor="name" className="text-sm mb-1 block text-gray-900">
          Name
        </label>
        <input
          className="mb-4 py-2 block w-full px-3 border border-gray-300 text-gray-900 rounded"
          type="text"
          placeholder="Name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={50}
        />
        <label htmlFor="location" className="text-sm mb-1 block text-gray-900">
          Location
        </label>
        <input
          className="mb-4 py-2 w-full block px-3 border border-gray-300 text-gray-900 rounded"
          type="text"
          placeholder="Location"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          maxLength={50}
        />
        <label className="text-sm mb-1 block text-gray-900">Price Range</label>
        <select
          className="mb-6 w-full block py-2 px-3 border border-gray-300 rounded text-gray-900"
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
          className="text-white font-medium px-9 py-[9px] bg-teal-600 hover:bg-teal-700 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
};
export default UpdateRestaurant;
