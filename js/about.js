document.addEventListener('DOMContentLoaded', () => {

  /* ===== Keyword Section ===== */
  fetch('./data/about_keyword.json')
    .then(response => response.json())
    .then(data => {
      const keywordWrapper = document.querySelector('.keyword_wrapper');
      if (!keywordWrapper) return;


      data.keywords.forEach(word => {
        const listItem = document.createElement('li');
        listItem.classList.add('keyword_item');
        listItem.textContent = word;
        keywordWrapper.appendChild(listItem);
      });

      let currentIndex = 0;
      const keywordItems = keywordWrapper.querySelectorAll('.keyword_item');
      const total = keywordItems.length;

      keywordItems.forEach((el, i) => {
        el.style.opacity = i === 0 ? '1' : '0';
        el.style.transform = i === 0 ? 'translateY(0)' : 'translateY(100%)';
      });


      setInterval(() => {
        const current = keywordItems[currentIndex];
        const nextIndex = (currentIndex + 1) % total;
        const next = keywordItems[nextIndex];


        current.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
        current.style.transform = 'translateY(-100%)';
        current.style.opacity = '0';


        next.style.transition = 'none';
        next.style.transform = 'translateY(100%)';
        next.style.opacity = '0';


        void next.offsetWidth;

        next.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
        next.style.transform = 'translateY(0)';
        next.style.opacity = '1';

        currentIndex = nextIndex;
      }, 1600); 

      if (window.AOS) AOS.refresh();
    })
    .catch(error => console.error('❌ keyword 데이터 불러오기 실패:', error));



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

      if (window.AOS) AOS.refresh();
    })
    .catch(error => console.error('❌ history 데이터 불러오기 실패:', error));
});