import { useMutation } from "@apollo/client/react"; // Apollo hook
import { login as LOGIN_MUTATION } from "../graphql/mutation/login"; // Your GraphQL mutation
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function useAuth() {
  // Authentication logic here
  const navigate = useNavigate();
  const [error, setError] = useState("");
  // Apollo useMutation hook
  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION);

  const login = async (email, password) => {
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
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return { login, logout, error, loading };
}
