/**
* todo:
  3 сама кнопку можно переместить в любое место
  4 новое название кнопки
  5 пульсация, тень крутится
  6 в мобильной версии превращается выпадающий список закрепленный сверху

* Использование:
* 1 Добавить ссылку на проект в список меню container.innerHTML
* 2 втавить в html файл ссылку
*   <script src="heroBtn/script.js"></script>
*   или
*   <script src="../../heroBtn/script.js"></script>
*/

const rootName = 'index'

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
    Нажми
    <!-- <a href="main.html">index</a> -->
  </button>
  <div id="list" role="menu" aria-hidden="true">
    <a class="main" href="/${rootName}/main.html">Main</a>
    <a href="/${rootName}/main0.html">Main0</a>
    <a href="/${rootName}/test.html">Test</a>
    <a href="/${rootName}/test2.html">ReactF</a>
    <a href="/${rootName}/sticky/main.html">sticky</a>
    <a href="/${rootName}/projects/ya-wrapper/index.html">YaDisk</a>
  </div>
`;

const list = document.getElementById('list');
const links = list.querySelectorAll('a');

const url = new URL(window.location.href) // текущий url документа

// формуруем путь относительно корневой папки
const pathParts = url.pathname.split('/');
const indexPos = pathParts.indexOf(rootName);
const basePath = pathParts.slice(0, indexPos).join('/') + '/';

// Обновляем href у ссылок, сохраняя часть после /${rootName}
links.forEach(link => {
  const hrefParts = link.getAttribute('href').split('/');
  const afterIndexPos = hrefParts.indexOf(rootName);

  if (afterIndexPos !== -1) {
    const relativePath = hrefParts.slice(afterIndexPos).join('/');
    link.href = basePath + relativePath;
  }
});

// прописываем ссылку на стили кнопки
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = basePath + `${rootName}/heroBtn/style.css`;
document.head.appendChild(link);

// динамического расположения элементов вокруг центральной кнопки
function positionItems(arg=true) {
  const radius = 90; // Радиус на котором будут расположены маленькие кружки
  const count = links.length; // количество ссылок - кружков
  const angleStep = 360 / count; // градусы между центрами каждого круга

  links.forEach((item, i) => {
    // расчет координат каждого круга
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

// обработка клика по Кнопке
mainBtn.addEventListener('click', () => {
  const isOpen = container.classList.toggle('open');
  if (isOpen) {
    list.classList.add('open');
  } else {
    list.classList.remove('open');
  }
  mainBtn.setAttribute('aria-expanded', isOpen);
  list.setAttribute('aria-hidden', !isOpen);
  positionItems(true);
});

// обработка клика вне Кнопки
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

// настройка перетаскивания элемента
let isDragging = false;
let offsetX, offsetY;

// Обработчик начала перетаскивания
container.addEventListener('mousedown', function(e) {
isDragging = true;
offsetX = e.clientX - this.offsetLeft;
offsetY = e.clientY - this.offsetTop;
});

// Обработчик движения мыши
document.addEventListener('mousemove', function(e) {
if (!isDragging) return;

const x = e.clientX - offsetX;
const y = e.clientY - offsetY;

// Устанавливаем новые координаты элемента
container.style.left = `${x}px`;
container.style.top = `${y}px`;
});

// Завершаем перемещение
document.addEventListener('mouseup', () => {
isDragging = false;
});
