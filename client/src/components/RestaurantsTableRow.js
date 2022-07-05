import { useNavigate } from "react-router-dom";
import { API_PATH } from "../contants/api";

const RestaurantsTableRow = ({
  id,
  name,
  location,
  price_range,
  average_rating,
  restaurants,
  setRestaurants,
  allRestaurants,
  setAllRestaurants,
  count,
}) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/restaurants/${id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/restaurants/${id}/update`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();

    try {
      const response = await fetch(`${API_PATH}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setRestaurants(
          restaurants.filter((restaurant) => {
            return restaurant.id !== id;
          })
        );
        setAllRestaurants(
          allRestaurants.filter((restaurant) => {
            return restaurant.id !== id;
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <tr
      key={id}
      className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
      onClick={() => handleClick(id)}
    >
      <td className="cursor-pointer pl-4">
        <p className="font-medium">{name}</p>
      </td>
      <td className="cursor-pointer pl-12">
        <p className="font-medium">{location}</p>
      </td>
      <td className="cursor-pointer pl-12">
        <p className="font-medium">{"$".repeat(price_range)}</p>
      </td>
      <td className="cursor-pointer pl-12">
        <div className="flex items-center">
          {average_rating ? (
            <>
              {[...Array(Math.round(average_rating))].map((_, i) => (
                <span className="text-yellow-500 text-2xl" key={i}>
                  ★
                </span>
              ))}
              {[...Array(5 - Math.round(average_rating))].map((_, i) => (
                <span className="text-gray-500 text-2xl" key={i}>
                  ★
                </span>
              ))}
              <p className="ml-1.5 font-medium">{`(${count})`}</p>
            </>
          ) : (
            <>
              {[...Array(5)].map((_, i) => (
                <span className="text-gray-500 text-2xl" key={i}>
                  ★
                </span>
              ))}
              <p className="ml-1.5 font-medium">{`(0)`}</p>
            </>
          )}
        </div>
      </td>
      <td className="pl-6">
        <button
          onClick={handleEdit}
          className="text-white font-medium px-6 py-3 bg-teal-600 hover:bg-teal-700 focus:outline-none rounded"
        >
          Edit
        </button>
      </td>
      <td className="pl-6">
        <button
          onClick={handleDelete}
          className="text-white font-medium px-6 py-3 bg-red-600 hover:bg-red-700 focus:outline-none rounded"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default RestaurantsTableRow;
