document.addEventListener('DOMContentLoaded', () => {
  /* ===== Skill Section ===== */
  fetch('./data/about_skill.json')
    .then(response => response.json())
    .then(data => {
      const skillWrapper = document.querySelector('.skill_wrapper');
      if (!skillWrapper) return;

      data.skills.forEach(skill => {
        const listItem = document.createElement('li');
        listItem.classList.add('skill_item');
        listItem.setAttribute('data-aos', 'fade-up');

        const textLines = skill.text.map(line => `${line}<br>`).join('');

        listItem.innerHTML = `
          <div class="number">${skill.number}</div>
          <h6 class="title">${skill.title}</h6>
          <p class="text">${textLines}</p>
        `;

        skillWrapper.appendChild(listItem);
      });

      // AOS 새로고침
      if (window.AOS) AOS.refresh();
    })
    .catch(error => console.error('❌ skill 데이터 불러오기 실패:', error));

  /* ===== History Section ===== */
  fetch('./data/about_history.json')
    .then(response => response.json())
    .then(data => {
      const historyWrapper = document.querySelector('.history_wrapper');
      if (!historyWrapper) return;

      data.history.forEach(item => {
        const listItem = document.createElement('li');
        listItem.classList.add('history_item');
        listItem.setAttribute('data-aos', 'fade-up');

        listItem.innerHTML = `
          <div class="title">${item.title}</div>
          <div class="date">${item.date}</div>
        `;

        historyWrapper.appendChild(listItem);
      });

      // AOS 새로고침
      if (window.AOS) AOS.refresh();
    })
    .catch(error => console.error('❌ history 데이터 불러오기 실패:', error));
});