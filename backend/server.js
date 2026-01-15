const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;
//

app.use((req, res, next) => {
    console.log("INCOMING:", req.method, req.url);
    next();
  });
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
  });
//  
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

const users = {};
let loggedInUser = null;

// Register with PIN
app.post("/register", (req, res) => {
  const { username, pin } = req.body;

  if (!username || !pin || pin.length !== 4) {
    return res.json({ success: false, message: "Invalid input" });
  }

  if (users[username]) {
    return res.json({ success: false, message: "User exists" });
  }

  users[username] = { pin };
  loggedInUser = username;

  res.json({ success: true });
});

// Login with PIN
app.post("/login", (req, res) => {
  const { username, pin } = req.body;

  if (users[username]?.pin === pin) {
    loggedInUser = username;
    return res.json({ success: true });
  }

  res.json({ success: false });
});

// Who is logged in
app.get("/me", (req, res) => {
  res.json({ user: loggedInUser });
});

// Logout
app.post("/logout", (req, res) => {
  loggedInUser = null;
  res.json({ success: true });
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
