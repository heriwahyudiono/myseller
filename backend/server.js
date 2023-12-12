const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const productRoutes = require('./routes/productRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use('/product', productRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
