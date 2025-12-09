
function OpenPuzzle(id) {
    window.location.href = "./puzzle.html?day="+id;
}

function BoxOnClick(id) {
    if (id === state.substring(1)) {
        OpenPuzzle(id);
    } else {
        SetStateById(id);
    }
}

function SetStateByString(strState) {
    state = strState;
    const calendar = document.getElementById("calendar");
    const src = `./images/${state}.webp`;

    if (imageCache[src] && imageCache[src].complete) {
        // Switch instantly if alreaydy in cache:
        calendar.style.backgroundImage = `url(${src})`;
    } else {
        // Otherwise load image into cache before displaying it:
        const img = imageCache[src] || new Image();
        imageCache[src] = img;
        img.src = src;

        // Only switch to new image after it has loaded (and if still correct state)
        img.onload = () => {
            if (state === strState) calendar.style.backgroundImage = `url(${src})`;
        };
    }

   
}

function SetStateById(id, note=true) {
    if (id >= 1 && id <= 24) {
        // Build the image name:
        // - letter n (=with Note) / e (=empty)
        // - number 1-24 matching the box
        var strState = (note ? "n" : "e") + id.toString();
        SetStateByString(strState);
    } else {
        // Default state image:
       SetStateByString("kuusikalenteri");
    }
}

// Set how the boxes are displayed:
var state = "";
const imageCache = {};
SetStateById(0);

// Set onClick handling to each box
for (let i=1; i<=24; i++) {
    let buttonId = "button" + i.toString();
    document.getElementById(buttonId).onclick = function() { BoxOnClick(i.toString()); }
}

