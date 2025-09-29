let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");
const logoWhite = document.querySelector(".logo-white");
const logoBlack = document.querySelector(".logo-black");

window.addEventListener("scroll", function () {
  let scrollTop = window.scrollY || document.documentElement.scrollTop;

  // ✅ إخفاء/إظهار النافبار حسب الاتجاه
  if (scrollTop > lastScrollTop) {
    // نازل لتحت
    navbar.classList.add("hidden");
  } else {
    // طالع لفوق
    navbar.classList.remove("hidden");
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // يمنع القيم السالبة

  // ✅ تغيير استايل النافبار واللوجو
  if (scrollTop > 50) {
    navbar.classList.add("scrolled");
    logoWhite.style.display = "none";
    logoBlack.style.display = "block";
  } else {
    navbar.classList.remove("scrolled");
    logoWhite.style.display = "block";
    logoBlack.style.display = "none";
  }
});

const sections = document.querySelectorAll("section"); 
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 80; // عشان النافبار
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const langBtn = document.getElementById('langToggle');
  if (!langBtn) { console.warn('langToggle not found'); return; }

  const htmlEl = document.documentElement;
  const bootstrapLTR = document.getElementById('bootstrapLTR');
  const bootstrapRTL = document.getElementById('bootstrapRTL');
  const logoWhite = document.querySelector('.logo-white');
  const logoBlack = document.querySelector('.logo-black');

  // خريطة الترجمة (يمكن توسعتها)
  const translations = {
    ar: {
      'a[href="#home"]': 'الرئيسية',
      'a[href="#features"]': 'المميزات',
      'a[href="#mentors"]': 'المرشدون',
      'a[href="#benefits"]': 'الفوائد',
      '.btn-signup': 'إنشاء حساب',
      '.login-link': 'تسجيل الدخول'
    },
    en: {
      'a[href="#home"]': 'Home',
      'a[href="#features"]': 'Features',
      'a[href="#mentors"]': 'Mentors',
      'a[href="#benefits"]': 'Benefits',
      '.btn-signup': 'Sign up',
      '.login-link': 'Login'
    }
  };

  function applyTranslations(lang) {
    const map = translations[lang] || {};
    Object.keys(map).forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        el.textContent = map[selector];
      });
    });
  }

  function setRTL(on) {
    if (on) {
      htmlEl.setAttribute('dir', 'rtl');
      if (bootstrapLTR) bootstrapLTR.disabled = true;
      if (bootstrapRTL) bootstrapRTL.disabled = false;
      if (logoWhite) logoWhite.style.display = 'none';
      if (logoBlack) logoBlack.style.display = '';
      applyTranslations('ar');
      langBtn.textContent = 'EN';
      localStorage.setItem('siteLang', 'ar');
    } else {
      htmlEl.setAttribute('dir', 'ltr');
      if (bootstrapLTR) bootstrapLTR.disabled = false;
      if (bootstrapRTL) bootstrapRTL.disabled = true;
      if (logoWhite) logoWhite.style.display = '';
      if (logoBlack) logoBlack.style.display = 'none';
      applyTranslations('en');
      langBtn.textContent = 'AR';
      localStorage.setItem('siteLang', 'en');
    }
  }

  // restore saved language
  const saved = localStorage.getItem('siteLang');
  if (saved === 'ar') setRTL(true);
  else setRTL(false);

  // click toggle
  langBtn.addEventListener('click', function(e){
    e.preventDefault();
    const isRTL = htmlEl.getAttribute('dir') === 'rtl';
    setRTL(!isRTL);
  });
});

