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
}), { threshold: .1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
