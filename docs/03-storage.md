# Storage - Saving and Loading Data (Lines 101-107)

## The Problem: Websites Have No Memory

When you fill in your name on a website and then go to a different page, the website has already forgotten what you typed. Every page load starts fresh — like a goldfish with no memory.

To fix this, browsers have a built-in feature called **storage** — a tiny invisible notebook where websites can write things down and read them back later.

## What is sessionStorage?

SkillHire uses **sessionStorage** — a type of browser storage that:
- Lets the website **save** and **read** small pieces of text
- Gets **erased automatically** when you close the browser tab
- Is like writing on a whiteboard — once you walk away (close the tab), everything is wiped clean

There's also **localStorage** (which survives closing the browser, like writing in a diary), but SkillHire doesn't use it.

### How storage works (the basics)

Storage works with **keys** and **values**, like a dictionary:

```js
// SAVING: write "Mumbai" under the label "city"
sessionStorage.setItem("city", "Mumbai");

// LOADING: read whatever is stored under "city"
sessionStorage.getItem("city");  // → "Mumbai"

// DELETING: erase the "city" entry
sessionStorage.removeItem("city");
```

**Important rule:** Storage can ONLY save **text** (strings). It cannot save objects or arrays directly. This is where `JSON.stringify` and `JSON.parse` come in.

## The Helper Functions

SkillHire has 6 small helper functions to make saving/loading easier:

```js
function saveProfile(d)  { sessionStorage.setItem("sh_profile", JSON.stringify(d)); }
function loadProfile()   { return JSON.parse(sessionStorage.getItem("sh_profile")) || null; }
function saveBookings(l) { sessionStorage.setItem("sh_bookings", JSON.stringify(l)); }
function loadBookings()  { return JSON.parse(sessionStorage.getItem("sh_bookings")) || []; }
function saveCity(c)     { sessionStorage.setItem("sh_city", c); }
function loadCity()      { return sessionStorage.getItem("sh_city") || null; }
```

Let's understand each piece:

### `JSON.stringify()` — turning objects into text

Imagine you have this profile:

```js
const profile = { name: "Stuti", phone: "9876543210" };
```

Storage can't save this object directly. So `JSON.stringify()` converts it to a text string:

```js
JSON.stringify(profile)
// → '{"name":"Stuti","phone":"9876543210"}'
```

It's like writing down a recipe on paper instead of storing the actual food. The text **describes** the object.

### `JSON.parse()` — turning text back into objects

When we want to read the data back, we need to reverse the process:

```js
JSON.parse('{"name":"Stuti","phone":"9876543210"}')
// → { name: "Stuti", phone: "9876543210" }
```

It's like reading the recipe and making the food again — we get a real JavaScript object we can work with.

### The `||` operator — a safety net

```js
return JSON.parse(sessionStorage.getItem("sh_profile")) || null;
```

The `||` symbol means **"or"**. This line says:

> "Try to load and parse the profile. If it doesn't exist (returns `null` or `undefined`), give back `null` instead."

Why? Because if no profile has been saved yet, `getItem` returns `null`, and `JSON.parse(null)` could cause problems. The `||` catches this and provides a safe fallback.

For bookings, the fallback is `[]` (an empty array/list):

```js
return JSON.parse(sessionStorage.getItem("sh_bookings")) || [];
```

This means "if no bookings are saved yet, pretend there's an empty list of bookings."

### The `return` keyword

```js
function loadProfile() { return JSON.parse(...) || null; }
```

**`return`** means "give this value back to whoever called the function." For example:

```js
const myProfile = loadProfile();
// myProfile now contains whatever loadProfile() returned
```

Without `return`, calling the function would give you `undefined` (nothing).

### Why the "sh_" prefix?

The storage keys are named `sh_profile`, `sh_bookings`, `sh_city` — the `sh` stands for **S**kill**H**ire.

Why not just call it `"profile"`? Because many websites use the same browser storage space. If another website also saved something under `"profile"`, the data would clash. Adding `sh_` makes the keys unique to SkillHire.

## What gets saved where

| Key | What's stored | Example |
|-----|--------------|---------|
| `sh_profile` | Your profile info | `{"name":"Stuti","phone":"98765","email":"stuti@email.com","city":"Mumbai"}` |
| `sh_bookings` | All your bookings | `[{"id":"BK123","worker":"Ramesh","service":"Electrician","total":1500}, ...]` |
| `sh_city` | Your selected city | `"Mumbai"` |
