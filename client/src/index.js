import ReactDOM from "react-dom";
import App from "./App";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";
import "./index.css";

ReactDOM.render(
  <RestaurantsContextProvider>
    <App />
  </RestaurantsContextProvider>,
  document.getElementById("root")
);

//add roboto font
