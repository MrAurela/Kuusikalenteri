import { PUZZLES } from "./assets.js";



for (let i=1; i<=24; i++) {
    let buttonId = "button" + i.toString();
    document.getElementById(buttonId).onclick = function() { ShowPuzzle(i.toString()); }
}

function ShowPuzzle(id) {
    const puzzleId = PUZZLES["p"+id.toString()];
    const url = `https://lh3.googleusercontent.com/d/${puzzleId}=w1000`;

    document.getElementById("test").src = url;
}
