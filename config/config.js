
// PARAMETERS:
const PRODUCTION_HOST = "mraurela.github.io";
const PRODUCTION_PATH = "/Kuusikalenteri";


// PARAMETERS - TEST ONLY:
const DEBUG_DATE = new Date(2025,11,6);
const DEBUG_AS_PROD = false;


// EXPORTED VALUES:

// Check whether we are running the published GitHub pages version:
export const IS_PROD =
    DEBUG_AS_PROD ||
    (location.hostname === PRODUCTION_HOST &&
    location.pathname.startsWith(PRODUCTION_PATH));

// Current Date (or debug date if not on production):
export const CURRENT_DATE = IS_PROD ? new Date() : DEBUG_DATE;

// Puzzles (production or testing):
import {PUZZLES as PROD_PUZZLES} from "./assets.prod.js";
import {PUZZLES as DEV_PUZZLES} from "./assets.dev.js";
export const PUZZLES = IS_PROD ? PROD_PUZZLES : DEV_PUZZLES;