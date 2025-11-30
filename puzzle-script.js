import { PUZZLES } from "./assets.js";

function ShowPuzzle(id) {
    const puzzleId = PUZZLES["p"+id.toString()];
    const url = `https://lh3.googleusercontent.com/d/${puzzleId}=w1000`;

    document.getElementById("puzzle-image").src = url;
}

// Get search parameters:
const paramsString = window.location.search;
const searchParams = new URLSearchParams(paramsString);
const day = searchParams.get("day");

// Display date:
const date = day.padStart(2, '0') + ".12.2025";
document.title = "Kuusikalenteri - " + date;
document.getElementById("date-title").innerText = date;

// Display puzzle content:
ShowPuzzle(day);