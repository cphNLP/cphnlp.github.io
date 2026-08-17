const menu = document.querySelector('.menu-button');
const nav = document.querySelector('nav');

menu?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', isOpen);
  menu.innerHTML = isOpen ? 'Close <span>×</span>' : 'Menu <span>+</span>';
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menu?.setAttribute('aria-expanded', 'false');
  if (menu) menu.innerHTML = 'Menu <span>+</span>';
}));

document.querySelector('.notice')?.remove();

const novo = document.querySelector('.novo');
if (novo) {
  novo.innerHTML = '<img src="https://novonordiskfonden.dk/app/uploads/NNF_Logo_Vertical_Blue-1.png" alt="Novo Nordisk Foundation" width="265" height="265">';
}

const previousEdition = document.querySelector('.previous a');
if (previousEdition) previousEdition.href = '/2025/';

const people = document.querySelector('.people');
if (people) {
  const existing = [...people.querySelectorAll('a')];
  people.replaceChildren(
    existing[0], organiser('Desmond Elliott', 'https://elliottd.github.io/', 'DE', 'https://elliottd.github.io/desmond.jpg'), existing[1],
    organiser('Mike Zhang', 'University of Copenhagen', 'https://jjzha.github.io/', 'MZ', 'https://jjzha.github.io/mike_zhang.jpg'),
    organiser('Amelie Wührl', 'IT University of Copenhagen', 'https://pure.itu.dk/en/persons/amelie-w%C3%BChrl/', 'AW', 'https://nlpnorth.github.io/rsrc/amelie.jpg'),
    organiser('Nikolas Vitsakis', 'IT University of Copenhagen', 'https://pure.itu.dk/en/persons/nikolaos-vitsakis/', 'NV', 'https://nlpnorth.github.io/rsrc/nikolas.jpg'), existing[3],
    organiser('Dustin Wright', 'Aalborg University Copenhagen', 'https://dustinbwright.com/', 'DW', 'https://dustinbwright.com/images/DSC02938.jpg'), existing[4]

  );
  people.querySelectorAll('img').forEach((image) => {
    image.src = image.src.replace(
      'https://raw.githubusercontent.com/cphNLP/cphnlp.github.io/master/img/',
      '/2025/img/'
    );
  });
}

function organiser(name, affiliation, url, initials, photo) {
  const link = document.createElement('a');
  link.href = url;
  link.className = 'new-person';
  link.innerHTML = photo ? `<img src="${photo}" alt="${name}">${name}<small>${affiliation}</small>` : `<span class="portrait">${initials}</span>${name}<small>${affiliation}</small>`;
  return link;
}
