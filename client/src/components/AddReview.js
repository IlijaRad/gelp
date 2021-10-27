import { TextField, MenuItem, Button } from "@mui/material";
import { useState } from "react";
import { API_PATH } from "../contants/api";
import { useParams, useLocation, useHistory } from "react-router-dom";

const AddReview = () => {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`${API_PATH}/${id}/addReview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          review: reviewText,
          rating,
        }),
      });
      history.push("/");
      history.push(location.pathname);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="field-container">
          <TextField
            className="add-restaurant-form__location"
            fullWidth
            size="small"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="field-container">
          <TextField
            className="add-restaurant-form__price-range"
            select
            fullWidth
            size="small"
            label="Rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
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
                {option}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="field-container">
          <TextField
            fullWidth
            multiline
            rows={4}
            className="add-restaurant-form__location"
            size="small"
            placeholder="Write your review"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </div>
        <div>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
export default AddReview;
