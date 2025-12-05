# Kuusikalenteri - AI Coding Agent Instructions

## Project Overview
Kuusikalenteri (Finnish advent calendar) is a web-based countdown calendar for December. The project consists of a calendar view with 24 clickable day buttons and individual puzzle pages that unlock progressively based on the current date.

**Key Constraint:** Puzzles are time-gated and unlock only on their corresponding December date. This is enforced in `puzzle-script.js` by comparing `CURRENT_DATE` against the puzzle date.

## Architecture

### Core Structure
- **`index.html` + `script.js` + `styles.css`**: Main calendar landing page
  - Grid of 24 buttons positioned absolutely over a calendar image (`images/kuusikalenteri.JPG`)
  - Button positions are meticulously calibrated with CSS percentages (see `#button1` through `#button24` in `styles.css`)
  - Clicking a button navigates to `puzzle.html?day=N` via `OpenPuzzle(id)` function
  
- **`puzzle.html` + `puzzle-script.js`**: Individual puzzle detail pages
  - Receives day number via URL parameter: `?day=1` through `?day=24`
  - Fetches puzzle content from Google Drive via stored file IDs in the `PUZZLES` object
  - Implements date-gating logic: shows "locked until X days" message if puzzle hasn't unlocked yet

- **`config/config.js`**: Global configuration module
  - `IS_PROD`: Boolean flag determining if running on GitHub Pages (`mraurela.github.io/Kuusikalenteri`)
  - `CURRENT_DATE`: The effective "today" (uses `DEBUG_DATE` in dev, actual date in prod)
  - `PUZZLES`: Object imported from either `assets.prod.js` or `assets.dev.js` based on environment
  - **Critical for testing:** Set `DEBUG_DATE` and `DEBUG_AS_PROD` to test time-gating behavior

- **`config/assets.prod.js` & `config/assets.dev.js`**: Asset configuration files
  - Export `PUZZLES` object with day numbers (1-24) as keys and Google Drive file IDs as values
  - Dev version can have different file IDs for testing
  - Format: `{ 1: "GoogleDriveFileID", 2: "AnotherID", ... }`

## Data Flow
1. User clicks day button on calendar → `OpenPuzzle(day)` redirects to `puzzle.html?day=N`
2. `puzzle-script.js` parses URL parameter, extracts day number
3. Checks if `puzzleDate (Dec N) <= CURRENT_DATE`: 
   - **Unlocked**: Fetches image from Google Drive using `PUZZLES[day]` file ID
   - **Locked**: Displays countdown message with days remaining
4. Image renders in `<img id="puzzle-image">` with Google Drive URL

## Key Implementation Patterns

### Date-Gating Logic
```javascript
const puzzleDate = new Date(2025, 11, day);
if (puzzleDate <= CURRENT_DATE) {
    // Puzzle unlocked - show content
} else {
    // Puzzle locked - show countdown
    const datediff = Math.ceil((puzzleDate - CURRENT_DATE) / (1000 * 60 * 60 * 24));
}
```

### Module Imports
All JavaScript files use ES6 modules (`type="module"` in HTML). Config imports:
```javascript
import { PUZZLES, CURRENT_DATE, IS_PROD } from "./config/config.js";
```

### Button Positioning on Image
CSS uses percentages for responsive positioning:
```css
#button1 { top: 74.8%; left: 22.8%; }
```
Buttons are invisible (`font-size: 0`, transparent background) to preserve image visibility.

## Testing & Debugging

### Debug Mode Setup (in `config.js`)
- Modify `DEBUG_DATE` to test specific calendar dates: `new Date(2025, 11, 7)` = Dec 7
- Set `DEBUG_AS_PROD = true` to test production behavior locally
- Leave `DEBUG_AS_PROD = false` in production builds

### Common Testing Scenarios
- **Test locked puzzle**: Set `DEBUG_DATE` before the target day
- **Test unlocked puzzle**: Set `DEBUG_DATE` to or after the target day
- **Test Google Drive image loading**: Verify file IDs in `assets.prod.js` are valid and shared publicly

## Important Development Notes

### No Build System
This is a vanilla HTML/CSS/JavaScript project with no build step, bundler, or package manager. Files are served as-is from GitHub Pages.

### Google Drive Image Hosting
Puzzles are hosted as Google Drive files. URLs are constructed as:
```
https://lh3.googleusercontent.com/d/{GOOGLE_DRIVE_FILE_ID}=w1000?cachebust={timestamp}
```
Cache-busting timestamp prevents stale images.

### File ID Management
- File IDs stored in `assets.prod.js` (production) and `assets.dev.js` (development)
- Empty string `""` in `PUZZLES` object indicates missing puzzle (triggers "Voihan Tonttu!" error message)
- When updating puzzle images, replace file ID in `PUZZLES` object and ensure Google Drive sharing is public

### Responsive Design Considerations
- Calendar uses `aspect-ratio: 1` for square layout (changed from original 1.5 ratio)
- Button positioning is percentage-based for responsiveness
- Image covers the entire container with `background-size: cover`

## File Reference Guide
- **UI/Styling**: `styles.css` (all visual presentation)
- **Configuration**: `config/config.js` (environment detection and date handling)
- **Assets**: `config/assets.prod.js`, `config/assets.dev.js` (puzzle file IDs)
- **Calendar Entry**: `index.html`, `script.js` (navigation and button setup)
- **Puzzle Display**: `puzzle.html`, `puzzle-script.js` (detail page and gating logic)
