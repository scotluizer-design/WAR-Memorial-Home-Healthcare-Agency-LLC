const fs = require("fs");
const path = require("path");

const outDir = __dirname;

const business = {
  name: "WAR Memorial Home Healthcare Agency, LLC",
  shortName: "WAR Memorial",
  phone: "(919)-908-1357",
  phoneHref: "tel:+19199081357",
  fax: "(919)-869-2785",
  email: "williamreeves1800@gmail.com",
  emailHref: "mailto:williamreeves1800@gmail.com",
  address: "1217 Holloway Street, Durham, NC 27701",
  mapHref: "https://www.google.com/maps/search/?api=1&query=1217%20Holloway%20Street%2C%20Durham%2C%20NC%2027701",
  hours: "Monday to Friday: 9:00 AM - 2:00 PM"
};

const services = [
  {
    slug: "personal-care",
    title: "Personal Care",
    icon: "user-round-check",
    summary: "Dignified daily living assistance that helps clients remain comfortable, clean, supported, and independent at home.",
    intro: "Personal Care services help clients with essential activities of daily living while preserving dignity, comfort, and independence.",
    items: ["Bathing and showering", "Dressing and grooming", "Toileting assistance", "Mobility support", "Transferring from bed, chair, toilet, or wheelchair", "Eating and feeding support", "Daily routine assistance"],
    seo: "Personal Care Services in Durham, NC | WAR Memorial Home Healthcare Agency",
    meta: "Explore personal care services in Durham, NC, including bathing, grooming, toileting assistance, mobility support, transfers, eating support, and daily routine assistance."
  },
  {
    slug: "homemaker-services",
    title: "Homemaker Services",
    icon: "home",
    summary: "Light home support that keeps everyday spaces clean, organized, safe, and easier to manage.",
    intro: "Homemaker Services help clients maintain a clean, safe, and comfortable home environment when household tasks become difficult.",
    items: ["Light housekeeping", "Laundry", "Meal preparation", "Kitchen organization", "Changing bed linens", "Basic home organization", "Support for older adults, individuals with disabilities, and people recovering from illness or surgery"],
    seo: "Homemaker Services in Durham, NC | Home Support",
    meta: "WAR Memorial Home Healthcare Agency offers homemaker services in Durham, NC, including light housekeeping, laundry, meal preparation, kitchen organization, and home support."
  },
  {
    slug: "disability-care",
    title: "Disability Care",
    icon: "accessibility",
    summary: "Personalized assistance for people with physical, intellectual, or developmental disabilities.",
    intro: "Disability Care provides personalized assistance for individuals with physical, intellectual, or developmental disabilities so they can live safely, confidently, and as independently as possible.",
    items: ["Daily living support", "Mobility assistance", "Community participation support", "Routine building", "Personal safety support", "Family communication"],
    seo: "Disability Care in Durham, NC | Personalized In-Home Support",
    meta: "Personalized disability care in Durham, NC with daily living support, mobility assistance, routine building, safety support, and family communication."
  },
  {
    slug: "fall-injury-prevention",
    title: "Fall & Injury Prevention",
    icon: "shield-check",
    summary: "Practical support that reduces accident risks and helps clients move more safely through the home.",
    intro: "Fall & Injury Prevention services are designed to reduce the risk of accidents and help clients move safely throughout the home.",
    items: ["Safe walking assistance", "Transfer support", "Walker or cane support", "Supervision during movement", "Identifying trip hazards", "Encouraging clear pathways", "Supporting safer routines"],
    seo: "Fall & Injury Prevention Support in Durham, NC",
    meta: "Fall and injury prevention support in Durham, NC, including safe walking assistance, transfer support, mobility supervision, trip hazard awareness, and safer routines."
  },
  {
    slug: "companion-sitter-services",
    title: "Companion Sitter Services",
    icon: "messages-square",
    summary: "Warm companionship, supervision, and meaningful interaction at home, in the hospital, or in a care facility.",
    intro: "Companion Sitter services provide emotional support, supervision, and meaningful interaction for clients at home, in the hospital, or in a care facility.",
    items: ["Conversation and companionship", "Reading, games, and hobbies", "Emotional support", "Safety supervision", "Reducing loneliness and isolation", "Family peace of mind"],
    seo: "Companion Sitter Services in Durham, NC | Senior Home Care",
    meta: "Companion sitter services in Durham, NC with conversation, meaningful activities, safety supervision, emotional support, and family peace of mind."
  },
  {
    slug: "respite-care",
    title: "Respite Care",
    icon: "heart-handshake",
    summary: "Temporary relief for family caregivers while loved ones continue receiving dependable support.",
    intro: "Respite Care gives family caregivers temporary relief while ensuring their loved one continues receiving compassionate and dependable care.",
    items: ["Short-term care coverage", "Caregiver relief", "Personal care assistance", "Companionship", "Support during family emergencies", "Flexible scheduling"],
    seo: "Respite Care in Durham, NC | Family Caregiver Relief",
    meta: "Respite care in Durham, NC for family caregivers, including short-term care coverage, companionship, personal care assistance, and flexible scheduling."
  },
  {
    slug: "medication-reminders",
    title: "Medication Reminders",
    icon: "alarm-clock-check",
    summary: "Non-medical prompts that help clients remember prescribed medication routines.",
    intro: "Medication Reminder services help clients remember when to take their prescribed medications. Caregivers provide reminders and prompts but do not prescribe, administer, or change medication.",
    items: ["Verbal reminders", "Scheduled prompts", "Observing routine compliance", "Reporting concerns to family or appropriate care contacts", "Encouraging consistency and safety"],
    note: "Medication reminders are non-medical support services and do not replace advice from licensed healthcare professionals.",
    seo: "Medication Reminders in Durham, NC | Non-Medical Support",
    meta: "Medication reminder services in Durham, NC provide non-medical prompts, routine support, family communication, and consistency for prescribed medication schedules."
  },
  {
    slug: "dementia-alzheimers-care",
    title: "Dementia & Alzheimer's Care",
    icon: "brain",
    summary: "Calm, routine-based support for people experiencing memory loss, confusion, or cognitive changes.",
    intro: "Dementia and Alzheimer's Care supports individuals experiencing memory loss, confusion, and cognitive changes while helping them remain safe, calm, and comfortable.",
    items: ["Daily routine reminders", "Orientation to time and place", "Memory-friendly activities", "Simple task guidance", "Redirection and reassurance", "Safety monitoring", "Support for families"],
    seo: "Dementia & Alzheimer's Care at Home in Durham, NC",
    meta: "Dementia and Alzheimer's care support in Durham, NC with routine reminders, memory-friendly activities, reassurance, safety monitoring, and family support."
  }
];

const nav = [
  ["Home", "index.html"],
  ["About", "about.html"],
  ["Services", "services.html"],
  ["Aides in Action", "gallery.html"],
  ["Contact", "contact.html"]
];

function pageName(file) {
  return path.basename(file || "index.html");
}

function isActive(current, href) {
  if (current === href) return " active";
  if (href === "services.html" && services.some((service) => current === `${service.slug}.html`)) return " active";
  if (current !== "index.html" && href !== "index.html" && current.startsWith(href.replace(".html", ""))) return " active";
  return "";
}

function icon(name) {
  const paths = {
    "user-round-check": '<circle cx="10" cy="7" r="4"/><path d="M2 21a8 8 0 0 1 12.5-6.6"/><path d="m16 19 2 2 4-5"/>',
    home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10.5V21h14V10.5"/><path d="M9 21v-6h6v6"/>',
    accessibility: '<circle cx="12" cy="4" r="2"/><path d="M10 21v-7l-4-1"/><path d="M14 21v-7l4-1"/><path d="M6 8h12"/><path d="M12 6v8"/>',
    "shield-check": '<path d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="m8.5 12 2.5 2.5L16 9"/>',
    "messages-square": '<path d="M4 5h12v9H7l-3 3V5z"/><path d="M16 8h4v9h-7l-3 3v-3"/>',
    "heart-handshake": '<path d="M19 14c2-2 2-5 0-7a4.5 4.5 0 0 0-6.4 0L12 7.6l-.6-.6A4.5 4.5 0 0 0 5 7c-2 2-2 5 0 7l7 7 7-7z"/><path d="M8.5 12.5 11 15l4.5-4.5"/>',
    "alarm-clock-check": '<circle cx="12" cy="13" r="7"/><path d="M12 10v3l2 1"/><path d="M5 4 2.5 6.5"/><path d="M19 4l2.5 2.5"/><path d="m9 18-1 3"/><path d="m15 18 1 3"/>',
    brain: '<path d="M8 6a3 3 0 0 1 6 0 3 3 0 0 1 4 4 3.5 3.5 0 0 1-1 6.8A4 4 0 0 1 9 19a4 4 0 0 1-2-7.5A3 3 0 0 1 8 6z"/><path d="M12 6v13"/><path d="M12 10H9"/><path d="M12 14h3"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
    calendar: '<path d="M7 2v4"/><path d="M17 2v4"/><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18"/>',
    arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    menu: '<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>',
    lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    map: '<path d="M12 21s7-5.1 7-11a7 7 0 0 0-14 0c0 5.9 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>'
  };
  return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.arrow}</svg>`;
}

function header(current) {
  const links = nav.map(([label, href]) => `<a class="nav-link${isActive(current, href)}" href="${href}">${label}</a>`).join("");
  return `
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header">
      <div class="top-strip">
        <a href="${business.phoneHref}">${icon("phone")} ${business.phone}</a>
        <a href="${business.emailHref}">${icon("mail")} ${business.email}</a>
        <span>${business.hours}</span>
      </div>
      <nav class="navbar" aria-label="Primary navigation">
        <a class="brand" href="index.html" aria-label="WAR Memorial Home Healthcare Agency home">
          <img src="assets/logo.jpg" alt="WAR Memorial Home Healthcare Agency logo">
          <span><strong>WAR Memorial</strong><small>Home Healthcare Agency</small></span>
        </a>
        <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false">${icon("menu")}</button>
        <div class="nav-menu">
          ${links}
          <a class="login-link" href="login.html">${icon("lock")} Login</a>
          <a class="btn btn-primary nav-cta" href="consultation.html">${icon("calendar")} Request a Consultation</a>
        </div>
      </nav>
    </header>`;
}

function footer() {
  return `
    <footer class="footer">
      <div class="footer-grid">
        <div>
          <a class="footer-brand" href="index.html"><img src="assets/logo.jpg" alt=""><span>WAR Memorial</span></a>
          <p>Compassionate, personalized in-home support that promotes independence, dignity, safety, and overall well-being.</p>
          <a class="btn btn-gold" href="consultation.html">${icon("calendar")} Request Consultation</a>
        </div>
        <div>
          <h2>Quick Links</h2>
          <a href="about.html">About Us</a>
          <a href="services.html">Services</a>
          <a href="gallery.html">Aides in Action</a>
          <a href="contact.html">Contact Us</a>
          <a href="login.html">Login / Portal</a>
        </div>
        <div>
          <h2>Services</h2>
          ${services.map((s) => `<a href="${s.slug}.html">${s.title}</a>`).join("")}
        </div>
        <div>
          <h2>Contact</h2>
          <p>${business.address}</p>
          <a href="${business.phoneHref}">${business.phone}</a>
          <a href="${business.emailHref}">${business.email}</a>
          <p>Fax: ${business.fax}</p>
          <p>${business.hours}<br>Saturday and Sunday: Closed</p>
        </div>
      </div>
      <div class="footer-bottom">&copy; 2026 WAR Memorial Home Healthcare Agency, LLC. All rights reserved.</div>
    </footer>`;
}

function layout(page) {
  const current = page.file || "index.html";
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  <meta name="theme-color" content="#07345f">
  <meta property="og:title" content="${page.title}">
  <meta property="og:description" content="${page.description}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="assets/logo.jpg">
  <link rel="preload" href="assets/logo.jpg" as="image">
  <link rel="stylesheet" href="styles.css">
</head>
<body data-page="${current.replace(".html", "")}">
${header(current)}
<main id="main">
${page.body}
</main>
${footer()}
<a class="call-float" href="${business.phoneHref}" aria-label="Call WAR Memorial Home Healthcare Agency">${icon("phone")}<span>Call Now</span></a>
<script src="scripts.js"></script>
</body>
</html>`;
}

function serviceCards(limit) {
  return `<div class="service-grid">${services.slice(0, limit || services.length).map((s) => `
    <article class="service-card reveal">
      <div class="service-icon">${icon(s.icon)}</div>
      <h3>${s.title}</h3>
      <p>${s.summary}</p>
      <a class="text-link" href="${s.slug}.html">Learn More ${icon("arrow")}</a>
    </article>`).join("")}</div>`;
}

function hero() {
  const slides = [
    ["assets/hero-mobility-support.jpg", "Caregiver assisting a senior with walker mobility support at home"],
    ["assets/hero-personal-care.jpg", "Caregiver providing personal support for an older adult at home"],
    ["assets/hero-companion-care.jpg", "Compassionate companionship and in-home comfort support"]
  ];
  return `<section class="hero">
    <div class="hero-slides" aria-label="Home care images">
      ${slides.map(([src, alt], i) => `<img class="hero-slide${i === 0 ? " active" : ""}" src="${src}" alt="${alt}" loading="${i === 0 ? "eager" : "lazy"}" onerror="this.onerror=null;this.src='assets/caregiver-support.png';">`).join("")}
      <div class="hero-overlay"></div>
    </div>
    <div class="hero-content">
      <p class="eyebrow reveal">Durham, North Carolina home care support</p>
      <h1 class="reveal">Compassionate Home Care Rooted in Legacy, Dignity, and Trust</h1>
      <p class="hero-copy reveal">WAR Memorial Home Healthcare Agency provides personalized in-home support that helps clients remain safe, comfortable, independent, and cared for in the place they love most - home.</p>
      <div class="hero-actions reveal">
        <a class="btn btn-primary" href="consultation.html">${icon("calendar")} Request a Consultation</a>
        <a class="btn btn-light" href="services.html">Explore Our Services ${icon("arrow")}</a>
        <a class="btn btn-outline-light" href="${business.phoneHref}">${icon("phone")} Call Now</a>
      </div>
      <div class="hero-trust reveal" aria-label="Trust highlights">
        <div><strong data-counter="2006">0</strong><span>Serving communities since</span></div>
        <div><strong data-counter="8">0</strong><span>Core care services</span></div>
        <div><strong>Family</strong><span>Centered service</span></div>
      </div>
    </div>
  </section>`;
}

function bandIntro(title, copy, kicker = "") {
  return `<section class="page-hero">
    <div class="section-inner narrow reveal">
      ${kicker ? `<p class="eyebrow">${kicker}</p>` : ""}
      <h1>${title}</h1>
      <p>${copy}</p>
    </div>
  </section>`;
}

function processSection() {
  const steps = [
    ["Consultation", "We listen to your needs, routines, concerns, and goals."],
    ["Care Plan", "We outline practical support that fits the client and family."],
    ["Caregiver Match", "We focus on compatibility, professionalism, and dependability."],
    ["Ongoing Support", "We stay connected and adjust support as needs change."]
  ];
  return `<section class="section">
    <div class="section-inner">
      <div class="section-heading reveal">
        <p class="eyebrow">How care begins</p>
        <h2>A simple path to dependable support</h2>
      </div>
      <div class="step-grid">${steps.map(([title, copy], i) => `<div class="step-card reveal"><span>${String(i + 1).padStart(2, "0")}</span><h3>${title}</h3><p>${copy}</p></div>`).join("")}</div>
    </div>
  </section>`;
}

function form(fields, title = "Send Us a Message") {
  const controls = fields.map((f) => {
    if (f.type === "select") {
      return `<label>${f.label}<select name="${f.name}" required><option value="">Select an option</option>${f.options.map((o) => `<option>${o}</option>`).join("")}</select></label>`;
    }
    if (f.type === "textarea") {
      return `<label class="full">${f.label}<textarea name="${f.name}" rows="5" required></textarea></label>`;
    }
    return `<label>${f.label}<input type="${f.type || "text"}" name="${f.name}" ${f.required === false ? "" : "required"}></label>`;
  }).join("");
  return `<form class="care-form reveal" data-form>
    <h2>${title}</h2>
    <div class="form-grid">${controls}</div>
    <button class="btn btn-primary" type="submit">${icon("arrow")} Submit</button>
    <p class="form-message" role="status" aria-live="polite"></p>
  </form>`;
}

const pages = [];

pages.push({
  file: "index.html",
  title: "WAR Memorial Home Healthcare Agency | Compassionate Home Care in Durham, NC",
  description: "WAR Memorial Home Healthcare Agency provides compassionate personal care, homemaker services, respite care, dementia support, disability care, and companion sitter services in Durham, NC.",
  body: `${hero()}
  <section class="section split">
    <div class="section-inner split-grid">
      <div class="reveal">
        <p class="eyebrow">Mission and legacy</p>
        <h2>Personalized care with a family-centered promise</h2>
        <p>Our mission is to deliver compassionate, personalized care in the comfort of home while promoting independence, dignity, safety, and overall well-being. We treat every client like family and provide dependable support tailored to each person's needs.</p>
        <p>WAR Memorial honors the legacy of William Alphanza Reeves, recognized as North Carolina's First Male Nurse. His dedication to care, service, and community continues to guide the agency's commitment to dependable home care support.</p>
        <a class="btn btn-secondary" href="about.html">Learn Our Story ${icon("arrow")}</a>
      </div>
      <div class="legacy-card reveal">
        <img src="assets/william-reeves.jpg" alt="William Alphanza Reeves">
        <div><strong>William Alphanza Reeves</strong><span>Legacy of care, service, and community</span></div>
      </div>
    </div>
  </section>
  <section class="section soft">
    <div class="section-inner">
      <div class="section-heading reveal"><p class="eyebrow">Services</p><h2>In-home support for changing needs</h2><p>From personal care to respite and dementia support, each service is shaped around the client's routine, dignity, and safety.</p></div>
      ${serviceCards(8)}
    </div>
  </section>
  <section class="section">
    <div class="section-inner">
      <div class="section-heading reveal"><p class="eyebrow">Why families choose us</p><h2>Dependable care with warmth and professionalism</h2></div>
      <div class="feature-grid">
        ${["Personalized care plans", "Compassionate in-home support", "Family-centered communication", "Respect for independence", "Support rooted in healthcare experience", "Careful non-medical assistance"].map((x) => `<div class="feature reveal">${icon("shield-check")}<span>${x}</span></div>`).join("")}
      </div>
    </div>
  </section>
  ${processSection()}
  <section class="section testimonials">
    <div class="section-inner">
      <div class="section-heading reveal"><p class="eyebrow">Testimonials</p><h2>Care that helps families breathe easier</h2></div>
      <div class="quote-grid">
        <blockquote class="reveal"><div class="stars" aria-label="5 out of 5 stars">★★★★★</div>"The team helped our family understand what support could look like at home. They were patient, respectful, and genuinely kind."<cite>Family caregiver</cite></blockquote>
        <blockquote class="reveal"><div class="stars" aria-label="5 out of 5 stars">★★★★★</div>"Dependable companionship and daily support made a meaningful difference in our loved one's routine."<cite>Client family</cite></blockquote>
      </div>
    </div>
  </section>
  <section class="section split soft">
    <div class="section-inner split-grid reverse">
      <img class="rounded-image reveal" src="assets/founders.jpg" alt="Drs. Perry and Rona Tankard">
      <div class="reveal"><p class="eyebrow">Agency leadership</p><h2>Drs. Perry & Rona Tankard</h2><p>Drs. Perry and Rona Tankard bring healthcare experience, community commitment, and a family-centered approach to WAR Memorial Home Healthcare Agency.</p><a class="btn btn-secondary" href="gallery.html">View Gallery ${icon("arrow")}</a></div>
    </div>
  </section>
  <section class="cta-band reveal"><h2>Ready to talk through care options?</h2><p>We are here to answer your questions and help you take the next step toward dependable in-home support.</p><a class="btn btn-gold" href="consultation.html">${icon("calendar")} Request a Consultation</a></section>`
});

pages.push({
  file: "about.html",
  title: "About WAR Memorial Home Healthcare Agency | Durham, NC",
  description: "Learn about WAR Memorial Home Healthcare Agency, its mission, values, founders, and the legacy of William Alphanza Reeves, North Carolina's First Male Nurse.",
  body: `${bandIntro("A legacy of care, service, and community", "WAR Memorial Home Healthcare Agency serves families with compassionate in-home support rooted in dignity, reliability, and respect.", "About us")}
  <section class="section split">
    <div class="section-inner split-grid">
      <div class="reveal"><p class="eyebrow">Our story</p><h2>Honoring William Alphanza Reeves</h2><p>WAR Memorial Home Healthcare Agency honors the legacy of William Alphanza Reeves, recognized as North Carolina's First Male Nurse. His dedication to care, service, and community inspires the agency's commitment to compassionate and dependable home healthcare support.</p><p>Drs. Perry and Rona Tankard have served in the healthcare field since 2006, supporting communities throughout North Carolina through compassionate care, professional guidance, and a deep commitment to improving quality of life.</p></div>
      <img class="rounded-image reveal" src="assets/william-alphonza.png" alt="William Alphanza Reeves legacy portrait">
    </div>
  </section>
  <section class="section soft"><div class="section-inner value-grid">
    <div class="value-card reveal"><h2>Mission</h2><p>To deliver compassionate, personalized care in the comfort of home while promoting independence, dignity, safety, and overall well-being.</p></div>
    <div class="value-card reveal"><h2>Vision</h2><p>To be a trusted home care agency known for dependable service, meaningful relationships, and support that helps families feel confident.</p></div>
    <div class="value-card reveal"><h2>Commitment</h2><p>We treat every client like family and provide support tailored to each person's needs, routines, and goals.</p></div>
  </div></section>
  <section class="section"><div class="section-inner">
    <div class="section-heading reveal"><p class="eyebrow">Values</p><h2>The principles behind every visit</h2></div>
    <div class="feature-grid">${["Compassion", "Integrity", "Excellence", "Respect", "Reliability", "Advocacy", "Collaboration"].map((v) => `<div class="feature reveal">${icon("heart-handshake")}<span>${v}</span></div>`).join("")}</div>
  </div></section>
  <section class="section soft"><div class="section-inner">
    <div class="section-heading reveal"><p class="eyebrow">Legacy timeline</p><h2>Care that carries forward</h2></div>
    <div class="timeline reveal"><div><span>Legacy</span><p>William Alphanza Reeves helps open doors through service and nursing excellence.</p></div><div><span>Since 2006</span><p>Drs. Perry and Rona Tankard serve communities throughout North Carolina.</p></div><div><span>Today</span><p>WAR Memorial provides family-centered home care support in Durham and surrounding communities.</p></div></div>
  </div></section>`
});

pages.push({
  file: "services.html",
  title: "Home Care Services in Durham, NC | WAR Memorial",
  description: "Explore personal care, homemaker services, disability care, fall prevention, companion sitter services, respite care, medication reminders, and dementia care at home.",
  body: `${bandIntro("Home care services designed around your family", "Explore personalized in-home support options for seniors, people with disabilities, people recovering from illness or surgery, and families who need dependable non-medical assistance.", "Services overview")}
  <section class="section"><div class="section-inner">${serviceCards()}</div></section>
  <section class="cta-band reveal"><h2>Not sure which service is right for your loved one?</h2><p>Request a consultation and we'll help you understand the best care options.</p><a class="btn btn-gold" href="consultation.html">${icon("calendar")} Request a Consultation</a></section>`
});

services.forEach((service) => {
  pages.push({
    file: `${service.slug}.html`,
    title: service.seo,
    description: service.meta,
    body: `${bandIntro(service.title, service.intro, "Service")}
    <section class="section split">
      <div class="section-inner split-grid">
        <div class="reveal">
          <div class="large-icon">${icon(service.icon)}</div>
          <h2>Support included with ${service.title}</h2>
          <p>${service.summary}</p>
          ${service.note ? `<p class="note">${service.note}</p>` : ""}
          <div class="button-row"><a class="btn btn-primary" href="consultation.html">${icon("calendar")} Request a Consultation</a><a class="btn btn-secondary" href="${business.phoneHref}">${icon("phone")} Call ${business.phone}</a></div>
        </div>
        <div class="check-card reveal">
          <h3>How we can help</h3>
          <ul>${service.items.map((item) => `<li>${icon("shield-check")} ${item}</li>`).join("")}</ul>
        </div>
      </div>
    </section>
    <section class="section soft"><div class="section-inner"><div class="section-heading reveal"><p class="eyebrow">More services</p><h2>Support that can grow with your needs</h2></div>${serviceCards(4)}</div></section>`
  });
});

pages.push({
  file: "gallery.html",
  title: "Aides in Action Gallery | WAR Memorial Home Healthcare Agency",
  description: "View the Aides in Action gallery from WAR Memorial Home Healthcare Agency, showing compassionate personal care, companionship, mobility support, and home support.",
  body: `${bandIntro("Aides in Action", "Our aides bring compassion, professionalism, and dependable support into every home. Through personalized assistance and meaningful connection, they help clients feel safe, respected, and cared for.", "Gallery")}
  <section class="section">
    <div class="section-inner">
      <div class="filters reveal" aria-label="Gallery filters">
        ${["All", "Personal Care", "Companionship", "Mobility Support", "Home Support"].map((f, i) => `<button class="filter-btn${i === 0 ? " active" : ""}" data-filter="${f}">${f}</button>`).join("")}
      </div>
      <div class="gallery-grid">
        ${[
          ["assets/caregiver-support.png", "Personal Care", "Caregiver offering respectful daily support"],
          ["assets/care-home.png", "Home Support", "Comfortable home routines and supportive care"],
          ["assets/founders.jpg", "Companionship", "Leadership rooted in service and family values"],
          ["assets/william-reeves.jpg", "Mobility Support", "A legacy of healthcare service"],
          ["assets/william-alphonza.png", "Companionship", "Community-centered care legacy"],
          ["assets/logo.jpg", "Home Support", "Partners in your healing journey"]
        ].map(([src, cat, cap]) => `<figure class="gallery-item reveal" data-category="${cat}"><button type="button" data-lightbox="${src}" data-caption="${cap}"><img src="${src}" alt="${cap}"><figcaption><strong>${cat}</strong><span>${cap}</span></figcaption></button></figure>`).join("")}
      </div>
    </div>
  </section>
  <div class="lightbox" aria-hidden="true"><button class="lightbox-close" aria-label="Close preview">&times;</button><img alt=""><p></p></div>`
});

pages.push({
  file: "consultation.html",
  title: "Request a Consultation | WAR Memorial Home Healthcare Agency",
  description: "Request a home care consultation with WAR Memorial Home Healthcare Agency in Durham, NC for personal care, respite care, dementia support, companion sitter services, and more.",
  body: `${bandIntro("Request a Consultation", "Tell us about your care needs. A member of our team will contact you to discuss how WAR Memorial Home Healthcare Agency can support you or your loved one.", "Start here")}
  <section class="section split"><div class="section-inner split-grid">
    ${form([
      { label: "First name", name: "first_name" },
      { label: "Last name", name: "last_name" },
      { label: "Phone number", name: "phone", type: "tel" },
      { label: "Email", name: "email", type: "email" },
      { label: "Client's city", name: "city" },
      { label: "Type of care needed", name: "care_type", type: "select", options: services.map((s) => s.title) },
      { label: "Preferred start date", name: "start_date", type: "date" },
      { label: "Preferred contact method", name: "contact_method", type: "select", options: ["Phone", "Email", "Text message"] },
      { label: "Message", name: "message", type: "textarea" }
    ], "Consultation Request")}
    <aside class="contact-panel reveal"><h2>What happens next?</h2><p>We review your message, talk through your family's priorities, and help identify the support that best fits the client's routine and comfort.</p><a href="${business.phoneHref}">${icon("phone")} ${business.phone}</a><a href="${business.emailHref}">${icon("mail")} ${business.email}</a></aside>
  </div></section>`
});

pages.push({
  file: "contact.html",
  title: "Contact WAR Memorial Home Healthcare Agency | Durham, NC",
  description: "Contact WAR Memorial Home Healthcare Agency in Durham, NC by phone, email, fax, or consultation form. Office hours are Monday to Friday, 9:00 AM to 2:00 PM.",
  body: `${bandIntro("Contact Us", "We are here to answer your questions and help you take the next step toward dependable in-home support.", "Durham, NC")}
  <section class="section split"><div class="section-inner split-grid">
    <div class="contact-panel reveal">
      <h2>WAR Memorial Home Healthcare Agency</h2>
      <a href="${business.mapHref}" target="_blank" rel="noreferrer">${icon("map")} ${business.address}</a>
      <a href="${business.phoneHref}">${icon("phone")} ${business.phone}</a>
      <p>Fax: ${business.fax}</p>
      <a href="${business.emailHref}">${icon("mail")} ${business.email}</a>
      <p><strong>Office Hours</strong><br>Monday to Friday: 9:00 AM - 2:00 PM<br>Saturday and Sunday: Closed</p>
      <p class="note">If there is a medical emergency, call 911 or contact the appropriate emergency service. WAR Memorial provides non-medical home care support.</p>
      <div class="map-placeholder"><span>${icon("map")}</span><p>Map placeholder for 1217 Holloway Street, Durham, NC 27701</p><a class="text-link" href="${business.mapHref}" target="_blank" rel="noreferrer">Open in Maps ${icon("arrow")}</a></div>
    </div>
    ${form([
      { label: "First name", name: "first_name" },
      { label: "Last name", name: "last_name" },
      { label: "Phone number", name: "phone", type: "tel" },
      { label: "Email", name: "email", type: "email" },
      { label: "Message", name: "message", type: "textarea" }
    ], "Contact Form")}
  </div></section>`
});

pages.push({
  file: "login.html",
  title: "Login / Portal | WAR Memorial Home Healthcare Agency",
  description: "Secure placeholder portal access for WAR Memorial Home Healthcare Agency clients, families, caregivers, and administrative users.",
  body: `${bandIntro("Login / Portal", "Secure access for clients, families, caregivers, and administrative users.", "Portal")}
  <section class="section"><div class="section-inner">
    <div class="portal-grid">
      ${[
        ["Client / Family Portal", "View updates, messages, and care-related information when portal access becomes available."],
        ["Caregiver Portal", "Access schedules, assigned visits, and caregiver resources when connected to a secure system."],
        ["Admin Login", "Administrative access placeholder for authorized team members."]
      ].map(([title, copy]) => `<article class="portal-card reveal">${icon("lock")}<h2>${title}</h2><p>${copy}</p><button class="btn btn-primary" type="button" data-placeholder-login>Continue</button></article>`).join("")}
    </div>
    <div class="login-help reveal"><a href="#">Forgot Password</a><a href="contact.html">Need help logging in?</a><p>This is a polished placeholder page. Secure authentication should be connected before handling private client, caregiver, or administrative data.</p></div>
  </div></section>`
});

for (const page of pages) {
  fs.writeFileSync(path.join(outDir, page.file), layout(page));
}

console.log(`Generated ${pages.length} pages.`);
