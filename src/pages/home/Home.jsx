import React, { useState } from 'react';
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import axiosInstance from '../../utils/axiosInstance';
import '../home/home.css'

const Home = () => {

    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  
    const [responseMessage, setResponseMessage] = useState('');
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axiosInstance.post('/contacts/create', formData); // API endpoint to handle contact submissions
        setResponseMessage(response.data.message || 'Your message has been sent successfully!');
        setFormData({ name: '', email: '', phone: '', message: '' }); // Clear form fields
      } catch (error) {
        console.error('Error submitting contact form:', error.response?.data || error);
        setResponseMessage(error.response?.data?.message || 'Failed to send your message. Please try again later.');
      }
    };
  
  return (
    <>
      <Navbar />
      <div className="home-container">
        {/* Hero Section */}
        <div className="hero">
  <div className="img">
    <img src="https://ihg.scene7.com/is/image/ihg/holiday-inn-hotel-and-suites-lake-city-4026876370-4x3" alt="Hotel" className="hero-img" />
    <div className="overlay"></div>
    <div className="text">
      <h1>Hotel Avinya</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae numquam eveniet ad ut asperiores dolor reprehenderit sunt perferendis cupiditate at?</p>
    </div>
  </div>
</div>


        {/* About Us Section */}
        <div className="aboutus">
          <h2>About Us</h2>
          <div className="aboutus-content">
            <img src="https://www.tripsavvy.com/thmb/jMyV9jJZi70RnxjDgF-uMZKvBKg=/2800x2200/filters:fill(auto,1)/Four-Seasons-Hotel-Macao-Lobby-Ken-Seet-5abd8edd04d1cf0037616ed0.jpg" alt="About Us" className="aboutus-img" />
            <p>We are committed to providing the best hotel experience. Our team is dedicated to making your stay comfortable and memorable.</p>
          </div>
        </div>

       

        {/* Contact Form */}
        <div className="contact">
      <h2>Contact Us</h2>
      <div className="help">
        <img src="https://cdni.iconscout.com/illustration/premium/thumb/contact-us-5795988-4849052.png" alt="" />
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Submit</button>
          {responseMessage && <p>{responseMessage}</p>}
        </form>
      </div>
    </div>
      </div>
      <Footer />
    </>
  )
}

export default Home;
