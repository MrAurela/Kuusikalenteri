import { PUZZLES, CURRENT_DATE } from "./config/config.js";

function ShowPuzzle(day) {
    const puzzleId = PUZZLES[day];

    if (puzzleId != "") {
        const url = `https://lh3.googleusercontent.com/d/${puzzleId}=w1000?cachebust=${Date.now()}}`;
        document.getElementById("puzzle-image").src = url;
        return true;
    } else {
        return false;
    }
}

function OpenPuzzle(id) {
    window.location.href = "./puzzle.html?day="+id;
}

function previousPuzzle() {
    if (Number(day)-1 > 0) {
        OpenPuzzle(Number(day)-1);
    } else {
        returnFrontPage();
    }
}

function nextPuzzle() {
    if (Number(day)+1 <=24) {
        OpenPuzzle(Number(day)+1);
    } else {
        returnFrontPage();
    }
}

function returnFrontPage() {
    window.location.href = "./index.html";
}

function setSolved() {
    alert("Painamalla tästä voit tulevaisuudessa merkitä pulman ratkaistuksi.");
}

document.getElementById("previous").onclick = function() {previousPuzzle();}
document.getElementById("next").onclick = function() {nextPuzzle();}
document.getElementById("home").onclick = function() {returnFrontPage();}
document.getElementById("solved").onclick = function() {setSolved();}

// Get search parameters:
const paramsString = window.location.search;
const searchParams = new URLSearchParams(paramsString);
const day = searchParams.get("day");

// Display date:
const date = day.padStart(2, '0') + ".12.2025";
document.title = "Kuusikalenteri - " + date;
document.getElementById("date-title").innerText = date;

// Check if the puzzle is unlocked:
const puzzleDate = new Date(2025, 11, day, 6, 0, 0);
if (puzzleDate <= CURRENT_DATE) {
    document.getElementById("puzzle-image").classList.remove("invisible");
    // Display puzzle content:s
    if (!ShowPuzzle(day)) {
        document.getElementById("note").innerText = "Voihan Tonttu! Joku on tainnut unohtaa täyttää tämän luukun.\n\nPalaa myöhemmin tarkistamaan uudestaan."
        document.getElementById("puzzle-image").classList.add("invisible");
    }
} else {
    const timediff = puzzleDate - CURRENT_DATE;
    const hoursdiff = timediff / (1000 * 60 * 60);
    const datediff = Math.ceil(hoursdiff / 24);
    
    let message;
    if (hoursdiff < 6) {
        message = "Ei saa urkkia, luukkuihin kurkkia, ennen oikea päivää.\n\nTämän luukun voi avata aamulla.";
    } else if (hoursdiff < 18) {
        message = "Ei saa urkkia, luukkuihin kurkkia, ennen oikea päivää.\n\nTämän luukun voi avata huomisaamuna.";
    } else {
        message = "Ei saa urkkia, luukkuihin kurkkia, ennen oikea päivää.\n\nTämän luukun voi avata " + datediff + " aamun päästä.";
    }
    
    document.getElementById("note").innerText = message;
    document.getElementById("puzzle-image").classList.add("invisible");
}


