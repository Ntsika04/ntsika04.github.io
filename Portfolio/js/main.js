const navMenu = document.getElementById('myNavMenu');
const navToggle = document.getElementById('navToggle');
const navOverlay = document.getElementById('navOverlay');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
const themeToggle = document.getElementById('themeToggle');
const hireMeBtn = document.getElementById('hireMeBtn');
const contactForm = document.getElementById('contactForm');
const contactName = document.getElementById('contactName');
const contactEmail = document.getElementById('contactEmail');
const contactMessage = document.getElementById('contactMessage');
const formStatus = document.getElementById('formStatus');
const themeIcon = themeToggle?.querySelector('i');
const savedTheme = localStorage.getItem('portfolio-theme');

function applyTheme(theme) {
  const isDarkMode = theme === 'dark';

  document.body.classList.toggle('dark-mode', isDarkMode);
  themeToggle?.setAttribute('aria-pressed', String(isDarkMode));
  themeToggle?.setAttribute('aria-label', isDarkMode ? 'Activate light mode' : 'Activate dark mode');

  if (themeIcon) {
    themeIcon.className = isDarkMode ? 'uil uil-sun' : 'uil uil-moon';
  }
}

applyTheme(savedTheme || 'light');

function openMenu() {
  navMenu.classList.add('responsive');
  document.body.classList.add('menu-open');
  navToggle.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  navMenu.classList.remove('responsive');
  document.body.classList.remove('menu-open');
  navToggle.setAttribute('aria-expanded', 'false');
}

function toggleMenu() {
  if (navMenu.classList.contains('responsive')) {
    closeMenu();
    return;
  }

  openMenu();
}

navToggle?.addEventListener('click', toggleMenu);
navOverlay?.addEventListener('click', closeMenu);
themeToggle?.addEventListener('click', () => {
  const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
  applyTheme(nextTheme);
  localStorage.setItem('portfolio-theme', nextTheme);
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.forEach((currentLink) => currentLink.classList.remove('active-link'));
    link.classList.add('active-link');
    closeMenu();
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    closeMenu();
  }
});

hireMeBtn?.addEventListener('click', () => {
  window.setTimeout(() => {
    contactName?.focus();
  }, 450);
});

/*-- ------ ADD SHADOW ON THE NAVIGATION BAR WHILE SCROLLING ------- --*/
window.addEventListener('scroll', headerShadow);

function headerShadow() {
  const navHeader = document.getElementById('header');

  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    navHeader.style.boxShadow = '0 1px 6px rgba(0,0,0,0.1)';
    navHeader.style.height = '70px';
    navHeader.style.lineHeight = '70px';
  } else {
    navHeader.style.boxShadow = 'none';
    navHeader.style.height = '90px';
    navHeader.style.lineHeight = '90px';
  }
}

/*-- ------ TYPING EFFECT ------- --*/
new Typed('.typedText', {
  strings: ['Cloud-Practitioner', 'Cybersecurity', 'Designer'],
  loop: true,
  typeSpeed: 100,
  backSpeed: 80,
  backDelay: 2000
});

/*---- ------ ##-- SCROLL REVEAL ANIMATION ---- ## ------ ----*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '80px',
  duration: 2000,
  reset: true
});

/*-- ------ HOME ------- --*/
sr.reveal('.featured-text-card', {});
sr.reveal('.featured-name', { delay: 100 });
sr.reveal('.featured-text-info', { delay: 200 });
sr.reveal('.featured-text-btn', { delay: 200 });
sr.reveal('.social_icons', { delay: 200 });
sr.reveal('.featured-image', { delay: 300 });

/*-- ------ PROJECT BOX ------- --*/
sr.reveal('.project-box ', { interval: 200 });

/*-- ------ HEADINGS ------- --*/
sr.reveal('.top-header', {});

/*---- ---##----- SCROLL REVEAL LEFT_RIGHT ANIMATION -----## ---- --*/
const srLeft = ScrollReveal({
  origin: 'left',
  distance: '80px',
  duration: 2000,
  reset: true
});
srLeft.reveal('.about-info', { delay: 100 });
srLeft.reveal('.contact-info', { delay: 100 });

/*-- ------ ABOUT SKILLS & FORM BOX ------- --*/
const srRight = ScrollReveal({
  origin: 'right',
  distance: '80px',
  duration: 2000,
  reset: true
});
srRight.reveal('.skills-box', { delay: 100 });
srRight.reveal('.form-control', { delay: 100 });

/* ----- CHANGE ACTIVE LINK ----*/
function scrollActive() {
  const scrollY = window.scrollY + 120;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop;
    const sectionId = current.getAttribute('id');
    const link = document.querySelector('.nav-menu a[href*="' + sectionId + '"]');

    if (!link) {
      return;
    }

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((currentLink) => currentLink.classList.remove('active-link'));
      link.classList.add('active-link');
    }
  });
}

window.addEventListener('scroll', scrollActive);
window.addEventListener('load', () => {
  headerShadow();
  scrollActive();
});

function setFormStatus(message, type) {
  if (!formStatus) {
    return;
  }

  formStatus.textContent = message;
  formStatus.classList.remove('is-error', 'is-success');

  if (type) {
    formStatus.classList.add(type);
  }
}

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = contactName?.value.trim() ?? '';
  const email = contactEmail?.value.trim() ?? '';
  const message = contactMessage?.value.trim() ?? '';

  if (!name || !email || !message) {
    setFormStatus('Please complete your name, email, and message first.', 'is-error');
    return;
  }

  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(
    `Hi Ntsikelelo,%0D%0A%0D%0AMy name is ${name}.%0D%0AEmail: ${email}%0D%0A%0D%0A${message}`
  );

  window.location.href = `mailto:ntsikelelontsikampahleni@gmail.com?subject=${subject}&body=${body}`;
  setFormStatus('Your email app should open with your message ready to send.', 'is-success');
});
