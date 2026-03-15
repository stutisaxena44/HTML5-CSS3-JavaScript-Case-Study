# Worker Popup Modal (Lines 412-448)

## What is This?

When you click on a worker card on the Workers page, a big popup appears covering the screen with all that worker's details — rating, experience, location, reviews, and a "Book" button. This popup is called a **modal**.

The modal already exists in the HTML (hidden). JavaScript doesn't create it from scratch — it just fills in the details and shows/hides it.

## The `openWorkerModal` Function

This function takes two inputs:
- `w` — the worker object (with all their data)
- `address` — the worker's address in the selected city

### Setting the background color

```js
const bg = ILLUS_BG[w.cat] || "#f5f0e8";
const illustEl = document.getElementById("modalIllus");
illustEl.style.background = bg;
```

- `ILLUS_BG[w.cat]` — Look up the background color for this worker's category. If `w.cat` is `"plumber"`, this gives `"#e3f2fd"` (light blue)
- `|| "#f5f0e8"` — If the category isn't in the list, use a default beige color
- `illustEl.style.background = bg` — Set the element's background color directly. `element.style.propertyName` lets you change any CSS property from JavaScript

### Filling in the worker's details

```js
document.getElementById("modalName").textContent     = w.name;
document.getElementById("modalCat").textContent      = w.cat.charAt(0).toUpperCase() + w.cat.slice(1);
document.getElementById("modalRating").textContent   = "⭐ " + w.rating + " (" + w.reviews + " reviews)";
document.getElementById("modalExp").textContent      = w.exp;
document.getElementById("modalLocation").textContent = address;
document.getElementById("modalRate").innerHTML       = "₹" + w.rate + " <small>/hr</small>";
```

Each line:
1. **Finds** an element on the page by its `id`
2. **Sets** its text content to the worker's data

**`textContent` vs `innerHTML`:**
- `textContent` — Sets plain text. If you write `"<b>Hello</b>"`, it shows literally as `<b>Hello</b>` on the page
- `innerHTML` — Sets HTML. If you write `"<b>Hello</b>"`, it shows as **Hello** (bold text)

The rate line uses `innerHTML` because it includes `<small>` tags to make "/hr" appear in a smaller font.

### What's `charAt(0).toUpperCase() + slice(1)`?

This is a trick to capitalize the first letter of a string:

```
Input:  "electrician"

Step 1: .charAt(0)       → "e"       (get the first character)
Step 2: .toUpperCase()   → "E"       (make it uppercase)
Step 3: .slice(1)        → "lectrician" (get everything AFTER position 1)
Step 4: Combine them     → "E" + "lectrician" = "Electrician"
```

JavaScript doesn't have a built-in "capitalize" function, so this manual approach is commonly used.

### Setting the availability status

```js
const statusEl = document.getElementById("modalStatus");
statusEl.textContent = w.status;
statusEl.className = "tag " + (w.status === "Available" ? "tag-available" : "tag-busy");
```

The last line uses a **ternary operator** — a shorthand `if/else`:

```js
condition ? valueIfTrue : valueIfFalse
```

So `w.status === "Available" ? "tag-available" : "tag-busy"` means:
- If status is "Available" → use class `"tag-available"` (green badge)
- Otherwise → use class `"tag-busy"` (red badge)

### Showing customer reviews

```js
const rc = document.getElementById("modalReviews");
rc.innerHTML = "";
w.quotes.forEach(function(q) {
  const d = document.createElement("div");
  d.className = "modal-review";
  d.textContent = '"' + q + '"';
  rc.appendChild(d);
});
```

1. **`rc.innerHTML = ""`** — Clear any previous reviews (from the last worker we viewed)
2. **`w.quotes.forEach(...)`** — Loop through this worker's customer quotes
3. For each quote:
   - Create a new `<div>` element
   - Give it the `modal-review` CSS class (for styling — italic text, cream background, left border)
   - Set its text to the quote wrapped in quotation marks
   - Add it to the reviews container

It's like sticking sticky notes on a board — one per review.

### Setting the rate in the bottom bar

```js
var rateBottomEl = document.getElementById("modalRateBottom");
if (rateBottomEl) rateBottomEl.textContent = "₹" + w.rate;
```

The modal has a bottom bar with the rate and a "Book" button. This updates the rate display to show the correct amount (e.g., "₹750").

### The "Book This Worker" button

```js
document.getElementById("modalBookBtn").href =
  "booking.html?worker=" + encodeURIComponent(w.name) + "&service=" + w.cat + "&rate=" + w.rate;
```

This dynamically changes where the "Book" button links to. The URL includes the worker's name, service type, and rate so the booking page can pre-fill the form.

### Showing the modal

```js
overlay.classList.add("open");
document.body.style.overflow = "hidden";
```

- Adding the `"open"` class makes the modal visible (CSS has rules that show elements with the `open` class)
- `overflow = "hidden"` prevents the background page from scrolling while the modal is open

---

## The `setupWorkerModal` Function

This sets up how to **close** the modal. There are 3 ways to close it:

```js
function close() {
  overlay.classList.remove("open");
  document.body.style.overflow = "";
}

// Way 1: Click the X button
document.getElementById("modalClose").addEventListener("click", close);

// Way 2: Click the dark overlay (the area outside the modal)
overlay.addEventListener("click", function(e) {
  if (e.target === overlay) close();
});

// Way 3: Press the Escape key
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") close();
});
```

**Way 2 explained:** `e.target` is the exact element that was clicked. `e.target === overlay` means "the click was directly on the dark overlay, not on the modal content inside it." This prevents the modal from closing when you click inside it.

**Way 3 explained:** `"keydown"` fires when any key is pressed. `e.key` tells us which key — we only close if it's the `"Escape"` key.

The `close()` function removes the `"open"` class (hides the modal) and restores scrolling.
