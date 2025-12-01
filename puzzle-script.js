import { PUZZLES, CURRENT_DATE } from "/config/config.js";

function ShowPuzzle(day) {
    const puzzleId = PUZZLES[day];

    if (puzzleId != "") {
        const url = `https://lh3.googleusercontent.com/d/${puzzleId}=w1000`;
        document.getElementById("puzzle-image").src = url;
        return true;
    } else {
        return false;
    }
}

// Get search parameters:
const paramsString = window.location.search;
const searchParams = new URLSearchParams(paramsString);
const day = searchParams.get("day");

// Display date:
const date = day.padStart(2, '0') + ".12.2025";
document.title = "Kuusikalenteri - " + date;
document.getElementById("date-title").innerText = date;

// Check if the puzzle is unlocked:
const puzzleDate = new Date(2025, 11, day);
if (puzzleDate <= CURRENT_DATE) {
    // Display puzzle content:
    if (!ShowPuzzle(day)) {
        document.getElementById("note").innerText = "Voihan Tonttu! Joku on tainnut unohtaa täyttää tämän luukun.\n\nPalaa myöhemmin tarkistamaan uudestaan."
    }
} else {
    const datediff = Math.ceil((puzzleDate - CURRENT_DATE) / (1000 * 60 * 60 * 24));
    document.getElementById("note").innerText = "Ei saa urkkia, luukkuihin kurkkia, ennen oikea päivää.\n\nTämän luukun voi avata " + datediff + " päivän päästä."
}


