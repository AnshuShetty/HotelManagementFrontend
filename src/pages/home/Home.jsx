import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "../home/home.css";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home-container">
        {/* Hero Section */}
        <div className="hero">
          <div className="img">
            <img
              src="https://ihg.scene7.com/is/image/ihg/holiday-inn-hotel-and-suites-lake-city-4026876370-4x3"
              alt="Hotel"
              className="hero-img"
            />
            <div className="overlay"></div>
            <div className="text">
              <h1>Hotel Avinya</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
                numquam eveniet ad ut asperiores dolor reprehenderit sunt
                perferendis cupiditate at?
              </p>
              {/* <h2>Hello CICD Testing</h2> */}
            </div>
          </div>
        </div>

        {/* About Us Section */}
        <div className="aboutus">
          <h2>About Us</h2>
          <div className="aboutus-content">
            <img
              src="https://www.tripsavvy.com/thmb/jMyV9jJZi70RnxjDgF-uMZKvBKg=/2800x2200/filters:fill(auto,1)/Four-Seasons-Hotel-Macao-Lobby-Ken-Seet-5abd8edd04d1cf0037616ed0.jpg"
              alt="About Us"
              className="aboutus-img"
            />
            <p>
              We are committed to providing the best hotel experience. Our team
              is dedicated to making your stay comfortable and memorable.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
