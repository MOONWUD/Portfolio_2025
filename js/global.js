$(document).ready(function () {
  /* ===== AOS 초기화 ===== */
  AOS.init({
    startEvent: 'DOMContentLoaded',
    once: false, // 스크롤할 때마다 실행 (필요시 true로 변경)
    duration: 400,
    easing: 'ease-in-out',
    offset: 116,
  });

  /* ===== header 불러오기 ===== */
  $.get('header.html', function (html) {
    $('header').html(html);
    AOS.refresh();

    const $logo = $('header .logo');
    if ($logo.length) {
      setTimeout(() => $logo.addClass('aos-animate'), 80);
    }

    $('header .gnb li').each(function (i) {
      setTimeout(() => $(this).addClass('aos-animate'), 80 + i * 80);
    });
  });

  /* ===== footer 불러오기 ===== */
  $.get('footer.html', function (html) {
    $('footer').html(html);
    AOS.refresh();
  });

  /* ===== slider 불러오기 ===== */
  $.get('slider.html', function (html) {
    $('.slider').each(function () {
      $(this).html(html);
    });
    AOS.refresh();
  });
});