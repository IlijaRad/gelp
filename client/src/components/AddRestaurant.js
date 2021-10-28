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

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form action="" className="add-restaurant-form" onSubmit={handleSubmit}>
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
    </form>
  );
};
export default AddRestaurant;
