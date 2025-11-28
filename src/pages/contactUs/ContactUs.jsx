import { useState } from "react";
import "../contactUs/contactus.css";
import { submitContact } from "../../graphql/mutation/submitContact";
import { useMutation } from "@apollo/client/react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [responseMessage, setResponseMessage] = useState("");

  //add the contact submission logic here
  const [contactsubmitMutation, { loading }] = useMutation(submitContact);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    contactsubmitMutation({
      variables: {
        input: {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
      },
    });
    setResponseMessage(
      "Thanks for contacting us! We will get back to you soon."
    );
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="contact">
      <h2>Contact Us</h2>
      <div className="contact-container">
        {/* Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
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

          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Submit</button>
          {responseMessage && <p className="response">{responseMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
