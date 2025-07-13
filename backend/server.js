const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const cloudinary = require("cloudinary");
const errorMiddleware = require("./middleware/error");

const connectDatabase = require("./config/database");

// Load env variables from root .env
dotenv.config();

// Handle Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

const app = express();

// === MIDDLEWARES ===
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// === HEALTH CHECK ===
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ success: true, message: "API is healthy!" });
});

// === ROUTES ===
app.use("/api/v1", require("./routes/productRoute"));
app.use("/api/v1", require("./routes/userRoute"));
app.use("/api/v1", require("./routes/orderRoute"));
app.use("/api/v1", require("./routes/paymentRoute"));




// === CLOUDINARY CONFIG ===
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// === START SERVER ===
const PORT = process.env.PORT || 5000;

connectDatabase().then(() => {
  app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
  );

});
