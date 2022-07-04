import { useContext, useState } from "react";
import { API_PATH } from "../contants/api";
import { useParams } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantsContext";

const AddReview = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(1);

  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_PATH}/${id}/addReview`, {
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
      if (res.ok) {
        const { data } = await res.json();
        setSelectedRestaurant({
          ...selectedRestaurant,
          reviews: [...selectedRestaurant.reviews, data.review],
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-16">
      <label htmlFor="name" className="text-sm mb-1 block text-gray-900">
        Name
      </label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-4 py-2 block max-w-md w-full px-3 border border-gray-300 text-gray-900 rounded"
        maxLength={50}
      />
      <label htmlFor="rating" className="text-sm mb-1 block text-gray-900">
        Rating
      </label>
      <select
        className="mb-4 py-2 block max-w-md w-full px-3 border border-gray-300 text-gray-900 rounded"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      >
        {[1, 2, 3, 4, 5].map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
      <label htmlFor="review" className="text-sm mb-1 block text-gray-900">
        Name
      </label>
      <textarea
        id="review"
        rows={4}
        placeholder="Write your review"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        className="mb-4 py-2 block w-full px-3 border border-gray-300 text-gray-900 rounded min-h-[60px] max-h-[300px]"
        maxLength={1000}
      />
      <button
        type="submit"
        className="text-white font-medium px-9 py-[9px] bg-blue-600 hover:bg-blue-700 rounded"
      >
        Add Review
      </button>
    </form>
  );
};
export default AddReview;
