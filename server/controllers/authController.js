// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const responseUtils = require('../utils/responseUtils');

const register = async (req, res) => {
  try {
    const {
      name,
      gender,
      date_of_birth,
      email,
      phone_number,
      password,
      confirm_password,
    } = req.body;

    if (password !== confirm_password) {
      return responseUtils.sendError(res, 400, 'Password tidak sesuai');
    }

    const existingUser = await userModel.findUserByEmail(email);

    if (existingUser) {
      return responseUtils.sendError(res, 400, 'Email sudah digunakan');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = {
      name,
      gender,
      date_of_birth,
      email,
      phone_number,
      password: hashedPassword,
    };

    await userModel.createUser(newUser);

    return responseUtils.sendSuccess(res, 'Berhasil mendaftar');
  } catch (error) {
    console.error(error);
    return responseUtils.sendError(res, 500, 'Gagal mendaftar');
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findUserByEmail(email);

    if (!user) {
      return responseUtils.sendError(res, 401, 'Email tidak ditemukan');
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return responseUtils.sendError(res, 401, 'Password salah');
    }

    // Contoh penggunaan JSON Web Token (JWT)
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return responseUtils.sendSuccess(res, 'Berhasil login', { token });
  } catch (error) {
    console.error(error);
    return responseUtils.sendError(res, 500, 'Gagal login');
  }
};

module.exports = {
  register,
  login,
};
