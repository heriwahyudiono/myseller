// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Memuat variabel lingkungan dari file .env
const db = require('./config/connection');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rute
app.use('/auth', authRoutes); // Rute untuk otentikasi

// Jalankan koneksi ke database
db.connect((err) => {
  if (err) {
    console.error('Koneksi database gagal: ' + err.stack);
    return;
  }
  console.log('Terhubung ke database dengan ID ' + db.threadId);

  // Jalankan server
  app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
  });
});
