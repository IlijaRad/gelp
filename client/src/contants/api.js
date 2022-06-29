export const API_PATH =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001/api/v1/restaurants"
    : process.env.REACT_APP_API_URL;
