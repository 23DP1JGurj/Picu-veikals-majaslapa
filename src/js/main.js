(function() {
  const themeSwitcher = document.querySelector('.theme-switcher');
  const body = document.body;

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    themeSwitcher.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  }

  themeSwitcher.addEventListener('click', () => {
    const current = body.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeSwitcher.textContent = next === 'dark' ? '☀️' : '🌙';
  });

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
  const miniSections = document.querySelectorAll('.mini-section');
  const wrappers = document.querySelectorAll('.mini-section-wrapper');

  wrappers.forEach(w => w.style.transition = 'flex 0.4s ease');

  const expansionSettings = [
    { left: 0, right: 137 },
    { left: 47, right: 91 },
    { left: 91.5, right: 45.5 },
    { left: 137, right: -2 }
  ];

  miniSections.forEach((section, index) => {
    const wrapper = section.parentElement;
    section.addEventListener('mouseenter', () => {
      wrappers.forEach(w => w.style.flex = '1');
      const settings = expansionSettings[index];
      const flexVal = 1 + (settings.left + settings.right) / 100;
      wrapper.style.flex = flexVal;

      section.style.setProperty('--expand-left', `${settings.left}%`);
      section.style.setProperty('--expand-right', `${settings.right}%`);

      section.style.width = `calc(100% + ${settings.left}% + ${settings.right}%)`;
      section.style.left  = `-${settings.left}%`;
      section.classList.add('expanded');
    });
    section.addEventListener('mouseleave', () => {
      wrappers.forEach(w => w.style.flex = '1');
      section.style.width = '100%';
      section.style.left = '0';
      section.classList.remove('expanded');
    });
  });
});
})();
