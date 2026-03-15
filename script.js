/* =========================================================
   SkillHire v6 — script.js
   Data strategy:
   - City: sessionStorage (persists within the session)
   - Profile & Bookings: sessionStorage (cleared when browser/tab closes)
   ========================================================= */

const WORKERS = [
  /* --- ELECTRICIANS --- */
  { id:1,  name:"Ramesh Kumar",    cat:"electrician", rate:750, exp:"7 years",  rating:"4.9", reviews:128, status:"Available", icon:"⚡",
    addresses:{Delhi:"Lajpat Nagar, New Delhi",Mumbai:"Andheri East, Mumbai",Bangalore:"Koramangala, Bengaluru",Hyderabad:"Banjara Hills, Hyderabad",Chennai:"Anna Nagar, Chennai",Pune:"Kothrud, Pune",Kolkata:"Salt Lake, Kolkata",Ahmedabad:"Navrangpura, Ahmedabad"},
    quotes:["Fixed our wiring issue in under an hour. Very professional.","Came on time, neat work, no mess left behind."] },
  { id:2,  name:"Arun Mehta",      cat:"electrician", rate:900, exp:"4 years",  rating:"4.2", reviews:85,  status:"Busy",      icon:"⚡",
    addresses:{Delhi:"Dwarka, New Delhi",Mumbai:"Borivali West, Mumbai",Bangalore:"BTM Layout, Bengaluru",Hyderabad:"Madhapur, Hyderabad",Chennai:"Velachery, Chennai",Pune:"Wakad, Pune",Kolkata:"Dum Dum, Kolkata",Ahmedabad:"Satellite, Ahmedabad"},
    quotes:["Installed our ceiling fans quickly. Great work!","Solid professional, explained every step clearly."] },
  { id:3,  name:"Nitin Verma",     cat:"electrician", rate:950, exp:"6 years",  rating:"4.6", reviews:103, status:"Available", icon:"⚡",
    addresses:{Delhi:"Rohini, New Delhi",Mumbai:"Kandivali, Mumbai",Bangalore:"Rajajinagar, Bengaluru",Hyderabad:"Kukatpally, Hyderabad",Chennai:"Ambattur, Chennai",Pune:"Pimpri, Pune",Kolkata:"Dum Dum, Kolkata",Ahmedabad:"Gota, Ahmedabad"},
    quotes:["Repaired the main switchboard in no time. Very skilled.","Explained what was wrong before fixing it. Very transparent."] },
  { id:4,  name:"Harish Pillai",   cat:"electrician", rate:700, exp:"11 years", rating:"4.8", reviews:176, status:"Available", icon:"⚡",
    addresses:{Delhi:"Vasant Vihar, New Delhi",Mumbai:"Juhu, Mumbai",Bangalore:"Sadashivanagar, Bengaluru",Hyderabad:"Jubilee Hills, Hyderabad",Chennai:"Boat Club Road, Chennai",Pune:"Koregaon Park, Pune",Kolkata:"Alipore, Kolkata",Ahmedabad:"Bodakdev, Ahmedabad"},
    quotes:["Senior electrician — handled our entire house rewiring.","Meticulous, safe and professional throughout."] },

  /* --- PLUMBERS --- */
  { id:5,  name:"Suresh Nair",     cat:"plumber",     rate:1250, exp:"10 years", rating:"4.7", reviews:210, status:"Busy",      icon:"🔧",
    addresses:{Delhi:"Rohini, New Delhi",Mumbai:"Dadar, Mumbai",Bangalore:"Indiranagar, Bengaluru",Hyderabad:"Ameerpet, Hyderabad",Chennai:"T Nagar, Chennai",Pune:"Shivajinagar, Pune",Kolkata:"Behala, Kolkata",Ahmedabad:"Maninagar, Ahmedabad"},
    quotes:["Solved a pipe burst at midnight. An absolute lifesaver.","Professional, fast, and honest about pricing."] },
  { id:6,  name:"Dinesh Patel",    cat:"plumber",     rate:600, exp:"5 years",  rating:"4.4", reviews:67,  status:"Available", icon:"🔧",
    addresses:{Delhi:"Janakpuri, New Delhi",Mumbai:"Mulund, Mumbai",Bangalore:"Yelahanka, Bengaluru",Hyderabad:"Secunderabad, Hyderabad",Chennai:"Adyar, Chennai",Pune:"Pimpri, Pune",Kolkata:"Barrackpore, Kolkata",Ahmedabad:"Vastral, Ahmedabad"},
    quotes:["Neat, tidy, and did not overcharge. Booking again.","Very thorough with bathroom tap installation."] },
  { id:7,  name:"Rajan Iyer",      cat:"plumber",     rate:990, exp:"8 years",  rating:"4.5", reviews:134, status:"Available", icon:"🔧",
    addresses:{Delhi:"Pitampura, New Delhi",Mumbai:"Thane East, Mumbai",Bangalore:"JP Nagar, Bengaluru",Hyderabad:"LB Nagar, Hyderabad",Chennai:"Mogappair, Chennai",Pune:"Hadapsar, Pune",Kolkata:"Garia, Kolkata",Ahmedabad:"Nikol, Ahmedabad"},
    quotes:["Fixed our blocked drain fast. No mess whatsoever.","Came within an hour of booking. Excellent response."] },
  { id:8,  name:"Santosh More",    cat:"plumber",     rate:790, exp:"12 years", rating:"4.9", reviews:289, status:"Available", icon:"🔧",
    addresses:{Delhi:"Saket, New Delhi",Mumbai:"Bandra East, Mumbai",Bangalore:"Malleshwaram, Bengaluru",Hyderabad:"Himayatnagar, Hyderabad",Chennai:"Kilpauk, Chennai",Pune:"Deccan, Pune",Kolkata:"Park Street, Kolkata",Ahmedabad:"Navrangpura, Ahmedabad"},
    quotes:["Best plumber I have ever hired. Work is flawless.","12 years of experience and it really shows."] },

  /* --- CLEANERS --- */
  { id:9,  name:"Priya Sharma",    cat:"cleaner",     rate:1500, exp:"6 years",  rating:"4.8", reviews:162, status:"Available", icon:"🧹",
    addresses:{Delhi:"Saket, New Delhi",Mumbai:"Bandra West, Mumbai",Bangalore:"HSR Layout, Bengaluru",Hyderabad:"Jubilee Hills, Hyderabad",Chennai:"Nungambakkam, Chennai",Pune:"Aundh, Pune",Kolkata:"Park Street, Kolkata",Ahmedabad:"Bodakdev, Ahmedabad"},
    quotes:["Deep cleaned my entire apartment. It is spotless now!","On time, thorough, and very pleasant."] },
  { id:10, name:"Kavitha Rao",     cat:"cleaner",     rate:1400, exp:"3 years",  rating:"4.3", reviews:91,  status:"Available", icon:"🧹",
    addresses:{Delhi:"Mayur Vihar, New Delhi",Mumbai:"Thane West, Mumbai",Bangalore:"Marathahalli, Bengaluru",Hyderabad:"Kukatpally, Hyderabad",Chennai:"Porur, Chennai",Pune:"Hadapsar, Pune",Kolkata:"Garia, Kolkata",Ahmedabad:"Nikol, Ahmedabad"},
    quotes:["Great post-event cleanup. Efficient and friendly.","Thorough and quick. Really good value."] },
  { id:11, name:"Meena Krishnan",  cat:"cleaner",     rate:1600, exp:"5 years",  rating:"4.7", reviews:118, status:"Busy",      icon:"🧹",
    addresses:{Delhi:"Lajpat Nagar, New Delhi",Mumbai:"Chembur, Mumbai",Bangalore:"Banashankari, Bengaluru",Hyderabad:"Dilsukhnagar, Hyderabad",Chennai:"Tambaram, Chennai",Pune:"Kondhwa, Pune",Kolkata:"Howrah, Kolkata",Ahmedabad:"Odhav, Ahmedabad"},
    quotes:["Kitchen and bathrooms sparkle after she is done.","Always brings her own supplies. Very organised."] },
  { id:12, name:"Sunita Bose",     cat:"cleaner",     rate:1300, exp:"2 years",  rating:"4.1", reviews:44,  status:"Available", icon:"🧹",
    addresses:{Delhi:"Karol Bagh, New Delhi",Mumbai:"Goregaon West, Mumbai",Bangalore:"Yeshwanthpur, Bengaluru",Hyderabad:"Kompally, Hyderabad",Chennai:"Sholinganallur, Chennai",Pune:"Kharadi, Pune",Kolkata:"Tollygunge, Kolkata",Ahmedabad:"Chandkheda, Ahmedabad"},
    quotes:["New but very hardworking. Cleaned every corner.","Affordable and reliable. Good for regular weekly cleaning."] },

  /* --- TUTORS --- */
  { id:13, name:"Anita Desai",     cat:"tutor",       rate:3000, exp:"8 years",  rating:"4.9", reviews:204, status:"Available", icon:"📚",
    addresses:{Delhi:"Vasant Kunj, New Delhi",Mumbai:"Powai, Mumbai",Bangalore:"Whitefield, Bengaluru",Hyderabad:"Gachibowli, Hyderabad",Chennai:"Besant Nagar, Chennai",Pune:"Kalyani Nagar, Pune",Kolkata:"Ballygunge, Kolkata",Ahmedabad:"Prahlad Nagar, Ahmedabad"},
    quotes:["My son scored first class after just two sessions.","Incredibly patient and explains concepts very clearly."] },
  { id:14, name:"Rohit Joshi",     cat:"tutor",       rate:2000, exp:"4 years",  rating:"4.5", reviews:78,  status:"Busy",      icon:"📚",
    addresses:{Delhi:"Pitampura, New Delhi",Mumbai:"Goregaon, Mumbai",Bangalore:"Electronic City, Bengaluru",Hyderabad:"LB Nagar, Hyderabad",Chennai:"Chromepet, Chennai",Pune:"Magarpatta, Pune",Kolkata:"Tollygunge, Kolkata",Ahmedabad:"Gota, Ahmedabad"},
    quotes:["Explains maths in a very simple way. Highly recommend.","My daughter loves her sessions. Very engaging."] },
  { id:15, name:"Deepa Menon",     cat:"tutor",       rate:2200, exp:"9 years",  rating:"4.8", reviews:193, status:"Available", icon:"📚",
    addresses:{Delhi:"Greater Kailash, New Delhi",Mumbai:"Versova, Mumbai",Bangalore:"Jayanagar, Bengaluru",Hyderabad:"Banjara Hills, Hyderabad",Chennai:"Adyar, Chennai",Pune:"Shivajinagar, Pune",Kolkata:"Bhowanipore, Kolkata",Ahmedabad:"Satellite, Ahmedabad"},
    quotes:["Specialises in Science and English. Brilliant educator.","My child went from average to top of class in one term."] },
  { id:16, name:"Karthik Subbu",   cat:"tutor",       rate:1700, exp:"3 years",  rating:"4.3", reviews:62,  status:"Available", icon:"📚",
    addresses:{Delhi:"Dwarka, New Delhi",Mumbai:"Malad East, Mumbai",Bangalore:"Sarjapur, Bengaluru",Hyderabad:"Madhapur, Hyderabad",Chennai:"Porur, Chennai",Pune:"Wakad, Pune",Kolkata:"Salt Lake, Kolkata",Ahmedabad:"Bopal, Ahmedabad"},
    quotes:["Great at coding and maths for Class 10 and 11 students.","Very patient and uses real examples to explain topics."] },

  /* --- DELIVERY --- */
  { id:17, name:"Ajay Kulkarni",   cat:"delivery",    rate:1000, exp:"3 years",  rating:"4.6", reviews:98,  status:"Available", icon:"📦",
    addresses:{Delhi:"Karol Bagh, New Delhi",Mumbai:"Kurla, Mumbai",Bangalore:"Banashankari, Bengaluru",Hyderabad:"Dilsukhnagar, Hyderabad",Chennai:"Tambaram, Chennai",Pune:"Kondhwa, Pune",Kolkata:"Howrah, Kolkata",Ahmedabad:"Odhav, Ahmedabad"},
    quotes:["Fast, careful with fragile items, very trustworthy.","Always on time. Has never once let us down."] },
  { id:18, name:"Vikram Singh",    cat:"delivery",    rate:1200, exp:"2 years",  rating:"4.1", reviews:55,  status:"Busy",      icon:"📦",
    addresses:{Delhi:"Connaught Place, New Delhi",Mumbai:"MG Road, Mumbai",Bangalore:"MG Road, Bengaluru",Hyderabad:"MG Road, Hyderabad",Chennai:"MG Road, Chennai",Pune:"MG Road, Pune",Kolkata:"MG Road, Kolkata",Ahmedabad:"MG Road, Ahmedabad"},
    quotes:["Delivered our office packages on time every time.","Reliable and polite. Very easy to work with."] },
  { id:19, name:"Ravi Teja",       cat:"delivery",    rate:1000, exp:"1 year",   rating:"4.0", reviews:31,  status:"Available", icon:"📦",
    addresses:{Delhi:"Shahdara, New Delhi",Mumbai:"Mankhurd, Mumbai",Bangalore:"Hennur, Bengaluru",Hyderabad:"Uppal, Hyderabad",Chennai:"Avadi, Chennai",Pune:"Bhosari, Pune",Kolkata:"Dum Dum, Kolkata",Ahmedabad:"Vatva, Ahmedabad"},
    quotes:["New to the platform but super dedicated.","Handles packages with care. Will book again."] },
  { id:20, name:"Imran Sheikh",    cat:"delivery",    rate:1300, exp:"5 years",  rating:"4.7", reviews:142, status:"Available", icon:"📦",
    addresses:{Delhi:"Okhla, New Delhi",Mumbai:"Dharavi, Mumbai",Bangalore:"KR Puram, Bengaluru",Hyderabad:"Secunderabad, Hyderabad",Chennai:"Perambur, Chennai",Pune:"Hadapsar, Pune",Kolkata:"Barrackpore, Kolkata",Ahmedabad:"Maninagar, Ahmedabad"},
    quotes:["5 years of delivery experience. Never missed a deadline.","Very communicative — sends updates throughout."] },

  /* --- PAINTERS --- */
  { id:21, name:"Mohammed Farhan", cat:"painter",     rate:2000, exp:"9 years",  rating:"4.8", reviews:145, status:"Available", icon:"🎨",
    addresses:{Delhi:"Hauz Khas, New Delhi",Mumbai:"Worli, Mumbai",Bangalore:"Jayanagar, Bengaluru",Hyderabad:"Tolichowki, Hyderabad",Chennai:"Kodambakkam, Chennai",Pune:"Deccan, Pune",Kolkata:"Bhowanipore, Kolkata",Ahmedabad:"Paldi, Ahmedabad"},
    quotes:["Painted our whole house in 2 days. Incredibly clean finish.","Outstanding attention to detail. Walls look brand new."] },
  { id:22, name:"Sanjay Gupta",    cat:"painter",     rate:1800, exp:"5 years",  rating:"4.3", reviews:72,  status:"Available", icon:"🎨",
    addresses:{Delhi:"Rajouri Garden, New Delhi",Mumbai:"Malad, Mumbai",Bangalore:"Rajajinagar, Bengaluru",Hyderabad:"Kompally, Hyderabad",Chennai:"Mogappair, Chennai",Pune:"Chinchwad, Pune",Kolkata:"Uttarpara, Kolkata",Ahmedabad:"Chandkheda, Ahmedabad"},
    quotes:["Did a great texture paint job in the living room.","Clean, professional, and finished on schedule."] },
  { id:23, name:"Prakash Lokhande",cat:"painter",     rate:1600, exp:"6 years",  rating:"4.5", reviews:99,  status:"Busy",      icon:"🎨",
    addresses:{Delhi:"Shakarpur, New Delhi",Mumbai:"Vikhroli, Mumbai",Bangalore:"Nagarbhavi, Bengaluru",Hyderabad:"Nacharam, Hyderabad",Chennai:"Valasaravakkam, Chennai",Pune:"Bibwewadi, Pune",Kolkata:"Sodepur, Kolkata",Ahmedabad:"Naroda, Ahmedabad"},
    quotes:["Great with waterproofing and exterior painting.","Very systematic — laid protection sheets everywhere."] },
  { id:24, name:"Deepak Chauhan",  cat:"painter",     rate:2200, exp:"14 years", rating:"4.9", reviews:231, status:"Available", icon:"🎨",
    addresses:{Delhi:"Defence Colony, New Delhi",Mumbai:"Napean Sea Road, Mumbai",Bangalore:"Dollars Colony, Bengaluru",Hyderabad:"Film Nagar, Hyderabad",Chennai:"Boat Club Road, Chennai",Pune:"Koregaon Park, Pune",Kolkata:"Alipore, Kolkata",Ahmedabad:"Bodakdev, Ahmedabad"},
    quotes:["14 years experience. Our villa has never looked better.","Premium finish, premium service. Worth every rupee."] }
];

const ILLUS_BG = {
  electrician:"#fff8e1", plumber:"#e3f2fd", cleaner:"#e8f5e9",
  tutor:"#f3e5f5", delivery:"#fff3e0", painter:"#fce4ec"
};

let selectedCity = "Bangalore";

/* ---- STORAGE ---- */
function saveProfile(d) { sessionStorage.setItem("sh_profile",  JSON.stringify(d)); }
function loadProfile()   { try{ return JSON.parse(sessionStorage.getItem("sh_profile"))||null; }catch(e){ return null; } }
function saveBookings(l) { sessionStorage.setItem("sh_bookings", JSON.stringify(l)); }
function loadBookings()  { try{ return JSON.parse(sessionStorage.getItem("sh_bookings"))||[]; }catch(e){ return []; } }
function saveCity(c)     { sessionStorage.setItem("sh_city", c); }
function loadCity()      { return sessionStorage.getItem("sh_city") || null; }

/* =========================================================
   1. LOCATION MODAL — city buttons + pincode auto-detect
   ========================================================= */
function setupLocationModal() {
  const overlay = document.getElementById("locationModal");
  if (!overlay) return;

  const cities = ["Delhi","Mumbai","Bangalore","Hyderabad","Chennai","Pune","Kolkata","Ahmedabad"];
  const grid   = document.getElementById("cityGrid");
  if (grid) {
    grid.innerHTML = "";
    cities.forEach(function(city) {
      const btn = document.createElement("button");
      btn.className    = "loc-city-btn";
      btn.textContent  = city;
      btn.dataset.city = city;
      if (city === selectedCity) btn.classList.add("selected");
      btn.addEventListener("click", function() {
        document.querySelectorAll(".loc-city-btn").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        selectedCity = city;
        clearPincodeStatus();
      });
      grid.appendChild(btn);
    });
  }

  /* Pincode auto-detect */
  const pincodeInput = document.getElementById("pincodeInput");
  const statusMsg    = document.getElementById("pincodeStatus");
  if (pincodeInput) {
    pincodeInput.addEventListener("input", function() {
      const val = pincodeInput.value.trim();
      if (val.length === 6 && /^\d{6}$/.test(val)) {
        detectCityFromPincode(val, statusMsg);
      } else {
        clearPincodeStatus();
      }
    });
  }

  document.getElementById("locConfirm").addEventListener("click", function() {
    applyCity(selectedCity);
    sessionStorage.setItem("sh_modal_shown", "1");
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  });

  const saved              = loadCity();
  const shownThisSession   = sessionStorage.getItem("sh_modal_shown");

  if (saved || shownThisSession) {
    /* City already chosen this session — apply it silently, no popup */
    if (saved) {
      selectedCity = saved;
      applyCity(selectedCity);
    }
    sessionStorage.setItem("sh_modal_shown", "1");
  } else {
    /* First ever open — show the popup */
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  const pill = document.getElementById("navLocationPill");
  if (pill) {
    pill.addEventListener("click", function() {
      document.querySelectorAll(".loc-city-btn").forEach(b =>
        b.classList.toggle("selected", b.dataset.city === selectedCity));
      overlay.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  }
}

/* Pincode → city via India Post API with local fallback */
const PINCODE_MAP = {
  "11":"Delhi","12":"Delhi","13":"Delhi",
  "40":"Mumbai","41":"Pune",
  "56":"Bangalore","57":"Bangalore","58":"Bangalore",
  "50":"Hyderabad",
  "60":"Chennai","61":"Chennai","62":"Chennai",
  "70":"Kolkata","71":"Kolkata","72":"Kolkata","73":"Kolkata","74":"Kolkata",
  "38":"Ahmedabad","39":"Ahmedabad"
};

function detectCityFromPincode(pincode, statusEl) {
  if (statusEl) { statusEl.textContent = "🔍 Detecting..."; statusEl.className = "pincode-status detecting"; }
  fetch("https://api.postalpincode.in/pincode/" + pincode)
    .then(function(r){ return r.json(); })
    .then(function(data) {
      if (data && data[0] && data[0].Status === "Success" && data[0].PostOffice && data[0].PostOffice.length > 0) {
        const po = data[0].PostOffice[0];
        const detected = matchToCity(po.District||"", po.State||"", po.Name||"");
        if (detected) {
          selectedCity = detected;
          document.querySelectorAll(".loc-city-btn").forEach(function(b){
            b.classList.toggle("selected", b.dataset.city === detected);
          });
          if (statusEl) { statusEl.innerHTML = "✅ <strong>" + (po.Name||po.District) + "</strong> → " + detected; statusEl.className = "pincode-status success"; }
        } else {
          if (statusEl) { statusEl.innerHTML = "📍 <strong>" + (po.Name||po.District) + ", " + po.State + "</strong>"; statusEl.className = "pincode-status found"; }
        }
      } else {
        fallbackPincode(pincode, statusEl);
      }
    })
    .catch(function(){ fallbackPincode(pincode, statusEl); });
}

function fallbackPincode(pincode, statusEl) {
  const city = PINCODE_MAP[pincode.substring(0,2)];
  if (city) {
    selectedCity = city;
    document.querySelectorAll(".loc-city-btn").forEach(function(b){
      b.classList.toggle("selected", b.dataset.city === city);
    });
    if (statusEl) { statusEl.innerHTML = "📍 City set to <strong>" + city + "</strong>"; statusEl.className = "pincode-status found"; }
  } else {
    if (statusEl) { statusEl.textContent = "⚠️ Pincode not found. Please select city manually."; statusEl.className = "pincode-status error"; }
  }
}

function matchToCity(district, state, area) {
  const all = (district + " " + state + " " + area).toLowerCase();
  if (all.includes("delhi"))                                          return "Delhi";
  if (all.includes("mumbai")||all.includes("thane")||all.includes("navi mumbai")) return "Mumbai";
  if (all.includes("bangalore")||all.includes("bengaluru"))          return "Bangalore";
  if (all.includes("hyderabad")||all.includes("rangareddy"))         return "Hyderabad";
  if (all.includes("chennai")||all.includes("kanchipuram")||all.includes("tiruvallur")) return "Chennai";
  if (all.includes("pune"))                                           return "Pune";
  if (all.includes("kolkata")||all.includes("howrah")||all.includes("north 24")) return "Kolkata";
  if (all.includes("ahmedabad")||all.includes("gandhinagar"))        return "Ahmedabad";
  return null;
}

function clearPincodeStatus() {
  const s = document.getElementById("pincodeStatus");
  if (s) { s.textContent = ""; s.className = "pincode-status"; }
}

function applyCity(city) {
  selectedCity = city;
  saveCity(city);
  const pill  = document.getElementById("navLocationPill");
  if (pill)  pill.textContent = "📍 " + city;
  const badge = document.getElementById("filterLocationTag");
  if (badge) badge.textContent = "📍 " + city + " ✏️";
  const pc = document.getElementById("disp_city");
  if (pc)  pc.textContent = city;
  renderWorkerCards();
  renderServiceCards();
}

/* =========================================================
   2. HOME PAGE — render one card per category + live filter
   ========================================================= */
function renderHomeCards(filterCat) {
  const grid = document.getElementById("homeCardsGrid");
  if (!grid) return;

  /* Pick the top-rated available worker per category */
  var cats = ["electrician","plumber","cleaner","tutor","delivery","painter"];
  var shown = [];

  cats.forEach(function(cat) {
    if (filterCat && filterCat !== "" && cat !== filterCat) return;
    /* Find best available worker in this category */
    var best = null;
    WORKERS.forEach(function(w) {
      if (w.cat !== cat) return;
      if (!best || parseFloat(w.rating) > parseFloat(best.rating)) best = w;
    });
    if (best) shown.push(best);
  });

  grid.innerHTML = "";

  if (shown.length === 0) {
    grid.innerHTML = '<p style="color:var(--muted);text-align:center;grid-column:1/-1;padding:32px 0;">No workers found for this category.</p>';
    return;
  }

  shown.forEach(function(w, i) {
    var address = w.addresses[selectedCity] || w.addresses["Bangalore"];
    var card = document.createElement("article");
    card.className = "card";
    card.dataset.category = w.cat;
    card.innerHTML =
      '<div class="card-body">' +
        '<div class="card-header">' +
          '<span class="card-icon">' + w.icon + '</span>' +
          '<div class="card-header-info">' +
            '<div class="card-name">' + w.name + '</div>' +
            '<span class="tag ' + (w.status === "Available" ? "tag-available" : "tag-busy") + '">' + w.status + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="card-cat">' + w.cat.charAt(0).toUpperCase() + w.cat.slice(1) + '</div>' +
        '<div style="font-size:.8rem;color:var(--muted);margin-bottom:4px;">⭐ ' + w.rating + ' · ' + w.exp + '</div>' +
        '<div class="card-loc">📍 ' + address + '</div>' +
        '<div class="card-footer">' +
          '<div class="rate">₹' + w.rate + ' <small>/hr</small></div>' +
          '<a href="booking.html?worker=' + encodeURIComponent(w.name) + '&service=' + w.cat + '&rate=' + w.rate + '" class="btn btn-outline" style="padding:7px 16px;font-size:.82rem;">Book</a>' +
        '</div>' +
      '</div>';
    grid.appendChild(card);
  });
}

function setupHomeSearch() {
  var sel = document.getElementById("searchCategory");
  if (!sel) return;

  /* Render all 6 on page load */
  renderHomeCards("");

  /* Filter on every dropdown change instantly */
  sel.addEventListener("change", function() {
    renderHomeCards(sel.value);
  });
}

/* =========================================================
   3. RENDER WORKER CARDS
   ========================================================= */
function renderWorkerCards() {
  const grid = document.getElementById("workerGrid");
  if (!grid) return;
  const catVal = (document.getElementById("workerFilter")||{}).value || "all";
  grid.innerHTML = "";
  WORKERS.forEach(function(w, i) {
    if (catVal !== "all" && w.cat !== catVal) return;
    const address = w.addresses[selectedCity] || w.addresses["Bangalore"];
    const card = document.createElement("article");
    card.className = "worker-card fade";
    card.style.animationDelay = (i * 0.05) + "s";
    card.innerHTML = `
      <div class="worker-body">
        <div class="worker-header">
          <span class="worker-icon">${w.icon}</span>
          <div class="worker-header-info">
            <div class="worker-name">${w.name}</div>
            <span class="tag ${w.status==="Available"?"tag-available":"tag-busy"}">${w.status}</span>
          </div>
        </div>
        <div class="worker-cat">${w.cat.charAt(0).toUpperCase()+w.cat.slice(1)}</div>
        <div class="worker-stars">${"⭐".repeat(Math.round(parseFloat(w.rating)))} <span>(${w.rating} · ${w.reviews} reviews)</span></div>
        <div class="worker-details">
          <span class="worker-exp">🏆 ${w.exp}</span>
          <span class="worker-loc">📍 ${address}</span>
        </div>
        <div class="worker-quote">"${w.quotes[0]}"</div>
        <div class="worker-footer">
          <div class="rate">₹${w.rate} <small>/hr</small></div>
          <span class="worker-view-link">View Profile →</span>
        </div>
      </div>`;
    card.addEventListener("click", function() { openWorkerModal(w, address); });
    grid.appendChild(card);
  });
}

function renderServiceCards() {
  const grid = document.getElementById("serviceGrid");
  if (!grid) return;
  const catVal = (document.getElementById("filterCategory")||{}).value || "all";
  const kmVal  = (document.getElementById("filterLocation") ||{}).value || "all";
  var DISTS = [3,7,8,4,4,12,6,9,10,3,7,15,5,8,6,11,4,9,13,6,7,5,10,8];
  grid.innerHTML = "";
  WORKERS.forEach(function(w, i) {
    const dist = DISTS[i];
    if (catVal !== "all" && w.cat !== catVal) return;
    if (kmVal  !== "all" && dist > parseInt(kmVal)) return;
    const address = w.addresses[selectedCity] || w.addresses["Bangalore"];
    const card = document.createElement("article");
    card.className = "card fade";
    card.innerHTML = `
      <div class="card-body">
        <div class="card-header">
          <span class="card-icon">${w.icon}</span>
          <div class="card-header-info">
            <div class="card-name">${w.name}</div>
            <span class="tag ${w.status==="Available"?"tag-available":"tag-busy"}">${w.status}</span>
          </div>
        </div>
        <div class="card-cat">${w.cat.charAt(0).toUpperCase()+w.cat.slice(1)}</div>
        <div class="card-loc">📍 ${address}, ${dist}km</div>
        <div class="card-footer">
          <div class="rate">₹${w.rate} <small>/hr</small></div>
          <a href="booking.html?worker=${encodeURIComponent(w.name)}&service=${w.cat}&rate=${w.rate}" class="btn btn-outline" style="padding:7px 16px;font-size:.82rem;">Book</a>
        </div>
      </div>`;
    grid.appendChild(card);
  });
}

/* =========================================================
   4. WORKER POPUP MODAL
   ========================================================= */
function openWorkerModal(w, address) {
  const overlay = document.getElementById("workerModal");
  if (!overlay) return;
  const bg = ILLUS_BG[w.cat] || "#f5f0e8";
  const illustEl = document.getElementById("modalIllus");
  illustEl.style.background = bg;
  illustEl.querySelector(".modal-illus-icon").textContent = w.icon;
  document.getElementById("modalName").textContent     = w.name;
  document.getElementById("modalCat").textContent      = w.cat.charAt(0).toUpperCase() + w.cat.slice(1);
  document.getElementById("modalRating").textContent   = "⭐ " + w.rating + " (" + w.reviews + " reviews)";
  document.getElementById("modalExp").textContent      = w.exp;
  document.getElementById("modalLocation").textContent = address;
  document.getElementById("modalRate").innerHTML       = "₹" + w.rate + " <small>/hr</small>";
  const statusEl = document.getElementById("modalStatus");
  statusEl.textContent = w.status;
  statusEl.className   = "tag " + (w.status === "Available" ? "tag-available" : "tag-busy");
  const rc = document.getElementById("modalReviews");
  rc.innerHTML = "";
  w.quotes.forEach(function(q) {
    const d = document.createElement("div");
    d.className   = "modal-review";
    d.textContent = '"' + q + '"';
    rc.appendChild(d);
  });
  var rateBottomEl = document.getElementById("modalRateBottom");
  if (rateBottomEl) rateBottomEl.textContent = "₹" + w.rate;
  document.getElementById("modalBookBtn").href = "booking.html?worker=" + encodeURIComponent(w.name) + "&service=" + w.cat + "&rate=" + w.rate;
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function setupWorkerModal() {
  const overlay = document.getElementById("workerModal");
  if (!overlay) return;
  function close() { overlay.classList.remove("open"); document.body.style.overflow = ""; }
  document.getElementById("modalClose").addEventListener("click", close);
  overlay.addEventListener("click", function(e) { if (e.target === overlay) close(); });
  document.addEventListener("keydown", function(e) { if (e.key === "Escape") close(); });
}

/* =========================================================
   5. FILTERS
   ========================================================= */
function setupFilters() {
  const cf = document.getElementById("filterCategory");
  const lf = document.getElementById("filterLocation");
  const wf = document.getElementById("workerFilter");
  if (cf) cf.addEventListener("change", renderServiceCards);
  if (lf) lf.addEventListener("change", renderServiceCards);
  if (wf) wf.addEventListener("change", renderWorkerCards);
}

/* =========================================================
   6. BOOKING PAGE
   ========================================================= */
function setupBooking() {
  const sel = document.getElementById("serviceType");
  if (!sel) return;
  const defaultRates = { electrician:750, plumber:1250, cleaner:1500, tutor:3000, delivery:1000, painter:2000 };
  const params = new URLSearchParams(window.location.search);
  const wParam = params.get("worker");
  const sParam = params.get("service");
  const rParam = params.get("rate");
  const workerRate = rParam ? parseInt(rParam) : 0;
  if (wParam && document.getElementById("workerName"))
    document.getElementById("workerName").value = decodeURIComponent(wParam);
  if (sParam) { const opt = sel.querySelector('option[value="'+sParam+'"]'); if(opt) sel.value=sParam; }

  const profile = loadProfile();
  if (profile) {
    const nf = document.getElementById("customerName");
    const pf = document.getElementById("customerPhone");
    if (nf && profile.name)  nf.value = profile.name;
    if (pf && profile.phone) pf.value = profile.phone;
  }

  function calc() {
    const rate      = (workerRate && sel.value === sParam) ? workerRate : (defaultRates[sel.value]||0);
    const hours     = parseFloat(document.getElementById("hoursRequired").value)||1;
    const emergency = document.getElementById("emergencyService").checked?1000:0;
    const tools     = document.getElementById("toolsProvided").checked?800:0;
    const subtotal  = (rate*hours)+emergency+tools;
    const comm      = Math.round(subtotal*0.10);
    const set = (id,v) => { const e=document.getElementById(id); if(e) e.textContent=v; };
    set("sumService",   sel.value.charAt(0).toUpperCase()+sel.value.slice(1));
    set("sumRate",      "₹"+rate+"/hr");
    set("sumHours",     hours+" hr(s)");
    set("sumAddons",    "₹"+(emergency+tools));
    set("sumWorker",    "₹"+(subtotal-comm));
    set("sumCommission","₹"+comm);
    set("sumTotal",     "₹"+subtotal);
  }
  ["serviceType","hoursRequired","emergencyService","toolsProvided"].forEach(function(id){
    const el=document.getElementById(id);
    if(el){el.addEventListener("change",calc);el.addEventListener("input",calc);}
  });
  calc();

  const form = document.getElementById("bookingForm");
  if (!form) return;
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const dateVal = document.getElementById("bookingDate").value;
    const slot    = form.querySelector('input[name="slot"]:checked');
    const worker  = document.getElementById("workerName").value || "Any available";
    const service = sel.value;
    const hours   = parseFloat(document.getElementById("hoursRequired").value)||1;
    const rate    = (workerRate && service === sParam) ? workerRate : (defaultRates[service]||0);
    const emergency = document.getElementById("emergencyService").checked?1000:0;
    const tools     = document.getElementById("toolsProvided").checked?800:0;
    const total   = (rate*hours)+emergency+tools;
    const dateDisplay = dateVal ? new Date(dateVal+"T00:00:00").toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}) : "—";

    const booking = {
      id:       "BK"+Date.now(),
      worker:   worker,
      service:  service.charAt(0).toUpperCase()+service.slice(1),
      date:     dateDisplay,
      slot:     slot ? slot.value : "—",
      hours:    hours,
      total:    total,
      status:   "Upcoming",
      city:     selectedCity,
      bookedOn: new Date().toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})
    };
    const existing = loadBookings();
    existing.unshift(booking);
    saveBookings(existing);

    const confirm = document.getElementById("bookingConfirm");
    if (confirm) {
      confirm.innerHTML = "✅ Booking confirmed! <strong>"+booking.service+"</strong> with <strong>"+worker+"</strong> on <strong>"+dateDisplay+"</strong>. <a href='account.html' style='color:var(--green);font-weight:600;text-decoration:underline'>View in My Account →</a>";
      confirm.classList.add("show");
    }
    window.scrollTo({top:0,behavior:"smooth"});
    form.reset();
    calc();
  });
}

/* =========================================================
   7. ACCOUNT PAGE
   ========================================================= */
function setupAccount() {
  /* Tab switching */
  const tabLinks = document.querySelectorAll(".account-nav a[data-tab]");
  tabLinks.forEach(function(link) {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      tabLinks.forEach(l => l.classList.remove("active"));
      document.querySelectorAll(".account-panel").forEach(p => p.classList.remove("active"));
      link.classList.add("active");
      const panel = document.getElementById("panel-"+link.dataset.tab);
      if (panel) panel.classList.add("active");
    });
  });

  setupProfilePanel();
  renderBookingHistory();
  setupAddresses();
  updateRatingFromBookings(); /* new: sync rating with booking count */
}

function setupProfilePanel() {
  const panel = document.getElementById("panel-profile");
  if (!panel) return;
  const profile    = loadProfile();
  const savedView  = document.getElementById("profileSaved");
  const createForm = document.getElementById("profileCreateForm");

  if (profile) {
    showSavedProfile(profile);
    if (savedView)  savedView.style.display  = "block";
    if (createForm) createForm.style.display = "none";
  } else {
    if (savedView)  savedView.style.display  = "none";
    if (createForm) createForm.style.display = "block";
  }

  const form = document.getElementById("profileForm");
  if (form) {
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
      showSavedProfile(data);
      if (createForm) createForm.style.display = "none";
      if (savedView)  savedView.style.display  = "block";
    });
  }

  const editBtn = document.getElementById("editProfileBtn");
  if (editBtn) {
    editBtn.addEventListener("click", function() {
      const p = loadProfile();
      if (p) {
        document.getElementById("pf_name").value   = p.name   || "";
        document.getElementById("pf_phone").value  = p.phone  || "";
        document.getElementById("pf_email").value  = p.email  || "";
        document.getElementById("pf_dob").value    = p.dob    || "";
        document.getElementById("pf_gender").value = p.gender || "";
      }
      if (savedView)  savedView.style.display  = "none";
      if (createForm) createForm.style.display = "block";
    });
  }
}

function showSavedProfile(p) {
  const set = (id,v) => { const e=document.getElementById(id); if(e) e.textContent=v; };
  set("disp_name",    p.name   || "—");
  set("disp_phone",   p.phone  || "—");
  set("disp_email",   p.email  || "—");
  set("disp_gender",  p.gender || "—");
  set("disp_city",    p.city   || selectedCity);
  set("disp_initial", p.name   ? p.name.charAt(0).toUpperCase() : "?");
  set("disp_dob",     p.dob ? new Date(p.dob+"T00:00:00").toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}) : "—");
  const av = document.getElementById("sidebarInitial");
  const an = document.getElementById("sidebarName");
  const ap = document.getElementById("sidebarPhone");
  if (av) av.textContent = p.name ? p.name.charAt(0).toUpperCase() : "?";
  if (an) an.textContent = p.name  || "Your Name";
  if (ap) ap.textContent = p.phone || "";
}

/* Render booking history — also update stats */
function renderBookingHistory() {
  const container = document.getElementById("bookingHistoryList");
  if (!container) return;
  const bookings = loadBookings();

  /* Update quick stats */
  const t = document.getElementById("statTotal");
  const u = document.getElementById("statUpcoming");
  const d = document.getElementById("statDone");
  if (t) t.textContent = bookings.length;
  if (u) u.textContent = bookings.filter(b=>b.status==="Upcoming").length;
  if (d) d.textContent = bookings.filter(b=>b.status==="Completed").length;

  /* Update total spent summary box */
  const spentBox = document.getElementById("spentSummary");
  const spentAmt = document.getElementById("totalSpentAmt");
  const spentCnt = document.getElementById("totalSpentCount");
  const spentAvg = document.getElementById("totalSpentAvg");
  if (spentBox && bookings.length > 0) {
    const totalRs = bookings.reduce(function(sum,b){ return sum + (b.total||0); }, 0);
    const avg     = Math.round(totalRs / bookings.length);
    spentBox.style.display = "flex";
    if (spentAmt) spentAmt.textContent = "₹" + totalRs.toLocaleString("en-IN");
    if (spentCnt) spentCnt.textContent = bookings.length;
    if (spentAvg) spentAvg.textContent = "₹" + avg.toLocaleString("en-IN");
  } else if (spentBox) {
    spentBox.style.display = "none";
  }

  if (bookings.length === 0) {
    container.innerHTML = '<div style="text-align:center;padding:36px;color:var(--muted)">' +
      '<div style="font-size:2.5rem;margin-bottom:12px">📋</div>' +
      '<p style="margin-bottom:16px;font-size:.9rem">No bookings yet.</p>' +
      '<a href="services.html" class="btn btn-dark" style="font-size:.85rem;padding:9px 22px;">Browse Services →</a>' +
      '</div>';
    return;
  }

  const ICON = {electrician:"⚡",plumber:"🔧",cleaner:"🧹",tutor:"📚",delivery:"📦",painter:"🎨"};
  container.innerHTML = bookings.map(function(b) {
    const icon  = ICON[b.service.toLowerCase()] || "🔧";
    const badge = b.status==="Completed"?"bk-done":b.status==="Cancelled"?"bk-cancel":"bk-upcoming";
    return '<div class="booking-item">' +
      '<div class="bk-info"><h4>' + icon + ' ' + b.service + ' — ' + b.worker + '</h4>' +
      '<p>📅 ' + b.date + ' · ' + b.slot + ' · ' + b.hours + ' hr(s) · ' + b.city + '</p></div>' +
      '<span class="bk-status ' + badge + '">' + b.status + '</span>' +
      '<span class="bk-amount">₹' + (b.total||0).toLocaleString("en-IN") + '</span>' +
      '</div>';
  }).join("");
}

/* Update rating panel based on number of bookings */
function updateRatingFromBookings() {
  const bookings   = loadBookings();
  const count      = bookings.length;
  const noRating   = document.getElementById("noRatingMsg");
  const ratingSection = document.getElementById("ratingSection");
  const statRating = document.getElementById("statRating");

  if (count === 0) {
    if (noRating)   noRating.style.display   = "block";
    if (ratingSection) ratingSection.style.display = "none";
    if (statRating) statRating.textContent   = "No ratings yet";
    return;
  }

  /* Score formula: 4.0 base, +0.16 per booking, max 4.9 */
  const score = Math.min(4.9, 4.0 + count * 0.16).toFixed(1);
  const scoreNum = parseFloat(score);
  const fullStars = Math.round(scoreNum);
  const starsStr  = "⭐".repeat(fullStars);

  if (document.getElementById("ratingBigNum"))   document.getElementById("ratingBigNum").textContent   = score;
  if (document.getElementById("ratingBigStars")) document.getElementById("ratingBigStars").textContent = starsStr;
  if (document.getElementById("ratingBigCount")) document.getElementById("ratingBigCount").textContent = "Based on " + count + " booking" + (count===1?"":"s");
  if (noRating)   noRating.style.display   = "none";
  if (ratingSection) ratingSection.style.display = "block";
  if (statRating) statRating.textContent   = "⭐ " + score + " / 5";

  /* Build star breakdown bars */
  const breakdown = document.getElementById("ratingBreakdown");
  if (breakdown) {
    /* Distribute ratings across stars proportionally */
    const dist = { 5: Math.round(count*0.6), 4: Math.round(count*0.25), 3: Math.round(count*0.1), 2:0, 1:0 };
    dist[5] = Math.max(1, dist[5]);
    breakdown.innerHTML = [5,4,3,2,1].map(function(s) {
      var n   = dist[s] || 0;
      var pct = count > 0 ? Math.round((n/count)*100) : 0;
      return '<div class="rating-row">' +
        '<span class="rl">' + s + ' ⭐</span>' +
        '<div class="rating-bar"><div class="rating-bar-fill" style="width:' + pct + '%"></div></div>' +
        '<span class="rc">' + n + '</span>' +
        '</div>';
    }).join("");
  }

  /* Auto-generate worker reviews from actual bookings */
  const reviewsEl = document.getElementById("workerReviewsList");
  if (reviewsEl) {
    const COMMENTS = [
      "Very polite and cooperative. Made my job much easier.",
      "Explained the issue clearly before I started. Great customer.",
      "House was ready before I arrived. Very organised person.",
      "Patient and easy to communicate with. Would work again.",
      "Gave clear instructions and was present throughout. Professional.",
      "Quick to respond and very accommodating with timing."
    ];
    const ICON = {Electrician:"⚡",Plumber:"🔧",Cleaner:"🧹",Tutor:"📚",Delivery:"📦",Painter:"🎨"};
    reviewsEl.innerHTML = bookings.slice(0,5).map(function(b,i) {
      var icon    = ICON[b.service] || "🔧";
      var comment = COMMENTS[i % COMMENTS.length];
      var rStar   = (i===2) ? 4 : 5;
      var starStr = "";
      for(var s=0; s<rStar; s++) starStr += "⭐";
      return '<div class="wr-item">' +
        '<div class="wr-who">' +
          '<span>' + icon + ' ' + b.worker + ' — ' + b.service + '</span>' +
          '<span style="color:#c8a02e">' + starStr + ' ' + rStar + '</span>' +
        '</div>' +
        '<div class="wr-text">"' + comment + '"</div>' +
        '<div class="wr-date">' + b.date + '</div>' +
        '</div>';
    }).join("");
  }
}

function setupAddresses() {
  const addBtn = document.getElementById("addAddressBtn");
  if (!addBtn) return;
  addBtn.addEventListener("click", function() {
    const label   = document.getElementById("newAddrLabel").value.trim();
    const address = document.getElementById("newAddrText").value.trim();
    if (!label || !address) { alert("Please fill in both label and address."); return; }
    const list = document.getElementById("addressList");
    const item = document.createElement("div");
    item.className = "address-item";
    item.innerHTML = `<div class="addr-info"><h4>📍 ${label}</h4><p>${address}</p></div>
      <button class="addr-del" onclick="this.closest('.address-item').remove()">🗑 Remove</button>`;
    list.appendChild(item);
    document.getElementById("newAddrLabel").value = "";
    document.getElementById("newAddrText").value  = "";
  });
  document.querySelectorAll(".addr-del").forEach(function(btn) {
    btn.addEventListener("click", function() { btn.closest(".address-item").remove(); });
  });
}

/* =========================================================
   8. CONTACT FORM
   ========================================================= */
function setupContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    document.getElementById("successBanner").classList.remove("show");
    const name  = document.getElementById("contactName");
    const email = document.getElementById("contactEmail");
    const msg   = document.getElementById("contactMessage");
    let valid   = true;
    function check(f,errId,bad) {
      const err=document.getElementById(errId);
      f.classList.toggle("input-error",bad);
      err.classList.toggle("show",bad);
      if(bad) valid=false;
    }
    check(name,  "nameError",    name.value.trim()==="");
    check(email, "emailError",   !/\S+@\S+\.\S+/.test(email.value));
    check(msg,   "messageError", msg.value.trim()==="");
    if (valid) { document.getElementById("successBanner").classList.add("show"); form.reset(); }
  });
}

/* =========================================================
   9. SCROLL ANIMATIONS (index page hero text)
   ========================================================= */
function setupScrollAnimations() {
  /* IntersectionObserver — triggers .visible class when element enters view */
  if (!window.IntersectionObserver) return;
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".anim-fade-up, .anim-fade-left, .anim-fade-right, .anim-scale").forEach(function(el) {
    observer.observe(el);
  });
}

/* =========================================================
   10. NAV
   ========================================================= */
function setupNav() {
  const btn   = document.querySelector(".hamburger");
  const links = document.querySelector(".nav-links");
  if (btn) btn.addEventListener("click", () => links.classList.toggle("open"));

  const page = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function(a) {
    if (a.getAttribute("href") === page) a.classList.add("active");
  });

  const profile = loadProfile();
  if (profile && profile.name) {
    const accountLink = document.querySelector('.nav-links a[href="account.html"]');
    if (accountLink) accountLink.textContent = "👤 " + profile.name.split(" ")[0];
  }
}

/* =========================================================
   INIT
   ========================================================= */
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
