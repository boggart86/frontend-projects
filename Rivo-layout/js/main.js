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

  // ФИЛЬТР
  const filterButtons = document.querySelectorAll('[data-filter]');
  const cards = [...document.querySelectorAll('.fltr-results .card')];

  // Настройки анимации
  const DURATION = 300;

  async function filterCards(selectedCategory) {
    const toShow = [];
    const toHide = [];

    cards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const shouldShow = selectedCategory === 'all' || selectedCategory === cardCategory;

      if (shouldShow && card.classList.contains('hidden')) toShow.push(card);
      if (!shouldShow && !card.classList.contains('hidden')) toHide.push(card);
    });

    // 1. Сначала скрываем ненужные
    const hidePromises = toHide.map(card => {
      card.classList.add('hidden');
      return card.animate(
        [
          { opacity: 1, transform: 'scale(1)' },
          { opacity: 0, transform: 'scale(0.5)' }
        ],
        { duration: DURATION, easing: 'ease', fill: 'forwards' }
      ).finished;
    });

    await Promise.all(hidePromises);

    // После анимации — убираем из потока
    toHide.forEach(card => card.style.display = 'none');

    // 2. Показываем новые
    toShow.forEach(card => {
      card.classList.remove('hidden');
      card.style.display = ''; // Возвращаем в поток

      card.animate(
        [
          { opacity: 0, transform: 'scale(0.5)' },
          { opacity: 1, transform: 'scale(1)' }
        ],
        { duration: DURATION, easing: 'ease', fill: 'forwards' }
      );
    });
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      filterCards(button.getAttribute('data-filter'));
    });
  });
  // ФИЛЬТР

});