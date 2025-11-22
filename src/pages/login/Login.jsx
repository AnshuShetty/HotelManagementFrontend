import React, { useState } from "react";
import "../login/login.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react"; // Apollo hook
import { login as LOGIN_MUTATION } from "../../graphql/mutation/login"; // Your GraphQL mutation

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Apollo useMutation hook
  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // reset error

    try {
      const { data } = await loginMutation({
        variables: {
          input: {
            email,
            password,
          },
        },
      });

      // Destructure user and token from GraphQL response
      const { token, user } = data.login;

      // Store in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", user.name);
      localStorage.setItem("role", user.role);

      console.log("Login Successful:", data);

      navigate("/"); // redirect after successful login
    } catch (err) {
      // Apollo error handling
      const errorMessage =
        err.message || "Login failed. Please check your credentials.";
      setError(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <h2>Hotel Avinya</h2>
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="register-link">
        No account? <a href="/register">Register here!</a>
      </p>
    </div>
  );
};

export default Login;
