import { useState } from "react";
import "../contactUs/contactus.css";
import { submitContact } from "../../graphql/mutation/submitContact";
import { useMutation } from "@apollo/client/react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ContactUs = () => {
  const [responseMessage, setResponseMessage] = useState("");

  const [contactsubmitMutation] = useMutation(submitContact);

  const validationSchema = Yup.object({
    name: Yup.string().min(3).trim().required("Name is required"),
    email: Yup.string()
      .trim()
      .email("Enter a valid email")
      .required("Email is required"),
    message: Yup.string().trim().required("Message is required"),
  });

  const initialValues = { name: "", email: "", message: "" };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    console.log("Formik values:", values);
    try {
      setSubmitting(true);
      await contactsubmitMutation({
        variables: {
          input: {
            name: values.name,
            email: values.email,
            message: values.message,
          },
        },
      });
      setResponseMessage(
        "Thanks for contacting us! We will get back to you soon."
      );
      resetForm();
    } catch (err) {
      setResponseMessage("Something went wrong. Please try again later.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="contact">
        <h2>Contact Us</h2>
        <div className="contact-container">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="contact-form" noValidate>
                <label>Name</label>
                <Field type="text" name="name" />
                <ErrorMessage
                  name="name"
                  render={(msg) => (
                    <div className="error" style={{ color: "red" }}>
                      {msg}
                    </div>
                  )}
                />

                <label>Email</label>
                <Field type="email" name="email" />
                <ErrorMessage
                  name="email"
                  render={(msg) => (
                    <div className="error" style={{ color: "red" }}>
                      {msg}
                    </div>
                  )}
                />

                <label>Message</label>
                <Field as="textarea" name="message" />
                <ErrorMessage
                  name="message"
                  render={(msg) => (
                    <div className="error" style={{ color: "red" }}>
                      {msg}
                    </div>
                  )}
                />

                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Submit"}
                </button>
                {responseMessage && (
                  <p className="response">{responseMessage}</p>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
