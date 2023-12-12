const db = require('../config/connection');

const register = (userData) => {
  return new Promise((resolve, reject) => {
    const { name, gender, date_of_birth, email, phone_number, password } = userData;

    db.query(
      'INSERT INTO users (name, gender, date_of_birth, email, phone_number, password) VALUES (?, ?, ?, ?, ?, ?)',
      [name, gender, date_of_birth, email, phone_number, password],
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

const login = (email) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result[0]);
      }
    });
  });
};

module.exports = {
  register,
  login,
};
