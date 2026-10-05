// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // Close nav on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container') && !e.target.closest('#navToggle')) {
      navLinks.classList.remove('active');
    }
  });
}

// Scroll reveal with IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.reveal').forEach((element) => {
  observer.observe(element);
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinkAnchors = document.querySelectorAll('.nav-links a');

function highlightNav() {
  const scrollPos = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinkAnchors.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNav);
highlightNav();

// Form validation
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showError(input, message) {
  const errorEl = input.parentElement.querySelector('.error-msg');
  if (errorEl) {
    errorEl.textContent = message;
  }
}

function clearError(input) {
  const errorEl = input.parentElement.querySelector('.error-msg');
  if (errorEl) {
    errorEl.textContent = '';
  }
}

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');

    let valid = true;

    // Clear previous errors
    [name, email, message].forEach(clearError);

    // Validate name
    if (!name.value.trim()) {
      showError(name, 'Name is required');
      valid = false;
    }

    // Validate email
    if (!email.value.trim()) {
      showError(email, 'Email is required');
      valid = false;
    } else if (!validateEmail(email.value)) {
      showError(email, 'Please enter a valid email');
      valid = false;
    }

    // Validate message
    if (!message.value.trim()) {
      showError(message, 'Message is required');
      valid = false;
    }

    if (valid) {
      // Simulate sending (no backend, just show success)
      successMsg.classList.add('visible');
      form.reset();

      // Hide success message after 4 seconds
      setTimeout(() => {
        successMsg.classList.remove('visible');
      }, 4000);
    }
  });

  // Clear error on input
  form.querySelectorAll('input, textarea').forEach((field) => {
    field.addEventListener('input', () => {
      clearError(field);
    });
  });
}
