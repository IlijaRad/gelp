import { Card, CardHeader, CardContent, Rating } from "@mui/material";

const Reviews = ({ reviews }) => {
  return (
    <>
      {reviews.map(({ id, name, rating, review }) => (
        <Card key={id} className="card">
          <div className="card__header">
            <CardHeader title={name} />
            <Rating className="card__rating" value={rating} readOnly />
          </div>
          <CardContent>{review}</CardContent>
        </Card>
      ))}
    </>
  );
};
export default Reviews;
