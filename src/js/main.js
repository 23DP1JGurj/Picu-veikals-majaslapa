// Переключение темы
const themeSwitcher = document.querySelector('.theme-switcher');
const body = document.body;

// Проверяем сохраненную тему
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

// Language Switcher
const languageSwitcher = document.querySelector('.language-switcher');
let currentLang = 'lv';

function updateContent(lang) {
  const translations = JSON.parse(document.getElementById('translations').textContent)[lang];
  
  // Обновление кнопки языка
  languageSwitcher.textContent = translations.navbar.language;
  
  // Навигация
  document.querySelector('.navbar-logo span').textContent = translations.navbar.logo;
  document.querySelectorAll('.navbar-links a').forEach((link, index) => {
    link.textContent = translations.navbar.links[index];
  });
  
  // Hero Section
  document.querySelector('.hero-title').textContent = translations.hero.title;
  document.querySelector('.hero-subtitle').textContent = translations.hero.subtitle;
  
  // Все секции
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.dataset.translate;
    const [section, field] = key.split('.');
    element.textContent = translations.sections[section][field];
  });
  
  // Футер
  document.querySelector('footer p').textContent = translations.footer;
}

languageSwitcher.addEventListener('click', () => {
  currentLang = currentLang === 'lv' ? 'en' : 'lv';
  localStorage.setItem('language', currentLang);
  updateContent(currentLang);
});

// Инициализация языка
const savedLang = localStorage.getItem('language') || 'lv';
updateContent(savedLang);

// Анимация появления секций
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

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  // Устанавливаем начальные стили для анимации
  document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Запускаем сразу для видимых секций
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
    
    // Обновляем URL без перезагрузки
    history.pushState(null, null, targetId);
  });
});