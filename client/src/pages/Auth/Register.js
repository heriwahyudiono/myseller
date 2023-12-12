import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Male");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          gender,
          date_of_birth: dateOfBirth,
          email,
          phone_number: phoneNumber,
          password,
          confirm_password: confirmPassword,
        }),
      });

      const result = await response.json();
      console.log(result);

      if (result.success) {
        localStorage.setItem("token", result.token);

        navigate("/home");
      } else {
        console.error("Gagal mendaftar", result.message);
      }
    } catch (error) {
      console.error("Gagal mendaftar", error);
    }
  };

  return (
    <div>
      <h2>Registrasi</h2>
      <label>
        Nama
        <input
          type="text"
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Jenis Kelamin:
        <label>
          <input
            type="radio"
            value="Male"
            checked={gender === "Male"}
            onChange={() => setGender("Male")}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            value="Female"
            checked={gender === "Female"}
            onChange={() => setGender("Female")}
          />
          Female
        </label>
      </label>

      <label>
        Tanggal Lahir
        <input
          type="date"
          placeholder="Tanggal Lahir"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
      </label>

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
        Nomor Telepon
        <input
          type="tel"
          placeholder="Nomor Telepon"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
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

      <label>
        Konfirmasi Password
        <input
          type="password"
          placeholder="Konfirmasi Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>

      <button onClick={handleRegister}>Daftar</button>
    </div>
  );
};

export default Register;
