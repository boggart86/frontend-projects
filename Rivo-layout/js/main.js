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
  //  КОНФИГ 
  const SELECTORS = {
    filterButton: '[data-filter]',
    results: '.fltr-results',
    card: '.card',
  };

  const CLASSES = {
    hidden: 'hidden',
    active: 'active',
  };

  const ATTRS = {
    filter: 'data-filter',
    category: 'data-category',
  };

  const ANIMATION = {
    duration: 300,
    easing: 'ease',
    hidden: { opacity: 0, transform: 'scale(0.5)' },
    visible: { opacity: 1, transform: 'scale(1)' },
  };

  const VALUE = {
    all: 'all',
  };

  const CATEGORY_SEPARATOR = ' ';

  //  ЭЛЕМЕНТЫ 
  const filterButtons = document.querySelectorAll(SELECTORS.filterButton);
  const cards = [
    ...document.querySelectorAll(`${SELECTORS.results} ${SELECTORS.card}`),
  ];

  //  ФИЛЬТР 
  async function filterCards(selectedCategory) {
    const toShow = [];
    const toHide = [];

    cards.forEach(card => {
      const raw = card.getAttribute(ATTRS.category) || '';
      const cardCategories = raw
        .split(CATEGORY_SEPARATOR)
        .map(s => s.trim())
        .filter(Boolean);

      const shouldShow =
        selectedCategory === VALUE.all ||
        cardCategories.includes(selectedCategory);

      if (shouldShow && card.classList.contains(CLASSES.hidden)) toShow.push(card);
      if (!shouldShow && !card.classList.contains(CLASSES.hidden)) toHide.push(card);
    });

    // 1. Скрываем ненужные
    const hidePromises = toHide.map(card => {
      card.classList.add(CLASSES.hidden);
      return card.animate(
        [ANIMATION.visible, ANIMATION.hidden],
        {
          duration: ANIMATION.duration,
          easing: ANIMATION.easing,
          fill: 'forwards',
        }
      ).finished;
    });

    await Promise.all(hidePromises);

    // Убираем из потока
    toHide.forEach(card => (card.style.display = 'none'));

    // 2. Показываем новые
    toShow.forEach(card => {
      card.classList.remove(CLASSES.hidden);
      card.style.display = '';

      card.animate(
        [ANIMATION.hidden, ANIMATION.visible],
        {
          duration: ANIMATION.duration,
          easing: ANIMATION.easing,
          fill: 'forwards',
        }
      );
    });
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove(CLASSES.active));
      button.classList.add(CLASSES.active);
      filterCards(button.getAttribute(ATTRS.filter));
    });
  });
  // ===== ФИЛЬТР =====

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