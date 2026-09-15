(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- mark current nav pill active ---------- */
  var here = (location.pathname.split('/').pop() || 'index.html');
  if (here === '') here = 'index.html';
  document.querySelectorAll('a[data-nav]').forEach(function (link) {
    var target = link.getAttribute('href');
    if (target === here) {
      link.classList.add('pill-active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('pill-active');
    }
  });

  /* ---------- live open/closed badge ---------- */
  function applyStatus() {
    if (!window.restaurantHours) return;
    var status = window.restaurantHours.getStatus();

    var badge = document.getElementById('openBadge');
    var badgeText = document.getElementById('openBadgeText');
    if (badge && badgeText) {
      badgeText.textContent = status.short;
      badge.classList.toggle('is-closed', !status.isOpen);
      badge.title = status.message;
    }

    var banner = document.getElementById('hoursStatus');
    var bannerText = document.getElementById('hoursStatusText');
    if (banner && bannerText) {
      bannerText.textContent = status.message;
      banner.classList.toggle('is-closed', !status.isOpen);
    }

    document.querySelectorAll('.hours-row').forEach(function (row) {
      var isToday = parseInt(row.getAttribute('data-day'), 10) === status.dayIndex;
      row.classList.toggle('is-today', isToday);
    });
  }
  applyStatus();
  window.setInterval(applyStatus, 60000);

  /* ---------- header shrink on scroll ---------- */
  var header = document.getElementById('siteHeader');
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 24) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- mobile menu ---------- */
  var toggle = document.getElementById('menuToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.classList.toggle('is-open', isOpen);
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('is-open');
      });
    });
  }

  /* ---------- scroll reveal ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------- soft page transitions between internal pages ---------- */
  document.querySelectorAll('a[href$=".html"]').forEach(function (link) {
    if (link.hostname !== window.location.hostname) return;
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (!href || href.startsWith('#') || link.target === '_blank' || reduceMotion) return;
      e.preventDefault();
      document.documentElement.classList.add('leave');
      window.setTimeout(function () {
        window.location.href = href;
      }, 320);
    });
  });
})();
