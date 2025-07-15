const maxPhoto = 500
let testCounter = 0
let groupCounter = 0
let labelCounter = 0
let photoCounter = 0

const classGroupContainer = '.virtual-grid__groups';
const classPhotoGroup = '.photo__group';
const classTargetLabel = '.grid-cluster-title__title-label';
const selectionInfoSelector = '.selection-info__text';

// выбираем контейнер с группами фоток, которые погружаются динамически
const container = document.querySelector(classGroupContainer);
if (!container) {
  console.warn('Container not found');
}
// выбираем первую группу фоток
let currentGroup = container.querySelector(classPhotoGroup);
let infoEl = null;
let infoText = null;
let countMatch = null;
console.log("запуск перебора групп фото")
// while (currentGroup) {
while (testCounter < maxPhoto) {
  groupCounter += 1
  console.log("|-Группа", groupCounter)
  const labels = currentGroup.querySelectorAll(classTargetLabel);
  console.log("|-запуск перебора labels")
  for (const label of labels) {
    labelCounter += 1
    console.log("|-|-label", labelCounter)
    console.log("|-|-sleep 2s")
    await new Promise(resolve => setTimeout(resolve, 2000)); // ждем 1 секунду
    testCounter += 1
    label.scrollIntoView({ behavior: 'smooth', block: 'start' });
    label.click();
    infoEl = document.querySelector(selectionInfoSelector);
    console.log("|-|-Шапка", infoEl)
    if (infoEl) {
      infoText = infoEl.textContent.trim();
      console.log("|-|-|-Текст шапки", infoText)
      if (infoText === 'Слишком много фото'){
        label.click();
        console.log("|-|-|-|-Сняли галочку")
        console.log("|-|-|-|-Шапка", infoEl)
      } else {
        infoText = infoEl.textContent.trim();
        countMatch = infoText.match(/(\d+)\s*файл[ова]?/);
        console.log("|-|-|-countMatch", countMatch[1])
      }

    }
  };
  console.log("|-testCounter", testCounter)
  console.log("|-Переход к новой группе фото")
  console.log("|-sleep 2s")
  await new Promise(resolve => setTimeout(resolve, 2000)); // ждем 1 секунду
  const nextGroup = currentGroup.nextElementSibling;
  console.log(" - - - - - - - - - ")
  if (!nextGroup || !container.contains(nextGroup)) {
    console.log("Новой группы нет - break")
    break;
  }
  currentGroup = nextGroup;
};
console.log("end while")
