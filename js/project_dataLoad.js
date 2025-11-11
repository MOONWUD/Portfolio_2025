$(document).ready(function () {
  $.ajax({
    url: './data/workList.json',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      const $list = $('#workList');
      $list.empty();

      // 🔀 배열 셔플 (Fisher–Yates 알고리즘)
      for (let i = data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [data[i], data[j]] = [data[j], data[i]]; // swap
      }

      // 🔽 랜덤 순서로 출력
      data.forEach(item => {
        const li = `
        <li class="work_item" data-aos="fade-up">
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

      // AOS 리프레시
      if (window.AOS) AOS.refresh();
    },
    error: function (xhr, status, error) {
      console.error('❌ workList 데이터 불러오기 실패:', error);
    },
  });
});
