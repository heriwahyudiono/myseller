const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const responseUtils = require("../utils/responseUtils");

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
      return responseUtils.sendError(
        res,
        400,
        "Konfirmasi password tidak sama"
      );
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

    const userId = await userModel.register(newUser);

    const token = jwt.sign(
      { id: userId, email: newUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return responseUtils.sendSuccess(res, "Berhasil mendaftar", { token });
  } catch (error) {
    console.error(error);
    return responseUtils.sendError(res, 500, "Gagal mendaftar");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.login(email);

    if (!user) {
      return responseUtils.sendError(res, 401, "Email tidak ditemukan");
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return responseUtils.sendError(res, 401, "Password salah");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return responseUtils.sendSuccess(res, "Berhasil login", { token });
  } catch (error) {
    console.error(error);
    return responseUtils.sendError(res, 500, "Gagal login");
  }
};

const logout = (req, res) => {
  const token = req.header("Authorization");

  if (!token) {
    return responseUtils.sendError(res, 401, "Token tidak ditemukan");
  }

  return responseUtils.sendSuccess(res, "Berhasil logout");
};

module.exports = {
  register,
  login,
  logout,
};
