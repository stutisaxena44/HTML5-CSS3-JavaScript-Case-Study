# Contact Form & Extra Features (Lines 793-870)

## Contact Form

The contact page has a simple form with 3 fields: name, email, and message. When the user submits, JavaScript checks that everything is filled in correctly before showing a success message.

### Validation — checking user input

```js
form.addEventListener("submit", function(e) {
  e.preventDefault();
  document.getElementById("successBanner").classList.remove("show");
```

- **`"submit"` event** — Fires when the user clicks the submit button
- **`e.preventDefault()`** — Stops the browser from actually sending the form (we handle it ourselves)
- **Hide the success banner** — If a success message was showing from a previous submission, hide it first. Otherwise, you'd see "Success!" and error messages at the same time

### The `check()` helper function

```js
let valid = true;

function check(f, errId, bad) {
  const err = document.getElementById(errId);
  f.classList.toggle("input-error", bad);
  err.classList.toggle("show", bad);
  if (bad) valid = false;
}
```

Let's understand each line:

- **`let valid = true`** — We start by assuming the form is valid. If any check fails, we'll set this to `false`

- **`function check(f, errId, bad)`** — A helper that takes 3 inputs:
  - `f` — the form field element (the input box)
  - `errId` — the ID of the error message element
  - `bad` — `true` if the field is invalid, `false` if it's OK

- **`classList.toggle("input-error", bad)`** — This is interesting! `.toggle()` with a second argument works like this:
  - If `bad` is `true` → **add** the class (show red border)
  - If `bad` is `false` → **remove** the class (normal border)

  It's like a light switch that you can set to ON or OFF directly, instead of just flipping it.

- **`if (bad) valid = false`** — If this field failed, mark the whole form as invalid

### The three checks

```js
check(name,  "nameError",    name.value.trim() === "");
check(email, "emailError",   !/\S+@\S+\.\S+/.test(email.value));
check(msg,   "messageError", msg.value.trim() === "");
```

**Check 1: Name**
- `name.value.trim() === ""` — Is the name empty (after removing spaces)?
- If yes → `bad` is `true` → show error

**Check 2: Email**
- `!/\S+@\S+\.\S+/.test(email.value)` — This uses a **regular expression** (regex):
  - `/\S+@\S+\.\S+/` is the pattern:
    - `\S+` = one or more non-space characters
    - `@` = the literal @ symbol
    - `\S+` = one or more non-space characters again
    - `\.` = a literal dot (the `\` is needed because `.` has a special meaning in regex)
    - `\S+` = one or more non-space characters
  - Together: "something@something.something" — a basic email pattern
  - `.test(email.value)` — Returns `true` if the email matches the pattern
  - The `!` at the front flips it — so `bad` is `true` when the email does NOT match

  Examples:
  - `"stuti@gmail.com"` → matches → `!true` = `false` → valid!
  - `"stuti"` → no match → `!false` = `true` → invalid!
  - `"@"` → no match → invalid!

**Check 3: Message**
- Same as name — is it empty after trimming spaces?

### If everything is valid

```js
if (valid) {
  document.getElementById("successBanner").classList.add("show");
  form.reset();
}
```

- Show a green success banner (by adding the `"show"` class)
- **`form.reset()`** — Clears all form fields back to their default values

**Note:** The form doesn't actually send an email anywhere! In a real application, you'd use `fetch()` to send the data to a server. Here, it just shows a success message for demo purposes.

---

## Scroll Animations

These make elements "fade in" or "slide up" as you scroll down the page, creating a polished feel.

### What is IntersectionObserver?

```js
const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
```

Imagine hiring a security guard to watch certain elements on the page. The guard's job is simple: "Tell me when each element scrolls into view."

Let's break it down:

- **`new IntersectionObserver(...)`** — Creates a new "observer" (the security guard)

- **`function(entries) { ... }`** — This function runs whenever an observed element enters or leaves the viewport (the visible part of the page). `entries` is a list of all elements that changed

- **`entry.isIntersecting`** — Is this element currently visible on screen? (`true` or `false`)

- **`entry.target`** — The actual HTML element being observed

- **`classList.add("visible")`** — When the element becomes visible, add the `"visible"` class. CSS has animation rules for this class (like fading from transparent to opaque, or sliding up from below)

- **`observer.unobserve(entry.target)`** — Stop watching this element after it's animated once. Without this, the animation would replay every time you scroll past it (which would look weird)

- **`{ threshold: 0.15 }`** — Trigger when at least 15% of the element is visible. `0` would trigger immediately when 1 pixel appears, `1.0` would require the entire element to be visible

### What elements are animated?

```js
document.querySelectorAll(".anim-fade-up, .anim-fade-left, .anim-fade-right, .anim-scale")
  .forEach(function(el) {
    observer.observe(el);
  });
```

This finds all elements with animation classes and tells the observer to watch them. The CSS defines the actual animations:
- `anim-fade-up` — starts invisible and below, fades in while sliding up
- `anim-fade-left` — slides in from the left
- `anim-fade-right` — slides in from the right
- `anim-scale` — starts small and grows to full size

---

## Navigation Bar

### Highlighting the current page

```js
const page = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-links a").forEach(function(a) {
  if (a.getAttribute("href") === page) a.classList.add("active");
});
```

Let's trace through this:

1. **`window.location.pathname`** — The current page's path, like `/Users/neel/SkillHire/workers.html`

2. **`.split("/")`** — Splits the path at every `/` into an array:
   `["", "Users", "neel", "SkillHire", "workers.html"]`

3. **`.pop()`** — Gets the last item from the array: `"workers.html"`

4. **`|| "index.html"`** — If somehow the result is empty, assume we're on the home page

5. **Loop through all nav links** — For each link, check if its `href` attribute matches the current page name. If it does, add the `"active"` class (which CSS styles as bold/underlined)

### Personalizing the Account link

```js
const profile = loadProfile();
if (profile && profile.name) {
  const accountLink = document.querySelector('.nav-links a[href="account.html"]');
  if (accountLink) accountLink.textContent = "👤 " + profile.name.split(" ")[0];
}
```

- If a profile is saved, find the "My Account" nav link
- **`profile.name.split(" ")[0]`** — Split the name at spaces and take the first word
  - `"Stuti Saxena".split(" ")` → `["Stuti", "Saxena"]`
  - `[0]` → `"Stuti"`
- Change the link text to show the user's first name instead of "My Account"

### Hamburger menu (mobile)

```js
const btn   = document.querySelector(".hamburger");
const links = document.querySelector(".nav-links");
if (btn) btn.addEventListener("click", () => links.classList.toggle("open"));
```

On mobile screens, the nav links are hidden behind a hamburger menu (☰). Clicking it toggles the `"open"` class:
- **`.toggle("open")`** — If the class is there, remove it (close menu). If it's not there, add it (open menu). It's like a light switch — click once to turn on, click again to turn off.

---

## The INIT Block — Where Everything Begins

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

**`"DOMContentLoaded"`** — This event fires when the browser has finished reading and building the HTML page. It's like a starting pistol — "Ready? Go!"

**Why wait for this event?** Because JavaScript can run before the page is fully loaded. If you try to find `document.getElementById("someButton")` before that button exists in the HTML, you'll get `null` and your code will crash. `DOMContentLoaded` ensures all HTML elements exist before we try to interact with them.

**Why do ALL functions run on EVERY page?** Each function has a safety check at the top:

```js
function setupBooking() {
  const sel = document.getElementById("serviceType");
  if (!sel) return;  // "I'm not on the booking page — stop here"
  // ... rest of the code
}
```

So on the Home page, `setupBooking()` runs but immediately exits because there's no booking form. This means we can use one single `script.js` file for all 6 pages without errors or multiple files. Each function silently skips itself when it's not needed.
