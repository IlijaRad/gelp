import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Rating,
} from "@mui/material";
import { useContext, useEffect } from "react";
import { API_PATH } from "../contants/api";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { useNavigate } from "react-router-dom";

const RestaurantList = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  const navigate = useNavigate();

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

  const handleEdit = (e, id) => {
    e.stopPropagation();
    navigate(`/restaurants/${id}/update`);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();

    try {
      await fetch(`${API_PATH}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setRestaurants(
        restaurants.filter((restaurant) => {
          return restaurant.id !== id;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = (id) => {
    navigate(`/restaurants/${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Restaurant</TableCell>
            <TableCell align="center">Location</TableCell>
            <TableCell align="center">Price Range</TableCell>
            <TableCell align="center">Ratings</TableCell>
            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurants &&
            restaurants.map(
              ({ id, name, location, price_range, average_rating, count }) => (
                <TableRow
                  key={id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => handleClick(id)}
                  className="table-row"
                >
                  <TableCell align="center" component="th" scope="row">
                    {name}
                  </TableCell>
                  <TableCell align="center">{location}</TableCell>
                  <TableCell align="center">
                    {"$".repeat(price_range)}
                  </TableCell>
                  <TableCell align="center" className="ratings-cell">
                    {average_rating ? (
                      <>
                        <Rating value={Math.round(average_rating)} readOnly />
                        {`(${count})`}
                      </>
                    ) : (
                      <>
                        <Rating value={0} readOnly />
                        {`(0)`}
                      </>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={(event) => handleEdit(event, id)}
                      className="table-button"
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={(event) => handleDelete(event, id)}
                      variant="contained"
                      color="error"
                      className="table-button"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default RestaurantList;
