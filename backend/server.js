//backend file
const express = require("express"); //imports express to access login command
const path = require("path"); //import node's path to access frontend
const app = express(); //starts server
const PORT = 3000; //decides the port to run server on
app.use(express.json()); // reads json automatically

app.use(express.static(path.join(__dirname, "../frontend")));//tells express to use files from frontend


const users = {};//empty obj for users to be stored in
let loggedInUser = null; //tracks who's logged in but only lets one user go at a time
app.post("/register", (req, res) => { //browser sends data to register
    const { username, password } = req.body;//extracts user and pw
    if (!username || !password) { //makes sure both have values
        return res.json({ success: false });//if one is blank, it stops
    }
    if (users[username]) {//checks if username exists
        return res.json({ success: false });//stops
    }
    users[username] = password;//creates account
    res.json({ success: true });//registration was successful
});

//login:
app.post("/login", (req, res) => {//endpt?
    const { username, password } = req.body;//gets the info for login
    if (users[username] === password) {//check pw
        loggedInUser = username;//marks as logged in
        res.json({ success: true });//marks success/tells frontend
    } else {
        res.json({ success: false });//login fails, we can try sending message that says 1 attempt and make them wait or smth
    }
});

//who am I,(frontend asks backend who logged in)
app.get("/me", (req, res) => {//checks login status
    res.json({ user: loggedInUser });//responds who logged in (or null)
});

//logout
app.post("/logout", (req, res) => {//creates endpt
    loggedInUser = null;//user gets logged out
    res.json({ success: true });//successful log out
});

//start server
app.listen(PORT, () => {//starts server
    console.log(`Server running at http://localhost:${PORT}`);//confirms server is live/running
});
