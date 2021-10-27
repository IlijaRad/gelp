import AddRestaurant from "../components/AddRestaurant";
import Header from "../components/Header";
import RestaurantList from "../components/RestaurantList";

const Home = () => (
  <div className="container">
    <div className="container-inner">
      <Header />
      <AddRestaurant />
      <RestaurantList />
    </div>
  </div>
);

export default Home;
