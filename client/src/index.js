import ReactDOM from "react-dom";
import App from "./App";
import { RestaurantContextProvider } from "./context/RestaurantsContext";
import "./index.css";

ReactDOM.render(
  <RestaurantContextProvider>
    <App />
  </RestaurantContextProvider>,
  document.getElementById("root")
);

//add roboto font
