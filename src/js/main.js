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


(function() {
  const btn = document.getElementById('download-btn');
  const wrapper = document.querySelector('.download-wrapper');
  const road = document.querySelector('.road');
  const truck = document.querySelector('.truck');
  const percentSpan = truck.querySelector('.percent');

  const fileUrl = 'src/app/Picu-veikals-main.zip'; 
  const fileName = 'Picu-veikals-main.zip';

  btn.addEventListener('click', () => {
    btn.disabled = true;
    wrapper.classList.add('active');

    const start = performance.now();
    function animateProgress(now) {
      const elapsed = now - start;
      const percent = Math.min(100, Math.round((elapsed / 2000) * 100));
      percentSpan.textContent = percent + '%';
      if (elapsed < 2000) {
        requestAnimationFrame(animateProgress);
      }
    }
    requestAnimationFrame(animateProgress);

    const xhr = new XMLHttpRequest();
    xhr.open('GET', fileUrl, true);
    xhr.responseType = 'blob';

    let blobData = null;
    xhr.onload = () => {
      if (xhr.status === 200) {
        blobData = xhr.response;
      }
    };
    xhr.onerror = () => {
      alert('Ошибка загрузки файла.');
      cleanup();
    };
    xhr.send();

    truck.addEventListener('animationend', function handler() {
      truck.removeEventListener('animationend', handler);
      if (blobData) {
        downloadBlob(blobData);
      } else {
        const check = setInterval(() => {
          if (blobData) {
            clearInterval(check);
            downloadBlob(blobData);
          }
        }, 100);
      }
    });

    function downloadBlob(blob) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      cleanup();
    }

    function cleanup() {
      wrapper.classList.remove('active');
      btn.disabled = false;
      setTimeout(() => {
        truck.style.animation = '';
        truck.style.left = '0';
        percentSpan.textContent = '0%';
      }, 300);
    }    
  });
})();

document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('#guide .slides-wrapper');
  const slides = Array.from(wrapper.children);
  const prevBtn = document.querySelector('#guide .slider-nav.prev');
  const nextBtn = document.querySelector('#guide .slider-nav.next');
  let currentIndex = 0;

  function showSlide(index) {
    const slideWidth = slides[0].getBoundingClientRect().width;
    wrapper.style.transform = `translateX(-${slideWidth * index}px)`;
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  window.addEventListener('resize', () => {
    showSlide(currentIndex);
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('open-reviews');
  const closeBtn = document.getElementById('close-reviews');
  const reviewsMenu = document.getElementById('reviews-menu');

openBtn.addEventListener('click', () => {
if (reviewsMenu.classList.contains('open')) {
  reviewsMenu.classList.remove('open');
} else {
  reviewsMenu.classList.add('open');
}
});

  closeBtn.addEventListener('click', () => {
    reviewsMenu.classList.remove('open');
  });
  closeBtn.addEventListener('click', () => {
    reviewsMenu.classList.remove('open');
  });

  document.addEventListener('click', e => {
    if (reviewsMenu.classList.contains('open') && !reviewsMenu.contains(e.target) && e.target !== openBtn) {
      reviewsMenu.classList.remove('open');
    }
  });

  reviewsMenu.addEventListener('wheel', e => {
    e.stopPropagation();
  }, { passive: false });
  document.querySelector('main').addEventListener('wheel', e => {
    if (!reviewsMenu.classList.contains('open')) return;
    e.stopPropagation();
  }, { passive: false });

  document.querySelector('.new-review-form').addEventListener('submit', e => {
    e.preventDefault();
    alert('Спасибо за ваш отзыв!');
    e.target.querySelector('textarea').value = '';
  });
});