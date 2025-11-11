$(function () {
  /* ===== AOS 초기화 ===== */
  AOS.init({
    startEvent: 'DOMContentLoaded',
    once: false,
    duration: 400,
    easing: 'ease-in-out',
    offset: 116,
  });

  /* ===== header 불러오기 ===== */
  $.get('./component/header.html', function (html) {
    $('header').html(html);
    AOS.refresh();

    const $logo = $('header .logo');
    if ($logo.length) {
      setTimeout(() => $logo.addClass('aos-animate'), 400);
    }

    $('header .gnb li').each(function (i) {
      setTimeout(() => $(this).addClass('aos-animate'), 400 + i * 400);
    });
  });

  /* ===== footer 불러오기 ===== */
  $.get('./component/footer.html', function (html) {
    $('footer').html(html);
    AOS.refresh();
  });

  /* ===== slider 불러오기 ===== */
  $.get('./component/slider.html', function (html) {
    const $slider = $('.slider');
    $slider.html(html);
    AOS.refresh();

    // 이미지 로드가 끝난 뒤에 루프 초기화 (폭 계산 정확도 ↑)
    const $imgs = $slider.find('img');
    if ($imgs.length) {
      let loaded = 0;
      $imgs.on('load error', function () {
        loaded++;
        if (loaded === $imgs.length) initSliderLoop();
      });
      // 캐시된 이미지 강제 load 트리거
      $imgs.each(function () {
        if (this.complete) $(this).trigger('load');
      });
    } else {
      initSliderLoop();
    }
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
          onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
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
        }
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

        tl.to(item, {
          xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
          duration: distanceToLoop / pixelsPerSecond
        }, 0)
          .fromTo(item, {
            xPercent: snap(((curX - distanceToLoop + totalWidth) / widths[i]) * 100)
          }, {
            xPercent: xPercents[i],
            duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
            immediateRender: false
          }, distanceToLoop / pixelsPerSecond)
          .add("label" + i, distanceToStart / pixelsPerSecond);

        times[i] = distanceToStart / pixelsPerSecond;
      }

      function toIndex(index, vars) {
        vars = vars || {};
        Math.abs(index - curIndex) > length / 2 &&
          (index += index > curIndex ? -length : length);
        let newIndex = gsap.utils.wrap(0, length, index),
          time = times[newIndex];
        if (time > tl.time() !== index > curIndex) {
          vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
          time += tl.duration() * (index > curIndex ? 1 : -1);
        }
        curIndex = newIndex;
        vars.overwrite = true;
        return tl.tweenTo(time, vars);
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

    // 루프 시작 (속도/반복 설정)
    window.__sliderLoop = horizontalLoop(".slider_item", {
      repeat: -1,
      speed: 0.7,
      paddingRight: 60
    });
    // console.log(document.querySelector('.slider_wrapper').scrollWidth);
  }
});