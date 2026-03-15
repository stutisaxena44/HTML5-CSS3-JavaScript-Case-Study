# Worker & Service Cards (Lines 335-407)

## Two Card Renderers

There are two similar functions that render cards on different pages. They work almost identically, with small differences.

## `renderWorkerCards()` — for the Workers Page

This function creates a card for **every worker** (optionally filtered by category) and displays them on the Workers page.

### The full flow

```js
function renderWorkerCards() {
  const grid = document.getElementById("workerGrid");
  if (!grid) return;
```

- Find the container element where cards will go
- If it doesn't exist (we're not on the Workers page), stop immediately

```js
  const catVal = (document.getElementById("workerFilter")||{}).value || "all";
```

This line is dense! Let's unpack it:
1. `document.getElementById("workerFilter")` — Find the category filter dropdown
2. `|| {}` — If the dropdown doesn't exist, use an empty object `{}` instead (prevents a crash)
3. `.value` — Get the selected value (e.g., `"plumber"` or `"all"`)
4. `|| "all"` — If value is empty/undefined, default to `"all"`

The `||` (OR) operator is used here as a safety net — if any step fails, it falls back to a safe default.

```js
  grid.innerHTML = "";
```

**Clear the grid completely.** `innerHTML` is the HTML content inside an element. Setting it to `""` (empty string) removes all existing cards. This is important because every time we re-render, we want to start fresh (otherwise old cards would pile up).

### Building each card

```js
  WORKERS.forEach(function(w, i) {
    if (catVal !== "all" && w.cat !== catVal) return;
```

- **`WORKERS.forEach(function(w, i) { ... })`** — Loop through all 24 workers. `w` is the current worker, `i` is the index (position number: 0, 1, 2, ...)
- **`if (catVal !== "all" && w.cat !== catVal) return;`** — The filter logic:
  - "If a specific category is selected (`!== "all"`) AND this worker's category doesn't match it, skip this worker"
  - `return` inside `forEach` skips to the next iteration (next worker)

```js
    const address = w.addresses[selectedCity] || w.addresses["Bangalore"];
```

Get the worker's address for the selected city. If that city's address doesn't exist, use Bangalore as a fallback.

```js
    const card = document.createElement("article");
    card.className = "worker-card fade";
    card.style.animationDelay = (i * 0.05) + "s";
```

- Create a new `<article>` element
- Give it CSS classes: `worker-card` (for styling) and `fade` (for the entrance animation)
- **Animation delay:** Each card gets a slightly longer delay:
  - Card 0: 0 seconds
  - Card 1: 0.05 seconds
  - Card 2: 0.10 seconds
  - Card 3: 0.15 seconds
  - ...and so on

  This creates a beautiful "cascade" or "waterfall" effect where cards appear one after another instead of all at once.

### Dynamic star ratings

```js
${"⭐".repeat(Math.round(parseFloat(w.rating)))}
```

This generates the right number of star emojis based on the worker's rating:
1. `parseFloat(w.rating)` — Convert `"4.9"` (text) to `4.9` (number)
2. `Math.round(4.9)` — Round to nearest whole number → `5`
3. `"⭐".repeat(5)` — Repeat the star emoji 5 times → `"⭐⭐⭐⭐⭐"`

So a worker rated 4.2 gets 4 stars, and a worker rated 4.7 gets 5 stars.

### Template literals (the backtick strings)

```js
card.innerHTML = `
  <div class="worker-body">
    <div class="worker-name">${w.name}</div>
    <div class="rate">₹${w.rate} <small>/hr</small></div>
  </div>`;
```

The backtick characters `` ` `` (not regular quotes) create a **template literal** — a special string where you can:
1. Write across multiple lines (regular strings can't do this)
2. Insert variables using `${...}` — whatever is inside the curly braces gets replaced with its value

So `${w.name}` becomes `"Ramesh Kumar"` and `${w.rate}` becomes `750`.

### Making cards clickable

```js
card.addEventListener("click", function() { openWorkerModal(w, address); });
grid.appendChild(card);
```

- When someone clicks the card, open the detailed popup modal for that worker
- Place the card on the page inside the grid

---

## `renderServiceCards()` — for the Services Page

Almost identical to `renderWorkerCards()`, but with one extra feature: **distance filtering**.

### Fake distances

```js
var DISTS = [3,7,8,4,4,12,6,9,10,3,7,15,5,8,6,11,4,9,13,6,7,5,10,8];
```

This is an array of 24 numbers (one per worker) representing fake distances in kilometers. They're **hardcoded** — not real GPS distances. Worker #1 is "3km away", Worker #2 is "7km away", etc.

These distances don't change when you switch cities (a worker shown as "3km away" in Bangalore is also "3km away" in Delhi). This is just for demo purposes.

### Distance filter

```js
if (kmVal !== "all" && dist > parseInt(kmVal)) return;
```

- `kmVal` comes from the radius dropdown (e.g., `"5"`, `"10"`, `"20"`, or `"all"`)
- `parseInt(kmVal)` converts the string `"5"` to the number `5`
- If the worker's distance exceeds the selected radius, skip them

So if you select "Within 5 km", only workers with distances 1-5 km are shown.

### "Book" button instead of "View Profile"

Unlike worker cards (which open a popup when clicked), service cards have a direct "Book" button that links to the booking page with the worker's name, service, and rate pre-filled in the URL.
