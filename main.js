// ── Navbar: sticky + active link ──────────────────────
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link:not(.mobile-nav-link)");
const sections = document.querySelectorAll("section[id]");

window.addEventListener(
  "scroll",
  () => {
    // Sticky style
    navbar.classList.toggle("scrolled", window.scrollY > 40);

    // Active link
    let current = "";
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === "#" + current,
      );
    });
  },
  { passive: true },
);

// ── Hamburger menu ────────────────────────────────────
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
const h1 = document.getElementById("h1");
const h2 = document.getElementById("h2");
const h3 = document.getElementById("h3");
let menuOpen = false;

hamburger.addEventListener("click", () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle("open", menuOpen);
  // Animate hamburger to X
  if (menuOpen) {
    h1.style.transform = "translateY(8px) rotate(45deg)";
    h2.style.opacity = "0";
    h3.style.transform = "translateY(-8px) rotate(-45deg)";
  } else {
    h1.style.transform = "";
    h2.style.opacity = "";
    h3.style.transform = "";
  }
});

// Close menu on link click
document.querySelectorAll(".mobile-nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    menuOpen = false;
    mobileMenu.classList.remove("open");
    h1.style.transform = "";
    h2.style.opacity = "";
    h3.style.transform = "";
  });
});

// ── Reveal on scroll (IntersectionObserver) ───────────
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
);
revealEls.forEach((el) => revealObserver.observe(el));

// ── Animated counters ─────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || "";
  const duration = 2000;
  const start = performance.now();
  function update(now) {
    const t = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    const val = Math.round(ease * target);
    el.textContent = val.toLocaleString() + suffix;
    if (t < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        statObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.5 },
);
document
  .querySelectorAll(".stat-number")
  .forEach((el) => statObserver.observe(el));

// ── Testimonial slider ────────────────────────────────
const slider = document.getElementById("testimonialSlider");
const cardW = 320 + 24; // card width + gap
document.getElementById("sliderNext").addEventListener("click", () => {
  slider.scrollBy({ left: cardW, behavior: "smooth" });
});
document.getElementById("sliderPrev").addEventListener("click", () => {
  slider.scrollBy({ left: -cardW, behavior: "smooth" });
});

// ── Newsletter form validation ────────────────────────
document
  .getElementById("newsletterForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("nlEmail");
    const interest = document.getElementById("nlInterest");
    const emailErr = document.getElementById("nlEmailErr");
    const interestErr = document.getElementById("nlInterestErr");
    const btn = document.getElementById("nlSubmit");
    const btnText = document.getElementById("nlBtnText");
    const spinner = document.getElementById("nlSpinner");
    const success = document.getElementById("nlSuccess");

    let valid = true;
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email.value.trim())) {
      email.classList.add("error");
      emailErr.classList.remove("hidden");
      valid = false;
    } else {
      email.classList.remove("error");
      emailErr.classList.add("hidden");
    }
    if (!interest.value) {
      interest.classList.add("error");
      interestErr.classList.remove("hidden");
      valid = false;
    } else {
      interest.classList.remove("error");
      interestErr.classList.add("hidden");
    }

    if (!valid) return;

    // Simulate submission
    btn.disabled = true;
    btnText.textContent = "Subscribing…";
    spinner.classList.remove("hidden");
    await new Promise((r) => setTimeout(r, 1600));
    btn.disabled = false;
    btnText.textContent = "Subscribe — It's Free";
    spinner.classList.add("hidden");
    document.getElementById("newsletterForm").classList.add("hidden");
    success.classList.remove("hidden");
  });

// Remove error on input
["nlEmail", "nlInterest"].forEach((id) => {
  document.getElementById(id).addEventListener("input", () => {
    document.getElementById(id).classList.remove("error");
  });
});

// ── Contact form validation ───────────────────────────
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("cName");
  const email = document.getElementById("cEmail");
  const message = document.getElementById("cMessage");
  const nameErr = document.getElementById("cNameErr");
  const emailErr = document.getElementById("cEmailErr");
  const messageErr = document.getElementById("cMessageErr");
  const btn = document.getElementById("cSubmit");
  const btnText = document.getElementById("cBtnText");
  const spinner = document.getElementById("cSpinner");
  const success = document.getElementById("cSuccess");
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let valid = true;
  if (!name.value.trim()) {
    name.classList.add("error");
    nameErr.classList.remove("hidden");
    valid = false;
  } else {
    name.classList.remove("error");
    nameErr.classList.add("hidden");
  }
  if (!emailRe.test(email.value.trim())) {
    email.classList.add("error");
    emailErr.classList.remove("hidden");
    valid = false;
  } else {
    email.classList.remove("error");
    emailErr.classList.add("hidden");
  }
  if (message.value.trim().length < 20) {
    message.classList.add("error");
    messageErr.classList.remove("hidden");
    valid = false;
  } else {
    message.classList.remove("error");
    messageErr.classList.add("hidden");
  }

  if (!valid) return;

  btn.disabled = true;
  btnText.textContent = "Sending…";
  spinner.classList.remove("hidden");
  await new Promise((r) => setTimeout(r, 1800));
  btn.disabled = false;
  btnText.textContent = "Send Message";
  spinner.classList.add("hidden");
  success.classList.remove("hidden");
  name.value = "";
  email.value = "";
  message.value = "";
  setTimeout(() => success.classList.add("hidden"), 5000);
});

["cName", "cEmail", "cMessage"].forEach((id) => {
  document.getElementById(id).addEventListener("input", () => {
    document.getElementById(id).classList.remove("error");
  });
});

// ── Smooth scroll for all anchor links ───────────────
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});
