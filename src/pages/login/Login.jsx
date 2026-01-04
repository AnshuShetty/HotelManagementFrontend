import "../login/login.css";
import { useAuth } from "../../hooks/useAuth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = () => {
  const initialValues = { email: "", password: "" };
  const { login, loading, error } = useAuth();

  const validationSchema = Yup.object({
    email: Yup.string()
      .trim()
      .email("Enter a valid email")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await login(values.email, values.password);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Hotel Avinya</h2>
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <div className="form-group">
            <label>Email:</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </Form>
      </Formik>
      <p className="register-link">
        No account? <a href="/register">Register here!</a>
      </p>
    </div>
  );
};

export default Login;
