import { TextField, MenuItem, Button } from "@mui/material";
import { useState } from "react";
import { useContext } from "react";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { API_PATH } from "../contants/api";

const AddRestaurant = () => {
  const { addRestaurant } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [selectedPriceRange, setSelectedPrinceRange] = useState(1);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

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
      const result = await fetch(API_PATH, {
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
      const json = await result.json();
      addRestaurant(json.data.restaurant);
      setName("");
      setLocation("");
      setAttemptedSubmit(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form action="" className="add-restaurant-form" onSubmit={handleSubmit}>
      <div className="add-restaurant-form__errors">
        {attemptedSubmit && !isValid && errors.name && <div>{errors.name}</div>}
        {attemptedSubmit && !isValid && errors.location && (
          <div>{errors.location}</div>
        )}
      </div>

      <div className="add-restaurant-form__fields">
        <TextField
          className="add-restaurant-form__name"
          size="small"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          className="add-restaurant-form__location"
          size="small"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <TextField
          className="add-restaurant-form__price-range"
          select
          fullWidth
          size="small"
          label="Price Range"
          value={selectedPriceRange}
          onChange={(e) => setSelectedPrinceRange(e.target.value)}
          variant="outlined"
          SelectProps={{
            onClose: () => {
              setTimeout(() => {
                document.activeElement.blur();
              }, 0);
            },
          }}
        >
          {[1, 2, 3, 4, 5].map((option) => (
            <MenuItem value={option} key={option}>
              {"$".repeat(option)}
            </MenuItem>
          ))}
        </TextField>
        <Button
          type="submit"
          className="add-restaurant-form__button"
          variant="contained"
        >
          Add
        </Button>
      </div>
    </form>
  );
};
export default AddRestaurant;
