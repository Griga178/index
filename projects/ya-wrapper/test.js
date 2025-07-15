async function waitForTextChange(element, timeout = 5000, interval = 100) {
  const start = Date.now();
  const initialText = element.textContent.trim();
  while (Date.now() - start < timeout) {
    await new Promise(r => setTimeout(r, interval));
    const currentText = element.textContent.trim();
    if (currentText !== initialText) return currentText;
  }
  return element.textContent.trim(); // вернём что есть по истечении таймаута
}


(async () => {
  const classGroupContainer = '.virtual-grid__groups';
  const classPhotoGroup = '.photo__group';
  const classTargetLabel = '.grid-cluster-title__title-label';
  const selectionInfoSelector = '.selection-info__text';
  const maxPhoto = 100
  let testCounter = 0
  // let fromPhoto = 0 // с какой начать
  // let toPhoto = 0 // какой закончить

  const container = document.querySelector(classGroupContainer);
  if (!container) {
    console.warn('Container not found');
    return;
  }

  let currentGroup = container.querySelector(classPhotoGroup);

  while (currentGroup) {

    const labels = currentGroup.querySelectorAll(classTargetLabel);

    for (const label of labels) {
      testCounter += 1
      label.scrollIntoView({ behavior: 'smooth', block: 'start' });
      await new Promise(r => setTimeout(r, 50)); // ждём анимацию скролла

      label.click();
      await new Promise(r => setTimeout(r, 100)); // время на обработку клика

      const infoEl = document.querySelector(selectionInfoSelector);

      if (infoEl && testCounter < maxPhoto) {
        console.log('tS', testCounter, testCounter < maxPhoto)
        let  infoText = infoEl.textContent.trim();
        console.log(infoText)
        if (infoText === 'Слишком много фото') {
          console.log(infoText)
          // снять выбор (повторный клик)
          const infoTextUpdated = await waitForTextChange(infoEl);
          label.click();
          console.log('убрали потому что > 500')
          // например: "123 файла" или "456 файлов"


          const countMatch = infoTextUpdated.match(/(\d+)\s*файло[вав]/);

          console.log(infoTextUpdated)
          console.log(countMatch)
          if (countMatch) {
            selectedCount = countMatch[1];
            alert(`Выбрано ${selectedCount} фото`);
          }
          console.log('return набрали макс фоток')
          return; // останавливаем дальнейшую обработку
        }
      }
      else {
        console.log('return потому что !infoEl')
        return
      }
    }

    await new Promise(r => setTimeout(r, 1000)); // ждём подгрузку группы

    const nextGroup = currentGroup.nextElementSibling;
    if (!nextGroup || !container.contains(nextGroup)) {
      break;
    }
    currentGroup = nextGroup;
  }
})();
