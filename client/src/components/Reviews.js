import AddReview from "./AddReview";

const Reviews = ({ reviews }) => {
  return (
    <div className="max-w-[1600px] w-full mx-auto mt-12 px-6 flex flex-col ">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 mb-12">
        {reviews.map(({ id, name, rating, review }) => (
          <div key={id} className="flex flex-col border min-w-[225px]">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="text-2xl truncate">{name}</div>
              <div className="flex">
                {[...Array(Math.round(rating))].map((_, i) => (
                  <span className="text-yellow-500 text-2xl" key={i}>
                    ★
                  </span>
                ))}
                {[...Array(5 - Math.round(rating))].map((_, i) => (
                  <span className="text-gray-500 text-2xl" key={i}>
                    ★
                  </span>
                ))}
              </div>
            </div>
            <div className="p-4">
              <p className="line-clamp-8 break-words text-ellipsis">{review}</p>
            </div>
          </div>
        ))}
      </div>
      <AddReview />
    </div>
  );
};
export default Reviews;
