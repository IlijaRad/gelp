import { useParams } from "react-router-dom";
import { TextField, MenuItem, Button } from "@mui/material";
import { useState, useContext } from "react";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { useEffect } from "react";
import { API_PATH } from "../contants/api";
import { useNavigate } from "react-router-dom";

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
    <div className="container">
      <div className="container-inner">
        <form onSubmit={handleSubmit}>
          <div className="field-container">
            <TextField
              fullWidth
              size="small"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="field-container">
            <TextField
              fullWidth
              size="small"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="field-container">
            <TextField
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
          </div>
          <Button type="submit" variant="contained" color="success">
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};
export default UpdateRestaurant;
