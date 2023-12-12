import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();
      console.log(result);

      if (result.success) {
        localStorage.setItem('token', result.token);

        navigate("/home");
      } else {
        console.error("Gagal login", result.message);
      }
    } catch (error) {
      console.error("Gagal login", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <label>
        Email
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label>
        Password
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
