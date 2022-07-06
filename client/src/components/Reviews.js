import Star from "../assets/icons/Star";
import AddReview from "./AddReview";

const Reviews = ({ reviews }) => {
  return (
    <div className="mx-auto mt-12 flex w-full max-w-[1600px] flex-col px-6">
      <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-4">
        {reviews.map(({ id, name, rating, review }) => (
          <div key={id} className="flex min-w-[225px] flex-col border">
            <div className="flex items-center justify-between border-b p-4">
              <div className="truncate text-2xl">{name}</div>
              <div className="flex">
                {[...Array(Math.round(rating))].map((_, i) => (
                  <Star
                    className="h-4 w-4 fill-[#fdd835] stroke-[#fdd835]"
                    key={i}
                  />
                ))}
                {[...Array(5 - Math.round(rating))].map((_, i) => (
                  <Star
                    className="h-4 w-4 fill-gray-500 stroke-gray-500"
                    key={i}
                  />
                ))}
              </div>
            </div>
            <div className="p-4">
              <p className="text-ellipsis break-words line-clamp-8">{review}</p>
            </div>
          </div>
        ))}
      </div>
      <AddReview />
    </div>
  );
};
export default Reviews;
