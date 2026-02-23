//  тут подсчет стажа и возраста
  function getTitleIdx(number) {
    const lastDigit = number % 10;
    if (lastDigit === 1 && number !== 11) {
      return 0;
    } else if (lastDigit >= 2 && lastDigit <= 4 && ![12, 13, 14].includes(number)) {
      return 1;
    } return 2;
  }
  const yTitles = ['год', 'года', 'лет']
  const mTitles = ['месяц', 'месяца', 'месяцев']
  const dTitles = ['день', 'дня', 'дней']

  const today = new Date();
  const startDate = new Date(2014, 5, 7);
  const birthDate = new Date(1994, 11, 6);

  // Разница в миллисекундах
  const diffMs = today - startDate;
  const diffMsB = today - birthDate;

  // Переводим в дни (1000 мс * 60 с * 60 мин * 24 ч)
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffBDays = Math.floor(diffMsB / (1000 * 60 * 60 * 24));

  // Вычисление лет, месяцев и дней
  const years = Math.floor(diffDays / 365);
  const yearsB = Math.floor(diffBDays / 365);

  const remainingDaysAfterYears = diffDays % 365;
  const months = Math.floor(remainingDaysAfterYears / 30);
  const remainingDaysAfterYearsB = diffBDays % 365;
  const monthsB = Math.floor(remainingDaysAfterYearsB / 30);


  const days = remainingDaysAfterYears % 30;
  const daysB = remainingDaysAfterYearsB % 30;

  document.getElementById('date').textContent = `
    ${years} ${yTitles[getTitleIdx(years)]}
    ${months} ${mTitles[getTitleIdx(months)]}
    ${days} ${dTitles[getTitleIdx(days)]}`;
  document.getElementById('birthDate').textContent = `
    ${yearsB} ${yTitles[getTitleIdx(yearsB)]}
    ${monthsB} ${mTitles[getTitleIdx(monthsB)]}
    ${daysB} ${dTitles[getTitleIdx(daysB)]}`;
