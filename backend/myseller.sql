CREATE DATABASE myseller;

USE myseller;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  gender ENUM('Male', 'Female') NOT NULL,
  date_of_birth DATE NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_number VARCHAR(15) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  product_name VARCHAR(255) NOT NULL,
  product_desc TEXT,
  price VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
