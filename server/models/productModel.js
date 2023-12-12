const db = require('../config/connection');

const addProduct = (userId, productName, productDesc, price) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO products (user_id, product_name, product_desc, price) VALUES (?, ?, ?, ?)',
      [userId, productName, productDesc, price],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

module.exports = {
  addProduct,
};