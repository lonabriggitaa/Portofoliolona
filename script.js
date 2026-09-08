const nav = document.querySelector('.nav-wrap');
const menu = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menu.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menu.setAttribute('aria-expanded', isOpen);
  menu.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')));
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 10), { passive: true });

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const lightbox = document.querySelector('.lightbox');
const lightboxTitle = lightbox.querySelector('p');
document.querySelectorAll('.gallery-item').forEach(item => item.addEventListener('click', () => {
  lightboxTitle.textContent = `${item.dataset.label} — visual placeholder ready to be replaced with the project screen.`;
  lightbox.showModal();
}));
lightbox.querySelector('.close-lightbox').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });

const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('.nav-links a:not(.nav-cta)')];
const navObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
}), { rootMargin: '-35% 0px -60% 0px' });
sections.forEach(section => navObserver.observe(section));
