# Location Modal - "Which city are you in?" (Lines 112-261)

## What is a Modal?

A **modal** is a popup box that appears on top of the page. It usually darkens the background and forces you to interact with it before you can do anything else. Think of it like a pop-up window that says "answer this first!"

The location modal asks users to pick their city so that worker addresses shown on the site match where the user actually lives.

## How it Works (Step by Step)

### Step 1: Finding Elements on the Page

```js
const overlay = document.getElementById("locationModal");
if (!overlay) return;
```

**Line 1:** `document.getElementById("locationModal")` — This searches the entire HTML page for an element with `id="locationModal"`. The `document` is the entire web page, and `getElementById` is like saying "find me the thing called locationModal."

**Line 2:** `if (!overlay) return;`
- `!overlay` means "if overlay is empty/null" (the `!` flips true to false and vice versa)
- `return` means "stop running this function immediately"
- Together: "If there's no location modal on this page, stop here. Don't crash."

This is important because `script.js` runs on ALL pages, but the location modal HTML only exists on some pages.

### Step 2: Creating City Buttons

```js
const cities = ["Delhi","Mumbai","Bangalore","Hyderabad","Chennai","Pune","Kolkata","Ahmedabad"];
```

This is an array (list) of the 8 cities SkillHire operates in.

```js
cities.forEach(function(city) {
  const btn = document.createElement("button");
  btn.className = "loc-city-btn";
  btn.textContent = city;
  btn.dataset.city = city;
  grid.appendChild(btn);
});
```

Let's break down each line:

- **`cities.forEach(function(city) { ... })`** — `.forEach()` loops through every item in the list. For each city, it runs the code inside `{ ... }`. The variable `city` takes the value of each item in turn — first `"Delhi"`, then `"Mumbai"`, then `"Bangalore"`, etc.

- **`document.createElement("button")`** — Creates a brand new HTML `<button>` element in memory (it's not visible on the page yet)

- **`btn.className = "loc-city-btn"`** — Gives the button a CSS class for styling. This is how we make it look pretty — the CSS file has rules for `.loc-city-btn` that define the button's color, size, border, etc.

- **`btn.textContent = city`** — Sets the text shown on the button. If `city` is `"Mumbai"`, the button will say "Mumbai"

- **`btn.dataset.city = city`** — Stores the city name as invisible data on the button. This is useful later when we need to know WHICH button was clicked

- **`grid.appendChild(btn)`** — Actually puts the button on the page. `appendChild` means "add this as a child element inside the grid container". Think of it as placing a sticky note on a board.

### Step 3: Making Buttons Clickable

```js
btn.addEventListener("click", function() {
  document.querySelectorAll(".loc-city-btn").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
  selectedCity = city;
});
```

**`addEventListener("click", function() { ... })`** — This says: "When someone clicks this button, run this code." The `"click"` is the **event** we're listening for. Other events include `"mouseover"` (hover), `"keydown"` (keyboard press), etc.

Inside the click handler:

1. **`document.querySelectorAll(".loc-city-btn")`** — Finds ALL elements with the class `loc-city-btn` (all 8 city buttons)
2. **`.forEach(b => b.classList.remove("selected"))`** — Loops through each button and removes the `"selected"` class (un-highlights all buttons)
   - The `b => ...` is a **shorthand function** (called an "arrow function"). It's the same as writing `function(b) { ... }` but shorter
   - `classList` is the list of CSS classes on an element. `.remove("selected")` takes the "selected" class off
3. **`btn.classList.add("selected")`** — Adds the `"selected"` class to the clicked button (highlights it)
4. **`selectedCity = city`** — Updates the global variable so the rest of the code knows which city was picked

### Step 4: Pincode Auto-Detection

There's a text input where users can type their 6-digit pincode instead of clicking a city button.

```js
pincodeInput.addEventListener("input", function() {
  const val = pincodeInput.value.trim();
  if (val.length === 6 && /^\d{6}$/.test(val)) {
    detectCityFromPincode(val, statusMsg);
  }
});
```

- **`"input"` event** — Fires every time the user types a character (unlike `"change"` which only fires when you leave the field)
- **`.value`** — Gets the text the user typed
- **`.trim()`** — Removes any spaces from the beginning and end
- **`val.length === 6`** — Checks if exactly 6 characters were typed
- **`/^\d{6}$/`** — This is a **regular expression** (regex), a pattern-matching tool:
  - `^` = "start of text"
  - `\d` = "any digit (0-9)"
  - `{6}` = "exactly 6 times"
  - `$` = "end of text"
  - Together: "the text must be exactly 6 digits, nothing else"
- **`.test(val)`** — Checks if `val` matches the pattern. Returns `true` or `false`

#### How pincode detection works

The `detectCityFromPincode()` function tries two methods:

**Method 1: India Post API (online lookup)**

```js
fetch("https://api.postalpincode.in/pincode/" + pincode)
  .then(function(r) { return r.json(); })
  .then(function(data) { ... });
```

- **`fetch()`** — Makes a request to a website/API over the internet (like opening a URL in a browser, but from code)
- **`.then()`** — "When the response comes back, do this next." API calls take time (the server needs to respond), so `.then()` waits for it
- **`r.json()`** — Converts the API's response from raw text into a JavaScript object we can work with

The API returns information about the pincode (district, state, city), and the code tries to match that to one of the 8 supported cities.

**Method 2: Local Fallback (offline backup)**

If the API fails (maybe no internet), there's a backup:

```js
const PINCODE_MAP = {
  "11": "Delhi",
  "40": "Mumbai",
  "56": "Bangalore",
  // ...
};
```

This matches the **first 2 digits** of a pincode to a city. For example, any pincode starting with "40" (like 400001, 400050) is in Mumbai. It's not perfect — not all pincodes starting with "40" are Mumbai — but it's a reasonable guess.

### Step 5: When to Show the Popup

```js
const saved = loadCity();
const shownThisSession = sessionStorage.getItem("sh_modal_shown");

if (saved || shownThisSession) {
  // City already chosen — apply it silently, no popup
} else {
  // First time — show the popup
  overlay.classList.add("open");
}
```

- **`loadCity()`** — Checks if a city was saved earlier in this session
- **`sessionStorage.getItem("sh_modal_shown")`** — Checks if we already showed the popup
- **`||`** — means "or". So: "If EITHER a city is saved OR the modal was already shown..."
- If yes: don't show the popup again, just use the saved city
- If no: it's the user's first visit, so show the popup

### Step 6: The Location Pill

```js
const pill = document.getElementById("navLocationPill");
pill.addEventListener("click", function() {
  overlay.classList.add("open");
});
```

The "pill" is the small `📍 Bangalore` button in the navigation bar. Clicking it reopens the location modal so the user can change their city anytime.

### Step 7: The `applyCity()` Function

When a city is confirmed, this function updates everything:

```js
function applyCity(city) {
  selectedCity = city;           // Update the global variable
  saveCity(city);                // Save to storage so it persists
  // Update the navbar pill text
  // Update the filter tag on services page
  // Re-render all worker cards with new city addresses
  renderWorkerCards();
  renderServiceCards();
}
```

This is the heart of the city feature — changing the city causes a chain reaction that updates every address displayed on the site.
