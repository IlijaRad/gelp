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
      <label htmlFor="name" className="mb-1 block text-sm text-gray-800">
        Name
      </label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-4 block w-full max-w-md rounded border border-gray-300 py-2 px-3 text-gray-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-300"
        maxLength={50}
      />
      <label htmlFor="rating" className="mb-1 block text-sm text-gray-800">
        Rating
      </label>
      <select
        className="mb-4 block w-full max-w-md rounded border border-gray-300 bg-white py-2 px-3 text-gray-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-300"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      >
        {[1, 2, 3, 4, 5].map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
      <label htmlFor="review" className="mb-1 block text-sm text-gray-800">
        Name
      </label>
      <textarea
        id="review"
        rows={4}
        placeholder="Write your review"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        className="mb-4 block max-h-[300px] min-h-[60px] w-full rounded border border-gray-300 py-2 px-3 text-gray-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-300"
        maxLength={1000}
      />
      <button
        type="submit"
        className="rounded bg-blue-600 px-9 py-[9px] font-medium text-white transition hover:bg-blue-700"
      >
        Add Review
      </button>
    </form>
  );
};
export default AddReview;
