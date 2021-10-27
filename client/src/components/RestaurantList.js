import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useContext, useEffect } from "react";
import { API_PATH } from "../contants/api";
import { RestaurantContext } from "../context/RestaurantsContext";

const RestaurantList = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantContext);
  useEffect(() => {
    async function getRestaurants() {
      try {
        const result = await fetch(API_PATH);
        const json = await result.json();
        setRestaurants(json.data.restaurants);
      } catch (err) {
        console.log(err);
      }
    }
    getRestaurants();
    //eslint-disable-next-line
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Restaurant</TableCell>
            <TableCell align="center">Location</TableCell>
            <TableCell align="center">Price Range</TableCell>
            <TableCell align="center">Ratings</TableCell>
            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurants &&
            restaurants.map((restaurant) => (
              <TableRow
                key={restaurant.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {restaurant.name}
                </TableCell>
                <TableCell align="center">{restaurant.location}</TableCell>
                <TableCell align="center">
                  {"$".repeat(restaurant.price_range)}
                </TableCell>
                <TableCell align="center">Reviews</TableCell>
                <TableCell align="center">
                  <Button variant="contained" color="success">
                    Edit
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button variant="contained" color="error">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default RestaurantList;
