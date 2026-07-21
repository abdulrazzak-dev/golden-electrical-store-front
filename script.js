/* ============================================================
   GOLDEN ELECTRICAL STORE — Premium JavaScript
============================================================ */

'use strict';

// ─── INIT ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  initNav();
  initHeroCanvas();
  initTyping();
  initParallax();
  initTheme();
  initSearch();
  initCounters();
  initFilterTabs();
  initSwipers();
  initFAQ();
  initForms();
  initCart();
  initBackToTop();
  initScrollActive();
  initRipple();
  initGallery();
  initLiveChat();
  initYear();
  initWishlist();
  initVideoPlay();
});

// ─── AOS ──────────────────────────────────────────────────
function initAOS() {
  AOS.init({ duration: 750, easing: 'ease-out-cubic', once: true, offset: 80 });
}

// ─── YEAR ─────────────────────────────────────────────────
function initYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
}

// ─── NAVBAR ───────────────────────────────────────────────
function initNav() {
  const nav = document.getElementById('mainNav');
  const toggle = document.getElementById('navToggle');
  const collapse = document.getElementById('navbarNav');

  // Scroll behaviour
  const onScroll = () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hamburger toggle
  if (toggle && collapse) {
    toggle.addEventListener('click', () => {
      const isOpen = collapse.classList.contains('show');
      collapse.classList.toggle('show');
      toggle.classList.toggle('active');
      toggle.setAttribute('aria-expanded', !isOpen);
    });
  }

  // Close mobile nav on link click
  document.querySelectorAll('#navbarNav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      collapse && collapse.classList.remove('show');
      toggle && toggle.classList.remove('active');
    });
  });

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

// ─── SCROLL ACTIVE NAV ────────────────────────────────────
function initScrollActive() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar .nav-link');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(s => observer.observe(s));
}

// ─── HERO CANVAS (Electric Lines) ─────────────────────────
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [], lines = [];

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.25;
      this.vy = (Math.random() - 0.5) * 0.25;
      this.r = Math.random() * 2 + 0.5;
      this.alpha = Math.random() * 0.6 + 0.1;
      this.color = Math.random() > 0.6 ? '255,215,0' : '0,180,255';
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = Array.from({ length: 80 }, () => new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,180,255,${0.12 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  // Lightning bolt effect
  let boltTimer = 0;
  let bolts = [];
  function spawnBolt() {
    const x1 = Math.random() * W;
    const y1 = 0;
    const x2 = x1 + (Math.random() - 0.5) * 200;
    const y2 = H;
    bolts.push({ x1, y1, x2, y2, alpha: 0.8, life: 20 });
  }

  function drawBolts() {
    bolts = bolts.filter(b => b.life > 0);
    bolts.forEach(b => {
      ctx.beginPath();
      ctx.moveTo(b.x1, b.y1);
      // Add jagged path
      const segs = 8;
      for (let i = 1; i <= segs; i++) {
        const t = i / segs;
        const jx = b.x1 + (b.x2 - b.x1) * t + (Math.random() - 0.5) * 40;
        const jy = b.y1 + (b.y2 - b.y1) * t;
        ctx.lineTo(jx, jy);
      }
      ctx.strokeStyle = `rgba(0,180,255,${b.alpha * b.life / 20})`;
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(0,180,255,0.8)';
      ctx.stroke();
      ctx.shadowBlur = 0;
      b.life--;
      b.alpha *= 0.92;
    });
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    boltTimer++;
    if (boltTimer % 120 === 0) spawnBolt();
    drawBolts();
    requestAnimationFrame(animate);
  }

  init();
  animate();
  window.addEventListener('resize', init);
}

// ─── TYPING EFFECT ────────────────────────────────────────
function initTyping() {
  const el = document.getElementById('typingText');
  if (!el) return;
  const words = ['Businesses', 'Industries', 'Homes', 'Projects', 'Sri Lanka'];
  let wi = 0, ci = 0, deleting = false;

  function tick() {
    const word = words[wi];
    if (deleting) {
      el.textContent = word.substring(0, ci - 1);
      ci--;
      if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; setTimeout(tick, 400); return; }
    } else {
      el.textContent = word.substring(0, ci + 1);
      ci++;
      if (ci === word.length) { deleting = true; setTimeout(tick, 1800); return; }
    }
    setTimeout(tick, deleting ? 60 : 100);
  }
  setTimeout(tick, 1000);
}

// ─── PARALLAX ─────────────────────────────────────────────
function initParallax() {
  const hero = document.getElementById('hero3D');
  if (!hero) return;
  document.addEventListener('mousemove', e => {
    const { innerWidth, innerHeight } = window;
    const mx = (e.clientX / innerWidth - 0.5) * 20;
    const my = (e.clientY / innerHeight - 0.5) * 20;
    hero.style.transform = `translate(${mx}px, ${my}px)`;
  });
}

// ─── THEME TOGGLE ─────────────────────────────────────────
function initTheme() {
  const html = document.documentElement;
  const toggles = [document.getElementById('themeToggle'), document.getElementById('themeToggleMobile')];
  const icons = [document.getElementById('themeIcon'), document.getElementById('themeIconMobile')];

  const saved = localStorage.getItem('ge-theme') || 'light';
  html.setAttribute('data-theme', saved);
  updateIcons(saved);

  toggles.forEach(btn => {
    if (!btn) return;
    btn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('ge-theme', next);
      updateIcons(next);
    });
  });

  function updateIcons(theme) {
    icons.forEach(icon => {
      if (!icon) return;
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    });
  }
}

// ─── SEARCH ───────────────────────────────────────────────
function initSearch() {
  const overlay = document.getElementById('searchOverlay');
  const openBtn = document.getElementById('searchToggle');
  const closeBtn = document.getElementById('searchClose');
  const input = document.getElementById('searchInput');
  if (!overlay) return;

  openBtn && openBtn.addEventListener('click', () => {
    overlay.classList.add('active');
    setTimeout(() => input && input.focus(), 300);
  });
  closeBtn && closeBtn.addEventListener('click', () => overlay.classList.remove('active'));
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('active'); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') overlay.classList.remove('active'); });
}

// ─── COUNTERS ─────────────────────────────────────────────
function initCounters() {
  const nums = document.querySelectorAll('.stat-number');
  let done = false;

  function animate() {
    nums.forEach(el => {
      const target = +el.dataset.target;
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current).toLocaleString();
        if (current >= target) clearInterval(timer);
      }, 16);
    });
  }

  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !done) {
      done = true; animate();
    }
  }, { threshold: 0.4 });

  const statsSection = document.getElementById('stats');
  if (statsSection) obs.observe(statsSection);
}

// ─── PRODUCT FILTER TABS ──────────────────────────────────
function initFilterTabs() {
  const tabs = document.querySelectorAll('.filter-tab');
  const items = document.querySelectorAll('#productsGrid > [data-category]');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;

      items.forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.style.transition = 'opacity 0.35s, transform 0.35s';
        if (show) {
          item.style.opacity = '0';
          item.style.transform = 'translateY(16px)';
          item.style.display = '';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            });
          });
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(16px)';
          setTimeout(() => { item.style.display = 'none'; }, 350);
        }
      });
    });
  });
}

// ─── SWIPERS ──────────────────────────────────────────────
function initSwipers() {
  new Swiper('.bestsellerSwiper', {
    slidesPerView: 2,
    spaceBetween: 20,
    loop: true,
    autoplay: { delay: 3500, disableOnInteraction: false },
    pagination: { el: '.bestsellerSwiper .swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.bestsellerSwiper .swiper-button-next',
      prevEl: '.bestsellerSwiper .swiper-button-prev',
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      576: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
    }
  });

  new Swiper('.testimonialSwiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    autoplay: { delay: 4500, disableOnInteraction: false },
    pagination: { el: '.testimonialSwiper .swiper-pagination', clickable: true },
    breakpoints: {
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    }
  });
}

// ─── FAQ ACCORDION ────────────────────────────────────────
function initFAQ() {
  const questions = document.querySelectorAll('.faq-question');
  questions.forEach(q => {
    q.addEventListener('click', () => {
      const faqId = q.dataset.faq;
      const answer = document.getElementById('faq-ans-' + faqId);
      const isOpen = q.getAttribute('aria-expanded') === 'true';

      // Close all
      questions.forEach(qq => {
        qq.setAttribute('aria-expanded', 'false');
        const ans = document.getElementById('faq-ans-' + qq.dataset.faq);
        if (ans) ans.classList.remove('open');
      });

      // Open if was closed
      if (!isOpen && answer) {
        q.setAttribute('aria-expanded', 'true');
        answer.classList.add('open');
      }
    });
  });
}

// ─── FORMS ────────────────────────────────────────────────
function initForms() {
  // Contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = document.getElementById('contactSubmit');
      btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
      btn.disabled = true;
      setTimeout(() => {
        contactForm.style.display = 'none';
        const success = document.getElementById('formSuccess');
        if (success) success.style.display = 'flex';
        showToast('Message sent successfully!');
      }, 1800);
    });
  }

  // Newsletter forms
  ['newsletterForm', 'footerNewsletter'].forEach(id => {
    const form = document.getElementById(id);
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        showToast('You have subscribed successfully!');
        form.reset();
      });
    }
  });
}

// ─── CART ─────────────────────────────────────────────────
let cart = [];

function initCart() {
  const cartBtn = document.getElementById('cartBtn');
  const cartClose = document.getElementById('cartClose');
  const cartOverlay = document.getElementById('cartOverlay');

  cartBtn && cartBtn.addEventListener('click', openCart);
  cartClose && cartClose.addEventListener('click', closeCart);
  cartOverlay && cartOverlay.addEventListener('click', closeCart);
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

window.closeCart = function() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('active');
  document.body.style.overflow = '';
};

window.addToCart = function(btn) {
  const product = btn.dataset.product;
  const price = parseInt(btn.dataset.price);
  cart.push({ product, price, id: Date.now() });
  updateCartUI();
  showToast(`"${product}" added to cart!`);
  btn.innerHTML = '<i class="fas fa-check me-2"></i>Added!';
  btn.style.background = 'linear-gradient(135deg, rgba(74,222,128,0.15), rgba(74,222,128,0.05))';
  btn.style.borderColor = 'rgba(74,222,128,0.4)';
  btn.style.color = '#4ade80';
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-cart-plus me-2"></i>Add to Cart';
    btn.style.background = '';
    btn.style.borderColor = '';
    btn.style.color = '';
  }, 2000);
};

function updateCartUI() {
  const count = cart.length;
  const total = cart.reduce((sum, i) => sum + i.price, 0);

  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartItemCount').textContent = `(${count} item${count !== 1 ? 's' : ''})`;
  document.getElementById('cartTotal').textContent = `Rs. ${total.toLocaleString()}`;

  const cartItemsEl = document.getElementById('cartItems');
  if (count === 0) {
    cartItemsEl.innerHTML = '<div class="cart-empty"><i class="fas fa-shopping-cart"></i><p>Your cart is empty</p></div>';
    return;
  }

  cartItemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.product}</div>
        <div class="cart-item-price">Rs. ${item.price.toLocaleString()}</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})" aria-label="Remove ${item.product}">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `).join('');
}

window.removeFromCart = function(id) {
  cart = cart.filter(i => i.id !== id);
  updateCartUI();
};

// ─── BACK TO TOP ──────────────────────────────────────────
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ─── RIPPLE EFFECT ────────────────────────────────────────
function initRipple() {
  document.querySelectorAll('.ripple-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height) * 2;
      ripple.className = 'ripple';
      ripple.style.cssText = `
        width:${size}px; height:${size}px;
        left:${e.clientX - rect.left - size/2}px;
        top:${e.clientY - rect.top - size/2}px;
      `;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// ─── GALLERY / LIGHTBOX ───────────────────────────────────
const galleryImages = [
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=90',
  'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=900&q=90',
  'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=900&q=90',
  'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=900&q=90',
  'https://images.unsplash.com/photo-1573164574511-73c773193279?w=900&q=90',
  'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=900&q=90',
];
let currentLightbox = 0;

function initGallery() {
  // keyboard support
  document.addEventListener('keydown', e => {
    const lb = document.getElementById('lightbox');
    if (!lb || !lb.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxPrev();
    if (e.key === 'ArrowRight') lightboxNext();
  });
}

window.openLightbox = function(idx) {
  currentLightbox = idx;
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  img.src = galleryImages[idx];
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeLightbox = function() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
};

window.lightboxPrev = function() {
  currentLightbox = (currentLightbox - 1 + galleryImages.length) % galleryImages.length;
  document.getElementById('lightboxImg').src = galleryImages[currentLightbox];
};

window.lightboxNext = function() {
  currentLightbox = (currentLightbox + 1) % galleryImages.length;
  document.getElementById('lightboxImg').src = galleryImages[currentLightbox];
};

// ─── WISHLIST ─────────────────────────────────────────────
function initWishlist() {
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const icon = this.querySelector('i');
      const isWished = icon.classList.contains('fa-solid');
      if (isWished) {
        icon.className = 'fas fa-heart';
        this.style.background = '';
      } else {
        icon.className = 'fas fa-heart fa-solid';
        this.style.background = 'rgba(255,71,87,0.8)';
        showToast('Added to wishlist!');
      }
    });
  });
}

// ─── VIDEO PLAY ───────────────────────────────────────────
function initVideoPlay() {
  const btn = document.getElementById('videoPlayBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    showToast('Video player coming soon!');
  });
}

// ─── LIVE CHAT ────────────────────────────────────────────
function initLiveChat() {
  const btn = document.getElementById('liveChatBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    window.open('https://wa.me/94775650625?text=Hi!%20I%20need%20help%20with%20a%20product.', '_blank');
  });
}

// ─── TOAST ────────────────────────────────────────────────
function showToast(message, duration = 3000) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

// ─── CARD TILT ────────────────────────────────────────────
(function initTilt() {
  document.querySelectorAll('.product-card-premium, .why-card, .service-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rx = ((y - cy) / cy) * 5;
      const ry = ((x - cx) / cx) * -5;
      card.style.transform = `translateY(-12px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
  });
})();
