import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Update from "./pages/Update";
import Restaurant from "./pages/Restaurant";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/restaurants/:id/update">
          <Update />
        </Route>
        <Route exact path="/restaurants/:id">
          <Restaurant />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
