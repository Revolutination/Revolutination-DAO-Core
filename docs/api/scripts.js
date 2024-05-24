document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navigationMenu = document.querySelector('.navigation-menu');

  menuToggle.addEventListener('click', () => {
    navigationMenu.classList.toggle('open');
  });

  const sections = document.querySelectorAll('section');

  sections.forEach(section => {
    const anchor = section.querySelector('h1 a');
    const sectionId = anchor.getAttribute('href').substring(1);

    anchor.addEventListener('click', event => {
      event.preventDefault();
      const targetSection = document.getElementById(sectionId);
      const offsetTop = targetSection.offsetTop;

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    });
  });
});
