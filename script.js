const schedule = [
  { day: 'Segunda-feira', time: '19h30', activities: ['Curso de Espiritismo e Orientação Mediúnica.', 'Encontro da Mocidade.'] },
  { day: 'Terça-feira', time: '14h', activities: ['Tardes de Reflexão e Estudo do Evangelho.', 'Passe coletivo.', 'Passe de tratamento.', 'Atendimento Fraterno.', 'Atendimento Psicoespiritual — agendado.', 'Cadastro para cestas básicas.', 'Preparação das Quentinhas da Prece.'], scheduled: ['Atendimento Psicoespiritual — agendado.'] },
  { day: 'Quarta-feira', time: '19h30', activities: ['Palestra.', 'Passe coletivo.', 'Passe de tratamento.', 'Estudo do Evangelho Infantojuvenil.', 'Atendimento Fraterno.', 'Tratamento Espiritual.'] },
  { day: 'Quinta-feira', time: '19h30', activities: ['Medicina Espiritual — agendada.', 'Terapia Vibracional — agendada.'], scheduled: ['Medicina Espiritual — agendada.', 'Terapia Vibracional — agendada.'] },
  { day: 'Sábado', time: 'Bazar em datas pré-fixadas', activities: ['Bazar beneficente.', 'Datas divulgadas nas redes sociais.', 'Horário não informado.'], note: 'Não acontece necessariamente todos os sábados.' },
  { day: 'Domingo', time: '16h30', activities: ['Grupo de Estudo Iluminando Consciências.', 'Obra estudada: “Missionários da Luz”.'] },
  { day: 'Domingo', time: '21h', activities: ['Live do Evangelho na página do Facebook.', 'Página: grupoespiritacasadaprece.'], online: true }
];

const grid = document.querySelector('#schedule-grid');
schedule.forEach((item) => {
  const article = document.createElement('article');
  article.className = `schedule-card${item.online ? ' online-card' : ''}`;
  const activities = item.activities.map((activity) => {
    const scheduled = item.scheduled?.includes(activity);
    return `<li>${activity}${scheduled ? '<span class="tag">Requer agendamento</span>' : ''}</li>`;
  }).join('');
  article.innerHTML = `
    <header><div><p>${item.day}</p><h3>${item.time}</h3></div>${item.online ? '<span class="online-label">Online</span>' : ''}</header>
    <ul>${activities}</ul>
    ${item.note ? `<p class="card-note">${item.note}</p>` : ''}
  `;
  grid.append(article);
});

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('is-open', !isOpen);
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
}));

// Vite includes every photo in the production build without recompressing it.
const solidarityPhotos = Object.entries(import.meta.glob('./img/quentinhas/*.{jpeg,jpg,png,webp,JPEG,JPG,PNG,WEBP}', {
  eager: true,
  query: '?url',
  import: 'default'
})).sort(([first], [second]) => first.localeCompare(second, 'pt-BR', { numeric: true }));

const carousel = document.querySelector('.solidarity-carousel');
const stage = carousel.querySelector('.carousel-stage');
const status = carousel.querySelector('.carousel-status');
let currentPhoto = 0;

const slides = solidarityPhotos.map(([, src], index) => {
  const slide = document.createElement('div');
  slide.className = 'carousel-slide';
  slide.setAttribute('role', 'group');
  slide.setAttribute('aria-roledescription', 'slide');
  slide.setAttribute('aria-label', `${index + 1} de ${solidarityPhotos.length}`);
  slide.hidden = index !== 0;
  const photo = document.createElement('img');
  photo.src = src;
  photo.alt = `Registro das Quentinhas da Prece — foto ${index + 1}`;
  photo.loading = 'lazy';
  photo.decoding = 'async';
  photo.draggable = false;
  slide.append(photo);
  stage.append(slide);
  return slide;
});

function showPhoto(index) {
  if (!slides.length) return;
  slides[currentPhoto].hidden = true;
  currentPhoto = (index + slides.length) % slides.length;
  slides[currentPhoto].hidden = false;
  status.textContent = `Foto ${currentPhoto + 1} de ${slides.length}`;
}

if (slides.length) {
  carousel.hidden = false;
  showPhoto(0);
  carousel.querySelector('[data-carousel-previous]').addEventListener('click', () => showPhoto(currentPhoto - 1));
  carousel.querySelector('[data-carousel-next]').addEventListener('click', () => showPhoto(currentPhoto + 1));
  carousel.addEventListener('keydown', (event) => {
    const targets = { ArrowLeft: currentPhoto - 1, ArrowRight: currentPhoto + 1, Home: 0, End: slides.length - 1 };
    if (Object.hasOwn(targets, event.key)) {
      event.preventDefault();
      showPhoto(targets[event.key]);
    }
  });

  let gestureStart = null;
  stage.addEventListener('pointerdown', (event) => {
    if (!event.isPrimary || event.button !== 0) return;
    gestureStart = { x: event.clientX, y: event.clientY };
    stage.setPointerCapture(event.pointerId);
  });
  stage.addEventListener('pointerup', (event) => {
    if (!gestureStart) return;
    const distanceX = event.clientX - gestureStart.x;
    const distanceY = event.clientY - gestureStart.y;
    gestureStart = null;
    if (Math.abs(distanceX) > 50 && Math.abs(distanceX) > Math.abs(distanceY) * 1.5) {
      showPhoto(currentPhoto + (distanceX < 0 ? 1 : -1));
    }
  });
  stage.addEventListener('pointercancel', () => { gestureStart = null; });
}
