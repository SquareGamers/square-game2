// Add this helper function to your app.js to create a deep copy
// (This is necessary because you can't just set allRoles = testAllRoles)
function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// Ensure the actual global variables are accessible here.
// Assuming your global game variables are named allRoles and allPlayers
// as defined elsewhere in app.js.

/**
 * Asserts that two values are strictly equal and logs the result.
 * @param {any} actual - The value produced by the code being tested.
 * @param {any} expected - The value that was expected.
 * @param {string} testName - A description of the test.
 */
function assertEqual(actual, expected, testName) {
    if (actual === expected) {
        console.log(`✅ ${testName} Passed!`);
    } else {
        console.error(`❌ ${testName} Failed. Expected: ${expected}, but got: ${actual}`);
        console.error("  Details:", actual, expected);
    }
}


function testChangeRoles() {
    console.log("\n--- Starting Change Roles Unit Tests ---");

    // 1. DEFINE A CLEAN STARTING STATE FOR THE TEST
    const TEST_START_ROLES = {"BLACK EXPLAINER": 4, "RED EXPLAINER": 5, "RED GUESSER": 6, "BLACK GUESSER": 7};
    const TEST_START_PLAYERS = {
        playerone: {name: "P1", score: 0, id: "BLACK EXPLAINER"},
        playertwo: {name: "P2", score: 0, id: "RED EXPLAINER"},
        playerthree: {name: "P3", score: 0, id: "RED GUESSER"},
        playerfour: {name: "P4", score: 0, id: "BLACK GUESSER"}
    };

    // 2. RESET THE GLOBAL STATE TO THE TEST'S STARTING STATE
    // This is the critical step for isolation:
    Object.assign(allRoles, deepCopy(TEST_START_ROLES));
    Object.assign(allPlayers, deepCopy(TEST_START_PLAYERS));

    // 3. RUN THE FUNCTION UNDER TEST
    // changeRoles() now operates on the known state we just set.
    changeRoles(); 

    // 4. DEFINE THE EXPECTED RESULT AFTER ONE ROTATION (Your calculated values are correct):
    const expectedP1Role = "BLACK GUESSER";   
    const expectedP2Role = "BLACK EXPLAINER";     
    const expectedP3Role = "RED EXPLAINER";  
    const expectedP4Role = "RED GUESSER";

    // 5. ASSERT AND CHECK THE GLOBAL STATE
    assertEqual(allPlayers.playerone.id, expectedP1Role, "Role Test 1: Player One's new role");
    assertEqual(allPlayers.playertwo.id, expectedP2Role, "Role Test 2: Player Two's new role");
    assertEqual(allPlayers.playerthree.id, expectedP3Role, "Role Test 3: Player Three's new role");
    assertEqual(allPlayers.playerfour.id, expectedP4Role, "Role Test 4: Player Four's new role (Loop Back)");
    
    console.log("--- Change Roles Unit Tests Complete ---\n");
}

testChangeRoles();