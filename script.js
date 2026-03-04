// -----------------------------
// DATA (Dynamic)
// -----------------------------
const servicesData = [
  { icon: "fa-paint-brush", title: "Web Design", desc: "Modern, clean, and user-friendly designs that look premium." },
  { icon: "fa-code", title: "Web Development", desc: "Responsive, fast websites using modern tools and best practices." },
  { icon: "fa-layer-group", title: "UI / UX Design", desc: "Simple, smooth interfaces focused on real user experience." }
];

const skillsData = [
  { icon: "fa-brands fa-html5", title: "HTML", desc: "Semantic & SEO friendly markup" },
  { icon: "fa-brands fa-css3-alt", title: "CSS", desc: "Responsive & modern UI design" },
  { icon: "fa-brands fa-js", title: "JavaScript", desc: "Interactive & dynamic functionality" },
  { icon: "fa-brands fa-react", title: "React", desc: "Component-based SPA development" },
  { icon: "fa-brands fa-python", title: "Python (Flask)", desc: "Backend APIs & web applications" },
  { icon: "fa-solid fa-code", title: "C", desc: "Procedural programming & logic building" },
  { icon: "fa-solid fa-laptop-code", title: "C++", desc: "OOP & high-performance programming" },
  { icon: "fa-brands fa-php", title: "PHP", desc: "Server-side scripting & CRUD systems" }
];

const portfolioData = [
   {
  title: "Sakshyam Vet & Pet Care (Dynamic Web Application)",
  desc: "A full-stack dynamic veterinary clinic website developed with PHP and MySQL. It features service management, blog posts, appointment booking system, contact form handling, gallery display, and an admin dashboard for CRUD operations. Designed with responsive UI using HTML, CSS, JavaScript, and Bootstrap.",
  tech: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "Bootstrap"],
  live: "https://sakshyamvet.com/",
  code: "#"
},
  {
    title: "Subject-wise Attendance Management System",
    desc: "Teachers can manage student records and attendance subject-wise with reports and secure data management.",
    tech: ["HTML", "CSS", "JavaScript", "Python (Flask)", "MySQL"],
    live: "#",
    code: "https://github.com/lochan766/Subject_Wise_attendance_Management_System"
  },
  {
    title: "Personal Portfolio Website",
    desc: "A modern single-page portfolio with smooth navigation and responsive layout.",
    tech: ["HTML", "CSS", "JavaScript"],
    live: "https://bhandariuddab.netlify.app/",
    code: "#"
  }

  
];

// -----------------------------
// RENDER FUNCTIONS
// -----------------------------
function renderServices() {
  const el = document.getElementById("servicesContainer");
  if (!el) return;

  el.innerHTML = servicesData.map(s => `
    <div class="col-md-6 col-lg-4">
      <div class="feature-card">
        <div class="feature-icon"><i class="fa-solid ${s.icon}"></i></div>
        <div class="feature-title">${s.title}</div>
        <p class="feature-text">${s.desc}</p>
      </div>
    </div>
  `).join("");
}

function renderSkills() {
  const el = document.getElementById("skillsContainer");
  if (!el) return;

  el.innerHTML = skillsData.map(sk => `
    <div class="col-md-6 col-lg-3">
      <div class="feature-card">
        <div class="feature-icon"><i class="${sk.icon}"></i></div>
        <div class="feature-title">${sk.title}</div>
        <p class="feature-text">${sk.desc}</p>
      </div>
    </div>
  `).join("");
}

function renderPortfolio() {
  const el = document.getElementById("portfolioContainer");
  if (!el) return;

  el.innerHTML = portfolioData.map(p => `
    <div class="col-lg-6">
      <div class="feature-card">
        <div class="feature-title">${p.title}</div>
        <p class="feature-text">${p.desc}</p>

        <ul class="tech-list">
          ${p.tech.map(t => `<li>${t}</li>`).join("")}
        </ul>

        <div class="d-flex flex-wrap gap-2 mt-3">
          <a class="btn btn-accent btn-sm is-magnetic ${p.live === "#" ? "disabled" : ""}" href="${p.live}" target="_blank" rel="noopener">
            <i class="fa-solid fa-globe me-2"></i>Live Demo
          </a>
          <a class="btn btn-outline-accent btn-sm is-magnetic ${p.code === "#" ? "disabled" : ""}" href="${p.code}" target="_blank" rel="noopener">
            <i class="fa-brands fa-github me-2"></i>Source Code
          </a>
        </div>
      </div>
    </div>
  `).join("");
}

function setStats() {
  const p = document.getElementById("statProjects");
  const s = document.getElementById("statSkills");
  if (p) p.textContent = portfolioData.length;
  if (s) s.textContent = skillsData.length;
}

// -----------------------------
// SPA Logic (with active nav + mobile close)
// -----------------------------
function showSection(sectionId, event) {
  if (event) event.preventDefault();

  const sections = document.querySelectorAll(".spa-section");
  const links = document.querySelectorAll(".nav-link-spa");

  sections.forEach(sec => sec.classList.remove("active-section"));
  links.forEach(l => l.classList.remove("active"));

  const target = document.getElementById(sectionId);
  if (target) target.classList.add("active-section");

  // set active nav by onclick contains sectionId
  links.forEach(l => {
    const onClick = l.getAttribute("onclick") || "";
    if (onClick.includes(`'${sectionId}'`)) l.classList.add("active");
  });

  // close bootstrap navbar on mobile after click
  const navMenu = document.getElementById("navMenu");
  if (navMenu && navMenu.classList.contains("show") && window.bootstrap?.Collapse) {
    const bsCollapse = bootstrap.Collapse.getInstance(navMenu) || new bootstrap.Collapse(navMenu);
    bsCollapse.hide();
  }

  // scroll top (nice on mobile)
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// -----------------------------
// Theme Toggle (dark/light) + Save
// -----------------------------
const themeBtn = document.getElementById("theme-toggle");

function applyTheme(theme) {
  document.body.classList.remove("theme-dark", "theme-light");
  document.body.classList.add(theme);

  const icon = themeBtn?.querySelector("i");
  if (icon) {
    icon.classList.remove("fa-moon", "fa-sun");
    icon.classList.add(theme === "theme-light" ? "fa-sun" : "fa-moon");
  }

  localStorage.setItem("theme", theme);
}

(function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "theme-light" || saved === "theme-dark") applyTheme(saved);
  else applyTheme("theme-dark");
})();

themeBtn?.addEventListener("click", () => {
  const isLight = document.body.classList.contains("theme-light");
  applyTheme(isLight ? "theme-dark" : "theme-light");
});

// -----------------------------
// Contact Form Validation
// -----------------------------
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const message = document.getElementById("message")?.value.trim();
    const formMessage = document.getElementById("form-message");

    if (!name || !email || !message) {
      if (formMessage) {
        formMessage.style.color = "tomato";
        formMessage.textContent = "Please fill in all fields.";
      }
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      if (formMessage) {
        formMessage.style.color = "tomato";
        formMessage.textContent = "Please enter a valid email.";
      }
      return;
    }

    if (formMessage) {
      formMessage.style.color = "limegreen";
      formMessage.textContent = "Message sent successfully!";
    }

    contactForm.reset();
  });
}

// -----------------------------
// Magnetic Buttons (advanced micro interaction)
// -----------------------------
function magneticEffect() {
  const magnets = document.querySelectorAll(".is-magnetic");

  magnets.forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = `translate(0px, 0px)`;
    });
  });
}

// -----------------------------
// Profile Tilt (hover move)
// -----------------------------
(function profileTilt(){
  const wrap = document.getElementById("profileWrap");
  if(!wrap) return;

  wrap.addEventListener("mousemove", (e) => {
    const r = wrap.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    wrap.style.transform = `rotateY(${x * 10}deg) rotateX(${y * -10}deg)`;
  });

  wrap.addEventListener("mouseleave", () => {
    wrap.style.transform = `rotateY(0deg) rotateX(0deg)`;
  });
})();

// -----------------------------
// Typing Effect (Color changing)
// (Requires HTML: <span id="typingText"></span><span class="typing-caret">|</span> )
// -----------------------------
(function typingEffect(){
  const el = document.getElementById("typingText");
  if(!el) return;

  const words = [
    { text: "Web Developer",  color: "#ff4a57" },
    { text: "UI / UX Designer",             color: "#4db5ff" },
    { text: "Computer Engineering Student", color: "#a66cff" },
    { text: "Frontend Developer",           color: "#00c896" },
    { text: "PHP & MySQL Developer",        color: "#ffd166" }
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick(){
    const current = words[wordIndex];

    // change color per word
    el.style.color = current.color;

    if(!deleting){
      charIndex++;
      el.textContent = current.text.substring(0, charIndex);
      if(charIndex === current.text.length){
        deleting = true;
        setTimeout(tick, 1200);
        return;
      }
    }else{
      charIndex--;
      el.textContent = current.text.substring(0, charIndex);
      if(charIndex === 0){
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    setTimeout(tick, deleting ? 40 : 70);
  }

  tick();
})();

// -----------------------------
// Ripple Cursor Effect (Normal cursor + rings + small dot follow)
// (Requires CSS .ripple-ring and .ripple-dot)
// -----------------------------
(function rippleCursor(){
  let last = 0;

  function spawnRipple(x, y){
    const ring = document.createElement("span");
    ring.className = "ripple-ring";
    ring.style.left = x + "px";
    ring.style.top = y + "px";
    document.body.appendChild(ring);
    ring.addEventListener("animationend", () => ring.remove());
  }

  // tiny dot follower
  const dot = document.createElement("span");
  dot.className = "ripple-dot";
  document.body.appendChild(dot);

  let mx = innerWidth/2, my = innerHeight/2;
  let dx = mx, dy = my;

  window.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;

    const now = Date.now();
    if (now - last > 90) {
      spawnRipple(mx, my);
      last = now;
    }
  });

  window.addEventListener("click", (e) => {
    spawnRipple(e.clientX, e.clientY);
    setTimeout(() => spawnRipple(e.clientX, e.clientY), 70);
  });

  function loop(){
    dx += (mx - dx) * 0.25;
    dy += (my - dy) * 0.25;
    dot.style.left = dx + "px";
    dot.style.top = dy + "px";
    requestAnimationFrame(loop);
  }
  loop();
})();

// -----------------------------
// Init (render + stats + magnetic)
// -----------------------------
renderServices();
renderSkills();
renderPortfolio();
setStats();
magneticEffect();

/* =========================
   PARTICLES BACKGROUND (Theme aware + sharp)
========================= */
const canvas = document.getElementById("particles");
const ctx = canvas ? canvas.getContext("2d") : null;

let w = 0, h = 0, dpr = 1;

function resizeCanvas() {
  if (!canvas || !ctx) return;

  dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = window.innerWidth;
  h = window.innerHeight;

  canvas.width = Math.floor(w * dpr);
  canvas.height = Math.floor(h * dpr);
  canvas.style.width = w + "px";
  canvas.style.height = h + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const particles = Array.from({ length: 55 }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  r: Math.random() * 2.2 + 0.8,
  vx: (Math.random() - 0.5) * 0.6,
  vy: (Math.random() - 0.5) * 0.6
}));

let running = true;
document.addEventListener("visibilitychange", () => { running = !document.hidden; });

function draw() {
  if (!canvas || !ctx) return;
  if (!running) { requestAnimationFrame(draw); return; }

  ctx.clearRect(0, 0, w, h);

  const isLight = document.body.classList.contains("theme-light");
  const dotColor = isLight ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.35)";

  // dots
  ctx.beginPath();
  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0) p.x = w;
    if (p.x > w) p.x = 0;
    if (p.y < 0) p.y = h;
    if (p.y > h) p.x = 0;

    ctx.moveTo(p.x, p.y);
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
  }
  ctx.fillStyle = dotColor;
  ctx.fill();

  // lines
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i];
      const b = particles[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 140) {
        ctx.strokeStyle = isLight
          ? `rgba(0,0,0,${(1 - dist / 140) * 0.12})`
          : `rgba(255,255,255,${(1 - dist / 140) * 0.12})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(draw);
}
draw();

// Mobile tap card active effect
document.querySelectorAll(".feature-card").forEach(card=>{
  card.addEventListener("click", ()=>{
    card.classList.toggle("card-active");
  });
});
