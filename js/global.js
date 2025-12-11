$(function () {
  /* ===== header 불러오기 ===== */
  const headerLoad = $.get('./component/header.html', function (html) {
    $('header').html(html);
  });

  /* ===== footer 불러오기 ===== */
  const footerLoad = $.get('./component/footer.html', function (html) {
    $('footer').html(html);
  });

  /* ===== slider 불러오기 ===== */
  const sliderLoad = $.get('./component/slider.html', function (html) {
    const $slider = $('.slider');
    $slider.html(html);

    // 이미지 로드 완료 후 슬라이더 초기화
    const $imgs = $slider.find('img');
    if ($imgs.length) {
      let loaded = 0;
      $imgs.on('load error', function () {
        loaded++;
        if (loaded === $imgs.length) initSliderLoop();
      });
      $imgs.each(function () {
        if (this.complete) $(this).trigger('load');
      });
    } else {
      initSliderLoop();
    }
  });

  /* ===== 모든 ajax 완료 후 AOS 초기화 ===== */
  $.when(headerLoad, footerLoad, sliderLoad).done(function () {
    AOS.init({
      startEvent: 'DOMContentLoaded',
      once: false,
      duration: 700,
      easing: 'ease-in-out',
      offset: 116,
    });
  });

  /* ===== GSAP Horizontal Loop 초기화 함수 ===== */
  function initSliderLoop() {
    if (!window.gsap) {
      console.warn('GSAP가 로드되지 않았습니다. CDN 스크립트를 포함해주세요.');
      return;
    }

    // 기존 루프가 있다면 정리(새로고침 없이 다시 불러와도 중복 방지)
    if (window.__sliderLoop && window.__sliderLoop.kill) {
      window.__sliderLoop.kill();
    }

    console.clear();

    function horizontalLoop(items, config) {
      items = gsap.utils.toArray(items);
      config = config || {};
      let tl = gsap.timeline({
          repeat: config.repeat,
          paused: config.paused,
          defaults: { ease: "none" },
          onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
        }),
        length = items.length,
        startX = items[0].offsetLeft,
        times = [],
        widths = [],
        xPercents = [],
        curIndex = 0,
        pixelsPerSecond = (config.speed || 1) * 100,
        snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1),
        totalWidth, curX, distanceToStart, distanceToLoop, item, i;

      gsap.set(items, {
        xPercent: (i, el) => {
          let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
          xPercents[i] = snap(
            (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
              gsap.getProperty(el, "xPercent")
          );
          return xPercents[i];
        },
      });

      gsap.set(items, { x: 0 });

      totalWidth =
        items[length - 1].offsetLeft +
        (xPercents[length - 1] / 100) * widths[length - 1] -
        startX +
        items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX") +
        (parseFloat(config.paddingRight) || 0);

      for (i = 0; i < length; i++) {
        item = items[i];
        curX = (xPercents[i] / 100) * widths[i];
        distanceToStart = item.offsetLeft + curX - startX;
        distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");

        tl.to(
          item,
          {
            xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
            duration: distanceToLoop / pixelsPerSecond,
          },
          0
        )
          .fromTo(
            item,
            {
              xPercent: snap(
                ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
              ),
            },
            {
              xPercent: xPercents[i],
              duration:
                (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
              immediateRender: false,
            },
            distanceToLoop / pixelsPerSecond
          )
          .add("label" + i, distanceToStart / pixelsPerSecond);

        times[i] = distanceToStart / pixelsPerSecond;
      }

      tl.next = (vars) => toIndex(curIndex + 1, vars);
      tl.previous = (vars) => toIndex(curIndex - 1, vars);
      tl.current = () => curIndex;
      tl.toIndex = (index, vars) => toIndex(index, vars);
      tl.times = times;

      tl.progress(1, true).progress(0, true);
      if (config.reversed) {
        tl.vars.onReverseComplete();
        tl.reverse();
      }
      return tl;
    }

    window.__sliderLoop = horizontalLoop(".slider_item", {
      repeat: -1,
      speed: 0.5,
      paddingRight: 60,
    });
  };

  $(document).on('click', '.tooltip svg', function () {
    $(this).closest('.tooltip').fadeOut(300); 
  });
});