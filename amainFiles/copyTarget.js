document.querySelectorAll('.copy_target').forEach(elem => {
  const tooltip = document.createElement('span');
  tooltip.className = 'tooltip';
  elem.appendChild(tooltip);

  let originalText = elem.textContent.trim();
  let timeoutId;

  elem.addEventListener('mouseenter', () => {
    clearTimeout(timeoutId);
    tooltip.textContent = 'Нажмите, что бы скопировать';
    elem.classList.add('show-tooltip');
  });

  elem.addEventListener('mouseleave', () => {
    clearTimeout(timeoutId);
    elem.classList.remove('show-tooltip');
    tooltip.textContent = '';
  });

  elem.addEventListener('click', () => {
    navigator.clipboard.writeText(originalText).then(() => {
      tooltip.textContent = 'Скопировано';
      elem.classList.add('show-tooltip');

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        elem.classList.remove('show-tooltip');
        tooltip.textContent = '';
      }, 1500);
    }).catch(() => {
      tooltip.textContent = 'Ошибка копирования';
      elem.classList.add('show-tooltip');

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        elem.classList.remove('show-tooltip');
        tooltip.textContent = '';
      }, 1500);
    });
  });
});
