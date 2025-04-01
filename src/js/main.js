// Переключение языка (заглушка)
  document.querySelector('.language-switcher').addEventListener('click', () => {
    alert('Переключение языка будет реализовано позже');
  });

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
  themeSwitcher.textContent = theme === 'dark' ? '☀' : '🌙';
}