require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"],
    credentials: true,
  }),
);

// route import and mount
const user = require("./routes/user");
app.use("/api/v1", user);

app.get("/", (req, res) => {
  res.send("<h1>Auth App</h1>");
});

// Connect to database and start server
async function startServer() {
  try {
    await require("./config/database").connect();
    app.listen(PORT, () => {
      console.log("Server Run at ", PORT);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
}

startServer();
