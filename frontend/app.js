let numRounds = 0; 
const displayText1 = document.getElementById('displayText1');
displayText1.textContent = 'Submit players in the order of a SQUARE, in the direction you want to rotate. Pair names if > 4 people.';
let num = 0; 
const allRoles = {"RED EXPLAINER": 4, "RED GUESSER": 5, "BLACK GUESSER": 6, "BLACK EXPLAINER": 7};
let roleKeys = Object.keys(allRoles);
const allPlayers = {
playerone: {name: "PLAYER ONE", score: 0, id: roleKeys[0]},
playertwo: {name: "PLAYER TWO", score: 0, id: roleKeys[1]},
playerthree: {name: "PLAYER THREE", score: 0, id: roleKeys[2]},
playerfour: {name: "PLAYER FOUR", score: 0, id: roleKeys[3]}
};
let playerKeys = Object.keys(allPlayers);

const container5 = document.getElementById("matrix");
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

    cell.innerHTML = `
    <strong>${p.name}</strong><br>
    ${p.id}<br>
    Score: ${p.score}
    `;

    container5.appendChild(cell);
});


function displayTeams(){
    playerKeys = Object.keys(allPlayers);
    roleKeys = Object.keys(allRoles);
    // update the name values based on inputs
    for (let j = 0; j < 4; j++) {
     document.getElementById(`cell-${j}`).innerHTML = `<strong>${document.getElementById("player" + j).value.trim()}</strong><br>${allPlayers[playerKeys[j]].id}<br>Score: ${allPlayers[playerKeys[j]].score}`;
    }
}

function updateScore(color){
    for (let i = 0; i < playerKeys.length; i++) {
        const key = playerKeys[i];
        const player = allPlayers[key];
        const currPlayer = allPlayers[playerKeys[i]];

        if (color === "red") {
            if (player.id === "RED GUESSER" || player.id === "RED EXPLAINER") {
                    currPlayer.score++;  // add to **previous**
            }
        } 
        else if (color === "black") {
            if (player.id === "BLACK GUESSER" || player.id === "BLACK EXPLAINER") {
                currPlayer.score++;  // add to **previous**
            }
        }
    }
}
   

function changeRoles() {
    if (num > 0){
    // Step 1: Increment all role values
    console.log("changeRoles ran");
    for (let key in allRoles) {
        allRoles[key] += 1;
    }

    // Step 2: Convert to array and sort by value % 4
    const sortedRoles = Object.entries(allRoles)
    .sort((a, b) => (a[1] % 4) - (b[1] % 4));

        // Step 3: Display sorted roles
        for (let i = 0; i < sortedRoles.length; i++) {
            allPlayers[playerKeys[i]].id = sortedRoles[i][0];
            if (allPlayers[playerKeys[i]].id === "RED GUESSER" || allPlayers[playerKeys[i]].id === "RED EXPLAINER") {
                document.getElementById(`cell-${i}`).style.background = "red";
            }
            else{
                document.getElementById(`cell-${i}`).style.background = "black";
            }
        }
    }
}

let wordId = 0;
players = {
    red: [],
    black: []
};
let randomWords = [];
    let word=null;
    const basicButton= document.getElementById('Basic');
    const hardButton= document.getElementById('Hard');
    const medButton= document.getElementById('Medium');
    const easyButton= document.getElementById('Easy');
    const foodDrinkButton= document.getElementById('Food&Drink');
    const drinkButton = document.getElementById('Drink');
    const foodButton = document.getElementById('Food');
    const athleteButton= document.getElementById('Athletes');
    const mlbButton= document.getElementById('MLB');
    const nbaButton = document.getElementById('NBA');
    const nflButton = document.getElementById('NFL');
    const mmaButton = document.getElementById('MMA');
    const soccerButton = document.getElementById('Soccer');
    const backButton = document.getElementById('Return');
    const custList = document.getElementById('CustomList');
function removeEl(el){
    const existing=document.getElementById(el);
    if (existing) existing.remove();
}
function dispNum(num1) {
    removeEl('myNum');
    const numEl = document.createElement('span');
    numEl.style.top = '300px'; 
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

function countdown() {
    if (num === 0) {
        setTimeout(function() { displayWord(); }, 0);
        return;
    } 
    for (let i = 5; i > -1; i--) {
        setTimeout(function() { dispNum(i); }, (5 - i) * 1000);
    }
    setTimeout(function() { displayWord(); }, 6000);
}


let listEasyBasicWords = ["Blade", "Crush", "Drill", "Flame", "Grasp", "Jump", "Kick", "Lift", "Mash", "Neck",
"Pluck", "Quirk", "Snub", "Thump", "Vault", "Wrench", "Zap", "Bark", "Cling", "Dusk",
"Glint", "Hush", "Lump", "Mirth", "Numb", "Plop", "Quake", "Scamp", "Throb", "Vex",
"Whisk", "Brag", "Crib", "Damp", "Fleck", "Grin", "Hatch", "Jolt", "Knob", "Lace",
"Munch", "Nip", "Pouch", "Quilt", "Scrub", "Tusk", "Vast", "Wisp", "Yelp", "Zing",
"Blink", "Brisk", "Chop", "Drip", "Flick", "Grit", "Hump", "Jerk", "Kick", "Loom",
"Groan", "Nab", "Prance", "Quash", "Rust", "Slam", "Twitch", "Vibe", "Wag", "Yawn",
"Zest", "Blast", "Broke", "Chirp", "Drop", "Frown", "Grub", "Honk", "Jet", "Knot",
"Lush", "Mop", "Nest", "Pond", "Quiz", "Rasp", "Smack", "Tread", "Veil", "Warp",
"Yolk", "Zip", "Bark", "Boil", "Clasp", "Ditch", "Fang", "Gasp", "Hitch", "Jam",
"Keel", "Leaf", "Mirth", "Net", "Peck", "Rant", "Slink", "Tramp", "Vouch", "Whip",
"Yap", "Buzz", "Brick", "Chalk", "Dent", "Flick", "Glimpse", "Halt", "Jab", "Knit",
"Lump", "Meek", "Nudge", "Patch", "Ridge", "Skimp", "Tilt", "Vein", "Wreck", "Yank",
"Zoom", "Brim", "Crop", "Drank", "Fleck", "Gush", "Harp", "Jack", "Keen", "Lid",
"Moss", "Neck", "Plead", "Quip", "Rook", "Spook", "Thrift", "Vault", "Wane", "Yank",
"Zap", "Blip", "Bask", "Clunk", "Dusk", "Fist", "Glimpse", "Hack", "Jet", "Keep",
"Luck", "Moat", "Nook", "Pitch", "Quest", "Romp", "Stomp", "Tug", "Vim", "Wink",
"Yarn", "Zing", "Bloat", "Bunch", "Cheek", "Dodge", "Froth", "Grim", "Hush", "Junk",
"Knot", "Lurk", "Mesh", "Numb", "Pint", "Rant", "Snag", "Trap", "Vast", "Wane",
"Whack", "Yap", "Zoom", "Brick", "Chomp", "Drill", "Freak", "Glum", "Honk", "Jab",
"Dink", "Ledge", "Mold", "Nip", "Plop", "Rug", "Stack", "Trim", "Vibe", "Whiff"];
let listMediumBasicWords = ["Apple", "Bunny", "Candle", "Dinner", "Echo", "Flower", "Giant", "Happy", "Igloo", "Jelly",
"Kitten", "Lemon", "Monkey", "Nugget", "Ocean", "Pencil", "Quiet", "Rocket", "Summer", "Trophy",
"Uncle", "Velvet", "Window", "Yellow", "Zebra", "Artist", "Bishop", "Clover", "Dancer", "Evening",
"Falcon", "Garden", "Hammer", "Icebox", "Jacket", "Keeper", "Ladder", "Mango", "Napkin", "Orange",
"Pilot", "Quiver", "River", "Soccer", "Target", "Uptown", "Valley", "Waffle", "Yogurt", "Zephyr",
"Basket", "Button", "Canyon", "Donkey", "Engine", "Fossil", "Goblin", "Hunter", "Insect", "Jungle",
"Kitten", "Lantern", "Magnet", "Necklace", "Oyster", "Puppet", "Quasar", "Rumble", "Sunset", "Turtle",
"Upbeat", "Vapor", "Whisper", "Yonder", "Zipper", "Anchor", "Beetle", "Cotton", "Dinner", "Elbow",
"Fiddle", "Gutter", "Hammer", "Igloo", "Jester", "Kettle", "Locket", "Marble", "Nickel", "Office",
"Parrot", "Quiver", "Rocket", "Saddle", "Tinsel", "Update", "Village", "Wagon", "Yankee", "Zodiac",
"Armor", "Bison", "Cactus", "Doctor", "Eagle", "Fellow", "Glider", "Hammer", "Inward", "Jumper",
"Ketchup", "Mustard", "Muffin", "Number", "Oven", "Puzzle", "Quaint", "Raven", "Signal", "Tunnel",
"Unwind", "Vulture", "Warden", "Yogurt", "Zealot", "Blazer", "Bitter", "Clumsy", "Dizzy", "Eager",
"Famous", "Gloomy", "Hollow", "Idle", "Jumble", "Kidney", "Loopy", "Mellow", "Nutmeg", "Optic",
"Plenty", "Quirky", "Razor", "Shiver", "Timber", "Unseen", "Violet", "Witty", "Yearly", "Zigzag",
"Almond", "Borrow", "Cocoa", "Dagger", "Empty", "Frosty", "Gravel", "Humid", "Island", "Jargon",
"Karma", "Lesson", "Muffin", "Notice", "Oboe", "Pillow", "Quickly", "Rumble", "Simple", "Ticket",
"Unrest", "Vermin", "Warden", "Yellow", "Zipper", "Artist", "Barren", "Clever", "Danger", "Effort",
"Fossil", "Gallop", "Happen", "Inside", "Jacket", "Kindle", "Lonely", "Market", "Nation", "Outfit",
"Poetry", "Quiver", "Rescue", "Sample", "Tangle", "Voyage", "Waffle", "Yonder", "Zebra"];
let listHardBasicWords = ["Adventure", "Beautiful", "Calculator", "Delicately", "Electricity",
"Fascinate", "Generation", "Helicopter", "Imagination", "Judgmental",
"Kindergarten", "Literature", "Motivation", "Negotiate", "Opportunity",
"Photography", "Questionable", "Revolution", "Significant", "Territory",
"Umbrella", "Vocabulary", "Wonderful", "Xylophone", "Yesterday",
"Appreciate", "Banana", "Celebration", "Definition", "Elevator",
"Fantastic", "Geography", "Happiness", "Intelligent", "Justifiable",
"Kaleidoscope", "Lullaby", "Memorable", "Necessary", "Observation",
"Participate", "Qualification", "Realization", "Situation", "Translation",
"Unbelievable", "Verification", "Whimsical",
"Architecture", "Beneficial", "Consequence", "Disciplinary", "Entertainment",
"Facilitate", "Genuine", "Hallucinate", "Incredible", "Jurisdiction",
"Knowledgeable", "Limitation", "Manipulate", "Navigation", "Occupation",
"Preparation", "Questionnaire", "Recommendation", "Substitute", "Transportation",
"Universal", "Victorious", "Wilderness", "Xenophobia",
"Apprehension", "Breakable", "Controversy", "Decoration", "Electrician",
"Frustration", "Gratitude", "Hospitality", "Inspiration", "Justification",
"Kangaroo", "Linguistics", "Manufacture", "Negotiation", "Observation",
"Publication", "Qualification", "Reservation", "Specification", "Termination",
"Unification", "Visualization", "Watermelon", "Youngster",
"Aspiration", "Behavioral", "Conversation", "Determination", "Establishment",
"Foreigner", "Guitarist", "Hesitation", "Illustration", "Jeopardize",
"Kaleidoscope", "Liberation", "Meaningful", "Notification", "Opposition",
"Perspective", "Questioning", "Reputation", "Satisfaction", "Television",
"Understanding", "Vegetarian", "Yielding",
"Acceptance", "Biologist", "Celebratory", "Destination", "Environmental",
"Forgiveness", "Governmental", "Hieroglyph", "Identification", "Jurisdictional",
"Knowledgeable", "Legislation", "Maintenance", "Negotiable", "Organization",
"Participation", "Qualification", "Responsibility", "Sustainability", "Transformation",
"Utilization", "Volunteering", "Whistleblower", "Youthfulness",
"Anticipation", "Beneficiary", "Classification", "Deliberation", "Efficiency",
"Fundamental", "Grammatical", "Hypothesis", "Intellectual", "Justifiably",
"Kinesthetic", "Legitimacy", "Memorization", "Noteworthy", "Overestimate",
"Productivity", "Questionably", "Rehabilitation", "Simplification", "Traditional",
"Unpredictable", "Verification", "Willingness",
"Articulation", "Background", "Caffeinated", "Democratic", "Elasticity",
"Friendliness", "Generosity", "Helplessness", "Idealistic", "Journalistic"];
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

function displayWord(){
    removeEl('myWord');
    removeEl('myNum');
    const wordEl = document.createElement('span');
    wordEl.id = 'myWord';
    wordEl.style.top = '300px'; 
    wordEl.style.position = 'absolute';
    wordEl.style.fontSize='60px';
    wordEl.style.transition = 'all 0.5s ease';
    wordEl.textContent = "WAIT. NEXT WORD: " + word;
    document.body.appendChild(wordEl);

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function moveWord() {
        const screenWidth=window.innerWidth;
        const elementWidth = wordEl.offsetWidth;
        wordEl.style.left = (screenWidth/2)-(wordEl.offsetWidth/2) + "px";
        await delay(2000); // wait 2 seconds
        wordEl.textContent = "GO!";
        wordEl.style.left = (screenWidth/2)-(wordEl.offsetWidth/2) + "px";
        await delay(2000); // wait 2 seconds
        wordEl.textContent = word;
        wordEl.style.top = '20px';
        wordEl.style.fontSize='16px';
        wordEl.style.left = (screenWidth/2)-(wordEl.offsetWidth/2) + "px";
    }
    moveWord();
}

function hardWord() {
    wordId=1;
    word=listHardBasicWords[Math.floor(Math.random() * listHardBasicWords.length)]
    const easy = document.getElementById('Easy');
    easy.style.display = 'none';
    const med = document.getElementById('Medium');
    med.style.display = 'none';
    const hard = document.getElementById('Hard');
    hard.style.display = 'none';
    countdown();
}

function mediumWord() {
    wordId=2;
    word=listMediumBasicWords[Math.floor(Math.random() * listMediumBasicWords.length)]
    const easy = document.getElementById('Easy');
    easy.style.display = 'none';
    const med = document.getElementById('Medium');
    med.style.display = 'none';
    const hard = document.getElementById('Hard');
    hard.style.display = 'none';
    countdown();
}

function easyWord() {
    wordId=3;
    word=listEasyBasicWords[Math.floor(Math.random() * listEasyBasicWords.length)]
    const easy = document.getElementById('Easy');
    easy.style.display = 'none';
    const med = document.getElementById('Medium');
    med.style.display = 'none';
    const hard = document.getElementById('Hard');
    hard.style.display = 'none';
    countdown();
}

function nbaWord() {
    wordId=4;
    word=listAthletesNBA[Math.floor(Math.random() * listAthletesNBA.length)]
    const mlb = document.getElementById('MLB');
    mlb.style.display = 'none';
    const nba = document.getElementById('NBA');
    nba.style.display = 'none';
    const nfl = document.getElementById('NFL');
    nfl.style.display = 'none';
    const soccer = document.getElementById('Soccer');
    soccer.style.display = 'none';
    const mma = document.getElementById('MMA');
    mma.style.display = 'none';
    countdown();
}

function nflWord() {
    wordId=5;
    word=listAthletesNFL[Math.floor(Math.random() * listAthletesNFL.length)]
    const mlb = document.getElementById('MLB');
    mlb.style.display = 'none';
    const nba = document.getElementById('NBA');
    nba.style.display = 'none';
    const nfl = document.getElementById('NFL');
    nfl.style.display = 'none';
    const soccer = document.getElementById('Soccer');
    soccer.style.display = 'none';
    const mma = document.getElementById('MMA');
    mma.style.display = 'none';
    countdown();
}

function mlbWord() {
    wordId=6;
    word=listAthletesMLB[Math.floor(Math.random() * listAthletesMLB.length)]
    const mlb = document.getElementById('MLB');
    mlb.style.display = 'none';
    const nba = document.getElementById('NBA');
    nba.style.display = 'none';
    const nfl = document.getElementById('NFL');
    nfl.style.display = 'none';
    const soccer = document.getElementById('Soccer');
    soccer.style.display = 'none';
    const mma = document.getElementById('MMA');
    mma.style.display = 'none';
    countdown();
}

function soccerWord() {
    wordId=7;
    word=listAthletesSoccer[Math.floor(Math.random() * listAthletesSoccer.length)]
    const mlb = document.getElementById('MLB');
    mlb.style.display = 'none';
    const nba = document.getElementById('NBA');
    nba.style.display = 'none';
    const nfl = document.getElementById('NFL');
    nfl.style.display = 'none';
    const soccer = document.getElementById('Soccer');
    soccer.style.display = 'none';
    const mma = document.getElementById('MMA');
    mma.style.display = 'none';
    countdown();
}

function mmaWord() {
    wordId=8;
    word=listAthletesMMA[Math.floor(Math.random() * listAthletesMMA.length)]
    const mlb = document.getElementById('MLB');
    mlb.style.display = 'none';
    const nba = document.getElementById('NBA');
    nba.style.display = 'none';
    const nfl = document.getElementById('NFL');
    nfl.style.display = 'none';
    const soccer = document.getElementById('Soccer');
    soccer.style.display = 'none';
    const mma = document.getElementById('MMA');
    mma.style.display = 'none';
    countdown();
}

function foodWord() {
    wordId=9;
    word=listFoods[Math.floor(Math.random() * listFoods.length)]
    const food = document.getElementById('Food');
    food.style.display = 'none';
    const drink = document.getElementById('Drink');
    drink.style.display = 'none';
    countdown();
}

function drinkWord() {
    wordId=10;
    word=listDrink[Math.floor(Math.random() * listDrink.length)]
    const food = document.getElementById('Food');
    food.style.display = 'none';
    const drink = document.getElementById('Drink');
    drink.style.display = 'none';
    countdown();
}


basicButton.addEventListener('click',()=>{
    const ath = document.getElementById('Athletes');
    ath.style.display = 'none';
    const food = document.getElementById('Food&Drink');
    food.style.display = 'none';
    const basic = document.getElementById('Basic');
    basic.style.display = 'none';
    const easy = document.getElementById('Easy');
    easy.style.display = 'inline-block';
    const med = document.getElementById('Medium');
    med.style.display = 'inline-block';
    const hard = document.getElementById('Hard');
    hard.style.display = 'inline-block';
    const back = document.getElementById('Return');
    back.style.display = 'inline-block';
    const custom = document.getElementById('pCL');
    custom.style.display = 'none';
})

athleteButton.addEventListener('click',()=>{
    const ath = document.getElementById('Athletes');
    ath.style.display = 'none';
    const food = document.getElementById('Food&Drink');
    food.style.display = 'none';
    const basic = document.getElementById('Basic');
    basic.style.display = 'none';
    const custom = document.getElementById('pCL');
    custom.style.display = 'none';
    const mlb = document.getElementById('MLB');
    mlb.style.display = 'inline-block';
    const nba = document.getElementById('NBA');
    nba.style.display = 'inline-block';
    const nfl = document.getElementById('NFL');
    nfl.style.display = 'inline-block';
    const soccer = document.getElementById('Soccer');
    soccer.style.display = 'inline-block';
    const mma = document.getElementById('MMA');
    mma.style.display = 'inline-block';
    const back = document.getElementById('Return');
    back.style.display = 'inline-block';
})

foodDrinkButton.addEventListener('click',()=>{
    const ath = document.getElementById('Athletes');
    ath.style.display = 'none';
    const food = document.getElementById('Food&Drink');
    food.style.display = 'none';
    const basic = document.getElementById('Basic');
    basic.style.display = 'none';
    const drinkB = document.getElementById('Drink');
    drinkB.style.display = 'inline-block';
    const foodB = document.getElementById('Food');
    foodB.style.display = 'inline-block';
    const back = document.getElementById('Return');
    back.style.display = 'inline-block';
})

backButton.addEventListener('click',()=>{
    const back = document.getElementById('Return');
    back.style.display = 'none';
    const ath = document.getElementById('Athletes');
    ath.style.display = 'inline-block';
    const food = document.getElementById('Food&Drink');
    food.style.display = 'inline-block';
    const basic = document.getElementById('Basic');
    basic.style.display = 'inline-block';
    const easy = document.getElementById('Easy');
    easy.style.display = 'none';
    const med = document.getElementById('Medium');
    med.style.display = 'none';
    const hard = document.getElementById('Hard');
    hard.style.display = 'none';
    const mlb = document.getElementById('MLB');
    mlb.style.display = 'none';
    const nba = document.getElementById('NBA');
    nba.style.display = 'none';
    const nfl = document.getElementById('NFL');
    nfl.style.display = 'none';
    const soccer = document.getElementById('Soccer');
    soccer.style.display = 'none';
    const mma = document.getElementById('MMA');
    mma.style.display = 'none';
    const foodB = document.getElementById('Food');
    foodB.style.display = 'none';
    const drinkB = document.getElementById('Drink');
    drinkB.style.display = 'none';
    const custom = document.getElementById('pCL');
    custom.style.display = 'inline-block';
})

const basic = document.getElementById("Basic");
const food = document.getElementById("Food&Drink");
const easy = document.getElementById("Easy");
const medium = document.getElementById("Medium");
const hard = document.getElementById("Hard");
const nba = document.getElementById("NBA");
const nfl = document.getElementById("NFL");
const mma = document.getElementById("MMA");
const mlb = document.getElementById("MLB");
const soccer = document.getElementById("Soccer");
const instruct = document.getElementById("displayInstructions");
const wordBtn = document.getElementById("pCL");
const redBtn = document.getElementById("redBtn");
const blackBtn = document.getElementById("blackBtn");
const resetBtn = document.getElementById("resetBtn");
const setBtn = document.getElementById("setPlayers");
const submitBtn = document.getElementById("submitPlayers");
const newWordBtn = document.getElementById("newWord");
const backBtn = document.getElementById("Return");
let tempId = 0;

// round functions for all categories
hardButton.addEventListener('click',()=>{
    //add event listener tells button to wait for some parameter, like click. The () is bc the click function is empty
    wordId=1;
    word=listHardBasicWords[Math.floor(Math.random() * listHardBasicWords.length)]
    const easy = document.getElementById('Easy');
    easy.style.display = 'none';
    const med = document.getElementById('Medium');
    med.style.display = 'none';
    const hard = document.getElementById('Hard');
    hard.style.display = 'none';
    countdown();
});
    
medButton.addEventListener('click',()=>{
    wordId=2;
    word=listMediumBasicWords[Math.floor(Math.random() * listMediumBasicWords.length)]
    const easy = document.getElementById('Easy');
    easy.style.display = 'none';
    const med = document.getElementById('Medium');
    med.style.display = 'none';
    const hard = document.getElementById('Hard');
    hard.style.display = 'none';
    countdown();
});
    

easyButton.addEventListener('click',()=>{
    wordId=3;
    word=listEasyBasicWords[Math.floor(Math.random() * listEasyBasicWords.length)]
    const easy = document.getElementById('Easy');
    easy.style.display = 'none';
    const med = document.getElementById('Medium');
    med.style.display = 'none';
    const hard = document.getElementById('Hard');
    hard.style.display = 'none';
    countdown();
});

nbaButton.addEventListener('click',()=>{
    wordId=4;
    word=listAthletesNBA[Math.floor(Math.random() * listAthletesNBA.length)]
    const mlb = document.getElementById('MLB');
    mlb.style.display = 'none';
    const nba = document.getElementById('NBA');
    nba.style.display = 'none';
    const nfl = document.getElementById('NFL');
    nfl.style.display = 'none';
    const soccer = document.getElementById('Soccer');
    soccer.style.display = 'none';
    const mma = document.getElementById('MMA');
    mma.style.display = 'none';
    countdown();
})
nflButton.addEventListener('click',()=>{
    wordId=5;
    word=listAthletesNFL[Math.floor(Math.random() * listAthletesNFL.length)]
    const mlb = document.getElementById('MLB');
    mlb.style.display = 'none';
    const nba = document.getElementById('NBA');
    nba.style.display = 'none';
    const nfl = document.getElementById('NFL');
    nfl.style.display = 'none';
    const soccer = document.getElementById('Soccer');
    soccer.style.display = 'none';
    const mma = document.getElementById('MMA');
    mma.style.display = 'none';
    countdown();
})
mlbButton.addEventListener('click',()=>{
    wordId=6;
    word=listAthletesMLB[Math.floor(Math.random() * listAthletesMLB.length)]
    const mlb = document.getElementById('MLB');
    mlb.style.display = 'none';
    const nba = document.getElementById('NBA');
    nba.style.display = 'none';
    const nfl = document.getElementById('NFL');
    nfl.style.display = 'none';
    const soccer = document.getElementById('Soccer');
    soccer.style.display = 'none';
    const mma = document.getElementById('MMA');
    mma.style.display = 'none';
    countdown();
})
soccerButton.addEventListener('click',()=>{
    wordId=7;
    word=listAthletesSoccer[Math.floor(Math.random() * listAthletesSoccer.length)]
    const mlb = document.getElementById('MLB');
    mlb.style.display = 'none';
    const nba = document.getElementById('NBA');
    nba.style.display = 'none';
    const nfl = document.getElementById('NFL');
    nfl.style.display = 'none';
    const soccer = document.getElementById('Soccer');
    soccer.style.display = 'none';
    const mma = document.getElementById('MMA');
    mma.style.display = 'none';
    countdown();
})
mmaButton.addEventListener('click',()=>{
    wordId=8;
    word=listAthletesMMA[Math.floor(Math.random() * listAthletesMMA.length)]
    const mlb = document.getElementById('MLB');
    mlb.style.display = 'none';
    const nba = document.getElementById('NBA');
    nba.style.display = 'none';
    const nfl = document.getElementById('NFL');
    nfl.style.display = 'none';
    const soccer = document.getElementById('Soccer');
    soccer.style.display = 'none';
    const mma = document.getElementById('MMA');
    mma.style.display = 'none';
    countdown();
})
foodButton.addEventListener('click',()=>{
    wordId=9;
    word=listFoods[Math.floor(Math.random() * listFoods.length)]
    countdown();
})
drinkButton.addEventListener('click',()=>{
    wordId=10;
    word=listDrink[Math.floor(Math.random() * listDrink.length)]
    countdown();
})
const newButton=document.getElementById('newWord');
hardButton.addEventListener('click',()=>{
    //add event listener tells button to wait for some parameter, like click. The () is bc the click function is empty
    wordId=0;
    removeEl('myWord');
    removeEl('myNum');
    word=listHardBasicWords[Math.floor(Math.random() * listHardBasicWords.length)]
    const easy = document.getElementById('Easy');
    easy.style.display = 'none';
    const med = document.getElementById('Medium');
    med.style.display = 'none';
    const hard = document.getElementById('Hard');
    hard.style.display = 'none';
    countdown();
    setTimeout(() => {
        wordId = 1;
    }, 5000);
});
    
medButton.addEventListener('click',()=>{
    wordId=0;
    removeEl('myWord');
    removeEl('myNum');
    word=listMediumBasicWords[Math.floor(Math.random() * listMediumBasicWords.length)]
    const easy = document.getElementById('Easy');
    easy.style.display = 'none';
    const med = document.getElementById('Medium');
    med.style.display = 'none';
    const hard = document.getElementById('Hard');
    hard.style.display = 'none';
    countdown();
    setTimeout(() => {
        wordId = 2;
    }, 5000);
});

easyButton.addEventListener('click',()=>{
    wordId=0;
    removeEl('myWord');
    removeEl('myNum');
    word=listMediumBasicWords[Math.floor(Math.random() * listMediumBasicWords.length)]
    const easy = document.getElementById('Easy');
    easy.style.display = 'none';
    const med = document.getElementById('Medium');
    med.style.display = 'none';
    const hard = document.getElementById('Hard');
    hard.style.display = 'none';
    countdown();
    setTimeout(() => {
        wordId = 3;
    }, 5000);
});

function setRounds(){
    numRounds = document.getElementById("numRounds").value;
    document.getElementById("startRounds").style.display = "none";
    document.getElementById("numRounds").style.display = "none";
}

function startRoundA(){
    let i = 2;
    redBtn.addEventListener('click', function() {
        if (i >= numRounds){
            document.getElementById("redBtn").style.display = "none";
            document.getElementById("blackBtn").style.display = "none";
        }
        num++;
        removeEl('myWord');
        removeEl('myNum');
        newWord(); 
        i++;
        updateScore("red");
        changeRoles();
        displayTeams(); 
    });
    blackBtn.addEventListener('click', function() {
        if (i >= numRounds){
            document.getElementById("redBtn").style.display = "none";
            document.getElementById("blackBtn").style.display = "none";
        }
        num++;
        removeEl('myWord');
        removeEl('myNum');
        newWord();
        i++;
        updateScore("black");
        changeRoles();
        displayTeams();
    });
    resetBtn.addEventListener('click', () => {
        document.getElementById("submitPlayers").style.display = 'inline-block';
        document.getElementById("setPlayers").style.display = 'inline-block';
        document.getElementById("playerInputs").style.display = 'inline-block';
        document.getElementById("numPlayers").style.display = 'inline-block';
        document.getElementById("redBtn").style.display = 'inline-block';
        document.getElementById("blackBtn").style.display = 'inline-block';
        document.getElementById("numRounds").style.display = 'inline-block';
        document.getElementById("startRounds").style.display = 'inline-block';
        document.getElementById("button-container").style.display = 'inline-block';
        for (let key of playerKeys) { 
            const player = allPlayers[key]; 
            player.score = 0;
        }
        displayTeams();
    });
}

function startRoundB(time_limit, categ) {
    setTimeout(function() { });
}

easyButton.addEventListener('click',()=>{
    startRoundA();
});

nbaButton.addEventListener('click',()=>{
    startRoundA();
});

nflButton.addEventListener('click',()=>{
    startRoundA();
});

mlbButton.addEventListener('click',()=>{
    startRoundA();
});

soccerButton.addEventListener('click',()=>{
    startRoundA();
});

mmaButton.addEventListener('click',()=>{
    startRoundA();
});

foodButton.addEventListener('click',()=>{
    startRoundA();
});

drinkButton.addEventListener('click',()=>{
    startRoundA();
});

nbaButton.addEventListener('click',()=>{
    wordId=0;
    removeEl('myWord');
    removeEl('myNum');
    word=listAthletesNBA[Math.floor(Math.random() * listAthletesNBA.length)]
    const mlb = document.getElementById('MLB');
    mlb.style.display = 'none';
    const nba = document.getElementById('NBA');
    nba.style.display = 'none';
    const nfl = document.getElementById('NFL');
    nfl.style.display = 'none';
    const soccer = document.getElementById('Soccer');
    soccer.style.display = 'none';
    const mma = document.getElementById('MMA');
    mma.style.display = 'none';
    countdown();
    setTimeout(() => {
        wordId = 4;
    }, 5000);
})

nflButton.addEventListener('click',()=>{
wordId=0;
removeEl('myWord');
removeEl('myNum');
word=listAthletesNFL[Math.floor(Math.random() * listAthletesNFL.length)]
const mlb = document.getElementById('MLB');
mlb.style.display = 'none';
const nba = document.getElementById('NBA');
nba.style.display = 'none';
const nfl = document.getElementById('NFL');
nfl.style.display = 'none';
const soccer = document.getElementById('Soccer');
soccer.style.display = 'none';
const mma = document.getElementById('MMA');
mma.style.display = 'none';
countdown();
setTimeout(() => {
    wordId = 5;
}, 5000);
})

mlbButton.addEventListener('click',()=>{
    wordId=0;
    removeEl('myWord');
    removeEl('myNum');
    word=listAthletesMLB[Math.floor(Math.random() * listAthletesMLB.length)]
    const mlb = document.getElementById('MLB');
    mlb.style.display = 'none';
    const nba = document.getElementById('NBA');
    nba.style.display = 'none';
    const nfl = document.getElementById('NFL');
    nfl.style.display = 'none';
    const soccer = document.getElementById('Soccer');
    soccer.style.display = 'none';
    const mma = document.getElementById('MMA');
    mma.style.display = 'none';
    countdown();
    setTimeout(() => {
        wordId = 6;
    }, 5000);
})

soccerButton.addEventListener('click',()=>{
    wordId=0;
    removeEl('myWord');
    removeEl('myNum');
    word=listAthletesSoccer[Math.floor(Math.random() * listAthletesSoccer.length)]
    const mlb = document.getElementById('MLB');
    mlb.style.display = 'none';
    const nba = document.getElementById('NBA');
    nba.style.display = 'none';
    const nfl = document.getElementById('NFL');
    nfl.style.display = 'none';
    const soccer = document.getElementById('Soccer');
    soccer.style.display = 'none';
    const mma = document.getElementById('MMA');
    mma.style.display = 'none';
    countdown();
    setTimeout(() => {
        wordId = 7;
    }, 5000);
})

mmaButton.addEventListener('click',()=>{
    wordId=0;
    removeEl('myWord');
    removeEl('myNum');
    word=listAthletesMMA[Math.floor(Math.random() * listAthletesMMA.length)]
    const mlb = document.getElementById('MLB');
    mlb.style.display = 'none';
    const nba = document.getElementById('NBA');
    nba.style.display = 'none';
    const nfl = document.getElementById('NFL');
    nfl.style.display = 'none';
    const soccer = document.getElementById('Soccer');
    soccer.style.display = 'none';
    const mma = document.getElementById('MMA');
    mma.style.display = 'none';
    countdown();
    setTimeout(() => {
        wordId = 8;
    }, 5000);
})

foodButton.addEventListener('click',()=>{
    wordId=0;
    removeEl('myWord');
    removeEl('myNum');
    word=listFoods[Math.floor(Math.random() * listFoods.length)]
    const drinkB = document.getElementById('Drink');
    drinkB.style.display = 'none';
    const foodB = document.getElementById('Food');
    foodB.style.display = 'none';
    countdown();
    setTimeout(() => {
        wordId = 9;
    }, 5000);
})

drinkButton.addEventListener('click',()=>{
    wordId=0;
    removeEl('myWord');
    removeEl('myNum');
    word=listDrink[Math.floor(Math.random() * listDrink.length)]
    const drinkB = document.getElementById('Drink');
    drinkB.style.display = 'none';
    const foodB = document.getElementById('Food');
    foodB.style.display = 'none';
    countdown();
    setTimeout(() => {
        wordId = 11;
    }, 5000);
})

newButton.addEventListener('click',()=>{
    newWord();
});

function newWord(){
    if (wordId == 1){
        word=listHardBasicWords[Math.floor(Math.random() * listHardBasicWords.length)]
        removeEl('myWord');
        removeEl('myNum');
        wordId = 0;
        countdown();
        setTimeout(() => {
            wordId = 1;
        }, 5000);
    } else if (wordId == 2){
        word=listMediumBasicWords[Math.floor(Math.random() * listMediumBasicWords.length)]
        removeEl('myWord');
        removeEl('myNum');
        wordId = 0;
        countdown();
        setTimeout(() => {
            wordId = 2;
        }, 5000);
    } else if (wordId == 3){
        word=listEasyBasicWords[Math.floor(Math.random() * listEasyBasicWords.length)]
        removeEl('myWord');
        removeEl('myNum');
        wordId = 0;
        countdown();
        setTimeout(() => {
            wordId = 3;
        }, 5000);
    } else if (wordId == 4){
        word=listAthletesNBA[Math.floor(Math.random() * listAthletesNBA.length)]
        removeEl('myWord');
        removeEl('myNum');
        wordId = 0;
        countdown();
        setTimeout(() => {
            wordId = 4;
        }, 5000);
    } else if (wordId == 5){
        word=listAthletesNFL[Math.floor(Math.random() * listAthletesNFL.length)]
        removeEl('myWord');
        removeEl('myNum');
        wordId = 0;
        countdown();
        setTimeout(() => {
            wordId = 5;
        }, 5000);
    } else if (wordId == 6){
        word=listAthletesMLB[Math.floor(Math.random() * listAthletesMLB.length)]
        removeEl('myWord');
        removeEl('myNum');
        wordId = 0;
        countdown();
        setTimeout(() => {
            wordId = 6;
        }, 5000);
    } else if (wordId == 7){
        word=listAthletesSoccer[Math.floor(Math.random() * listAthletesSoccer.length)]
        removeEl('myWord');
        removeEl('myNum');
        wordId = 0;
        countdown();
        setTimeout(() => {
            wordId = 7;
        }, 5000);
    } else if (wordId == 8){
        word=listAthletesMMA[Math.floor(Math.random() * listAthletesMMA.length)]
        removeEl('myWord');
        removeEl('myNum');
        wordId = 0;
        countdown();
        setTimeout(() => {
            wordId = 8;
        }, 5000);
    } else if (wordId == 9){
        word=listFoods[Math.floor(Math.random() * listFoods.length)]
        removeEl('myWord');
        removeEl('myNum');
        wordId = 0;
        countdown();
        setTimeout(() => {
            wordId = 9;
        }, 5000);
    } else if (wordId == 10){
        removeEl('myWord');
        removeEl('myNum');
        wordId = 0;
        processCustomList();
        setTimeout(() => {
            wordId = 10;
        }, 5000);
    } else if (wordId == 11){
        word=listDrink[Math.floor(Math.random() * listDrink.length)]
        removeEl('myWord');
        removeEl('myNum');
        wordId = 0;
        countdown();
        setTimeout(() => {
            wordId = 11;
        }, 5000);
    }
};

function processCustomList() {
    const custListElement = document.getElementById('customList');
    const custListValue = custListElement.value;
    const custListLength = custListValue.length;
    randomWords = []
    randomWords = custListValue.split(", ");
    let rWord = randomWords[Math.floor(Math.random() * randomWords.length)];
    function printWord() {
        return rWord;
    }
    word=rWord;
    wordId=0
    const ath = document.getElementById('Athletes');
    ath.style.display = 'none';
    const food = document.getElementById('Food&Drink');
    food.style.display = 'none';
    const basic = document.getElementById('Basic');
    basic.style.display = 'none';
    countdown();
    setTimeout(() => {
        wordId = 10;
    }, 5000);
}

function setupPlayerInputs() {
    num2 = parseInt(document.getElementById("numPlayers").value, 10);
    if (isNaN(num2) || num2 < 4) {
        alert("Please enter a valid number of players (at least 4).");
        return;
    }

    const container1 = document.getElementById("playerInputs");
    container1.innerHTML = ""; // clear previous inputs

    // create input fields
    for (let i = 0; i < num2; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.id = "player" + i;
        input.placeholder = "Enter name for player " + (i + 1);
        container1.appendChild(input);
        container1.appendChild(document.createElement("br"));
    }

    // show submit button
    document.getElementById("submitPlayers").style.display = "inline-block";
    document.getElementById("submitPlayers").addEventListener("click", () => {
        document.getElementById("submitPlayers").style.display = "none";
        document.getElementById("setPlayers").style.display = "none";
        document.getElementById("playerInputs").style.display = "none";
        document.getElementById("numPlayers").style.display = "none";
    })
}

food.addEventListener('click', () => {
    food.classList.remove('default-button');
    food.classList.add('highlighted-button');
    setTimeout(() => {
        food.classList.remove('highlighted-button');
        food.classList.add('default-button');
    }, 250);
})

easy.addEventListener('click', () => {
    easy.classList.remove('default-button');
    easy.classList.add('highlighted-button');
    setTimeout(() => {
        easy.classList.remove('highlighted-button');
        easy.classList.add('default-button');
    }, 250);
})

backBtn.addEventListener('click', () => {
    easy.classList.remove('default-button');
    easy.classList.add('highlighted-button');
    setTimeout(() => {
        easy.classList.remove('highlighted-button');
        easy.classList.add('default-button');
    }, 250);
})

medium.addEventListener('click', () => {
    medium.classList.remove('default-button');
    medium.classList.add('highlighted-button');
    setTimeout(() => {
        medium.classList.remove('highlighted-button');
        medium.classList.add('default-button');
    }, 250);
})

hard.addEventListener('click', () => {
    hard.classList.remove('default-button');
    hard.classList.add('highlighted-button');
    setTimeout(() => {
        hard.classList.remove('highlighted-button');
        hard.classList.add('default-button');
    }, 250);
})

nfl.addEventListener('click', () => {
    nfl.classList.remove('default-button');
    nfl.classList.add('highlighted-button');
    setTimeout(() => {
        nfl.classList.remove('highlighted-button');
        nfl.classList.add('default-button');
    }, 250);
})

nba.addEventListener('click', () => {
    nba.classList.remove('default-button');
    nba.classList.add('highlighted-button');
    setTimeout(() => {
        nba.classList.remove('highlighted-button');
        nba.classList.add('default-button');
    }, 250);
})

mma.addEventListener('click', () => {
    mma.classList.remove('default-button');
    mma.classList.add('highlighted-button');
    setTimeout(() => {
        mma.classList.remove('highlighted-button');
        mma.classList.add('default-button');
    }, 250);
})

mlb.addEventListener('click', () => {
    mlb.classList.remove('default-button');
    mlb.classList.add('highlighted-button');
    setTimeout(() => {
        mlb.classList.remove('highlighted-button');
        mlb.classList.add('default-button');
    }, 250);
})

basic.addEventListener('click', () => {
    basic.classList.remove('default-button');
    basic.classList.add('highlighted-button');
    setTimeout(() => {
        basic.classList.remove('highlighted-button');
        basic.classList.add('default-button');
    }, 250);
})

wordBtn.addEventListener('click', () => {
    wordBtn.classList.remove('default-button');
    wordBtn.classList.add('highlighted-button');
    setTimeout(() => {
        wordBtn.classList.remove('highlighted-button');
        wordBtn.classList.add('default-button');
    }, 250);
})

redBtn.addEventListener('click', () => {
    redBtn.classList.remove('default-button');
    redBtn.classList.add('highlighted-button');
    setTimeout(() => {
        redBtn.classList.remove('highlighted-button');
        redBtn.classList.add('default-button');
    }, 250);
})

blackBtn.addEventListener('click', () => {
    blackBtn.classList.remove('default-button');
    blackBtn.classList.add('highlighted-button');
    setTimeout(() => {
        blackBtn.classList.remove('highlighted-button');
        blackBtn.classList.add('default-button');
    }, 250);
})


setBtn.addEventListener('click', () => {
    setBtn.classList.remove('default-button');
    setBtn.classList.add('highlighted-button');
    setTimeout(() => {
        setBtn.classList.remove('highlighted-button');
        setBtn.classList.add('default-button');
    }, 250);
})

submitBtn.addEventListener('click', () => {
    submitBtn.classList.remove('default-button');
    submitBtn.classList.add('highlighted-button');
    setTimeout(() => {
        submitBtn.classList.remove('highlighted-button');
        submitBtn.classList.add('default-button');
    }, 250);
})

newWordBtn.addEventListener('click', () => {
    newWordBtn.classList.remove('default-button');
    newWordBtn.classList.add('highlighted-button');
    setTimeout(() => {
        newWordBtn.classList.remove('highlighted-button');
        newWordBtn.classList.add('default-button');
    }, 250);
})

/*const undoButton = document.getElementById('P1-1');
undoButton.addEventListener('click', () => {
    undoButton.classList.remove('default-button');
    undoButton.classList.add('highlighted-button');
    setTimeout(() => {
        undoButton.classList.remove('highlighted-button');
        undoButton.classList.add('default-button');
    }, 250);
    for (let i = 0; i < playerKeys.length; i++) {
        const key = playerKeys[i];
        const player = allPlayers[key];
        const currPlayer = allPlayers[playerKeys[i]];
        currPlayer.score--;  // add to **previous**
    }
})*/