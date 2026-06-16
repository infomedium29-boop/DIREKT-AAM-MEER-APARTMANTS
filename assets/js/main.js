
const body = document.body;
const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.site-nav a');

function setHeaderState(){
  if(window.scrollY > 24) header?.classList.add('scrolled');
  else header?.classList.remove('scrolled');
}
setHeaderState();
window.addEventListener('scroll', setHeaderState, {passive:true});

navToggle?.addEventListener('click', () => {
  const open = body.classList.toggle('nav-open');
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});
navLinks.forEach(link => link.addEventListener('click', () => {
  body.classList.remove('nav-open');
  navToggle?.setAttribute('aria-expanded', 'false');
}));

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, {threshold: .12, rootMargin: '0px 0px -40px 0px'});
reveals.forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index % 6, 5) * 55}ms`;
  observer.observe(el);
});

const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox img');
const closeLightbox = document.querySelector('.lightbox-close');

document.querySelectorAll('.gallery-item, .showcase-card, .showcase-large').forEach(item => {
  item.addEventListener('click', () => {
    const src = item.dataset.src || item.querySelector('img')?.getAttribute('src');
    const alt = item.querySelector('img')?.getAttribute('alt') || 'Fotografija apartmana';
    if(!src || !lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    body.style.overflow = 'hidden';
  });
});

function closeGallery(){
  if(!lightbox || !lightboxImg) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImg.src = '';
  body.style.overflow = '';
}
closeLightbox?.addEventListener('click', closeGallery);
lightbox?.addEventListener('click', e => {
  if(e.target === lightbox) closeGallery();
});
window.addEventListener('keydown', e => {
  if(e.key === 'Escape') closeGallery();
});

const filterButtons = document.querySelectorAll('[data-gallery-filter]');
const galleryPhotos = document.querySelectorAll('.masonry-gallery .gallery-item');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.galleryFilter;
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    galleryPhotos.forEach(photo => {
      const visible = filter === 'all' || photo.dataset.filter === filter;
      photo.classList.toggle('is-hidden', !visible);
    });
  });
});

const contactForm = document.querySelector('.contact-form');
contactForm?.addEventListener('submit', event => {
  event.preventDefault();
  const status = contactForm.querySelector('.form-status');
  if(status){
    status.textContent = 'Upit je spreman kao demo. Za stvarno slanje potrebno je povezati formu s e-mail servisom.';
  }
  contactForm.reset();
});
