import AddRestaurant from "../components/AddRestaurant";
import Header from "../components/Header";
import RestaurantList from "../components/RestaurantList";

const Home = () => (
  <div className="container">
    <div className="container-inner">
      <Header />
      <div className="responsive-container">
        <AddRestaurant />
        <RestaurantList />
      </div>
    </div>
  </div>
);

export default Home;
