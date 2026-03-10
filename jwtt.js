const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const SECRET = "mysecret";

// Generate Token
app.get("/login", (req, res) => {
  const token = jwt.sign({ name: "Admin" }, SECRET);
  res.json({ token });
});

// Verify Token
app.get("/profile", (req, res) => {
  const token = req.headers.authorization;

  if (!token) return res.send("Token Required");

  try {
    const data = jwt.verify(token, SECRET);
    res.json({ message: "Access Granted", user: data });
  } catch {
    res.send("Invalid Token");
  }
});

app.listen(3000, () => console.log("Server running"));