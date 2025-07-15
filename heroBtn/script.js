
let container = document.getElementById('heroBtnContainer');

if (container === null) {
  const body = document.body;
  const div = document.createElement('div');
  div.id = 'heroBtnContainer';
  body.appendChild(div);
  container = document.getElementById('heroBtnContainer');
}

container.innerHTML = `
  <button id="mainBtn" aria-haspopup="true" aria-expanded="false" aria-label="Открыть меню">
    hero BTN
    <!-- <a href="main.html">index</a> -->
  </button>
  <div id="list" role="menu" aria-hidden="true">
    <a class="main" href="/index/main.html">index</a>
    <a href="/index/main0.html">main0</a>
    <a href="/index/test.html">test</a>
    <a href="/index/test2.html">test2</a>
    <a href="/index/sticky/main.html">sticky</a>
    <a href="/index/projects/ya-wrapper/index.html">yandex disk</a>
  </div>
`;

const list = document.getElementById('list');
const links = list.querySelectorAll('a');
// текущий url для корректного отображения ссылок
const url = new URL(window.location.href)

const pathParts = url.pathname.split('/');
const indexPos = pathParts.indexOf('index');
const basePath = pathParts.slice(0, indexPos).join('/') + '/';

// Обновляем href у ссылок, сохраняя часть после /index
links.forEach(link => {
  const hrefParts = link.getAttribute('href').split('/');

  const afterIndexPos = hrefParts.indexOf('index');
  if (afterIndexPos !== -1) {
    const relativePath = hrefParts.slice(afterIndexPos).join('/');
    link.href = basePath + relativePath;
  }
});

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = basePath + 'index/heroBtn/style.css';
document.head.appendChild(link);

const radius = 90; // Радиус, на котором будут расположены маленькие кружки

function positionItems() {
  const count = links.length;
  const angleStep = 360 / count;

  links.forEach((item, i) => {
  const angle = (angleStep * i - 90) * (Math.PI / 180); // -90 для начального положения сверху
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  item.style.transitionDelay = `${i * 0.1}s`; // последовательная задержка появления
  item.style.transformOrigin = 'center center';
  if (container.classList.contains('open')) {
    item.style.transform = `translate(${x}px, ${y}px) scale(1)`;
    item.style.opacity = '1';
  } else {
    item.style.transform = 'translate(0, 0) scale(0.5)';
    item.style.opacity = '0';
    item.style.transitionDelay = '0s';
  }
  });
}

mainBtn.addEventListener('click', () => {
  const isOpen = container.classList.toggle('open');
  if (isOpen) {
    list.classList.add('open');
  } else {
    list.classList.remove('open');
  }
  mainBtn.setAttribute('aria-expanded', isOpen);
  list.setAttribute('aria-hidden', !isOpen);
  positionItems();
});

document.addEventListener('click', e => {
  if (!container.contains(e.target)) {
    container.classList.remove('open');
    list.classList.remove('open');
    mainBtn.setAttribute('aria-expanded', false);
    list.setAttribute('aria-hidden', true);
    positionItems();
  }
});

// Инициализация позиций (по умолчанию закрыто)
positionItems();
