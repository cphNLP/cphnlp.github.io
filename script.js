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
    existing[0], existing[1], existing[2],
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

const keynoteLink = document.createElement('a');
keynoteLink.href = '#keynotes';
keynoteLink.textContent = 'Keynotes';
nav?.querySelector('a[href="#posters"]')?.before(keynoteLink);

document.querySelectorAll('.has-popup').forEach((card, index) => {
  const heading = card.querySelector('h3');
  const popup = card.querySelector('.keynote-popup');
  const summary = card.querySelector('.keynote-copy > p:last-child');
  if (!heading || !popup || !summary) return;

  const labels = [...popup.querySelectorAll(':scope > .popup-label')];
  const talkLabel = labels.find((label) => label.textContent.trim() === 'Talk');
  const bioLabel = labels.find((label) => label.textContent.trim() === 'Bio');
  if (talkLabel && bioLabel) {
    const talkNodes = [];
    for (let node = talkLabel; node && node !== bioLabel; node = node.nextElementSibling) {
      talkNodes.push(node);
    }
    const bioNodes = [];
    for (let node = bioLabel; node; node = node.nextElementSibling) {
      bioNodes.push(node);
    }
    popup.replaceChildren(...bioNodes, ...talkNodes);
  }

  const details = document.createElement('div');
  details.className = 'keynote-details';
  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'keynote-details-trigger';
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-controls', popup.id || `keynote-talk-details-${index + 1}`);
  trigger.textContent = 'Bio & Talk';
  if (!popup.id) popup.id = trigger.getAttribute('aria-controls');
  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'keynote-popup-close';
  closeButton.setAttribute('aria-label', 'Close bio and talk details');
  closeButton.textContent = 'Close ×';
  summary.after(details);
  details.append(trigger, popup);
  popup.prepend(closeButton);

  const open = () => {
    card.classList.add('show-popup');
    trigger.setAttribute('aria-expanded', 'true');
  };
  const close = () => {
    card.classList.remove('show-popup');
    trigger.setAttribute('aria-expanded', 'false');
  };

  details.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse') open();
  });
  details.addEventListener('pointerleave', (event) => {
    if (event.pointerType === 'mouse') close();
  });
  details.addEventListener('focusout', (event) => {
    if (!details.contains(event.relatedTarget)) close();
  });
  trigger.addEventListener('click', () => {
    card.classList.contains('show-popup') ? close() : open();
  });
  closeButton.addEventListener('click', close);
});
