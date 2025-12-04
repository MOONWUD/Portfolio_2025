$(document).ready(function () {
  // skill_item 클릭 이벤트 - 이벤트 위임
  $(document).on('click', '.skill_item', function () {

    const $item = $(this);

    // 이미 열려 있는 아이템을 다시 클릭하면 닫기
    if ($item.hasClass('active')) {
      $item.removeClass('active');
    } else {
      // 다른 아이템들 active 제거
      $('.skill_item').removeClass('active');
      // 클릭한 아이템만 active 추가
      $item.addClass('active');
    }
  });
});