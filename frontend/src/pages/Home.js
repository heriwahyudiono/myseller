import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      const result = await response.json();
      console.log(result);

      if (result.success) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        console.error("Gagal logout", result.message);
      }
    } catch (error) {
      console.error("Gagal logout", error);
    }
  };

  const handleAddProduct = () => {
    navigate("/add-product");
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleAddProduct}>Add Product</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
