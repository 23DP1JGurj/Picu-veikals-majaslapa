(function() {
  const themeSwitcher = document.querySelector('.theme-switcher');
  const body = document.body;

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    themeSwitcher.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  }

  themeSwitcher.addEventListener('click', () => {
    const reviewsMenu = document.getElementById('reviews-menu');
    const wasOpen = reviewsMenu.classList.contains('open');
  
    const current = body.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeSwitcher.textContent = next === 'dark' ? '☀️' : '🌙';

    if (wasOpen) {
      reviewsMenu.classList.add('open');
    }
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
  document.querySelectorAll('.mobile-nav-links a').forEach((link, index) => {
    link.textContent = translations.navbar.links[index];
  });

  document.querySelector('.hero-title').textContent = translations.hero.title;
  document.querySelector('.hero-subtitle').textContent = translations.hero.subtitle;

  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.dataset.translate;   
    const [section, field] = key.split('.');
    const value = translations.sections[section][field];
  
    if (element.tagName === 'INPUT' && (element.type === 'button' || element.type === 'submit')) {
      element.value = value;                      
    } else if (element.tagName === 'INPUT' && element.placeholder !== undefined) {
      element.placeholder = value;                   
    } else if (element.tagName === 'TEXTAREA') {
      element.placeholder = value;                
    } else {
      element.textContent = value;                 
    }
  });

  document.querySelector('footer p').textContent = translations.footer;
}

languageSwitcher.addEventListener('click', () => {
  const reviewsMenu = document.getElementById('reviews-menu');
  const wasOpen = reviewsMenu.classList.contains('open');

  currentLang = currentLang === 'lv' ? 'en' : 'lv';
  localStorage.setItem('language', currentLang);

  updateContent(currentLang);

  if (wasOpen) {
    reviewsMenu.classList.add('open');
  }
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

  function getExpansionSettings() {
    const w = window.innerWidth;
    if (w >= 2000) {
      return [
        { left:   0, right: 137 },
        { left:  47, right:  91 },
        { left:  91.5, right: 45.5 },
        { left: 138, right:  -2 }
      ];
    } else if (w >= 1800) {
        return [
          { left:   0, right: 139 },
          { left:  47, right:  93 },
          { left:  93, right: 46.5 },
          { left: 140, right:  -2 }
        ];
    } else if (w >= 1600) {
        return [
          { left:   0, right: 141 },
          { left:  47, right:  94 },
          { left:  94, right: 46.5 },
          { left: 141, right:  -2 }
        ];
    } else if (w >= 1400) {
      return [
        { left:   0, right: 142 },
        { left:  49, right:  95 },
        { left:  94, right:  48 },
        { left: 142, right:   0 }
      ];
    } else if (w >= 1200) {
      return [
        { left:   0, right: 144 },
        { left:  51, right:  95 },
        { left:  97, right:  48 },
        { left: 145, right:   0 }
      ];
    } else if (w >= 1000) {
      return [
        { left:   0, right:  147 },
        { left:  50, right:  100 },
        { left:  98, right:  49 },
        { left:  148, right:   0 }
      ];
    } else if (w >= 820) {
      return [
        { left:   0, right:  152 },
        { left:  52, right:  101 },
        { left:  100, right:  53 },
        { left:  152, right:   0 }
      ];
    } else {
      return [
        { left:   0, right:  156 },
        { left:  52, right:  104 },
        { left:  105, right:  53 },
        { left:  156, right:   0 }
      ];
    }
  }

  let expansionSettings = getExpansionSettings();

  window.addEventListener('resize', () => {
    expansionSettings = getExpansionSettings();
  });

  if (window.innerWidth > 768) {
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
        section.style.left = `-${settings.left}%`;
        section.classList.add('expanded');
      });

      section.addEventListener('mouseleave', () => {
        wrappers.forEach(w => w.style.flex = '1');
        section.style.width = '100%';
        section.style.left = '0';
        section.classList.remove('expanded');
      });
    });
  } else {
    miniSections.forEach(section => {
      section.addEventListener('click', () => {
        section.classList.toggle('expanded');
      });
    });

    document.addEventListener('click', e => {
      if (!e.target.closest('.mini-section')) {
        miniSections.forEach(section => {
          section.classList.remove('expanded');
        });
      }
    });
  }
});
})();


(function() {
  const wrapper = document.querySelector('.download-wrapper');
  
  if (window.innerWidth <= 375) {
    wrapper.classList.add('mobile');
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth <= 375) {
      wrapper.classList.add('mobile');
    } else {
      wrapper.classList.remove('mobile');
    }
  });

  const btn = document.getElementById('download-btn');
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
  const sliderContainer = document.querySelector('#guide .guide-slider');
  const wrapper = document.querySelector('#guide .slides-wrapper');
  const slides = Array.from(wrapper.children);
  const prevBtn = document.querySelector('#guide .slider-nav.prev');
  const nextBtn = document.querySelector('#guide .slider-nav.next');
  let currentIndex = 0;

  function showSlide(index) {
    const slideWidth = sliderContainer.clientWidth;
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

  window.addEventListener('resize', () => showSlide(currentIndex));

  showSlide(0);
});

document.addEventListener('DOMContentLoaded', () => {
  const btnGuide = document.getElementById('download-guide-btn');
  if (!btnGuide) return;

  const fileUrl = btnGuide.dataset.url;
  const fileName = fileUrl.split('/').pop();

  btnGuide.addEventListener('click', () => {
    btnGuide.disabled = true;
    fetch(fileUrl)
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.blob();
      })
      .then(blob => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(err => {
        alert('Kļūda lejupielādējot failu: ' + err.message);
      })
      .finally(() => {
        btnGuide.disabled = false;
      });
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const starContainer = document.querySelector('.star-rating');
  let selectedRating = 0;

  function highlightStars(count) {
    starContainer.querySelectorAll('span').forEach(span => {
      const v = +span.dataset.value;
      if (v <= count) {
        span.textContent = '★';
        span.classList.add('selected');
      } else {
        span.textContent = '☆';
        span.classList.remove('selected');
      }
    });
  }

  starContainer.addEventListener('mouseover', e => {
    if (e.target.dataset.value) {
      highlightStars(+e.target.dataset.value);
    }
  });
  starContainer.addEventListener('mouseout', () => highlightStars(selectedRating));
  starContainer.addEventListener('click', e => {
    if (e.target.dataset.value) {
      selectedRating = +e.target.dataset.value;
      highlightStars(selectedRating);
    }
  });

  const form = document.querySelector('.new-review-form');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const name = form.name.value.trim();
    const text = form.text.value.trim();   
  
    if (!name || !text || selectedRating === 0) {
      alert('Lūdzu, ievadiet vārdu, tekstu un vērtējumu!');
      return;
    }
  
    const payload = { name, text, rating: selectedRating };
    await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  
    form.name.value = '';
    form.text.value = '';                
    selectedRating = 0;
    highlightStars(0);
    fetchReviews();
  });

  const clearBtn = document.getElementById('clear-review-btn');
  clearBtn.addEventListener('click', () => {
    form.reset();
    selectedRating = 0;
    highlightStars(0);
  });

  const listEl = document.querySelector('.reviews-list');
  async function fetchReviews() {
    const res = await fetch('/api/reviews');
    const reviews = await res.json();
    listEl.innerHTML = reviews.map(r => {
      const date = new Date(r.date).toLocaleString();
      const stars = Array.from({ length: 5 }, (_, i) =>
        `<span class="${i < r.rating ? 'selected' : ''}">★</span>`
      ).join('');
      return `
        <div class="review-item">
          <strong>${r.name}</strong> <em>${date}</em>
          <div class="display-stars">${stars}</div>
          <p>${r.text}</p>
        </div>
      `;
    }).join('');
  }

  fetchReviews();

    const openBtn = document.getElementById('open-reviews');
    const closeBtn = document.getElementById('close-reviews');
    const reviewsMenu = document.getElementById('reviews-menu');
  
    openBtn.addEventListener('click', () => reviewsMenu.classList.toggle('open'));
    closeBtn.addEventListener('click', () => reviewsMenu.classList.remove('open'));
  
    document.addEventListener('click', e => {
      const reviewsMenu = document.getElementById('reviews-menu');
      const openBtn    = document.getElementById('open-reviews');
      const langBtn    = document.querySelector('.language-switcher');
      const themeBtn    = document.querySelector('.theme-switcher');

      if (
        reviewsMenu.classList.contains('open') &&
        !reviewsMenu.contains(e.target) &&
        e.target !== openBtn &&
        e.target !== langBtn &&
        e.target !== themeBtn
      ) {
        reviewsMenu.classList.remove('open');
      }
    });
  
    reviewsMenu.addEventListener('wheel', e => e.stopPropagation(), { passive: false });
    document.querySelector('main').addEventListener('wheel', e => {
      if (reviewsMenu.classList.contains('open')) e.stopPropagation();
    }, { passive: false });
});

function updateNavbarHeight() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  const h = nav.offsetHeight;
  document.documentElement.style.setProperty('--navbar-height', `${h}px`);
}

window.addEventListener('DOMContentLoaded', updateNavbarHeight);
window.addEventListener('resize', updateNavbarHeight);
updateNavbarHeight(); 

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href="#start"]').forEach(homeLink => {
    homeLink.addEventListener('click', e => {
      e.preventDefault();
      const overlay = document.querySelector('.mobile-nav-overlay');
      if (overlay?.classList.contains('open')) {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.navbar-logo');
  if (logo) {
    logo.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const openBtn  = document.querySelector('.hamburger-btn');
  const closeBtn = document.querySelector('.mobile-nav-close');
  const overlay  = document.querySelector('.mobile-nav-overlay');
  const links    = overlay.querySelectorAll('a[href^="#"]');

  function openMenu() {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);

  links.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeMenu();
  });
});