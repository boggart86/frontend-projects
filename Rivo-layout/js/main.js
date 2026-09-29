document.addEventListener('DOMContentLoaded', () => {

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

});