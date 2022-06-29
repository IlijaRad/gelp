import ReactDOM from "react-dom/client";
import App from "./App";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <RestaurantsContextProvider>
    <App />
  </RestaurantsContextProvider>
);

//add roboto font
