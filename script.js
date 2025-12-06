
function OpenPuzzle(id) {
    window.location.href = "./puzzle.html?day="+id;
}

for (let i=1; i<=24; i++) {
    let buttonId = "button" + i.toString();
    document.getElementById(buttonId).onclick = function() { OpenPuzzle(i.toString()); }
}
