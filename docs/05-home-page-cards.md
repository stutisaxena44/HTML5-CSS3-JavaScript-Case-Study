# Home Page Cards (Lines 266-332)

## What Does This Do?

The home page (index.html) shows a "Featured Services" section with **one worker per category** — the best-rated one. Instead of showing all 24 workers, it picks the top worker from each of the 6 categories.

## The `renderHomeCards` Function

This function builds the cards and puts them on the page. Let's go through it step by step.

### Step 1: Find the HTML container

```js
const grid = document.getElementById("homeCardsGrid");
if (!grid) return;
```

- Finds the `<div>` on the page where cards should go
- If it doesn't exist (we're not on the home page), **stop here**. The `return` keyword exits the function immediately

### Step 2: Define the categories

```js
var cats = ["electrician","plumber","cleaner","tutor","delivery","painter"];
```

A simple list of all 6 job categories. We'll loop through this to find the best worker in each one.

> **`var` vs `let` vs `const`:** All three create variables. `var` is the old way (works everywhere in the function), `let` is the modern way (only works inside the current block `{}`), and `const` is for values that never change. This code uses `var` in some places because it was written in an older style.

### Step 3: Find the best worker per category

```js
cats.forEach(function(cat) {
  if (filterCat && filterCat !== "" && cat !== filterCat) return;

  var best = null;
  WORKERS.forEach(function(w) {
    if (w.cat !== cat) return;
    if (!best || parseFloat(w.rating) > parseFloat(best.rating)) best = w;
  });
  if (best) shown.push(best);
});
```

Let's read this like English:

1. **`cats.forEach(function(cat) { ... })`** — "For each category in the list..."

2. **`if (filterCat && filterCat !== "" && cat !== filterCat) return;`** — "If the user filtered by a specific category, and this isn't that category, skip it."
   - `&&` means "AND" — ALL conditions must be true
   - `return` inside `forEach` means "skip to the next item" (NOT "exit the whole function")

3. **`var best = null;`** — Start with no best worker picked yet. `null` means "nothing" or "empty"

4. **`WORKERS.forEach(function(w) { ... })`** — "Go through every single worker..."
   - `w` is a temporary variable that holds the current worker during each loop

5. **`if (w.cat !== cat) return;`** — "If this worker isn't in the current category, skip them."
   - `!==` means "is NOT equal to"

6. **`if (!best || parseFloat(w.rating) > parseFloat(best.rating)) best = w;`** — This is the clever part:
   - `!best` — "If we haven't picked anyone yet..." (first time through)
   - `||` — "OR..."
   - `parseFloat(w.rating) > parseFloat(best.rating)` — "If this worker's rating is higher than our current best"
   - `parseFloat()` converts text like `"4.9"` into a real number `4.9` so we can compare them with `>`
   - `best = w` — "Make this worker our new best pick"

7. **`if (best) shown.push(best);`** — After checking all workers, if we found a best one, add them to the `shown` list
   - `.push()` adds an item to the end of an array

### Step 4: Handle "no results"

```js
if (shown.length === 0) {
  grid.innerHTML = '<p>No workers found for this category.</p>';
  return;
}
```

- `.length` tells you how many items are in an array
- If no workers matched the filter, show a message instead of empty space

### Step 5: Build the card HTML

```js
shown.forEach(function(w, i) {
  var address = w.addresses[selectedCity] || w.addresses["Bangalore"];
  var card = document.createElement("article");
  card.className = "card";
  card.innerHTML = '...(HTML here)...';
  grid.appendChild(card);
});
```

- **`w.addresses[selectedCity]`** — Gets the worker's address for the user's chosen city. If the variable `selectedCity` is `"Mumbai"`, this becomes `w.addresses["Mumbai"]`
- **`|| w.addresses["Bangalore"]`** — If the address for the selected city doesn't exist, use Bangalore as a fallback
- **`document.createElement("article")`** — Creates a new `<article>` HTML element
- **`card.innerHTML = '...'`** — Fills the card with HTML content (the layout, text, buttons, etc.)
- **`grid.appendChild(card)`** — Places the card inside the grid container on the page

### Step 6: The "Book" button link

```js
'booking.html?worker=' + encodeURIComponent(w.name) + '&service=' + w.cat + '&rate=' + w.rate
```

This builds a URL like: `booking.html?worker=Ramesh%20Kumar&service=electrician&rate=750`

The stuff after `?` is called **query parameters** — extra information attached to a URL:
- `worker=Ramesh%20Kumar` — which worker to book
- `service=electrician` — what type of service
- `rate=750` — the worker's hourly rate

**`encodeURIComponent()`** converts special characters so they work in URLs. For example, a space becomes `%20` because URLs can't have spaces.

When the booking page loads, it reads these parameters and pre-fills the form automatically.

## The `setupHomeSearch` Function

```js
function setupHomeSearch() {
  var sel = document.getElementById("searchCategory");
  if (!sel) return;
  renderHomeCards("");
  sel.addEventListener("change", function() {
    renderHomeCards(sel.value);
  });
}
```

- Finds the category dropdown (`<select>` element)
- Calls `renderHomeCards("")` with an empty string to show all 6 categories initially
- Adds a `"change"` event listener — every time the user picks a different category from the dropdown, it re-renders the cards with only that category
- **`sel.value`** — Gets the currently selected option's value (e.g., `"plumber"` or `""` for "All")

This creates a **live filter** — results update instantly when you change the dropdown, no page reload needed.
