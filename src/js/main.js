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

document.addEventListener("DOMContentLoaded", function () {
  const miniSections = document.querySelectorAll('.mini-section');
  const sectionContent = document.querySelector('.section-content');

  miniSections.forEach((section, index) => {
    section.addEventListener('mouseenter', () => {
      miniSections.forEach(sec => {
        sec.classList.remove('active');
        sec.style.left = '';
        sec.style.width = '';
        sec.style.position = 'relative';
        sec.style.zIndex = 1;
      });

      const containerRect = sectionContent.getBoundingClientRect();
      const sectionRect   = section.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const offsetLeft = sectionRect.left - containerRect.left;

      section.style.position = 'absolute';
      section.style.zIndex = 10;

      let newLeft = offsetLeft;
      let newWidth = sectionRect.width;

      switch (index) {
        case 0:
          newLeft = offsetLeft; 
          newWidth = containerWidth - offsetLeft - (containerWidth * 0.07);
          break;

        case 1: {
          const leftShift = containerWidth * 0.25;
          newLeft = offsetLeft - leftShift;
          if (newLeft < 0) newLeft = 0;
          newWidth = sectionRect.width + leftShift + (containerWidth * 0.40);
          if (newLeft + newWidth > containerWidth) {
            newWidth = containerWidth - newLeft;
          }
          break;
        }
        case 2: {
          const leftShift = containerWidth * 0.40;
          newLeft = offsetLeft - leftShift;
          if (newLeft < 0) newLeft = 0;
          newWidth = sectionRect.width + leftShift + (containerWidth * 0.10);
          if (newLeft + newWidth > containerWidth) {
            newWidth = containerWidth - newLeft;
          }
          break;
        }
        case 3: {
          const leftShift = containerWidth * 0.40;
          newLeft = offsetLeft - leftShift;
          if (newLeft < 0) {
            newLeft = 0;
          }
          newWidth = sectionRect.width + (offsetLeft - newLeft);
          break;
        }
      }

      section.style.left  = newLeft + 'px';
      section.style.width = newWidth + 'px';
      section.classList.add('active');
    });

    section.addEventListener('mouseleave', () => {
      section.classList.remove('active');
      section.style.left = '';
      section.style.width = '';
      section.style.position = 'relative';
      section.style.zIndex = 1;
    });
  });
});
