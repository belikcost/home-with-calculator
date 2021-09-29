const $header = document.querySelector('.header');
const $headerMenu = $header.querySelector('.header__menu');
const $menuToggle = $header.querySelector('.menu__toggle');

$menuToggle.addEventListener('click', () => {
  $headerMenu.classList.toggle('menu_active');
  $header.classList.toggle('header_white');
  document.body.classList.toggle('body_lock');  
});

const $menuLinks = $headerMenu.querySelectorAll('.menu__link');
$menuLinks.forEach($link => {
  if (window.innerWidth > 992) {
    return;
  }
  
  $link.addEventListener('click', () => {
    $headerMenu.classList.toggle('menu_active');
    $header.classList.toggle('header_white');
    document.body.classList.toggle('body_lock');  
  });
});

const featuresSwiper = new Swiper('.features__swiper-container', {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 2,
  spaceBetween: 15,
  allowTouchMove: true,
  enabled: true,
  autoplay: {
    delay: 3000,
  },
  breakpoints: {
    1140: {
      loop: true,
      slidesPerView: 4,
      spaceBetween: 0,
      allowTouchMove: false,
      enabled: false,
    },
    768: {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 0,
      allowTouchMove: false,
      enabled: false,
    },
    640: {
      loop: true,
      slidesPerView: 2,
      spaceBetween: 0,
      allowTouchMove: false,
      enabled: false,
    }
  },
  pagination: {
    el: '.features__pagination',
    clickable: true
  },
});

const howWorkSwiper = new Swiper('.how-work__swiper-container',{
  direction: 'horizontal',
  loop: true,
  slidesPerView: 1,
  spaceBetween: 15,
  allowTouchMove: true,
  enabled: true,
  autoplay: {
    delay: 30200,
  },
  breakpoints: {
    1140: {
      loop: true,
      slidesPerView: 4,
      spaceBetween: 0,
      allowTouchMove: false,
      enabled: false,
    },
    768: {
      loop: true,
      slidesPerView: 2,
      spaceBetween: 0,
      allowTouchMove: false,
      enabled: false,
    },
    640: {
      loop: true,
      slidesPerView: 2,
      spaceBetween: 0,
      allowTouchMove: false,
      enabled: false,
    },
    480: {
      loop: true,
      slidesPerView: 2,
      spaceBetween: 0,
      allowTouchMove: false,
      enabled: true,
    }
  },
  pagination: {
    el: '.how-work__pagination',
    clickable: true
  },
});

const clientsSwiper = new Swiper('.clients__swiper-container',{
  direction: 'horizontal',
  loop: true,
  slidesPerView: 3,
  spaceBetween: 15,
  allowTouchMove: true,
  enabled: true,
  autoplay: {
    delay: 30200,
  },
  breakpoints: {
    992: {
      loop: true,
      slidesPerView: 6,
      spaceBetween: 0,
      allowTouchMove: false,
      enabled: false,
    },
    640: {
      loop: true,
      slidesPerView: 4,
      spaceBetween: 0,
      allowTouchMove: true,
      enabled: true,
    }
  },
  pagination: {
    el: '.clients__pagination',
    clickable: true
  },
});

/* Smoothscroll to anchors */
const $anchors = document.querySelectorAll('a[href^="#"]');
for (let $anchor of $anchors) {
  $anchor.addEventListener('click',  (e) => {
    const isEdge = /Edge/.test(navigator.userAgent);
    if (isEdge) {
      return;
    }
    
    e.preventDefault();
    
    const blockID = $anchor.getAttribute('href');
    const $elem = document.querySelector(blockID);

    if (blockID === '#' || !$elem) {
      return;
    }
    
    const blockOffsetTop = $elem.getBoundingClientRect().top;
    
    window.scrollBy({ top: (blockOffsetTop), left: 0, behavior: 'smooth' });
  });
}

const $playVideoBtns = document.querySelectorAll('.player__play');
$playVideoBtns.forEach($btn => {
  $btn.addEventListener('click', () => {
    const $player = $btn.closest('.player');
    const url = $player.dataset.url;

    if (!url || $player.querySelector('iframe')) {
      return;
    }
    
    const $frame = getYoutubeFrame(url);
    $player.appendChild($frame);
  });
});

window.addEventListener('load', () => {
  moveElems();
});

window.addEventListener('resize', () => {
  moveElems();
});

const $fileInputs = document.querySelectorAll('.file-field__input');
$fileInputs.forEach($input => {
  $input.addEventListener('change', () => {
    $fileField = $input.closest('.file-field');
    const $fileName = $fileField.querySelector('.file-field__names');
    
    $fileName.innerHTML += `
      <span class="file-field__name">${$input.files[0].name}</span>
      <button class="file-field__delete"></button>
    `;

    const $delete = $fileField.querySelector('.file-field__delete');
    $delete.addEventListener('click', (e) => {
      $input.value = '';
      $fileName.innerHTML = '';
      e.preventDefault();
    });
  });
});

function moveElems() {
  moveElem('stages__bg', 'stages__left', 'stages__content', 992);
  moveElem('footer__copyright', 'footer__column_first', 'footer__content', 992);
  moveElem('footer__privacy-policy', 'footer__column_first', 'footer__content', 992);
  moveElem('footer__social-links', 'footer__column_last', 'footer__content', 640);
}

function moveStagesBg() {
  const $stagesBg = document.querySelector('.stages__bg');
  const $stagesContent = document.querySelector('.stages__content');
  const $stagesLeft = document.querySelector('.stages__left');

  if (window.innerWidth <= 992 && $stagesBg.closest('.stages__left')) {
    $stagesContent.append($stagesBg);
  } else if (window.innerWidth > 992 && !$stagesBg.closest('.stages__left')) {
    $stagesLeft.append($stagesBg);
  }
}

function moveElem(elemClass, fromClass, toClass, width) {
  const $elem = document.querySelector(`.${elemClass}`);
  const $from = document.querySelector(`.${fromClass}`);
  const $to = document.querySelector(`.${toClass}`);

  if (!$elem || $from || $to) {
    return;
  }

  if (window.innerWidth <= width && $elem.closest(`.${fromClass}`)) {
    $to.append($elem);
  } else if (window.innerWidth > width && !$elem.closest(`.${fromClass}`)) {
    $from.append($elem);
  }
}


function getYoutubeFrame(src) {
  const $frame = document.createElement('iframe');

  $frame.setAttribute('src', `${src}?autoplay=1`);
  $frame.setAttribute('width', '100%');
  $frame.setAttribute('height', '100%');
  $frame.setAttribute('title', 'YouTube video player');
  $frame.setAttribute('autoplay', '1');
  $frame.setAttribute('frameborder', '0');
  $frame.setAttribute('allowfullscreen', '');

  return $frame;
}


const $faqItems = document.querySelectorAll('.faq__item');
$faqItems.forEach($item => {
  $item.addEventListener('click', () => {
    $item.classList.toggle('faq__item_active');
  });
});