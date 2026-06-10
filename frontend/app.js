import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

emailjs.init("Ia87MGcCaj7tfXzTc");

const firebaseConfig = {
  apiKey: "AIzaSyCrFLo_T3pg2yrjnyF1hkDprcypspLXc-c",
  authDomain: "square-game-b4d37.firebaseapp.com",
  projectId: "square-game-b4d37",
  storageBucket: "square-game-b4d37.firebasestorage.app",
  messagingSenderId: "851745118398",
  appId: "1:851745118398:web:8ac5cbc35f0000599ee6ef"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
auth.onAuthStateChanged(user => {
    if (user) {
      createUser(user.uid);
    }
  });
  
var isReset = false; 
var currScreen = 1;
const signUpBtn = document.getElementById('signUp');
const logInBtn = document.getElementById('logIn');
const goBack = document.getElementById('goBack');
const helpBtn = document.getElementById('getHelp');
const playerInputsDiv = document.getElementById("playerInputs");
const instructionText = document.getElementById("screen-instruction");
instructionText.style.display = 'none';
let helpWanted = false; 
var wordEl = null; 
const Instructions = document.getElementById('Instructions');
const Rules = document.getElementById('Rules');
const Play = document.getElementById('Play');
const Close = document.getElementById('Close');
Close.style.display = 'none';
const Stats = document.getElementById('Stats');
const Settings = document.getElementById('Settings');
const submitBtn = document.getElementById("submitPlayers");
const allGuests = document.getElementById("allGuests");
const welcome = document.getElementById("welcome");

function showScreen(screenId, identifier1) {
    document.querySelectorAll(".screen").forEach(screen => {
      screen.classList.remove("active");
    });
    document.getElementById(screenId).classList.add("active");
    const target = document.getElementById(screenId);  
    target.classList.add("active");
    if(screenId == "screen-1"){
        if (helpWanted == false){
            currScreen = 1;
        }
        Play.style.display = 'inline-block';
        Instructions.style.display = 'inline-block';
        Rules.style.display = 'inline-block';
        Stats.style.display = 'inline-block';
        Settings.style.display = 'inline-block';
        logInBtn.style.display = 'none';
        signUpBtn.style.display = 'none';
        goBack.style.display = 'none';
        helpBtn.style.display = 'none';
        playerInputsDiv.style.display = 'none';
        submitBtn.style.display = 'none';
        allGuests.style.display = 'none';
        welcome.style.display = 'inline-block';
    }
    else if(screenId == "screen-2"){
        currScreen = 2;
        goBack.style.display = 'inline-block';
        helpBtn.style.display = 'inline-block';
        instructionText.style.display = 'none';
        if(identifier1 == "log in" || identifier1 == "ok" || identifier1 == "any"){
            logInBtn.style.display = 'inline-block';
            signUpBtn.style.display = 'inline-block';
            allGuests.style.display = 'none';
            createAccBtn.style.display ='none';
            uniqueUsername.style.display = 'none';
            displayNameInput.style.display = 'none';
            PINInput.style.display = 'none';
        }
        else if (identifier1 == 'change teams'){
            logInBtn.style.display = 'none';
            signUpBtn.style.display = 'none';
            setupPlayerInputs();
            clearResults();
            for (let key of playerKeys) { 
                const player = allPlayers[key]; 
                player.score = 0;
            }
            renderMatrix();
            r = 1; 
        }
        else{
            createAccBtn.style.display ='none';
            uniqueUsername.style.display = 'none';
            displayNameInput.style.display = 'none';
            PINInput.style.display = 'none';
        }
    }
    else if(screenId == "screen-3"){
        currScreen = 3;
        uniqueUsername.style.display = 'inline-block';
        displayNameInput.style.display="inline-block";
        PINInput.style.display="inline-block";
        createAccBtn.style.display = 'inline-block';
        instructionText.style.display = 'inline-block';
    }
    else if(screenId == "screen-4"){
        currScreen = 4;
        editButtons.classList.remove("active");
        menuBtn.style.display = "inline-block";
        (document.getElementById('numRounds')).style.display = "inline-block";
        startRounds.style.display = 'inline-block';
        clearResults();
        for (let key of playerKeys) { 
            const player = allPlayers[key]; 
            player.score = 0;
        }
        renderMatrix();
        r = 1; 
    }
    else if(screenId == "screen-5"){
        currScreen = 5;
        setRounds();
        CSPButton.style.display = 'none';
        basicButton.style.display = 'none';
        athleteButton.style.display = 'none';
        foodDrinkButton.style.display = 'none';
        geographyButton.style.display = 'none';
        entertainmentButton.style.display = 'none';
        customList.style.display = 'none';
        customListContainer.style.display = 'none'; 
    }
    else if(screenId == "screen-6"){
        currScreen = 6;
        if (wordEl != null){
            wordEl.style.display = 'none';
        }
        editButtons.classList.remove("active");
        menuBtn.style.display = "inline-block";
        defCatBtn.style.display = 'inline-block';
        createCustListBtn.style.display = 'inline-block';
        uploadButton.style.display = 'inline-block';
        backBtn.style.display = 'none';
        beginGame.style.display = 'none';
        clearResults();
        for (let key of playerKeys) { 
            const player = allPlayers[key]; 
            player.score = 0;
        }
        renderMatrix();
        r = 1; 
    }
    else if (screenId == "screen-7"){
        currScreen = 7;
        finalPlay.style.display = "inline-block";
        readyButton.style.display = 'inline-block';
        newButton.style.display = 'inline-block';
        if (identifier1 == "reset"){
            redBtn.style.display = 'inline-block';
            blackBtn.style.display = 'inline-block';
        }
        else{
            console.log("normal route to display matrix");
        }
    }
    else{
        console.log("none");
    }
    const current = document.querySelector(".screen.active");
    const next = document.getElementById(screenId);
    if (current === next) return;
    if (current) {
        current.classList.remove("active");
    }
    next.offsetHeight;
    next.classList.add("active");
  }
  
showScreen("screen-1", "screen1");
var numRounds = 0; 
let num = 0; 
let allRoles = {"RED EXPLAINER": 4, "RED GUESSER": 5, "BLACK GUESSER": 6, "BLACK EXPLAINER": 7};
let roleKeys = Object.keys(allRoles);
let allPlayers = {
playerone: {name: "PLAYER ONE", score: 0, id: roleKeys[0]},
playertwo: {name: "PLAYER TWO", score: 0, id: roleKeys[1]},
playerthree: {name: "PLAYER THREE", score: 0, id: roleKeys[2]},
playerfour: {name: "PLAYER FOUR", score: 0, id: roleKeys[3]}
};
let playerKeys = Object.keys(allPlayers);
function renderMatrix(){
    const container5 = document.getElementById("matrix");
    if (!container5) {
        console.error("Matrix container not found");
        return;
    }
    container5.innerHTML = ""; // Clear previous display

    const order = [0, 1, 3, 2];
    const startColors = ["red", "red", "black", "black"];

    order.forEach((i,idx) => {
        const p = allPlayers[playerKeys[i]];

        const cell = document.createElement("div");
        cell.id = `cell-${i}`;
        cell.style.padding = "10px";
        cell.style.background = startColors[idx];
        cell.style.color = "white";
        cell.style.textAlign = "center";
        cell.style.borderRadius = "8px";
        cell.style.top = "100px";

        if (i === 0 || i === 3) {
            cell.style.outline = "5px solid yellow";
        } else {
            cell.style.outline = "none";
        }

        cell.innerHTML = `
        <strong>${p.name}</strong><br>
        ${p.id}<br>
        Score: ${p.score}
        `;
        container5.appendChild(cell);
    });
}

async function syncPlayersFromInputs() {
    playerKeys = Object.keys(allPlayers);
    for (let i = 0; i < 4; i++) {
        const input = document.getElementById("player" + i);
        const val = input?.value.trim();
        if (!val){
            allPlayers[playerKeys[i]].name = "GUEST " + (i+1); 
        }
        else{
            if (val) {
                const userRef = doc(db, "user-accounts", val); 
                const userSnap = await getDoc(userRef);
                const data = userSnap.data();
                allPlayers[playerKeys[i]].name = data.displayName;
            }
        }
    }
}

  function submitPlayersAndShowMatrix() {
    renderMatrix();           // ✅ UI
    document.getElementById("matrix-wrapper").classList.remove("hidden");
    document.getElementById("readyUp").classList.remove("hidden");
    document.getElementById("game-ui").classList.add("hidden");
    showScreen("screen-7", "normal");
  }

  function submitPlayersAndStartGame() {
    renderMatrix();
    document.getElementById("matrix-wrapper").classList.remove("hidden");
    document.getElementById("readyUp").classList.add("hidden");
    document.getElementById("game-ui").classList.remove("hidden");
    document.getElementById("instruction-text-rounds-ready").classList.add("hidden");
    showScreen("screen-7", "normal");
  }

function updateScore(color){
    for (let i = 0; i < playerKeys.length; i++) {
        const key = playerKeys[i];
        const player = allPlayers[key];
        const currPlayer = allPlayers[playerKeys[i]];

        if (color === "red") {
            if (player.id === "RED GUESSER") {
                currPlayer.score++;  // add to **previous**             
            }
            else if (player.id === "RED EXPLAINER") {
                currPlayer.score++;  // add to **previous**
            }
        }        
        else if (color === "black") {
            if (player.id === "BLACK GUESSER") {
                currPlayer.score++;  // add to **previous**
            }
            else if (player.id === "BLACK EXPLAINER") {
                currPlayer.score++;  // add to **previous**
            }
        }
    }
}

async function syncScore() {

    let highestScore = -Infinity;
    let winners = [];

    for (const key of playerKeys) {
        const player = allPlayers[key];

        if (player.score > highestScore) {
            highestScore = player.score;
            winners = [player.name]; // new top score → reset winners
        } 
        else if (player.score === highestScore) {
            winners.push(player.name); // tie → add to winners
        }
    }

    const updates = [];

    for (const key of playerKeys) {
        const player = allPlayers[key];

        updates.push(
            updateDoc(doc(db, "user-accounts", player.name), {
                totalPoints: increment(player.score),
                gamesCompleted: increment(1)
            })
        );
    }

    for (const winner of winners) {
        updates.push(
            updateDoc(doc(db, "user-accounts", winner), {
                gamesWon: increment(1)
            })
        );
    }

    await Promise.all(updates);
}

function changeRoles() {
    if (num > 0){
    // Step 1: Increment all role values
    for (let key in allRoles) {
        allRoles[key] += 1;
    }
    // Step 2: Convert to array and sort by value % 4
    const sortedRoles = Object.entries(allRoles)
    .sort((a, b) => (a[1] % 4) - (b[1] % 4));
        // Step 3: Display sorted roles
        for (let i = 0; i < sortedRoles.length; i++) {
            allPlayers[playerKeys[i]].id = sortedRoles[i][0];
    const cell = document.getElementById(`cell-${i}`);
    const player = allPlayers[playerKeys[i]];
            if (allPlayers[playerKeys[i]].id === "RED GUESSER" || allPlayers[playerKeys[i]].id === "RED EXPLAINER") {
                document.getElementById(`cell-${i}`).style.background = "red";
            }
            else{
                document.getElementById(`cell-${i}`).style.background = "black";
            }
            if (player.id.includes("EXPLAINER")) {
                cell.style.outline = "5px solid yellow";
            } else {
                cell.style.outline = "none";
            }
            
        }
    }
    for (let j = 0; j < 4; j++){
        const p = allPlayers[playerKeys[j]];
        document.getElementById(`cell-${j}`).innerHTML = `<strong>${p.name}</strong><br>${allPlayers[playerKeys[j]].id}<br>Score: ${allPlayers[playerKeys[j]].score}`;
    }
}

let word = null;
const readyButton = document.getElementById('readyUp');
const CSPButton = document.getElementById('CSP');
const basicButton = document.getElementById('Basic');
const hardButton = document.getElementById('Hard');
const medButton = document.getElementById('Medium');
const easyButton = document.getElementById('Easy');
const foodDrinkButton = document.getElementById('Food&Drink');
const drinkButton = document.getElementById('Drink');
const foodButton = document.getElementById('Food');
const athleteButton = document.getElementById('Athletes');
const mlbButton = document.getElementById('MLB');
const nbaButton = document.getElementById('NBA');
const nflButton = document.getElementById('NFL');
const mmaButton = document.getElementById('MMA');
const soccerButton = document.getElementById('Soccer');
const geographyButton = document.getElementById('Geography');
const statesButton = document.getElementById('States');
const countriesButton = document.getElementById('Countries');
const capitalsButton = document.getElementById('Capitals');
const entertainmentButton = document.getElementById('Entertainment');
const artistsButton = document.getElementById('ArtistsBands');
const moviesButton = document.getElementById('Movies');
const tvButton = document.getElementById('TVAnime');
const backBtn = document.getElementById('Return');
const redBtn = document.getElementById("redBtn");
const blackBtn = document.getElementById("blackBtn");
const resetBtn = document.getElementById("resetBtn");
const teamBtn = document.getElementById("teamBtn");
const roundsBtn = document.getElementById("roundsBtn");
const categoriesBtn = document.getElementById('categoriesBtn');
const colorReady = document.getElementById("colorReady"); 
const startRounds = document.getElementById('startRounds');
const newButton = document.getElementById("newWord");
const customList = document.getElementById('promptCustomList');
const defCatBtn = document.getElementById('defaultCategory');
const createCustListBtn = document.getElementById('createCustomList');
const customListContainer = document.getElementById('customListContainer');
const beginGame = document.getElementById('categoryReady');
const rdyButton = document.getElementById("readyRound");
rdyButton.style.display = 'none';
const userStats = document.getElementById('userStats');
const showStatsFinal = document.getElementById('showStatsFinal');
userStats.style.display = 'none';
showStatsFinal.style.display = 'none';
const appBox = document.getElementById("app");
const colorReset = document.getElementById('resetColor');
const nextInstruction = document.getElementById('Next');
const prevInstruction = document.getElementById('Previous');
let divRules = document.getElementById('rulesText');
let divInstrInput = document.getElementById('instrText');
let instr1 = document.createElement('span');
nextInstruction.classList.add('hidden1');
prevInstruction.classList.add('hidden1');
const printPlayers = document.getElementById('printPlayers');
const printRounds = document.getElementById('printRounds');
const printCategories = document.getElementById('printCategories');
const menuBtn = document.getElementById('menu');
const editButtons = document.getElementById("editButtons");
const X = document.getElementById("X");
const createAccBtn = document.getElementById('createAccount');
const uniqueUsername = document.getElementById('uniqueUsername');
const displayNameInput = document.getElementById('displayNameInput');
const PINInput = document.getElementById('PINInput');
const finalPlay = document.getElementById('playGame');
const colorPickerWrapper = document.getElementById('colorPickerWrapper');
colorPickerWrapper.classList.add("hidden");
const colorPicker1 = document.getElementById('backgroundColor1');
const colorPicker2 = document.getElementById('backgroundColor2');
const printColor = document.getElementById('printColor');
const uploadButton = document.getElementById("uploadButton");
const email = document.getElementById('confirmEmail');
const usernameE = document.getElementById('usernameEmail');
const userE = document.getElementById('userEmail');
const addE = document.getElementById('addEmail');
const recoverP = document.getElementById('recoverPIN');
const changeP = document.getElementById('changePIN');
const usernameP = document.getElementById('usernameP');
const oldP = document.getElementById('oldPIN');
const newP = document.getElementById('newPIN');
const confirmReset = document.getElementById('confirmReset');
const sendR = document.getElementById('sendRecovery');


function clearResults() {
    document.getElementById("results").innerHTML = "";
}

function showWinner() {
    wordEl.style.display = 'none';
    document.getElementById("matrix").innerHTML = "";
    newButton.style.display = "none";
    helpBtn.style.display = 'none';
    goBack.style.display = 'none';
    rdyButton.style.display = 'none';
    displayText2.textContent = '';
    removeEl('myWord');
    
    const results = document.getElementById("results");
    results.innerHTML = ""; 
    
    const standings = Object.keys(allPlayers);
    standings.sort((a, b) => allPlayers[b].score - allPlayers[a].score);
    
    // helper function to create result text
    function createResult(text, size, top) {
        const el = document.createElement("div");
    
        el.style.position = "absolute";
        el.style.top = top + "px";
        el.style.left = "50%";
        el.style.transform = "translateX(-50%)";
        if (numWinners == 1) {
            el.style.whiteSpace = "nowrap";
        } else {
            el.style.whiteSpace = "normal";
        }
        el.style.maxWidth = "100%";
        el.style.overflow = "hidden";
        el.style.textOverflow = "ellipsis";
        
        const lengthFactor = Math.max(0.6, 20 / text.length);
        const scaledSize = size * lengthFactor;

        el.style.fontSize = `clamp(20px, 5vw, ${scaledSize}px)`;
    
        el.textContent = text;
    
        results.appendChild(el);
    }

    let numWinners = 1;
    if (allPlayers[standings[0]].score == allPlayers[standings[3]].score) {
        numWinners = 4;
    } else if (allPlayers[standings[0]].score == allPlayers[standings[2]].score) {
        numWinners = 3;
    } else if (allPlayers[standings[0]].score == allPlayers[standings[1]].score) {
        numWinners = 2;
    }
    
    if (numWinners == 1) {
        createResult(
            "Winner: " + allPlayers[standings[0]].name +
            " | Score: " + allPlayers[standings[0]].score,
            90,
            10
        );
        for (let i = 1; i < standings.length; i++) {
            const topPos = 35 + 60 * i;
            createResult(
                allPlayers[standings[i]].name +
                " | Score: " + allPlayers[standings[i]].score,
                60,
                topPos
            );
        }
    } else if (numWinners == 2) {
        createResult(
            "Winners: " + allPlayers[standings[0]].name + " & " + allPlayers[standings[1]].name +
            " | Score: " + allPlayers[standings[0]].score, 90, 10);
        for (let i = 2; i < standings.length; i++) {        
            const topPos = 35 + 60 * i;
            createResult(
                allPlayers[standings[i]].name +
                " | Score: " + allPlayers[standings[i]].score,
                40,
                topPos
            );
        }
    } else if (numWinners == 3) {
        createResult(
            "Winners: " + allPlayers[standings[0]].name + " & " + allPlayers[standings[1]].name + 
            " & " + allPlayers[standings[2]].name +
            " | Score: " + allPlayers[standings[0]].score,
            90,
            10
        );
        for (let i = 3; i < standings.length; i++) {        
            const topPos = 35 + 60 * i;
            createResult(
                allPlayers[standings[i]].name +
                " | Score: " + allPlayers[standings[i]].score,
                40,
                topPos
            );
        }
    } else {
        createResult(
            "Winners: " + allPlayers[standings[0]].name + " & " + allPlayers[standings[1]].name + 
            " & " + allPlayers[standings[2]].name + " & " + allPlayers[standings[3]].name +
            " | Score: " + allPlayers[standings[0]].score,
            80,
            10
        );
    }
}

readyButton.addEventListener('click',()=>{
    submitPlayersAndStartGame();
    document.getElementById('button-container').style.display = 'inline-block';
    readyButton.style.display = 'none';
});    


function removeEl(el){
    const existing=document.getElementById(el);
    if (existing) existing.remove();
}
function dispNum(num1) {
    removeEl('myNum');
    const numEl = document.createElement('span');
    numEl.style.top = '100px'; 
    numEl.id = 'myNum';
    numEl.textContent = num1 + "S TO SWITCH";
    numEl.style.position = 'absolute';
    numEl.style.fontSize='60px';
    numEl.style.transition = 'all 0.5s ease';

    document.body.appendChild(numEl);
    const screenWidth=window.innerWidth;
    const elementWidth = numEl.offsetWidth;
    numEl.style.left = (screenWidth/2)-(elementWidth/2) + "px";
}

function countdown(count, word1) {
    if (num === 0 || count === false) {
        setTimeout(function() { displayWord(word1); }, 0);
        return;
    } 
    if (count){
        /* (let i = 5; i > -1; i--) {
            setTimeout(function() { dispNum(i); }, (5 - i) * 1000);
        }*/
        setTimeout(function() { displayWord(word1); }, 0);
    }
}

let listCSP = [
    "Binary",
    "Bit",
    "Byte",
    "Overflow Error",
    "Round-off Error",
    "Analog Data",
    "Digital Data",
    "Sampling",
    "Lossless Compression",
    "Lossy Compression",
    "Intellectual Property",
    "Creative Commons",
    "Computing Device",
    "Computing System",
    "Computing Network",
    "Path",
    "Bandwidth",
    "Protocol",
    "IP Address",
    "Internet Protocol (IP)",
    "Router",
    "Packet",
    "Redundancy",
    "Fault Tolerant",
    "HTTP",
    "Internet",
    "World Wide Web",
    "Digital Divide",
    "User Interface",
    "Input",
    "Output",
    "Program Statement",
    "Program",
    "Sequential Programming",
    "Documentation",
    "Comment",
    "Pair Programming",
    "Debugging",
    "Development process",
    "Expression",
    "Assignment Operator",
    "Variable",
    "String",
    "Boolean Value",
    "Comparison Operators",
    "Logical operator",
    "Conditional Statement",
    "Function",
    "Function Call",
    "List",
    "Element",
    "Index",
    "Iteration",
    "Infinite loop",
    "Traversal",
    "Data abstraction",
    "Problem",
    "Algorithm",
    "Sequencing",
    "Selection",
    "Parameter",
    "Argument",
    "Return",
    "Cleaning Data",
    "Correlation",
    "Crowdsourcing",
    "Information",
    "Data bias",
    "Data filtering",
    "Computing Innovation",
    "Personally Identifiable Information (PII)",
    "Phishing",
    "Keylogging",
    "Malware",
    "Rogue Access Point",
    "Encryption",
    "Decryption"
  ]
let listEasyBasicWords = ["Blade", "Crush", "Drill", "Flame", "Grasp", "Jump", "Kick", "Lift", "Mash", "Neck",
"Quirk", "Snub", "Thump", "Vault", "Wrench", "Zap", "Bark", "Cling", "Dusk",
"Hush", "Lump", "Numb", "Quake", "Throb",
"Whisk", "Brag", "Crib", "Damp", "Grin", "Hatch", "Jolt", "Knob", "Lace",
"Munch", "Pouch", "Quilt", "Scrub", "Tusk", "Vast",
"Blink", "Brisk", "Chop", "Drip", "Flick", "Grit", "Hump", "Jerk", "Kick", "Loom",
"Groan", "Rust", "Slam", "Twitch", "Vibe", "Wag", "Yawn",
"Blast", "Broke", "Chirp", "Drop", "Frown", "Grub", "Honk", "Jet", "Knot",
"Lush", "Mop", "Nest", "Pond", "Quiz", "Smack", "Tread",
"Yolk", "Zip", "Bark", "Boil", "Clasp", "Ditch", "Fangs", "Gasp", "Jam",
"Leaf", "Net", "Peck", "Rant", "Slick", "Whip",
"Buzz", "Brick", "Chalk", "Dent", "Glimpse", "Halt", "Jab", "Knit",
"Lump", "Nudge", "Patch", "Ridge", "Tilt", "Vein", "Wreck", 
"Zoom", "Brim", "Crop", "Drank", "Gush", "Harp", "Jack", "Lid",
"Moss", "Neck", "Plead", "Rook", "Spook", "Thrift", "Vault",
"Bask", "Clunk", "Fist", "Hack", "Jet", "Keep",
"Luck", "Moat", "Pitch", "Quest", "Stomp", "Tug", "Wink",
"Yarn", "Bloat", "Bunch", "Cheek", "Dodge", "Froth", "Grim", "Hush", "Junk",
"Lurk", "Mesh", "Pint", "Rant", "Snag", "Trap",
"Whack", "Chomp", "Drill", "Freak", "Honk",
"Ledge", "Mold", "Rug", "Stack", "Trim", "Whiff"];
let listMediumBasicWords = ["Apple", "Bunny", "Candle", "Dinner", "Echo", "Flower", "Giant", "Happy", "Igloo", "Jelly",
"Kitten", "Lemon", "Monkey", "Nugget", "Ocean", "Pencil", "Quiet", "Rocket", "Summer", "Trophy",
"Uncle", "Window", "Yellow", "Zebra", "Artist", "Bishop", "Clover", "Dancer", "Evening",
"Falcon", "Garden", "Jacket", "Ladder", "Mango", "Napkin", "Orange",
"Pilot", "River", "Soccer", "Target", "Valley", "Waffle", "Yogurt",
"Basket", "Button", "Canyon", "Donkey", "Engine", "Fossil", "Goblin", "Hunter", "Insect", "Jungle",
"Lantern", "Magnet", "Necklace", "Oyster", "Puppet", "Rumble", "Sunset", "Turtle",
"Vapor", "Whisper", "Zipper", "Anchor", "Beetle", "Cotton", "Elbow",
"Fiddle", "Gutter", "Igloo", "Jester", "Marble", "Nickel", "Office",
"Parrot", "Saddle", "Update", "Village", "Wagon",
"Armor", "Bison", "Cactus", "Doctor", "Eagle", "Glider", "Hammer",
"Ketchup", "Mustard", "Muffin", "Number", "Oven", "Puzzle", "Raven", "Signal", "Tunnel",
"Vulture", "Yogurt", "Blazer", "Bitter", "Clumsy", "Dizzy",
"Famous", "Gloomy", "Hollow", "Idle", "Kidney", "Mellow", "Nutmeg", "Optic",
"Plenty", "Quirky", "Razor", "Shiver", "Timber", "Violet",
"Almond", "Borrow", "Cocoa", "Dagger", "Empty", "Frosty", "Gravel", "Humid", "Island",
"Karma", "Lesson", "Muffin", "Notice", "Oboe", "Pillow", "Simple", "Ticket",
"Warden", "Yellow", "Barren", "Clever", "Danger", "Effort",
"Gallop", "Happen", "Inside", "Jacket", "Kindle", "Lonely", "Market", "Nation", "Outfit",
"Poetry", "Rescue", "Sample", "Tangle", "Voyage", "Waffle", "Zebra"];
let listHardBasicWords = ["Adventure", "Beautiful", "Calculator", "Electricity",
"Fascinate", "Generation", "Helicopter", "Imagination", "Judgmental",
"Kindergarten", "Literature", "Motivation", "Negotiate", "Opportunity",
"Photography", "Questionable", "Revolution", "Significant", "Territory",
"Umbrella", "Vocabulary", "Wonderful", "Xylophone", "Yesterday",
"Appreciate", "Banana", "Celebration", "Definition", "Elevator",
"Fantastic", "Geography", "Happiness", "Intelligent", "Justifiable",
"Lullaby", "Memorable", "Necessary", "Observation",
"Participate", "Qualification", "Realization", "Situation", "Translation", "Unbelievable",
"Architecture", "Beneficial", "Consequence", "Discipline", "Entertainment",
"Facilitate", "Genuinely", "Hallucinate", "Incredible", "Jurisdiction",
"Knowledgeable", "Limitation", "Manipulate", "Navigation", "Occupation",
"Preparation", "Recommendation", "Substitute", "Transportation",
"Universal", "Victorious", "Wilderness",
"Apprehend", "Breakable", "Controversy", "Decoration", "Electrician",
"Frustration", "Gratitude", "Hospitality", "Inspiration",
"Kangaroo", "Linguistics", "Manufacture", "Negotiation", "Observation",
"Publication", "Qualification", "Reservation", "Specification", "Termination",
"Watermelon", "Behavioral", "Conversation", "Determination", "Establishment",
"Foreigner", "Guitarist", "Hesitation", "Illustration", "Jeopardize",
"Liberation", "Meaningful", "Notification", "Opposition",
"Perspective", "Reputation", "Satisfaction", "Television",
"Understanding", "Vegetarian", "Acceptance", "Biologist", "Celebratory", "Destination", "Environmental",
"Forgiveness", "Governmental", "Hieroglyphics", "Identification",
"Knowledgeable", "Legislation", "Maintenance", "Negotiable", "Organization",
"Participation", "Responsibility", "Sustainability", "Transformation",
"Anticipation", "Beneficiary", "Classification", "Deliberation", "Efficiency",
"Fundamental", "Grammatical", "Hypothesis", "Intellectual",
"Legitimacy", "Memorization", "Noteworthy", "Overestimate",
"Productivity", "Rehabilitation", "Simplification", "Traditional",
"Unpredictable", "Articulate", "Background", "Democratic", "Elasticity",
"Friendliness", "Generosity", "Helplessness", "Journalist"];
let listCountries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antarctica","Antigua and Barbuda","Argentina",
"Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda",
"Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon",
"Canada","Cape Verde","Cayman Islands","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo","The Democratic Republic Of The Congo",
"Costa Rica","Ivory Coast","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","East Timor",
"Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France",
"Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti",
"Vatican City","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Palestine","Italy","Jamaica","Kosovo","Japan","Jordan",
"Kazakstan","Kenya","Kiribati","North Korea","South Korea","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania",
"Luxembourg","North Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius",
"Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Caledonia","New Zealand","Nicaragua",
"Niger","Nigeria","Norway","Oman","Pakistan","Palau","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Romania","Russia",
"Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia",
"Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","South Sudan","Syria",
"Taiwan","Tajikistan","Tanzania","Thailand","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands","Tuvalu",
"Uganda","Ukraine","United Arab Emirates (UAE)","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Venezuela",
"Vietnam","British Virgin Islands","US Virgin Islands","Western Sahara","Yemen","Zambia","Zimbabwe"];
let listStates = ["Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii",
"Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana",
"Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
"South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
let listCapitals = ["Washington, D.C.", "London", "Paris", "Tokyo", "Beijing", "Moscow", "Berlin", "Rome", "Madrid", "Ottawa",
"Canberra", "Brasilia", "New Delhi", "Seoul", "Bangkok", "Cairo", "Riyadh", "Mexico City",
"Buenos Aires", "Santiago", "Lima", "Jakarta", "Hanoi", "Tehran", "Baghdad", "Athens", "Oslo", "Dublin", "Vienna", "Prague", "Budapest", "Warsaw",
"Copenhagen", "Stockholm", "Helsinki", "Lisbon", "Brussels",
"Amsterdam", "Kuala Lumpur", "Cape Town", "Nairobi"];
let listMovies = ["The Godfather", "Star Wars", "Jaws", "The Dark Knight", "Pulp Fiction", "The Shawshank Redemption", "Forrest Gump", "The Matrix", 
"Titanic", "Jurassic Park", "The Lord of the Rings", "Inception", "Fight Club", "The Avengers", "Gladiator", "Saving Private Ryan", "Schindler's List", "Back to the Future", "Indiana Jones", 
"E.T. the Extra-Terrestrial", "The Silence of the Lambs", "Se7en", "Braveheart", "The Lion King", "Toy Story", "Finding Nemo", "The Incredibles", "Spider-Man", "Iron Man", "Black Panther", "Interstellar", 
"Django Unchained", "Shrek", "The Departed", "Goodfellas", "Rocky", "Die Hard", "Terminator", "Alien", "Mad Max", "The Social Network", "Frozen", "Scream", "The Minecraft Movie",
"Free Guy", "Joker", "Inside Out", "Deadpool", "Superman"];
let listTVAnime = ["Game of Thrones", "Breaking Bad", "The Sopranos", "The Wire", "Stranger Things", "The Walking Dead", "Better Call Saul", "Sherlock", "Impractical Jokers",
"The X-Files", "Twin Peaks", "Outer Banks", "Black Mirror", "The Mandalorian", "The Boys", "Avatar: The Last Airbender", "Justice League", "Adventure Time", "Regular Show", "Steven Universe", "Gravity Falls",
"Rick and Morty", "BoJack Horseman", "Archer", "Star Trek", "Futurama", "South Park", "Family Guy", "American Dad!", "The Simpsons", "Invincible", "Friends", "The Office", "Seinfeld", "The Big Bang Theory", "How I Met Your Mother", "Brooklyn Nine-Nine",
"Attack on Titan", "Death Note", "Naruto", "Dragon Ball", "One Piece", "Demon Slayer", "Jujutsu Kaisen", "My Hero Academia", "Fullmetal Alchemist"];
let listArtistsBands = ["The Beatles", "Elvis Presley", "Michael Jackson", "Madonna", "Queen", "The Rolling Stones", "Led Zeppelin", "Pink Floyd", "Deftones", "Prince", "David Bowie", "Daft Punk", "Taylor Swift", "Beyoncé", "Rihanna", "Drake", "Eminem", "Kanye West", "Jay-Z","Lil Tecca", "U2", "Coldplay", "Adele", "Whitney Houston",
"Mariah Carey", "Celine Dion", "Frank Sinatra", "Stevie Wonder", "The Beach Boys", "Nirvana", "Metallica", "Guns N' Roses", "AC/DC", "Red Hot Chili Peppers", "Radiohead", "Oasis", "Arctic Monkeys", "Ed Sheeran", "Justin Bieber", "Lady Gaga", "Katy Perry", "Billie Eilish", "The Weeknd", "Bruno Mars", "Shakira",
"Jennifer Lopez", "Dr. Dre", "Usher", "Chris Brown", "Post Malone", "Travis Scott", "Kendrick Lamar", "Snoop Dogg", "Green Day", "Blink-182", "Post Malone", "Don Toliver", "Lil Uzi Vert", "Imagine Dragons", "Foo Fighters", "Linkin Park", "Pearl Jam", "ABBA", "Olivia Rodrigo", "Doja Cat", "Dua Lipa", "BTS", "BLACKPINK",
"Bad Bunny", "Karol G", "Rosalía", "Sabrina Carpenter", "Avenged Sevenfold", "Laufey", "50 Cent", "Panic! At The Disco", "Future", "Migos", "Cardi B", "Nickelback", "System of a Down"];
let listAthletesNBA = ["Herbert Jones", "LeBron James", "Stephen Curry", "Luka Dončić", "Nikola Jokić", "Giannis Antetokounmpo", 
"Jayson Tatum", "Joel Embiid", "Kawhi Leonard", "Devin Booker", "Shai Gilgeous-Alexander", "Damian Lillard", 
"Trae Young", "Ja Morant", "Anthony Davis", "Rudy Gobert", "Karl-Anthony Towns", "Kawhi Leonard", 
"Jimmy Butler", "Kyrie Irving", "Klay Thompson", "Donovan Mitchell", "DeMar DeRozan", "Brandon Ingram", 
"Zion Williamson", "Pascal Siakam", "Deandre Ayton", "Bam Adebayo", "Draymond Green", "Khris Middleton", 
"Chris Paul", "Jrue Holiday", "Fred VanVleet", "Jaylen Brown", "PJ Washington", "De'Aaron Fox", 
"Tyrese Haliburton", "Josh Giddey", "Chet Holmgren", "Victor Wembanyama", "Scottie Barnes", "Anthony Edwards", 
"Lauri Markkanen", "Donovan Mitchell", "Clint Capela", "Jonas Valančiūnas", "John Collins", "Tyler Herro", 
"Nickeil Alexander-Walker", "RJ Barrett", "Alec Burks", "Malcolm Brogdon", "OG Anunoby", "Mikal Bridges", 
"Dejounte Murray", "Collin Sexton", "Jusuf Nurkić", "Kemba Walker", "Derrick White", "Jordan Clarkson", 
"Bogdan Bogdanović", "Bojan Bogdanović", "Deni Avdija", "Kentavious Caldwell-Pope", "Tim Hardaway Jr.", "Norman Powell", "Gary Trent Jr.", "Josh Hart", "Reggie Jackson", "Isaiah Hartenstein", "Daniel Theis", 
"JaVale McGee", "Dwight Howard", "DeMarcus Cousins", "Serge Ibaka", "P.J. Tucker", "Rudy Gay", 
"Kyle Lowry", "Jamal Murray", "Klay Thompson", "Isaiah Thomas"];
let listAthletesNFL = ["Caleb Williams", "Patrick Mahomes", "Josh Allen", "Jalen Hurts", "Joe Burrow", "Kirk Cousins",
"Dak Prescott", "Justin Herbert", "Lamar Jackson", "Tua Tagovailoa", "Daniel Jones",
"Christian McCaffrey", "Derrick Henry", "Austin Ekeler", "Jonathan Taylor", "Saquon Barkley",
"Bijan Robinson", "Nick Chubb", "Josh Jacobs", "Tony Pollard", "Aaron Jones",
"Davante Adams", "Tyreek Hill", "Stefon Diggs", "Justin Jefferson", "CeeDee Lamb",
"A.J. Brown", "Mike Evans", "Chris Olave", "Tee Higgins", "Garrett Wilson",
"Travis Kelce", "George Kittle", "Mark Andrews", "Dallas Goedert", "David Njoku",
"Kyle Pitts", "Drake London", "Deebo Samuel", "Kadarius Toney", "Jerry Jeudy",
"Christian Watson", "Puka Nacua", "Jalen Reagor", "Zay Jones", "DK Metcalf",
"Jaylen Waddle", "Stefon Diggs", "Michael Pittman Jr.", "Diontae Johnson", "Amari Cooper",
"Micah Parsons", "Nick Bosa", "Myles Garrett", "Chase Young", "Nick Chubb",
"Aaron Donald", "Chris Jones", "Jonathan Allen", "DeForest Buckner",
"T.J. Watt", "Haason Reddick", "Shaquille Leonard", "Roquan Smith", "Fred Warner",
"Darius Leonard", "Bobby Wagner", "Minkah Fitzpatrick", "Derwin James", "Jalen Ramsey",
"Stephon Gilmore", "Marcus Peters", "Tre'Davious White", "Byron Jones", "Marshon Lattimore",
"Jaire Alexander", "Patrick Peterson", "Ezekiel Elliott", "Saquon Barkley", "Alvin Kamara",
"Travis Etienne", "Joe Mixon", "James Conner", "Dalvin Cook",
"Josh Allen", "Kyler Murray", "Joe Flacco", "Baker Mayfield", "Deshaun Watson", "Russell Wilson"];
let listAthletesMLB = ["Aaron Judge", "Shohei Ohtani", "Juan Soto", "Mookie Betts", "Freddie Freeman", 
"Vladimir Guerrero Jr.", "Bryce Harper", "Pete Alonso", "Matt Olson", "Paul Goldschmidt", 
"José Ramírez", "Francisco Lindor", "Trea Turner", "Bobby Witt Jr.", "Wander Franco", 
"Ketel Marte", "Jazz Chisholm Jr.", "Ozzie Albies", "Marcus Semien", "Nico Hoerner", 
"Gleyber Torres", "Brandon Lowe", "Xander Bogaerts", "Bo Bichette", "Corey Seager", 
"Tim Anderson", "Javier Báez", "Carlos Correa", "Dansby Swanson", "Willie Adames", 
"Jorge Polanco", "J.D. Martinez", "Kyle Schwarber", "Jorge Soler", 
"Yordan Álvarez", "Randy Arozarena", "Julio Rodríguez", "Steven Kwan", "Byron Buxton", 
"Adolis García", "Eloy Jiménez", "Luis Robert Jr.", "Michael Harris II", "Triston Casas", 
"Spencer Torkelson", "Vinnie Pasquantino", "Jonathan Aranda", "Matt Chapman", "Austin Riley", 
"José Ramírez", "Nolan Arenado", "Manny Machado", "Alex Bregman", "Rafael Devers", 
"Ryan McMahon", "Josh Donaldson", "Javier Báez", "Willie Calhoun", "Salvador Pérez", 
"Will Smith", "J.T. Realmuto", "Yasmani Grandal", "Sean Murphy", "Willson Contreras", 
"Christian Vázquez", "Gary Sánchez", "Travis d'Arnaud", "Jonah Heim", "Kurt Suzuki", 
"Jacob deGrom", "Max Scherzer", "Gerrit Cole", "Clayton Kershaw", "Zack Wheeler", 
"Corbin Burnes", "Shane Bieber", "Luis Castillo", "Kevin Gausman", 
"José Berríos", "Chris Sale", "Tarik Skubal", "Paul Skenes", "Spencer Strider", 
"Max Fried", "Charlie Morton", "Kyle Wright", "Bryce Elder", "Hunter Brown", 
"Framber Valdez", "Cristian Javier", "Luis García", "José Urquidy", "Cristian Pache", 
"Aroldis Chapman", "Josh Hader", "Edwin Díaz", "Kenley Jansen", "Brad Hand", "Will Smith", 
"Ryan Pressly", "Emmanuel Clase", "Jordan Romano", "Gregory Soto", "Taylor Rogers"];
let listAthletesMMA = ["Francis Ngannou", "Jon Jones", "Israel Adesanya", "Kamaru Usman", "Alexander Volkanovski",
"Charles Oliveira", "Islam Makhachev", "Aljamain Sterling", "Jiri Prochazka", "Zhang Weili",
"Valentina Shevchenko", "Amanda Nunes", "Rose Namajunas", "Sean O'Malley",
"Petr Yan", "Brandon Moreno", "Aljamain Sterling", "Cory Sandhagen", "Colby Covington",
"Leon Edwards", "Dustin Poirier", "Justin Gaethje", "Tony Ferguson", "Beneil Dariush",
"Gilbert Burns", "Michael Chandler", "Rafael dos Anjos", "Jan Blachowicz", "Glover Teixeira",
"Jorge Masvidal", "Nate Diaz", "Michael Bisping", "Stipe Miocic", "Curtis Blaydes",
"Ciryl Gane", "Tai Tuivasa", "Alexander Gustafsson", "Rafael Fiziev", "Sean Strickland",
"Jack Hermansson", "Vicente Luque", "Stephen Thompson", "Neil Magny", "Michael Chiesa",
"Joaquin Buckley", "Robert Whittaker", "Marvin Vettori", "Paulo Costa", "Kevin Holland",
"Shane Burgos", "Josh Emmett", "Dan Hooker", "Arnold Allen", "Magomed Ankalaev",
"Jan Blachowicz", "Ricky Simon", "Merab Dvalishvili", "Song Yadong",
"Rob Font", "Dominick Cruz", "Marlon Vera", "Yair Rodriguez", "Alexandre Pantoja", "Joseph Benavidez", "Mackenzie Dern",
"Tatiana Suarez", "Jessica Andrade", "Yan Xiaonan", "Viviane Araujo", "Amanda Ribas", "Amanda Lemos"];
let listAthletesSoccer = ["Lionel Messi", "Cristiano Ronaldo", "Kylian Mbappé", "Neymar Jr.", "Kevin De Bruyne",
"Robert Lewandowski", "Karim Benzema", "Mohamed Salah", "Erling Haaland", "Harry Kane",
"Sadio Mané", "Luka Modrić", "Virgil van Dijk", "Alisson Becker", "Jan Oblak",
"Thibaut Courtois", "Ederson Moraes", "Marc-André ter Stegen", "Trent Alexander-Arnold", "Andrew Robertson",
"Jadon Sancho", "Phil Foden", "Raheem Sterling", "Son Heung-min", "Mason Mount",
"Bruno Fernandes", "Frenkie de Jong", "Joshua Kimmich", "Toni Kroos", "N'Golo Kanté",
"Paul Pogba", "Marco Verratti", "Bernardo Silva", "Jorginho", "Jack Grealish",
"Riyad Mahrez", "Ciro Immobile", "Antoine Griezmann", "Luis Suárez", "Paulo Dybala",
"Sergio Agüero", "Ángel Di María", "Gerard Piqué", "Thiago Silva", "Kalidou Koulibaly",
"Raphaël Varane", "Aymeric Laporte", "Jules Koundé", "Mats Hummels", "Leonardo Bonucci",
"David Alaba", "Marquinhos", "Presnel Kimpembe", "Achraf Hakimi", "Lucas Hernández",
"Jude Bellingham", "Eduardo Camavinga", "Pedri", "Vinícius Júnior", "Rodrygo",
"Philippe Coutinho", "Dominik Szoboszlai", "Mikel Oyarzabal", "Bukayo Saka", "Gabriel Martinelli",
"Héctor Bellerín", "Fábio Vieira", "Wilfred Ndidi", "Kalvin Phillips", "James Maddison",
"Dusan Vlahović", "Ousmane Dembélé", "Marco Asensio", "Christian Pulisic", "Callum Hudson-Odoi",
"Mikel Merino", "Denzel Dumfries", "José Giménez", "Lucas Paquetá", "Rodrigo De Paul",
"Leandro Paredes", "Angel Correa", "Nicolò Barella", "Federico Chiesa", "Matthijs de Ligt",
"Donny van de Beek", "Gini Wijnaldum", "Georginio Wijnaldum", "Edinson Cavani", "Álvaro Morata",
"Ángel Correa", "Erik ten Hag", "Diego Carlos", "César Azpilicueta", "Thomas Müller",
"Joshua Kimmich", "Kingsley Coman", "Serge Gnabry", "Leroy Sané", "Leon Goretzka"];
let listFoods = ["Bread", "Rice", "Pasta", "Eggs", "Milk", "Cheese", "Butter", "Yogurt", "Chicken", "Beef",
"Pork", "Lamb", "Fish", "Shrimp", "Tofu", "Lentils", "Chickpeas", "Black Beans", "Kidney Beans",
"Potatoes", "Sweet Potatoes", "Carrots", "Broccoli", "Cauliflower", "Spinach", "Lettuce", "Kale", "Tomatoes", "Cucumbers",
"Bell Peppers", "Onions", "Garlic", "Mushrooms", "Zucchini", "Eggplant", "Green Beans", "Corn", "Peas", "Cabbage",
"Apples", "Bananas", "Oranges", "Grapes", "Strawberries", "Blueberries", "Raspberries", "Watermelon", "Pineapple", "Mango",
"Peaches", "Pears", "Plums", "Avocados", "Lemons", "Limes", "Nuts", "Almonds", "Walnuts", "Peanuts",
"Cashews", "Sunflower Seeds", "Pumpkin Seeds", "Oats", "Granola", "Cereal", "Flour", "Sugar", "Salt", "Pepper",
"Honey", "Maple Syrup", "Jam", "Soup", "Salad"];
let listDrink = ["Spring Water", "Sparkling Water", "Mineral Water", "Whole Milk", "Almond Milk", "Soy Milk", "Oat Milk", "Chocolate Milk",
"Hot Coffee", "Iced Coffee", "Espresso", "Latte", "Cappuccino", "Tea", "Iced Tea", "Green Tea", "Black Tea", "Herbal Tea",
"Orange Juice", "Apple Juice", "Grape Juice", "Cranberry Juice", "Pineapple Juice", "Lemonade", "Fruit Punch", "Carrot Juice", "Beet Juice",
"Gatorade", "Protein Shake", "Smoothie", "Milkshake", "Kombucha", "Buttermilk", "Chai", "Hot Chocolate",
"Coca-Cola", "Pepsi", "Sprite", "Fanta", "Dr Pepper", "7UP", "Mountain Dew", "Root Beer", "Ginger Ale", "Cream Soda"];

function displayWord(word2){
    removeEl('myWord');
    removeEl('myNum');
    wordEl = document.createElement('span');
    wordEl.id = 'myWord';
    wordEl.style.top = '100px'; 
    wordEl.style.position = 'absolute';
    wordEl.style.fontSize='60px';
    wordEl.style.transition = 'all 0.5s ease';
    wordEl.textContent = "WAIT. NEXT WORD: " + word2;
    document.body.appendChild(wordEl);

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function moveWord() {
        const screenWidth=window.innerWidth;
        wordEl.style.left = (screenWidth/2)-(wordEl.offsetWidth/2) + "px";
        await delay(2000); // wait 2 seconds
        wordEl.textContent = "GO!";
        wordEl.style.left = (screenWidth/2)-(wordEl.offsetWidth/2) + "px";
        await delay(2000); // wait 2 seconds
        wordEl.textContent = word2;
        wordEl.style.top = '20px';
        wordEl.style.fontSize='50px';
        wordEl.style.left = (screenWidth/2)-(wordEl.offsetWidth/2) + 50 + "px";
    }
    moveWord();
}

defCatBtn.addEventListener('click',()=>{
    uploadButton.style.display = 'none';
    athleteButton.style.display = 'inline-block';
    foodDrinkButton.style.display = 'inline-block';
    basicButton.style.display = 'inline-block';
    CSPButton.style.display = 'inline-block';
    geographyButton.style.display = 'inline-block';
    entertainmentButton.style.display = 'inline-block';
    easyButton.style.display = 'none';
    medButton.style.display = 'none';
    hardButton.style.display = 'none';
    backBtn.style.display = 'none';
    customList.style.display = 'none';
    defCatBtn.style.display = 'none';
    createCustListBtn.style.display = 'none';
})

createCustListBtn.addEventListener('click',()=>{
    uploadButton.style.display = 'none';
    customList.style.display = 'inline-block';
    customListContainer.style.display = 'inline-block';
    defCatBtn.style.display = 'none';
    createCustListBtn.style.display = 'none';
})

basicButton.addEventListener('click',()=>{
    athleteButton.style.display = 'none';
    foodDrinkButton.style.display = 'none';
    basicButton.style.display = 'none';
    CSPButton.style.display = 'none';
    geographyButton.style.display = 'none'
    entertainmentButton.style.display = 'none';
    easyButton.style.display = 'inline-block';
    medButton.style.display = 'inline-block';
    hardButton.style.display = 'inline-block';
    backBtn.style.display = 'inline-block';
    customList.style.display = 'none';
})

athleteButton.addEventListener('click',()=>{
    athleteButton.style.display = 'none';
    foodDrinkButton.style.display = 'none';
    basicButton.style.display = 'none';
    CSPButton.style.display = 'none';
    customList.style.display = 'none';
    geographyButton.style.display = 'none'
    entertainmentButton.style.display = 'none';
    mlbButton.style.display = 'inline-block';
    nbaButton.style.display = 'inline-block';
    nflButton.style.display = 'inline-block';
    soccerButton.style.display = 'inline-block';
    mmaButton.style.display = 'inline-block';
    backBtn.style.display = 'inline-block';
})

foodDrinkButton.addEventListener('click',()=>{
    athleteButton.style.display = 'none';
    foodDrinkButton.style.display = 'none';
    basicButton.style.display = 'none';
    CSPButton.style.display = 'none';
    entertainmentButton.style.display = 'none';
    drinkButton.style.display = 'inline-block';
    foodButton.style.display = 'inline-block';
    backBtn.style.display = 'inline-block';
    geographyButton.style.display = 'none';
})
geographyButton.addEventListener('click',()=>{
    athleteButton.style.display = 'none';
    foodDrinkButton.style.display = 'none';
    basicButton.style.display = 'none';
    CSPButton.style.display = 'none';
    entertainmentButton.style.display = 'none';
    geographyButton.style.display = 'none';
    countriesButton.style.display = 'inline-block';
    capitalsButton.style.display = 'inline-block';
    statesButton.style.display = 'inline-block';
    backBtn.style.display = 'inline-block';

})
entertainmentButton.addEventListener('click',()=>{
    athleteButton.style.display = 'none';
    foodDrinkButton.style.display = 'none';
    basicButton.style.display = 'none';
    CSPButton.style.display = 'none';
    entertainmentButton.style.display = 'none';
    geographyButton.style.display = 'none';
    tvButton.style.display = 'inline-block';
    moviesButton.style.display = 'inline-block';
    artistsButton.style.display = 'inline-block';
    backBtn.style.display = 'inline-block';
})

backBtn.addEventListener('click',()=>{
    backBtn.style.display = 'none';
    beginGame.style.display = 'none';
    athleteButton.style.display = 'inline-block';
    foodDrinkButton.style.display = 'inline-block';
    basicButton.style.display = 'inline-block';
    CSPButton.style.display = 'inline-block';
    geographyButton.style.display = 'inline-block';
    entertainmentButton.style.display = 'inline-block';
    easyButton.style.display = 'none';
    medButton.style.display = 'none';
    hardButton.style.display = 'none';
    mlbButton.style.display = 'none';
    nbaButton.style.display = 'none';
    nflButton.style.display = 'none';
    soccerButton.style.display = 'none';
    mmaButton.style.display = 'none';
    foodButton.style.display = 'none';
    drinkButton.style.display = 'none';
    countriesButton.style.display = 'none';
    capitalsButton.style.display = 'none';
    statesButton.style.display = 'none';
    customList.style.display = 'none';
    customListContainer.style.display = 'none'; 
    tvButton.style.display = 'none'; 
    moviesButton.style.display = 'none'; 
    artistsButton.style.display = 'none'; 
})

rdyButton.addEventListener('click',()=>{
    newWord(true);
    rdyButton.style.display = 'none';
})


function setRounds(){
    numRounds = document.getElementById("numRounds").value;
    startRounds.style.display = "none";
    document.getElementById("numRounds").style.display = "none";
    printRounds.style.display = 'inline-block';
    printRounds.innerHTML = "ROUNDS: " + numRounds;
}


const displayText2 = document.getElementById('displayText2');
displayText2.textContent = 'ROUND';
let r = 0;

function startRoundA(){
    newWord(true)
    mlbButton.style.display = 'none';
    nbaButton.style.display = 'none';
    nflButton.style.display = 'none';
    soccerButton.style.display = 'none';
    mmaButton.style.display = 'none';
    drinkButton.style.display = 'none';
    foodButton.style.display = 'none';
    easyButton.style.display = 'none';
    medButton.style.display = 'none';
    hardButton.style.display = 'none';
    countriesButton.style.display = 'none';
    capitalsButton.style.display = 'none';
    statesButton.style.display = 'none';
    r = 1;
    displayText2.textContent = `ROUND ${r}`;
}

redBtn.addEventListener('click', function() {
    if (finalPlay.style.display === "none" && rdyButton.style.display === "none"){
        if (r > numRounds-1){
            updateScore("red");
            showWinner();
            syncScore();
            r++;
            redBtn.style.display = "none";
            blackBtn.style.display = "none";
        }
        else{
            num++;
            rdyButton.style.display = 'inline-block';;
            r++;
            displayText2.textContent = `ROUND ${r}`;
            updateScore("red");
            changeRoles();
        }
    }
});

blackBtn.addEventListener('click', function() {
    if (finalPlay.style.display === "none" && rdyButton.style.display === "none"){
        if (r > numRounds-1){
            updateScore("black");
            showWinner();
            syncScore();
            r++;
            redBtn.style.display = "none";
            blackBtn.style.display = "none";
        }
        else{
            num++;
            rdyButton.style.display = 'inline-block';;
            r++;
            displayText2.textContent = `ROUND ${r}`;
            updateScore("black");
            changeRoles();
        }
    }
});
let z = 0;
resetBtn.addEventListener('click', () => {
    wordEl.style.display = 'none';
    editButtons.classList.remove("active");
    menuBtn.style.display = "inline-block";
    redBtn.style.display = 'inline-block';
    blackBtn.style.display = 'inline-block';
    finalPlay.style.display = 'inline-block';
    newButton.style.display = 'inline-block';
    helpBtn.style.display = 'inline-block';
    goBack.style.display = 'inline-block';
    clearResults();
    allRoles = {"RED EXPLAINER": 4, "RED GUESSER": 5, "BLACK GUESSER": 6, "BLACK EXPLAINER": 7};
    roleKeys = Object.keys(allRoles);
    for (let key of playerKeys) { 
        const player = allPlayers[key]; 
        player.score = 0;
        player.id = roleKeys[z];
        z++;
    }
    renderMatrix();
    r = 1; 
    z = 0;
});

roundsBtn.addEventListener('click', () => {
    wordEl.style.display = 'none';
    showScreen('screen-4', "change rounds");
    helpBtn.style.display = 'inline-block';
    goBack.style.display = 'inline-block';
});

teamBtn.addEventListener('click', () => {
    wordEl.style.display = 'none';
    editButtons.classList.remove("active");
    menuBtn.style.display = "inline-block";
    showScreen('screen-2', "change teams");
    helpBtn.style.display = 'inline-block';
    goBack.style.display = 'inline-block';
});

categoriesBtn.addEventListener('click', () => {
    wordEl.style.display = 'none';
    showScreen('screen-6', "change categories");
    helpBtn.style.display = 'inline-block';
    goBack.style.display = 'inline-block';
});
    
async function getStats(player) {
    const statsDoc = doc(db, "user-accounts", player);
    const snap = await getDoc(statsDoc);
    if (!snap.exists()) {
        return "No stats found for that username.";
    }
    const stats = snap.data();
    let statList = "Player stats for " + player + ": \n";
    statList = statList + "Games Completed: " + stats.gamesCompleted + "\n";
    statList = statList + "Games Won: " + stats.gamesWon + "\n";
    statList = statList + "Total Points Accumulated: " + stats.totalPoints + "\n"
    if (stats.gamesCompleted == 0) {
       statList = statList + "Win Percentage: 0%";
    }
    else {
        statList = statList + "Win Percentage: " + (stats.gamesWon / stats.gamesCompleted) * 100 + "%";
    }
    return statList;
}



var category = [];

CSPButton.addEventListener('click',()=>{
    category = listCSP;
    printCategories.style.display = 'inline-block';
    printCategories.innerHTML = "CATEGORY: CSP";
    CSPButton.classList.remove('default-button');
    CSPButton.classList.add('highlighted-button');
    beginGame.style.display = 'inline-block';
    setTimeout(() => {
        CSPButton.classList.remove('highlighted-button');
        CSPButton.classList.add('default-button');
    }, 250);
    athleteButton.style.display = 'none';
    foodDrinkButton.style.display = 'none';
    basicButton.style.display = 'none';
    CSPButton.style.display = 'none';
    entertainmentButton.style.display = 'none';
    geographyButton.style.display = 'none';
    backBtn.style.display = 'inline-block';
});

easyButton.addEventListener('click',()=>{
    category = listEasyBasicWords;
    printCategories.style.display = 'inline-block';
    printCategories.innerHTML = "CATEGORY: EASY";
    easyButton.classList.remove('default-button');
    easyButton.classList.add('highlighted-button');
    beginGame.style.display = 'inline-block';
    setTimeout(() => {
        easyButton.classList.remove('highlighted-button');
        easyButton.classList.add('default-button');
    }, 250);
    easyButton.style.display = 'none';
    medButton.style.display = 'none';
    hardButton.style.display = 'none';
});

medButton.addEventListener('click',()=>{
    category = listMediumBasicWords;
    printCategories.style.display = 'inline-block';
    printCategories.innerHTML = "CATEGORY: MEDIUM";
    medButton.classList.remove('default-button');
    medButton.classList.add('highlighted-button');
    beginGame.style.display = 'inline-block';
    setTimeout(() => {
        medButton.classList.remove('highlighted-button');
        medButton.classList.add('default-button');
    }, 250);
    easyButton.style.display = 'none';
    medButton.style.display = 'none';
    hardButton.style.display = 'none';
});

hardButton.addEventListener('click',()=>{
    category = listHardBasicWords;
    printCategories.style.display = 'inline-block';
    printCategories.innerHTML = "CATEGORY: HARD";
    hardButton.classList.remove('default-button');
    hardButton.classList.add('highlighted-button');
    beginGame.style.display = 'inline-block';
    setTimeout(() => {
        hardButton.classList.remove('highlighted-button');
        hardButton.classList.add('default-button');
    }, 250);
    easyButton.style.display = 'none';
    medButton.style.display = 'none';
    hardButton.style.display = 'none';
});

nbaButton.addEventListener('click',()=>{
    category = listAthletesNBA;
    printCategories.style.display = 'inline-block';
    printCategories.innerHTML = "CATEGORY: NBA";
    nbaButton.classList.remove('default-button');
    nbaButton.classList.add('highlighted-button');
    beginGame.style.display = 'inline-block';
    setTimeout(() => {
        nbaButton.classList.remove('highlighted-button');
        nbaButton.classList.add('default-button');
    }, 250);
    mlbButton.style.display = 'none';
    nbaButton.style.display = 'none';
    nflButton.style.display = 'none';
    soccerButton.style.display = 'none';
    mmaButton.style.display = 'none';
});

nflButton.addEventListener('click',()=>{
    category = listAthletesNFL;
    printCategories.style.display = 'inline-block';
    printCategories.innerHTML = "CATEGORY: NFL";
    nflButton.classList.remove('default-button');
    nflButton.classList.add('highlighted-button');
    beginGame.style.display = 'inline-block';
    setTimeout(() => {
        nflButton.classList.remove('highlighted-button');
        nflButton.classList.add('default-button');
    }, 250);
    mlbButton.style.display = 'none';
    nbaButton.style.display = 'none';
    nflButton.style.display = 'none';
    soccerButton.style.display = 'none';
    mmaButton.style.display = 'none';
});

mlbButton.addEventListener('click',()=>{
    category = listAthletesMLB;
    printCategories.style.display = 'inline-block';
    printCategories.innerHTML = "CATEGORY: MLB";
    mlbButton.classList.remove('default-button');
    mlbButton.classList.add('highlighted-button');
    beginGame.style.display = 'inline-block';
    setTimeout(() => {
        mlbButton.classList.remove('highlighted-button');
        mlbButton.classList.add('default-button');
    }, 250);
    mlbButton.style.display = 'none';
    nbaButton.style.display = 'none';
    nflButton.style.display = 'none';
    soccerButton.style.display = 'none';
    mmaButton.style.display = 'none';
});

soccerButton.addEventListener('click',()=>{
    category = listAthletesSoccer;
    printCategories.style.display = 'inline-block';
    printCategories.innerHTML = "CATEGORY: SOCCER";
    soccerButton.classList.remove('default-button');
    soccerButton.classList.add('highlighted-button');
    beginGame.style.display = 'inline-block';
    setTimeout(() => {
        soccerButton.classList.remove('highlighted-button');
        soccerButton.classList.add('default-button');
    }, 250);
    mlbButton.style.display = 'none';
    nbaButton.style.display = 'none';
    nflButton.style.display = 'none';
    soccerButton.style.display = 'none';
    mmaButton.style.display = 'none';
});

mmaButton.addEventListener('click',()=>{
    category = listAthletesMMA;
    printCategories.style.display = 'inline-block';
    printCategories.innerHTML = "CATEGORY: MMA";
    mmaButton.classList.remove('default-button');
    mmaButton.classList.add('highlighted-button');
    beginGame.style.display = 'inline-block';
    setTimeout(() => {
        mmaButton.classList.remove('highlighted-button');
        mmaButton.classList.add('default-button');
    }, 250);
    mlbButton.style.display = 'none';
    nbaButton.style.display = 'none';
    nflButton.style.display = 'none';
    soccerButton.style.display = 'none';
    mmaButton.style.display = 'none';
});

foodButton.addEventListener('click',()=>{
    category = listFoods;
    printCategories.style.display = 'inline-block';
    printCategories.innerHTML = "CATEGORY: FOOD";
    foodButton.classList.remove('default-button');
    foodButton.classList.add('highlighted-button');
    beginGame.style.display = 'inline-block';
    setTimeout(() => {
        foodButton.classList.remove('highlighted-button');
        foodButton.classList.add('default-button');
    }, 250);
    drinkButton.style.display = 'none';
    foodButton.style.display = 'none';
});

countriesButton.addEventListener('click',()=>{
    category = listCountries;
    printCategories.style.display = 'inline-block';
    printCategories.innerHTML = "CATEGORY: WORLD COUNTRIES";
    countriesButton.classList.remove('default-button');
    countriesButton.classList.add('highlighted-button');
    beginGame.style.display = 'inline-block';
    setTimeout(() => {
        countriesButton.classList.remove('highlighted-button');
        countriesButton.classList.add('default-button');
    }, 250);
    statesButton.style.display = 'none';
    countriesButton.style.display = 'none';
    capitalsButton.style.display = 'none';
    geographyButton.style.display = 'none';

});
statesButton.addEventListener('click',()=>{
    category = listStates;
    printCategories.style.display = 'inline-block';
    printCategories.innerHTML = "CATEGORY: US STATES";
    statesButton.classList.remove('default-button');
    statesButton.classList.add('highlighted-button');
    beginGame.style.display = 'inline-block';
    setTimeout(() => {
        statesButton.classList.remove('highlighted-button');
        statesButton.classList.add('default-button');
    }, 250);
    statesButton.style.display = 'none';
    countriesButton.style.display = 'none';
    capitalsButton.style.display = 'none';
    geographyButton.style.display = 'none';
});
capitalsButton.addEventListener('click',()=>{
    category = listCapitals;
    printCategories.style.display = 'inline-block';
    printCategories.innerHTML = "CATEGORY: WORLD CAPITALS";
    capitalsButton.classList.remove('default-button');
    capitalsButton.classList.add('highlighted-button');
    beginGame.style.display = 'inline-block';
    setTimeout(() => {
        capitalsButton.classList.remove('highlighted-button');
        capitalsButton.classList.add('default-button');
    }, 250);
    statesButton.style.display = 'none';
    countriesButton.style.display = 'none';
    capitalsButton.style.display = 'none';
    geographyButton.style.display = 'none';
});
tvButton.addEventListener('click',()=>{
    category = listTVAnime;
    printCategories.style.display = 'inline-block';
    printCategories.innerHTML = "CATEGORY: TV & ANIME";
    tvButton.classList.remove('default-button');
    tvButton.classList.add('highlighted-button');
    beginGame.style.display = 'inline-block';
    setTimeout(() => {
        tvButton.classList.remove('highlighted-button');
        tvButton.classList.add('default-button');
    }, 250);
    moviesButton.style.display = 'none';
    artistsButton.style.display = 'none';
    tvButton.style.display = 'none';
    entertainmentButton.style.display = 'none';

});
artistsButton.addEventListener('click',()=>{
    category = listArtistsBands;
    printCategories.style.display = 'inline-block';
    printCategories.innerHTML = "CATEGORY: ARTISTS & BANDS";
    artistsButton.classList.remove('default-button');
    artistsButton.classList.add('highlighted-button');
    beginGame.style.display = 'inline-block';
    setTimeout(() => {
        artistsButton.classList.remove('highlighted-button');
        artistsButton.classList.add('default-button');
    }, 250);
    moviesButton.style.display = 'none';
    artistsButton.style.display = 'none';
    tvButton.style.display = 'none';
    entertainmentButton.style.display = 'none';
});
moviesButton.addEventListener('click',()=>{
    category = listMovies;
    printCategories.style.display = 'inline-block';
    printCategories.innerHTML = "CATEGORY: MOVIES";
    moviesButton.classList.remove('default-button');
    moviesButton.classList.add('highlighted-button');
    beginGame.style.display = 'inline-block';
    setTimeout(() => {
        moviesButton.classList.remove('highlighted-button');
        moviesButton.classList.add('default-button');
    }, 250);
    moviesButton.style.display = 'none';
    artistsButton.style.display = 'none';
    tvButton.style.display = 'none';
    entertainmentButton.style.display = 'none';
});

drinkButton.addEventListener('click',()=>{
    category = listDrink;
    printCategories.style.display = 'inline-block';
    printCategories.innerHTML = "CATEGORY: DRINK";
    drinkButton.classList.remove('default-button');
    drinkButton.classList.add('highlighted-button');
    beginGame.style.display = 'inline-block';
    setTimeout(() => {
        drinkButton.classList.remove('highlighted-button');
        drinkButton.classList.add('default-button');
    }, 250);
    drinkButton.style.display = 'none';
    foodButton.style.display = 'none';
});
const uploadList = document.getElementById("uploadList");
uploadList.addEventListener("change", () => {
    const file = uploadList.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        category = text.split('\n').filter(line => line.trim() !== "");
        uploadList.classList.remove('default-button');
        uploadList.classList.add('highlighted-button');
        beginGame.style.display = 'inline-block';
        setTimeout(() => {
            customList.classList.remove('highlighted-button');
            customList.classList.add('default-button');
        }, 250);
    };
    reader.readAsText(file);
});

customList.addEventListener('click',()=>{
    uploadButton.style.display = 'none';
    category = (document.getElementById('customList').value).split(', ');
    printCategories.style.display = 'inline-block';
    printCategories.innerHTML = "CATEGORY: CUSTOM LIST";
    customList.classList.remove('default-button');
    customList.classList.add('highlighted-button');
    beginGame.style.display = 'inline-block';
    setTimeout(() => {
        customList.classList.remove('highlighted-button');
        customList.classList.add('default-button');
    }, 250);
});

finalPlay.addEventListener('click', ()=>{
    startRoundA();
    finalPlay.style.display = 'none';    
});

newButton.addEventListener('click',()=>{
    if (r <= numRounds){
        newWord(false);
    }
});

let index = 0;
function newWord(count1){
        index = Math.floor(Math.random() * category.length);
        word = category[index];
        category.splice(index, 1);
        removeEl('myWord');
        removeEl('myNum');
        countdown(count1, word);
};

function setupPlayerInputs() {
    const playerInputsDiv = document.getElementById("playerInputs");
    playerInputsDiv.style.display = "flex";
    playerInputsDiv.innerHTML = ""; // clear previous inputs
    // create input fields
    for (let i = 0; i < 4; i++) {
        const nameInput = document.createElement("input");
        const pinInput = document.createElement("input");
        nameInput.type = "text";
        pinInput.type="number";
        nameInput.id = "player" + i;
        pinInput.id="pin" + i;
        nameInput.placeholder = "Enter username for player " + (i + 1);
        pinInput.placeholder="Enter PIN for player " + (i+1);
        const container = document.createElement("div");
        container.appendChild(nameInput);
        container.appendChild(pinInput);
        playerInputsDiv.appendChild(container);
        }
    submitBtn.style.display = "inline-block";
    allGuests.style.display="inline-block";
}
  
let guest = [false,false,false,false];

async function checkPlayers() {
    let errors = [];
    for (let i = 0; i < 4; i++) {

        const username = document.getElementById("player" + i).value;
        const enteredPin = document.getElementById("pin" + i).value;

        if (!username) {
            errors.push(`Player ${i + 1}: Missing username`);
            continue;
        }

        if (username.toLowerCase() === "guest") {
            guest[i]=true;
            continue;
        }


        const userRef = doc(db, "user-accounts", username);
        const userSnap = await getDoc(userRef);


        if (!userSnap.exists()) {
            errors.push(`${username} does not exist`);
            continue;
        }


        const userPin = userSnap.data().PIN;


        if (enteredPin != userPin) {
            errors.push(`${username}'s PIN is incorrect`);
        }
    }


    // 🔥 After checking everyone
    if (errors.length > 0) {
        alert(errors.join("\n")); // show ALL errors at once
        return false;
    }


    return true;
}


// show submit button
submitBtn.addEventListener("click", async () => {
    const allVerified = await checkPlayers();
    if (allVerified) {
        submitBtn.style.display = "none";
        playerInputsDiv.style.display = "none";
        submitBtn.style.display = "none";
        playerInputsDiv.style.display = "none";
        await syncPlayersFromInputs();
        if (isReset){
            renderMatrix();
            showScreen('screen-7', "reset");
        }
        else{
            showScreen('screen-4', "normal");
        }
    }
});

allGuests.addEventListener("click", async()=>{
    submitBtn.style.display = "none";
    playerInputsDiv.style.display = "none";
    submitBtn.style.display = "none";
    playerInputsDiv.style.display = "none";
    await syncPlayersFromInputs();
    if (isReset){
        renderMatrix();
        showScreen('screen-7', "reset");
    }
    else{
        showScreen('screen-4', "normal");
    }
});


startRounds.addEventListener("click", () => {
    startRounds.style.display = "none";
    if (isReset){
        setRounds();
        renderMatrix();
        showScreen('screen-7', "reset");
    }
    else{
        showScreen('screen-5', "normal");
    }
});

function displayInstructions(){
    const instrList = ['The Square Game is a game of wit and speed',
                'As an explainer, you will race your opponent (the person next to you) to explain a word to your teammate (the person across from you)',
                'Your objective is to get your partner to guess the word you see without saying the word (like Taboo)',
                'As a guesser, your objective is to guess the word before your opponent (the person next to you) does',
                'Teams will change every round as the computer rotates; keep an eye on who is friend or foe!',
                'Before clicking PLAY, check out the rules tab to understand correct and incorrect explainership',
                'Follow the instructions to input players, number of rounds, select a category, and confirm the start position',
                'You may also create your own custom list instead of choosing from the given categories',
                'After you have all found your roles, click PLAY to begin',
                'A word will appear, wait until the countdown reaches 0 to begin explaining',
                'Whichever guesser, RED or BLACK, who guesses the word first wins a point for their team',
                'Press RED WIN or BLACK WIN to give the two winning players one point each',
                'If it is unknown who guessed first, or one explainer is unfamiliar with a word, use the SKIP WORD / TIE button',
                'The next round will begin with new teams; when all players understand their roles, click READY',
                'Continue to rotate and gather points until the rounds finish',
                'Whichever player(s) has(ve) the most points at the end is the winner!',
                'You may use the REPLAY, CHANGE TEAMS, CHANGE ROUNDS, and CHANGE CATEGORIES buttons to edit gameplay and play again',
                'Check out the stats tab after the game to compare stats with your friends!',
                'Good Luck!'
                ];
    instr1.style.position = 'absolute';
    instr1.style.top = '50%';
    instr1.style.fontSize='40px';
    instr1.style.transition = 'all 0.5s ease';
    instr1.style.left = '50%';
    instr1.style.transform = 'translate(-50%, -50%)';
    divInstrInput.appendChild(instr1);

    let a = 0;
    nextInstruction.addEventListener('click', ()=>{
    showNextInstruction();
    });
    prevInstruction.addEventListener('click', ()=>{
    a-=2;
    showNextInstruction();
    });
    function showNextInstruction(){
        if (a < 0){
            prevInstruction.disabled = true;
            a = 0;
        }
        else if (a < instrList.length && a > -1) {
            nextInstruction.disabled = false;
            prevInstruction.disabled = false;
            instr1.style.opacity=0;
            instr1.textContent=instrList[a];
            instr1.style.opacity=1;
            a++;
        }
        else {
            nextInstruction.disabled = true;
        }
    }
    showNextInstruction();
}

function showRules() {
    const ruleList = document.createElement('span');
    ruleList.id = 'ruleList';
    ruleList.textContent = '1: No hand gestures/charades \n 2: No direct antonyms (cannot say "not sad" if word is "happy") \n 3: No saying a bigger word with the hidden word in it (if it is "play," cannot say "playful") \n 4: No saying a smaller word with part of the hidden word (if it is "teacher," cannot say "teach") \n 5: For longer/more difficult words, you can break them up into parts (can get the guesser to separately guess "ground" and "breaking" if word is "groundbreaking"';
    ruleList.style.whiteSpace = 'pre-line';
    ruleList.style.fontSize = '30px';
    ruleList.style.transition = 'all 0.5s ease';
    divRules.appendChild(ruleList);
}
async function createAcc(){
    const username = uniqueUsername.value;
    const displayName = displayNameInput.value;
    const PIN = PINInput.value; 

        if (username === "") {
          alert("Please enter a username.");
          return;
        }

        if (displayName === "") {
            alert("Please enter a display name");
            return;
          }

        try {
            const userRef = doc(db, "user-accounts", username);
            const userSnap = await getDoc(userRef);
        
            // 🔍 Check if document exists
            if (userSnap.exists()) {
              alert("Username already exists!");
              return;
            }
            await setDoc(userRef, {
                username: username,
                email: "",
                displayName: displayName,
                PIN: PIN,
                createdAt: new Date(),
                gamesCompleted:0,
                gamesWon:0,
                totalPoints:0
              });
              alert("Account created!");
            } catch (error) {
              console.error("Error:", error);
            }
      showScreen("screen-2", "create account");
    }   

Instructions.addEventListener('click',()=>{
    Play.style.display = 'none';
    Instructions.style.display = 'none';
    Rules.style.display = 'none';
    Stats.style.display = 'none';
    Settings.style.display = 'none';
    Close.style.display = 'inline-block';
    divRules.innerHTML = "";
    displayInstructions();
    nextInstruction.classList.remove('hidden1');
    prevInstruction.classList.remove('hidden1');
    nextInstruction.classList.add('visible');
    prevInstruction.classList.add('visible');
});

  Rules.addEventListener('click', ()=>{
    Play.style.display = 'none';
    Instructions.style.display = 'none';
    Rules.style.display = 'none';
    Stats.style.display = 'none';
    Settings.style.display = 'none';
    Close.style.display = 'inline-block';
    divInstrInput.innerHTML = "";
    nextInstruction.classList.remove('visible');
    prevInstruction.classList.remove('visible');
    nextInstruction.classList.add('hidden1');
    prevInstruction.classList.add('hidden1');
    showRules();
})
Stats.addEventListener("click",()=>{
    Play.style.display = 'none';
    Instructions.style.display = 'none';
    Rules.style.display = 'none';
    Stats.style.display = 'none';
    Settings.style.display = 'none';
    userStats.style.display = 'inline-block';
    showStatsFinal.style.display = 'inline-block';
    Close.style.display = 'inline-block';
  });

  Settings.addEventListener("click",()=>{
    Play.style.display = 'none';
    Instructions.style.display = 'none';
    Rules.style.display = 'none';
    Stats.style.display = 'none';
    Settings.style.display = 'none';
    addE.style.display = 'inline-block';
    recoverP.style.display = 'inline-block';
    changeP.style.display = 'inline-block';
    Close.style.display = 'inline-block';
    
  });
  changeP.addEventListener('click',() => {
    changeP.style.display = 'none';
    addE.style.display = 'none';
    recoverP.style.display = 'none';
    usernameP.style.display = 'inline-block';
    oldP.style.display = 'inline-block';
    newP.style.display = 'inline-block';
    confirmReset.style.display = 'inline-block';
  });  

confirmReset.addEventListener('click', async () => {
    const userRef = doc(db, "user-accounts", usernameP.value);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
        alert("An account with that username was not found.");
        return;
    }
    const data = userSnap.data();
    const storedPIN = data.PIN;
    const enteredPIN = oldP.value;
    
    if (storedPIN !== enteredPIN) {
        alert("The old PIN you entered does not match the one on file. Please try again.");
    } else {
        await updateDoc(doc(db, "user-accounts", usernameP.value), {
            PIN: newP.value
        });
        alert("Your PIN was successfully reset. You may now return to the menu.");
    }
});

addE.addEventListener('click',() => {
    addE.style.display = 'none';
    recoverP.style.display = 'none';
    email.style.display = 'inline-block';
    usernameE.style.display = 'inline-block';
    userE.style.display = 'inline-block';
});

recoverP.addEventListener('click',() => {
    usernameE.style.display = 'inline-block';
    addE.style.display = 'none';
    recoverP.style.display = 'none';
    sendR.style.display = 'inline-block';
});

email.addEventListener('click', async () => {
    await updateDoc(doc(db, "user-accounts", usernameE.value), {
        email: userE.value
    });
});

sendR.addEventListener('click', async () => {
    const userRef = doc(db, "user-accounts", usernameE.value);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
        alert("Account not found.");
        return;
    }
    const data = userSnap.data();
    const accPIN = data.PIN;
    
    if (data.email === "") {
        alert("This account does not have an email associated with it. To add one, navigate back to the settings page.");
    }
    else {
        const params = {
            to_email: data.email,
            message: accPIN
        };
        await emailjs.send("service_gy8yyjq", "template_gbrnwhs", params, "Ia87MGcCaj7tfXzTc");
        alert(" Please check the inbox of the email associated with this account for information containing your PIN.");
    }
});

Close.addEventListener('click', ()=>{
    Close.style.display = 'none';
    if (helpWanted){
        showScreen(`screen-${currScreen}`, "ok");
        helpBtn.style.display = "inline-block";
        goBack.style.display = "inline-block";
        email.style.display = 'none';
        usernameE.style.display = 'none';
        userE.style.display = 'none';
        addE.style.display = 'none';
        recoverP.style.display = 'none';
        sendR.style.display = 'none'
        nextInstruction.classList.remove('visible');
        prevInstruction.classList.remove('visible');
        nextInstruction.classList.add('hidden1');
        prevInstruction.classList.add('hidden1');
        divInstrInput.innerHTML = "";
        divRules.innerHTML = ""; 
    }
    else{
        Close.style.display = 'none';
        document.getElementById("statsOutput").textContent = "";
        Play.style.display = 'inline-block';
        Instructions.style.display = 'inline-block';
        Rules.style.display = 'inline-block';
        Stats.style.display = 'inline-block';
        Settings.style.display = 'inline-block';
        userStats.style.display = 'none';
        showStatsFinal.style.display = 'none';
        email.style.display = 'none';
        usernameE.style.display = 'none';
        userE.style.display = 'none';
        addE.style.display = 'none';
        recoverP.style.display = 'none';
        sendR.style.display = 'none';
        changeP.style.display = 'none';
        usernameP.style.display = 'none';
        oldP.style.display = 'none';
        newP.style.display = 'none';
        confirmReset.style.display = 'none';
        nextInstruction.classList.remove('visible');
        prevInstruction.classList.remove('visible');
        nextInstruction.classList.add('hidden1');
        prevInstruction.classList.add('hidden1');
        divInstrInput.innerHTML = "";
        divRules.innerHTML = ""; 
    }
});


  beginGame.addEventListener("click", () => {
    if (isReset){
        renderMatrix();
        showScreen('screen-7', "reset");
    }
    else{
        submitPlayersAndShowMatrix();
    }
});

menuBtn.addEventListener('click', ()=>{
    isReset = true; 
    editButtons.classList.add("active"); 
    menuBtn.style.display = "none";
    const results = document.getElementById("results");
    results.innerHTML = "";
});

X.addEventListener('click', ()=>{
    editButtons.classList.remove("active");
    menuBtn.style.display = "inline-block";
});

signUpBtn.addEventListener("click",()=>{
    showScreen('screen-3', "sign up");
}); 

createAccBtn.addEventListener("click",()=>{
    createAcc();
    uniqueUsername.value = "";
    displayNameInput.value = "";
    PINInput.value = "";

}); 

logInBtn.addEventListener("click",()=>{
    setupPlayerInputs();
    logInBtn.style.display = 'none';
    signUpBtn.style.display = 'none';
    instructionText.style.display = 'inline-block';
});

Play.addEventListener("click", () => {
    showScreen("screen-2", "log in");
}); 

document.getElementById("showStatsFinal").addEventListener("click", async () => {
    const squaregamer = userStats.value;
    const result = await getStats(squaregamer);
    document.getElementById("statsOutput").textContent = result;
});

colorReady.addEventListener("click", () => {
    printColor.style.display = 'inline-block';
    colorPicker1.value = colorPicker2.value;
    colorPickerWrapper.classList.remove("hidden"); 
    showScreen('screen-6', "normal");
});

colorPicker1.addEventListener('input', function() {
    appBox.style.backgroundColor = this.value;
});
colorPicker2.addEventListener('input', function() {
    appBox.style.backgroundColor = this.value;
});

var isColorReset = false; 
colorReset.addEventListener('click', () => {
    isColorReset = true; 
    appBox.style.backgroundColor = "transparent";
    colorPicker1.value = '#FFFFFF';
    colorPicker2.value = '#FFFFFF';
}); 

goBack.addEventListener('click', ()=> {
    helpWanted = false;
    if (currScreen == 4){
        showScreen("screen-2", "log in");
    }
    else{
        showScreen(`screen-${currScreen-1}`, "any");
    }
}); 

helpBtn.addEventListener('click', ()=> {
    helpWanted = true; 
    showScreen("screen-1", "screen-1");
    if (wordEl != null){
        wordEl.style.display = 'none';
    }
    Play.style.display = 'none';
    Instructions.style.display = 'none';
    Rules.style.display = 'none';
    Stats.style.display = 'none';
    Settings.style.display = 'none';
    createAccBtn.style.display ='none';
    uniqueUsername.style.display = 'none';
    displayNameInput.style.display = 'none';
    PINInput.style.display = 'none';
    Close.style.display = 'inline-block';
    divRules.innerHTML = "";
    displayInstructions();
    nextInstruction.classList.remove('hidden1');
    prevInstruction.classList.remove('hidden1');
    nextInstruction.classList.add('visible');
    prevInstruction.classList.add('visible');
    helpBtn.style.display = 'none';
}); 