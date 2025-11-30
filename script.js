import { PUZZLES } from "./assets.js";

const id = PUZZLES["p1"];
const url = `https://lh3.googleusercontent.com/d/${id}=w1000`;

document.getElementById("test").src = url;
