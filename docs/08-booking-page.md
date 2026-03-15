# Booking Page (Lines 465-546)

## What Does This Page Do?

The booking page is a form where users select a service, choose a date and time slot, and confirm their booking. The right side shows a live cost summary that updates automatically as you change options.

## How It All Starts

```js
function setupBooking() {
  const sel = document.getElementById("serviceType");
  if (!sel) return;
```

- Find the service type dropdown (`<select>`)
- If it doesn't exist (we're not on the booking page), stop

## How Rates Work

### Default rates (when no specific worker is selected)

```js
const defaultRates = { electrician:750, plumber:1250, cleaner:1500, tutor:3000, delivery:1000, painter:2000 };
```

This is an object that maps each service type to a default hourly rate. These are used when someone visits the booking page directly (without clicking a specific worker's "Book" button).

### Worker-specific rates (from the URL)

```js
const params = new URLSearchParams(window.location.search);
const wParam = params.get("worker");
const sParam = params.get("service");
const rParam = params.get("rate");
const workerRate = rParam ? parseInt(rParam) : 0;
```

Let's break this down:

**`window.location.search`** — This gives you the part of the URL after the `?`. For example, if the URL is:
```
booking.html?worker=Ramesh%20Kumar&service=electrician&rate=750
```
Then `window.location.search` = `"?worker=Ramesh%20Kumar&service=electrician&rate=750"`

**`new URLSearchParams(...)`** — A built-in tool that parses URL parameters into an easy-to-use object.

**`.get("worker")`** — Extracts the value of a specific parameter. Here:
- `params.get("worker")` → `"Ramesh%20Kumar"` (which gets decoded to `"Ramesh Kumar"`)
- `params.get("service")` → `"electrician"`
- `params.get("rate")` → `"750"`

**`rParam ? parseInt(rParam) : 0`** — This is a ternary operator (shorthand if/else):
- If `rParam` exists (is not null) → convert it to a number with `parseInt()`
- If `rParam` doesn't exist → use `0`

### Which rate gets used?

```js
const rate = (workerRate && sel.value === sParam) ? workerRate : (defaultRates[sel.value] || 0);
```

Translation:
- "If we have a worker-specific rate AND the selected service still matches what was in the URL → use the worker's rate"
- "Otherwise → use the default rate for the selected service"

This means: if you came from Ramesh Kumar's card (₹750 electrician) and don't change the service type, you get his rate. But if you change the service dropdown to "Plumber", it switches to the default plumber rate since Ramesh's rate only applies to electrical work.

## Pre-filling the Form

```js
if (wParam && document.getElementById("workerName"))
  document.getElementById("workerName").value = decodeURIComponent(wParam);
if (sParam) {
  const opt = sel.querySelector('option[value="'+sParam+'"]');
  if (opt) sel.value = sParam;
}
```

- **`decodeURIComponent(wParam)`** — Converts URL-safe text back to normal text. `"Ramesh%20Kumar"` becomes `"Ramesh Kumar"` (the `%20` is a space)
- **`sel.querySelector('option[value="electrician"]')`** — Finds the dropdown option with the matching value
- **`sel.value = sParam`** — Sets the dropdown to that option (auto-selecting "Electrician" for you)

It also pre-fills your name and phone if you've saved a profile before:

```js
const profile = loadProfile();
if (profile) {
  if (nf && profile.name)  nf.value = profile.name;
  if (pf && profile.phone) pf.value = profile.phone;
}
```

## The Live Cost Calculator

### The `calc()` function

```js
function calc() {
  const rate      = (workerRate && sel.value === sParam) ? workerRate : (defaultRates[sel.value]||0);
  const hours     = parseFloat(document.getElementById("hoursRequired").value) || 1;
  const emergency = document.getElementById("emergencyService").checked ? 1000 : 0;
  const tools     = document.getElementById("toolsProvided").checked ? 800 : 0;
  const subtotal  = (rate * hours) + emergency + tools;
  const comm      = Math.round(subtotal * 0.10);
```

Breaking it down:

- **`parseFloat(...) || 1`** — Get the hours value, convert from text to a number. If it's empty or invalid, default to 1 hour
- **`.checked`** — For checkboxes, `.checked` is `true` if the box is ticked, `false` if not
- **`? 1000 : 0`** — If checked, add ₹1000 for emergency service; if not, add ₹0
- **`Math.round(subtotal * 0.10)`** — Calculate 10% commission, rounding to a whole number

**Example calculation:**
- Rate: ₹750/hr, Hours: 2, Emergency: Yes, Tools: No
- Subtotal = (750 x 2) + 1000 + 0 = ₹2500
- Commission (10%) = ₹250
- Worker earns (90%) = ₹2250

### Updating the display

```js
const set = (id,v) => { const e=document.getElementById(id); if(e) e.textContent=v; };
set("sumService",   sel.value.charAt(0).toUpperCase()+sel.value.slice(1));
set("sumRate",      "₹"+rate+"/hr");
set("sumHours",     hours+" hr(s)");
set("sumAddons",    "₹"+(emergency+tools));
set("sumWorker",    "₹"+(subtotal-comm));
set("sumCommission","₹"+comm);
set("sumTotal",     "₹"+subtotal);
```

The `set` is a small helper function: find an element by ID and set its text. Each line updates one row of the cost summary on the right side of the page.

### Making it update automatically

```js
["serviceType","hoursRequired","emergencyService","toolsProvided"].forEach(function(id) {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener("change", calc);
    el.addEventListener("input", calc);
  }
});
calc();  // Run once immediately on page load
```

This attaches the `calc` function to 4 form elements. Whenever any of them changes:
- **`"change"` event** — Fires when a dropdown selection changes or a checkbox is toggled
- **`"input"` event** — Fires as you type in an input field (for the hours field)

Both events call `calc()`, which recalculates and updates the summary. The last line `calc()` runs it once immediately so the summary shows correct values from the start.

## What Happens When You Submit

```js
form.addEventListener("submit", function(e) {
  e.preventDefault();
```

- **`"submit"` event** — Fires when the user clicks the submit button or presses Enter in a form
- **`e.preventDefault()`** — **Critical!** Normally, submitting a form causes the browser to navigate to a new page (or reload). `preventDefault()` stops that default behavior so we can handle the submission with JavaScript instead

### Creating the booking object

```js
const booking = {
  id:       "BK" + Date.now(),
  worker:   worker,
  service:  service.charAt(0).toUpperCase() + service.slice(1),
  date:     dateDisplay,
  slot:     slot ? slot.value : "—",
  hours:    hours,
  total:    total,
  status:   "Upcoming",
  city:     selectedCity,
  bookedOn: new Date().toLocaleDateString(...)
};
```

- **`"BK" + Date.now()`** — Creates a unique ID. `Date.now()` returns the current time in milliseconds (like `1710500000000`), so the ID becomes something like `"BK1710500000000"`. Since time always moves forward, each booking gets a unique ID
- **`slot ? slot.value : "—"`** — If a time slot was selected, use its value; otherwise, use "—" (a dash)
- **`new Date().toLocaleDateString(...)`** — Creates a human-readable date string like "15 Mar 2026"

### Saving and confirming

```js
const existing = loadBookings();
existing.unshift(booking);
saveBookings(existing);
```

1. Load all previous bookings from storage
2. **`unshift(booking)`** — Add the new booking to the **beginning** of the array (so it appears first in the list). Compare with `.push()` which adds to the end
3. Save the updated list back to storage

Then a green confirmation message appears, the page scrolls to the top, and the form resets.
