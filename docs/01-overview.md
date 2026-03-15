# SkillHire JavaScript - The Big Picture

## Before We Start: What is JavaScript?

JavaScript (JS) is a programming language that makes websites **interactive**. Without JavaScript, a website is like a printed poster — you can look at it, but you can't click buttons, filter lists, or fill out forms that actually do something.

Every website is made of three languages working together:

- **HTML** = the skeleton (the structure — headings, paragraphs, buttons, input boxes)
- **CSS** = the clothes (how it looks — colors, fonts, spacing, layout)
- **JavaScript** = the muscles (how it moves and reacts — what happens when you click, type, or scroll)

## What is `script.js`?

`script.js` is a single file that contains ALL the JavaScript for the entire SkillHire website. Every page (Home, Workers, Services, Booking, Account, Contact) loads this one file and uses different parts of it.

## Some Basic JavaScript Concepts You'll Need

### Variables — storing information

```js
let selectedCity = "Bangalore";
```

A **variable** is like a labeled box. Here, we created a box labeled `selectedCity` and put the word `"Bangalore"` inside it. Later, we can change what's inside:

```js
selectedCity = "Mumbai";  // Now the box contains "Mumbai"
```

- `let` = "I'm creating a new box that I might change later"
- `const` = "I'm creating a new box that will NEVER change"

### Functions — reusable instructions

```js
function sayHello() {
  console.log("Hello!");
}
```

A **function** is like a recipe card. You write the instructions once, and then you can use that recipe whenever you want by "calling" it:

```js
sayHello();  // This runs the instructions inside the function
```

Functions can also take **inputs** (called parameters):

```js
function greet(name) {
  console.log("Hello, " + name + "!");
}
greet("Stuti");  // Outputs: "Hello, Stuti!"
```

### Arrays — lists of things

```js
const fruits = ["apple", "banana", "mango"];
```

An **array** is a numbered list. Each item has a position (starting from 0, not 1):
- `fruits[0]` = "apple"
- `fruits[1]` = "banana"
- `fruits[2]` = "mango"

### Objects — bundles of information

```js
const person = {
  name: "Stuti",
  age: 20,
  city: "Mumbai"
};
```

An **object** is like a form or ID card — it groups related information together using labels (called "keys"). You access the info like this:
- `person.name` = "Stuti"
- `person.age` = 20

### `document` — the page itself

In JavaScript, `document` refers to the entire web page. You use it to find and change things on the page:

```js
document.getElementById("myButton")  // Find the element with id="myButton"
```

This is how JS talks to HTML — it finds elements by their `id` and then changes them.

---

## How is the code organized?

The code is split into **10 sections**, like chapters in a book:

| # | Section | What it does |
|---|---------|-------------|
| 1 | Worker Data | A big list of all the workers and their details |
| 2 | Storage | Saving and loading your data (like a notebook) |
| 3 | Location Modal | The popup that asks which city you're in |
| 4 | Home Page Cards | Shows the best worker from each category on the homepage |
| 5 | Worker & Service Cards | Shows worker cards on the Workers and Services pages |
| 6 | Worker Popup Modal | The detailed popup when you click a worker |
| 7 | Filters | Dropdown menus to narrow down workers |
| 8 | Booking Page | The form where you book a worker |
| 9 | Account Page | Your profile, booking history, and ratings |
| 10 | Contact Form | The "get in touch" form |

Plus some helper stuff at the end: scroll animations, navigation bar, and the **INIT** function that starts everything when the page loads.

## How does it all start?

At the very bottom of the file, there's this:

```js
document.addEventListener("DOMContentLoaded", function() {
  setupNav();
  setupLocationModal();
  setupFilters();
  renderWorkerCards();
  renderServiceCards();
  setupWorkerModal();
  setupBooking();
  setupAccount();
  setupContactForm();
  setupHomeSearch();
  setupScrollAnimations();
});
```

Let's break this down piece by piece:

- **`document`** — refers to the web page
- **`.addEventListener("DOMContentLoaded", ...)`** — "Hey browser, when you finish loading all the HTML, run this code"
  - `DOMContentLoaded` is an **event** — something that happens in the browser. Other events include "click", "scroll", "keydown", etc.
- **`function() { ... }`** — this is an **anonymous function** (a function without a name). It contains the list of all setup functions to run.

Each setup function checks "does my stuff exist on this page?" before doing anything. For example, `setupBooking()` looks for a booking form — if it's not on the current page, the function just stops immediately. This is why one script file can safely work across all 6 pages without errors.
