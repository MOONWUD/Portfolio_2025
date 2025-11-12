$(document).ready(function () {
  /* ===== Work List ===== */
  $.ajax({
    url: './data/workList.json',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      const $list = $('#workList');
      $list.empty();

      data.forEach(item => {
        const li = `
          <li class="work_item" data-aos="fade-up" data-aos-delay="250">
            <a href="${item.link}" target="_blank">
              <div class="hover_dim">
                <ul class="contents">
                  <li class="information">
                    <h6>${item.title}</h6>
                    <div class="description">${item.description}</div>
                  </li>
                  <li class="view_btn">
                    <div>VIEW PROJECT</div>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.4 18L5 16.6L14.6 7H6V5H18V17H16V8.4L6.4 18Z" fill="#F56242" />
                    </svg>
                  </li>
                </ul>
              </div>
              <div class="workitem_img">
                <img src="${item.image}" alt="${item.title}">
              </div>
            </a>
          </li>
        `;
        $list.append(li);
      });
    },
    error: function (xhr, status, error) {
      console.error('workList 데이터 불러오기 실패:', error);
    },
  });

  /* ===== Skill List ===== */
  $.ajax({
    url: './data/skillList.json',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      const $list = $('#skillList');
      $list.find('.skill_item').remove();

      data.forEach(item => {
        const contentsHTML = item.contents.map(line => `${line} <br>`).join('');
        const li = `
          <li class="skill_item">
            <div class="header_area" data-aos="fade-down">
              <div class="title" >${item.title}</div>
              <img src="./assets/icon_cross.svg" alt="플러스아이콘">
            </div>
            <div class="contents">${contentsHTML}</div>
          </li>
        `;
        $list.append(li);
      });

      AOS.refreshHard();
    },
    error: function (xhr, status, error) {
      console.error('skillList 데이터 불러오기 실패:', error);
    },
  });
});