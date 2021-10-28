import {
  Card,
  CardHeader,
  CardContent,
  Rating,
  useMediaQuery,
} from "@mui/material";

const Reviews = ({ reviews }) => {
  const matches = useMediaQuery("(min-width:1200px)");

  return (
    <>
      {reviews.map(({ id, name, rating, review }) => (
        <Card key={id} className="card">
          <div className="card__header">
            <CardHeader title={name} />
            {matches ? (
              <Rating className="card__rating" value={rating} readOnly />
            ) : (
              <Rating
                className="card__rating"
                value={rating}
                readOnly
                size="small"
              />
            )}
          </div>
          <CardContent>{review}</CardContent>
        </Card>
      ))}
    </>
  );
};
export default Reviews;
