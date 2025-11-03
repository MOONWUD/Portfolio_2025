$(document).ready(function () {
  const $skills = $('.skill_item');

  function revealOnScroll() {
    const triggerPoint = $(window).height() / 2;
    let $activeItem = null;

    $skills.each(function () {
      const top = this.getBoundingClientRect().top;
      const bottom = this.getBoundingClientRect().bottom;

      if (top < triggerPoint && bottom > triggerPoint / 2) {
        $activeItem = $(this);
      }
    });

    $skills.each(function () {
      if ($(this).is($activeItem)) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });
  }

  $(window).on('scroll', revealOnScroll);
  revealOnScroll();
});