import { TextField, MenuItem, Button } from "@mui/material";
import { useState } from "react";

const AddRestaurant = () => {
  const [selectedPriceRange, setSelectedPrinceRange] = useState(1);
  const handleSelect = (e) => {
    setSelectedPrinceRange(e.target.value);
  };
  return (
    <div>
      <form action="" className="add-restaurant-form">
        <TextField
          className="add-restaurant-form__name"
          size="small"
          placeholder="Name"
        />
        <TextField
          className="add-restaurant-form__location"
          size="small"
          placeholder="Location"
        />
        <TextField
          className="add-restaurant-form__price-range"
          select
          fullWidth
          size="small"
          label="Price Range"
          value={selectedPriceRange}
          onChange={handleSelect}
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
        <Button className="add-restaurant-form__button" variant="contained">
          Add
        </Button>
      </form>
    </div>
  );
};
export default AddRestaurant;
