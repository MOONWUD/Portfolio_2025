$(document).ready(function () {
  const $copyBtn = $('button');
  const $tooltip = $copyBtn.find('.tooltip');
  let hideTimeout;

  $copyBtn.on('click', function () {
    const textToCopy = "moonqazwsx@naver.com";

    navigator.clipboard.writeText(textToCopy).then(() => {
      clearTimeout(hideTimeout);
      $tooltip.text("Copied!").addClass("active");

      hideTimeout = setTimeout(() => {
        $tooltip.css("opacity", 0).removeClass("active");
      }, 2000);
    });
  });

  $copyBtn.on('mouseenter', function () {
    clearTimeout(hideTimeout);
    $tooltip.removeClass("active").text("Copy?").css({ opacity: 1, top: "-10px" });
  });

  $copyBtn.on('mouseleave', function () {
    if (!$tooltip.hasClass("active")) {
      $tooltip.css({ opacity: 0, top: "4px" });
    }
  });
});