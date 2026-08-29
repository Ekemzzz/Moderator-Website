// Custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = window.innerWidth / 2, ry = window.innerHeight / 3;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animCursor() {
  rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
  cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  document.documentElement.style.setProperty('--sx', rx + 'px');
  document.documentElement.style.setProperty('--sy', ry + 'px');
  requestAnimationFrame(animCursor);
}
animCursor();
document.querySelectorAll('a, button, .service-card, .work-card, .tool-card').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
});

// Nav toggle
const toggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
toggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Scroll-spy — active nav link
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
const sections = Array.from(navAnchors).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
const spyObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (link) link.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
sections.forEach(s => spyObserver.observe(s));

// Scroll reveal — cards that enter the viewport together cascade 0.1s apart
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  let batch = 0;
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.transitionDelay = (batch * 0.1) + 's';
      e.target.classList.add('visible');
      observer.unobserve(e.target);
      batch++;
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// Scroll to top / footer buttons
const scrollToTop = document.getElementById('scrollToTop');
const scrollToFooter = document.getElementById('scrollToFooter');
const footerEl = document.querySelector('footer');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const atBottom = (window.innerHeight + scrolled) >= document.documentElement.scrollHeight - 10;

  // Show go-to-top once scrolled down a bit
  if (scrolled > 300) {
    scrollToTop.classList.add('visible');
  } else {
    scrollToTop.classList.remove('visible');
  }

  // Hide go-to-footer when already at footer
  if (atBottom) {
    scrollToFooter.classList.remove('visible');
  } else {
    scrollToFooter.classList.add('visible');
  }
});

// Trigger once on load in case page starts mid-scroll
window.dispatchEvent(new Event('scroll'));

scrollToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
scrollToFooter.addEventListener('click', () => footerEl.scrollIntoView({ behavior: 'smooth' }));

// Contact form — compose an email to ekemini456@gmail.com with the form details
document.querySelector('.btn-submit').addEventListener('click', e => {
  e.preventDefault();
  const fname = document.getElementById('fname').value.trim();
  const lname = document.getElementById('lname').value.trim();
  const email = document.getElementById('email').value.trim();
  const service = document.getElementById('service').value;
  const other = document.getElementById('otherService').value.trim();
  const message = document.getElementById('message').value.trim();

  const subject = `Portfolio inquiry from ${fname} ${lname}`.trim();
  const body = [
    `Name: ${fname} ${lname}`,
    `Email: ${email}`,
    `Service needed: ${service === 'Other' && other ? `Other - ${other}` : service}`,
    '',
    message
  ].join('\n');

  window.location.href = `mailto:ekemini456@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const form = document.querySelector('.contact-form');
  form.innerHTML = '<p style="color:var(--green);font-weight:700;font-size:1.1rem;padding:2rem 0;"><i class="fa-solid fa-circle-check"></i> Your email app should now open with the message addressed to ekemini456@gmail.com — just hit send!</p>';
});

// "Other" service — reveal a field to type what they need
const serviceSelect = document.getElementById('service');
const otherServiceGroup = document.getElementById('otherServiceGroup');
serviceSelect.addEventListener('change', () => {
  const isOther = serviceSelect.value === 'Other';
  otherServiceGroup.classList.toggle('hidden', !isOther);
  if (isOther) document.getElementById('otherService').focus();
});

// Lightbox — click any design (gallery cards or strip thumbs) to enlarge
const zoomables = Array.from(document.querySelectorAll('.content-card img, .laos-thumb'));
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCaption = document.getElementById('lbCaption');
let lbIndex = 0;

function openLightbox(i) {
  lbIndex = i;
  const img = zoomables[i];
  lbImg.src = img.src;
  lbCaption.textContent = img.alt;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = document.querySelector('.laos-modal.open') ? 'hidden' : '';
}

function stepLightbox(d) {
  openLightbox((lbIndex + d + zoomables.length) % zoomables.length);
}

zoomables.forEach((img, i) => img.addEventListener('click', () => openLightbox(i)));
document.getElementById('lbClose').addEventListener('click', closeLightbox);
document.getElementById('lbPrev').addEventListener('click', e => { e.stopPropagation(); stepLightbox(-1); });
document.getElementById('lbNext').addEventListener('click', e => { e.stopPropagation(); stepLightbox(1); });
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

// "View all" boxes — open full gallery modals (designs + memes)
const galleryModals = [];

function bindGalleryModal(boxId, modalId, closeId) {
  const modal = document.getElementById(modalId);
  const close = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    if (!lightbox.classList.contains('open')) document.body.style.overflow = '';
  };
  document.getElementById(boxId).addEventListener('click', () => {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
  document.getElementById(closeId).addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  galleryModals.push({ modal, close });
}

bindGalleryModal('laosBox', 'laosModal', 'lmClose');
bindGalleryModal('memesBox', 'memesModal', 'mmClose');
bindGalleryModal('otherBox', 'otherModal', 'omClose');

// Animated tab title — slow marquee, plus a "come back" nudge when the tab loses focus
const baseTitle = 'Eshiet Ekemini — Community Manager ✦ ';
let titlePos = 0;
let titleTimer = setInterval(rotateTitle, 350);

function rotateTitle() {
  titlePos = (titlePos + 1) % baseTitle.length;
  document.title = baseTitle.slice(titlePos) + baseTitle.slice(0, titlePos);
}

window.addEventListener('blur', () => {
  clearInterval(titleTimer);
  document.title = '✦ Come back — let\'s build your community';
});

window.addEventListener('focus', () => {
  clearInterval(titleTimer);
  titleTimer = setInterval(rotateTitle, 350);
});

// Typewriter effect for the hero heading
(function () {
  const l1 = document.getElementById('typeLine1');
  const l2 = document.getElementById('typeLine2');
  if (!l1 || !l2) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const t1 = l1.textContent;
  const t2 = l2.textContent;
  const speed = 95;
  l1.textContent = '';
  l2.textContent = '';
  l1.classList.add('caret');

  let i = 0;
  function typeLine1() {
    if (i < t1.length) {
      l1.textContent += t1.charAt(i++);
      setTimeout(typeLine1, speed);
    } else {
      l1.classList.remove('caret');
      l2.classList.add('caret');
      i = 0;
      setTimeout(typeLine2, 250);
    }
  }

  function typeLine2() {
    if (i < t2.length) {
      l2.textContent += t2.charAt(i++);
      setTimeout(typeLine2, speed);
    }
    // caret keeps blinking on line 2 after typing finishes
  }

  typeLine1();
})();

// Count-up animation for stat numbers when they scroll into view
(function () {
  const counters = document.querySelectorAll('.count');
  if (!counters.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function animate(el) {
    const target = parseInt(el.dataset.target, 10);
    const dur = 1400;
    const start = performance.now();
    el.textContent = '0';
    function step(now) {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animate(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach(c => io.observe(c));
})();

document.addEventListener('keydown', e => {
  if (lightbox.classList.contains('open')) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') stepLightbox(-1);
    if (e.key === 'ArrowRight') stepLightbox(1);
    return;
  }
  if (e.key === 'Escape') galleryModals.forEach(g => { if (g.modal.classList.contains('open')) g.close(); });
});
