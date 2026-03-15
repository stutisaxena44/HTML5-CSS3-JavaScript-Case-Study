# Account Page (Lines 551-788)

## What Does This Page Do?

The account page is your personal dashboard. It has 4 tabs (like folders in a filing cabinet):
1. **Profile** — your name, phone, email, etc.
2. **Bookings** — all your past and upcoming bookings
3. **Ratings** — your rating score based on how many bookings you've made
4. **Addresses** — saved home/work addresses

## Tab Switching

The 4 tabs are just links at the top of the page. Only one tab's content is visible at a time — the rest are hidden.

```js
const tabLinks = document.querySelectorAll(".account-nav a[data-tab]");
```

**`querySelectorAll(".account-nav a[data-tab]")`** — This is a CSS selector that means:
- `.account-nav` — inside the element with class `account-nav`
- `a` — find all `<a>` (link) elements
- `[data-tab]` — that have a `data-tab` attribute

`querySelectorAll` returns a **NodeList** (like an array) of all matching elements. Compare with `getElementById` which returns just one element.

### The click handler

```js
tabLinks.forEach(function(link) {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    // 1. Remove "active" from ALL tabs
    tabLinks.forEach(l => l.classList.remove("active"));
    // 2. Hide ALL panels
    document.querySelectorAll(".account-panel").forEach(p => p.classList.remove("active"));
    // 3. Highlight the clicked tab
    link.classList.add("active");
    // 4. Show the matching panel
    const panel = document.getElementById("panel-" + link.dataset.tab);
    if (panel) panel.classList.add("active");
  });
});
```

Step by step:

1. **`e.preventDefault()`** — Since tabs are `<a>` (link) elements, clicking them would normally navigate to a new page. `preventDefault()` stops that

2. **Remove "active" from everything** — First, un-highlight ALL tabs and hide ALL panels. It's like turning off all the lights in a house

3. **`link.classList.add("active")`** — Highlight just the clicked tab. The CSS makes `.active` tabs appear bold/underlined

4. **`"panel-" + link.dataset.tab`** — Build the panel's ID. If the link has `data-tab="bookings"`, this becomes `"panel-bookings"`. The `dataset` property lets you access any `data-*` attribute from HTML

It's like flipping pages in a notebook — you hide the current page and show the new one.

---

## Profile (Create, Edit, Delete)

### Two views

The profile section has **two alternate views** (only one is visible at a time):
- **Create form** (`profileCreateForm`) — Shown when no profile exists yet. Has input fields for name, phone, email, etc.
- **Saved view** (`profileSaved`) — Shown after saving. Displays your info as read-only text

### Checking if a profile exists

```js
const profile = loadProfile();
if (profile) {
  showSavedProfile(profile);
  savedView.style.display  = "block";
  createForm.style.display = "none";
} else {
  savedView.style.display  = "none";
  createForm.style.display = "block";
}
```

- `loadProfile()` reads from sessionStorage (returns the profile object or `null`)
- **`style.display = "block"`** — Makes an element visible
- **`style.display = "none"`** — Hides an element completely (as if it doesn't exist)
- If a profile exists → show the saved view, hide the form
- If no profile → hide the saved view, show the form

### Saving a profile

```js
form.addEventListener("submit", function(e) {
  e.preventDefault();
  const data = {
    name:   document.getElementById("pf_name").value.trim(),
    phone:  document.getElementById("pf_phone").value.trim(),
    email:  document.getElementById("pf_email").value.trim(),
    dob:    document.getElementById("pf_dob").value,
    gender: document.getElementById("pf_gender").value,
    city:   selectedCity
  };
  if (!data.name)  { alert("Please enter your name."); return; }
  if (!data.phone) { alert("Please enter your phone number."); return; }
  saveProfile(data);
});
```

- **`.value`** — Gets whatever the user typed in the input field
- **`.trim()`** — Removes spaces from the start and end. So `"  Stuti  "` becomes `"Stuti"`. This prevents people from submitting just spaces
- **`alert("...")`** — Shows a browser popup with a message. It's a quick-and-dirty way to show errors
- **Validation:** If name or phone is empty, show an error and `return` (stop — don't save)

### Editing a profile

```js
editBtn.addEventListener("click", function() {
  const p = loadProfile();
  if (p) {
    document.getElementById("pf_name").value  = p.name  || "";
    document.getElementById("pf_phone").value = p.phone || "";
    // ... fill in other fields
  }
  savedView.style.display  = "none";
  createForm.style.display = "block";
});
```

When you click "Edit":
1. Load the saved profile data
2. Fill the form fields with the existing values (so you don't have to retype everything)
3. Hide the saved view, show the form

The `|| ""` ensures that if a field is `null` or `undefined`, the input shows empty instead of the word "null".

### Deleting a profile

The delete button is in the HTML (not in script.js):

```html
onclick="if(confirm('Delete your profile?')){sessionStorage.removeItem('sh_profile');location.reload();}"
```

- **`confirm('...')`** — Shows a yes/no popup. Returns `true` if the user clicks OK, `false` if Cancel
- **`sessionStorage.removeItem('sh_profile')`** — Deletes the profile from storage
- **`location.reload()`** — Refreshes the page, which causes the profile section to show the create form again (since there's no longer a saved profile)

---

## Booking History

### `renderBookingHistory()` function

```js
const bookings = loadBookings();
```

This loads all bookings from sessionStorage. Remember, bookings are stored as an array of objects.

### Updating quick stats

```js
const t = document.getElementById("statTotal");
const u = document.getElementById("statUpcoming");
const d = document.getElementById("statDone");
if (t) t.textContent = bookings.length;
if (u) u.textContent = bookings.filter(b => b.status === "Upcoming").length;
if (d) d.textContent = bookings.filter(b => b.status === "Completed").length;
```

**`.filter()`** is an array method that creates a **new array** containing only items that match a condition:

```js
bookings.filter(b => b.status === "Upcoming")
```

"From all bookings, keep only the ones where status is 'Upcoming'." Then `.length` counts how many there are.

### Calculating total spent

```js
const totalRs = bookings.reduce(function(sum, b) {
  return sum + (b.total || 0);
}, 0);
```

**`.reduce()`** is an array method that "reduces" a list to a single value by accumulating:
- Start with `sum = 0` (the `,0` at the end)
- For each booking `b`, add its total to `sum`
- After all bookings, `totalRs` is the grand total

Example: if bookings have totals [1500, 2000, 800], reduce does:
- 0 + 1500 = 1500
- 1500 + 2000 = 3500
- 3500 + 800 = 4300 → final result

The `(b.total || 0)` is a safety net — if a booking somehow has no total, treat it as 0 instead of crashing.

### Building the booking list HTML

```js
container.innerHTML = bookings.map(function(b) {
  return '<div class="booking-item">...' + b.worker + '...</div>';
}).join("");
```

**`.map()`** transforms each item in an array. Here it converts each booking object into an HTML string. The result is an array of HTML strings.

**`.join("")`** merges all strings in an array into one big string with no separator. For example:
```js
["<div>A</div>", "<div>B</div>"].join("")
// → "<div>A</div><div>B</div>"
```

Then `container.innerHTML = ...` puts all that HTML on the page at once.

---

## Rating System

The rating is **simulated** — it's calculated from how many bookings you've made (not from actual reviews).

```js
const score = Math.min(4.9, 4.0 + count * 0.16).toFixed(1);
```

Let's break this down:

1. **`4.0 + count * 0.16`** — Start at 4.0, add 0.16 for each booking
   - 0 bookings: 4.0
   - 1 booking: 4.16
   - 3 bookings: 4.48
   - 6 bookings: 4.96

2. **`Math.min(4.9, ...)`** — Cap at 4.9 (never reach 5.0 to look realistic). `Math.min()` returns whichever number is smaller

3. **`.toFixed(1)`** — Round to 1 decimal place and convert to text. `4.48` becomes `"4.5"`, `4.96` becomes `"5.0"` but wait — `Math.min` already capped it at `4.9`, so it stays `"4.9"`

### Star breakdown bars

```js
const dist = { 5: Math.round(count*0.6), 4: Math.round(count*0.25), 3: Math.round(count*0.1), 2:0, 1:0 };
```

This distributes bookings across star ratings: 60% get 5 stars, 25% get 4 stars, 10% get 3 stars. `Math.round()` rounds to the nearest whole number.

### Fake worker reviews

The code auto-generates "reviews from workers" using pre-written comments:

```js
const COMMENTS = [
  "Very polite and cooperative. Made my job much easier.",
  "Patient and easy to communicate with. Would work again.",
  // ...
];
```

These cycle through using `i % COMMENTS.length` (the `%` modulo operator gives the remainder after division — it loops back to 0 after reaching the end of the list).

---

## Addresses

```js
addBtn.addEventListener("click", function() {
  const label   = document.getElementById("newAddrLabel").value.trim();
  const address = document.getElementById("newAddrText").value.trim();
  if (!label || !address) { alert("Please fill in both label and address."); return; }
  // Create a new address card and add it to the list
});
```

Users can add labeled addresses (like "Home — HSR Layout, Bangalore"). The remove button uses:

```js
onclick="this.closest('.address-item').remove()"
```

- **`this`** — Refers to the button that was clicked
- **`.closest('.address-item')`** — Walks up the HTML tree to find the nearest parent with class `address-item`
- **`.remove()`** — Deletes that element from the page

**Important:** These addresses are NOT saved to storage. They only exist in the page's HTML, so they disappear when you refresh. This is a limitation of the current implementation.
