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
      <label htmlFor="name" className="text-gray-800 mb-1 block text-sm">
        Name
      </label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border-gray-300 text-gray-800 focus:border-transparent focus:ring-gray-300 mb-4 block w-full max-w-md rounded border py-2 px-3 focus:outline-none focus:ring-2"
        maxLength={50}
      />
      <label htmlFor="rating" className="text-gray-800 mb-1 block text-sm">
        Rating
      </label>
      <select
        className="border-gray-300 bg-white text-gray-800 focus:border-transparent focus:ring-gray-300 mb-4 block w-full max-w-md rounded border py-2 px-3 focus:outline-none focus:ring-2"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      >
        {[1, 2, 3, 4, 5].map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
      <label htmlFor="review" className="text-gray-800 mb-1 block text-sm">
        Name
      </label>
      <textarea
        id="review"
        rows={4}
        placeholder="Write your review"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        className="border-gray-300 text-gray-800 focus:border-transparent focus:ring-gray-300 mb-4 block max-h-[300px] min-h-[60px] w-full rounded border py-2 px-3 focus:outline-none focus:ring-2"
        maxLength={1000}
      />
      <button
        type="submit"
        className="text-white rounded bg-blue px-9 py-[9px] font-medium transition hover:bg-blueDark"
      >
        Add Review
      </button>
    </form>
  );
};
export default AddReview;
