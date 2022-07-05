import { useState, useContext } from "react";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { API_PATH } from "../contants/api";
import { useNavigate } from "react-router-dom";

const AddRestaurant = () => {
  const { addRestaurant } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [selectedPriceRange, setSelectedPrinceRange] = useState(1);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const navigate = useNavigate();

  const getErrors = () => {
    const result = {};
    if (name.length === 0) result.name = "Name is required";
    if (location.length === 0) result.location = "Location is required";
    return result;
  };

  const errors = getErrors();
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAttemptedSubmit(true);
    if (!isValid) return;
    try {
      const response = await fetch(API_PATH, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          location: location,
          price_range: selectedPriceRange,
        }),
      });
      if (response.ok) {
        setName("");
        setLocation("");
        setAttemptedSubmit(false);
        const json = await response.json();
        addRestaurant(json.data.restaurant);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="my-8">
      <h1 className="mb-8 text-center text-3xl font-medium text-gray-800 md:text-[42px]">
        Add Restaurant
      </h1>
      <div className="mx-auto mt-12 w-full max-w-3xl px-6">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="">
            {attemptedSubmit && !isValid && errors.name && (
              <div>{errors.name}</div>
            )}
            {attemptedSubmit && !isValid && errors.location && (
              <div>{errors.location}</div>
            )}
          </div>
          <label htmlFor="name" className="mb-1 block text-sm text-gray-900">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="mb-4 block w-full rounded border border-gray-300 py-2 px-3 text-gray-900"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
          />
          <label
            htmlFor="location"
            className="mb-1 block text-sm text-gray-900"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            className="mb-4 block w-full rounded border border-gray-300 py-2 px-3 text-gray-900"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            maxLength={50}
          />
          <label className="mb-1 block text-sm text-gray-900">
            Price Range
          </label>

          <select
            className="mb-4 block w-full rounded border border-gray-300 py-2 px-3 text-gray-900"
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
            className="rounded bg-teal-600 px-9 py-[9px] font-medium text-white transition hover:bg-teal-700"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRestaurant;
