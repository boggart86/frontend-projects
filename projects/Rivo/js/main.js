document.addEventListener('DOMContentLoaded', () => {

  // burger-menu
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.burger-nav');

  function toggleMenu(open) {
    burger.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  burger.addEventListener('click', () => {
    const isOpen = burger.getAttribute('aria-expanded') === 'true';
    console.log(!isOpen)
    toggleMenu(!isOpen);
  });

  // Клик по ссылке внутри меню — закрыть
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) toggleMenu(false);
  });

  // Esc — закрыть
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleMenu(false);
  });

  document.addEventListener('click', (e) => {

    // клик внутри меню или по бургеру — игнорируем
    if (e.target.closest('.burger-nav') || e.target.closest('.burger')) return;

    toggleMenu(false);
  });
  // burger-menu

  // ===== ФИЛЬТР =====
  var mixer = mixitup('.fltr-results');

  mixer.filter('.hot');
  // ===== ФИЛЬТР =====

  // ===== Таймер =====
  (function () {
    const timer = document.querySelector('.timer');
    if (!timer) return;

    const daysEl = timer.querySelector('[data-unit="days"]');
    const hoursEl = timer.querySelector('[data-unit="hours"]');
    const minutesEl = timer.querySelector('[data-unit="minutes"]');
    const secondsEl = timer.querySelector('[data-unit="seconds"]');

    // Считываем начальные значения из HTML
    const initialDays = parseInt(daysEl.textContent, 10) || 0;
    const initialHours = parseInt(hoursEl.textContent, 10) || 0;
    const initialMinutes = parseInt(minutesEl.textContent, 10) || 0;
    const initialSeconds = parseInt(secondsEl.textContent, 10) || 0;

    // Переводим всё в миллисекунды
    const initialMs =
      initialDays * 24 * 60 * 60 * 1000 +
      initialHours * 60 * 60 * 1000 +
      initialMinutes * 60 * 1000 +
      initialSeconds * 1000;

    // Момент старта
    const startTime = Date.now();

    // Форматирование с ведущим нулём
    const pad = (num) => String(num).padStart(2, '0');

    function update() {
      const elapsed = Date.now() - startTime;
      let remaining = initialMs - elapsed;

      if (remaining <= 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        clearInterval(intervalId);
        return;
      }

      const totalSeconds = Math.floor(remaining / 1000);
      const days = Math.floor(totalSeconds / (24 * 60 * 60));
      const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
      const seconds = totalSeconds % 60;

      daysEl.textContent = pad(days);
      hoursEl.textContent = pad(hours);
      minutesEl.textContent = pad(minutes);
      secondsEl.textContent = pad(seconds);
    }

    // Первое обновление сразу, затем каждую секунду
    update();
    const intervalId = setInterval(update, 1000);
  })();
  // ===== Таймер =====

  // ===== Swiper =====
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      addIcons: false,
    },

    slidesPerGroup: 1,

    breakpoints: {
      // when window width is >= 320px
      1000: {
        slidesPerView: 3,
        spaceBetween: 37
      },

      500: {
        slidesPerView: 1,
        spaceBetween: 20
      },
    }
  });
  // ===== Swiper =====

});