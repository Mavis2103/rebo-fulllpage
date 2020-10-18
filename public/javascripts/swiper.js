/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const swiper = new Swiper('.swiper-container', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet(index, className) {
      return `<span class="${className}">${index + 1}</span>`;
    },
  },
});
