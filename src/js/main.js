const themeSwitcher = document.querySelector('.theme-switcher');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

themeSwitcher.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  themeSwitcher.textContent = theme === 'dark' ? '☀️' : '🌙';
}

const languageSwitcher = document.querySelector('.language-switcher');
let currentLang = 'lv';

function updateContent(lang) {
  const translations = window.translations[lang];

  languageSwitcher.textContent = translations.navbar.language;

  document.querySelector('.navbar-logo span').textContent = translations.navbar.logo;
  document.querySelectorAll('.navbar-links a').forEach((link, index) => {
    link.textContent = translations.navbar.links[index];
  });

  document.querySelector('.hero-title').textContent = translations.hero.title;
  document.querySelector('.hero-subtitle').textContent = translations.hero.subtitle;

  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.dataset.translate;
    const [section, field] = key.split('.');
    element.textContent = translations.sections[section][field];
  });

  document.querySelector('footer p').textContent = translations.footer;
}

languageSwitcher.addEventListener('click', () => {
  currentLang = currentLang === 'lv' ? 'en' : 'lv';
  localStorage.setItem('language', currentLang);
  updateContent(currentLang);
});

const savedLang = localStorage.getItem('language') || 'lv';
updateContent(savedLang);

function animateOnScroll() {
  const sections = document.querySelectorAll('.section');
  
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight * 0.75) {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); 
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    const headerHeight = document.querySelector('.navbar').offsetHeight;
    
    const targetPosition = targetSection.offsetTop - headerHeight;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
    
    history.pushState(null, null, targetId);
  });
});
