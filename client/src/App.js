import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Update from "./pages/Update";
import Restaurant from "./pages/Restaurant";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants/:id/update" element={<Update />} />
        <Route path="/restaurants/:id" element={<Restaurant />} />
      </Routes>
    </Router>
  );
}

export default App;
