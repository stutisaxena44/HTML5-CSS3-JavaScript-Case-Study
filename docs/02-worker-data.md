# The Worker Data (Lines 8-97)

## The WORKERS Array

At the very top of `script.js`, there's a huge list called `WORKERS`. Think of it as a spreadsheet or a phone book containing every worker on the platform.

```js
const WORKERS = [
  { id:1, name:"Ramesh Kumar", cat:"electrician", ... },
  { id:2, name:"Arun Mehta",   cat:"electrician", ... },
  // ... 22 more workers
];
```

Let's understand this line by line:

- **`const`** — means "this will never be replaced with something else" (though we can still change items *inside* the list)
- **`WORKERS`** — the name of our list. It's in ALL CAPS by convention to show it's a constant that holds important data
- **`= [ ... ]`** — the square brackets `[]` make it an **array** (a list). Each item in the list is separated by a comma

### What each worker looks like

Each worker is an **object** — a bundle of information wrapped in curly braces `{}`:

```js
{
  id: 1,                    // A unique number, like a roll number in class
  name: "Ramesh Kumar",     // The worker's full name
  cat: "electrician",       // Short for "category" — what type of work they do
  rate: 750,                // How much they charge per hour, in rupees (₹)
  exp: "7 years",           // How many years of experience they have
  rating: "4.9",            // Customer rating out of 5 (stored as text, not a number)
  reviews: 128,             // How many customers left a review
  status: "Available",      // "Available" or "Busy" — can they take a job right now?
  icon: "⚡",               // An emoji that represents their profession
  addresses: {              // Their work address in EACH city
    Delhi: "Lajpat Nagar, New Delhi",
    Mumbai: "Andheri East, Mumbai",
    Bangalore: "Koramangala, Bengaluru",
    // ... more cities
  },
  quotes: [                 // Customer reviews (an array of strings)
    "Fixed our wiring issue in under an hour.",
    "Came on time, neat work, no mess left behind."
  ]
}
```

### Understanding the `//` comments

Anything after `//` on a line is a **comment** — it's ignored by the computer and is just a note for humans reading the code.

### Understanding `addresses` (an object inside an object)

The `addresses` property is itself an object. It maps each city name to an address:

```js
addresses: {
  Delhi: "Lajpat Nagar, New Delhi",
  Mumbai: "Andheri East, Mumbai",
}
```

To get a specific address, you use: `w.addresses["Mumbai"]` → gives you `"Andheri East, Mumbai"`

This is how the website shows different addresses depending on which city the user selected.

### Understanding `quotes` (an array inside an object)

The `quotes` property is an array (list) of strings:

```js
quotes: ["Fixed our wiring issue in under an hour.", "Came on time, neat work."]
```

- `w.quotes[0]` → first quote: `"Fixed our wiring issue in under an hour."`
- `w.quotes[1]` → second quote: `"Came on time, neat work."`

## Categories

There are **6 types** of workers, with 4 workers each = **24 workers total**:

| Category | Emoji | What they do | Rate range |
|----------|-------|-------------|------------|
| Electrician | ⚡ | Fix wiring, fans, switches | ₹700 - ₹950/hr |
| Plumber | 🔧 | Fix pipes, taps, drains | ₹600 - ₹1250/hr |
| Cleaner | 🧹 | Clean homes and offices | ₹1300 - ₹1600/hr |
| Tutor | 📚 | Teach students | ₹1700 - ₹3000/hr |
| Delivery | 📦 | Deliver packages | ₹1000 - ₹1300/hr |
| Painter | 🎨 | Paint walls and houses | ₹1600 - ₹2200/hr |

## The ILLUS_BG Object

```js
const ILLUS_BG = {
  electrician: "#fff8e1",  // light yellow
  plumber: "#e3f2fd",      // light blue
  cleaner: "#e8f5e9",      // light green
  tutor: "#f3e5f5",        // light purple
  delivery: "#fff3e0",     // light orange
  painter: "#fce4ec"       // light pink
};
```

This gives each category a background color. The values like `"#fff8e1"` are **hex color codes** — a way computers represent colors. Each one starts with `#` followed by 6 characters (numbers 0-9 and letters a-f).

This object is used when showing the worker popup modal — the top section of the popup gets a colored background matching the worker's profession.

## The selectedCity Variable

```js
let selectedCity = "Bangalore";
```

This is a simple variable that keeps track of which city the user picked:
- It starts as `"Bangalore"` by default
- When the user picks a different city in the location popup, this changes
- Everywhere on the site that shows an address looks at this variable to know which city's address to display

We use `let` (not `const`) because this value **changes** — the user can switch cities at any time.
