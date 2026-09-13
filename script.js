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
