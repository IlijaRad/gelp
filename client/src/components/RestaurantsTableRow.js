import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Checkbox from "./Checkbox";
import Star from "../assets/icons/Star";

const RestaurantsTableRow = ({
  id,
  name,
  location,
  price_range,
  average_rating,
  count,
  allChecked,
  setAllChecked,
  handleDelete,
  selectedIds,
  setSelectedIds,
  uncheckedBySingle,
  setUncheckedBySingle,
}) => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (allChecked) {
      const notIncludes = !selectedIds.includes(id);
      if (notIncludes) {
        setSelectedIds((prev) => [...prev, id]);
      }
    } else {
      if (uncheckedBySingle) setSelectedIds([]);
    }
    //eslint-disable-next-line
  }, [allChecked]);

  useEffect(() => {
    if (selectedIds.includes(id)) setChecked(true);
    else setChecked(false);
  }, [selectedIds, id]);

  useEffect(() => {
    if (!allChecked) {
      if (checked) {
        const notIncludes = !selectedIds.includes(id);
        if (notIncludes) {
          setSelectedIds([...selectedIds, id]);
        }
      } else {
        setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
      }
    }
    if (!checked && allChecked) {
      setUncheckedBySingle(false);
      setSelectedIds((prev) => prev.filter((sId) => sId !== id));
      setAllChecked(false);
    }
    //eslint-disable-next-line
  }, [checked]);

  const handleClick = (id) => {
    navigate(`/restaurants/${id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/restaurants/${id}/update`);
  };

  if (!name) return null;

  return (
    <tr
      key={id}
      className="h-20 border-b border-t border-gray-200 bg-white text-sm leading-none text-gray-800 transition hover:bg-gray-100"
      onClick={() => handleClick(id)}
    >
      <td
        className="relative cursor-pointer pl-8"
        onClick={(e) => e.stopPropagation()}
      >
        <Checkbox checked={checked} setChecked={setChecked} />
      </td>

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
                <Star
                  className="h-5 w-5 fill-[#fdd835] stroke-[#fdd835]"
                  key={i}
                />
              ))}
              {[...Array(5 - Math.round(average_rating))].map((_, i) => (
                <Star
                  className="h-5 w-5 fill-gray-500 stroke-gray-500"
                  key={i}
                />
              ))}
              <p className="ml-1.5 font-medium">{`(${count})`}</p>
            </>
          ) : (
            <>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-gray-500 stroke-gray-500"
                />
              ))}
              <p className="ml-1.5 font-medium">{`(0)`}</p>
            </>
          )}
        </div>
      </td>
      <td className="pl-6">
        <button
          onClick={handleEdit}
          className="rounded bg-green px-6 py-3 font-medium text-white transition hover:bg-greenDark focus:outline-none"
        >
          Edit
        </button>
      </td>
      <td className="pl-6">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(id);
          }}
          className="rounded bg-red px-6 py-3 font-medium text-white transition hover:bg-redDark focus:outline-none"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default RestaurantsTableRow;
