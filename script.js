// ===== ABOUT ME: READ MORE アコーディオン =====
const readMoreBtn = document.querySelector('.btn--read-more');
const aboutAccordion = document.getElementById('about-accordion');

readMoreBtn.addEventListener('click', () => {
  const isOpen = readMoreBtn.getAttribute('aria-expanded') === 'true';

  if (isOpen) {
    aboutAccordion.hidden = true;
    readMoreBtn.setAttribute('aria-expanded', 'false');
    readMoreBtn.textContent = 'READ MORE';
  } else {
    aboutAccordion.hidden = false;
    readMoreBtn.setAttribute('aria-expanded', 'true');
    readMoreBtn.textContent = 'CLOSE';
  }
});


// ===== RECENT WORKS: カード画像の拡大モーダル =====
const workModal = document.getElementById('work-modal');
const workModalBody = document.getElementById('work-modal-body');
const workTriggers = document.querySelectorAll('.work-card__trigger');
const modalCloseElements = workModal.querySelectorAll('[data-modal-close]');

function openWorkModal(imgSrcs, imgAlt) {
  workModalBody.innerHTML = '';
  imgSrcs.forEach((src) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = imgAlt;
    workModalBody.appendChild(img);
  });
  workModal.hidden = false;
}

function closeWorkModal() {
  workModal.hidden = true;
  workModalBody.innerHTML = '';
}

workTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    // 複数画像(data-imgs、カンマ区切り)があればそちら優先。なければ従来通り単一画像(data-img)。
    const imgsAttr = trigger.getAttribute('data-imgs');
    const imgSrcs = imgsAttr
      ? imgsAttr.split(',').map((src) => src.trim())
      : [trigger.getAttribute('data-img')];
    const imgAlt = trigger.getAttribute('data-alt');
    openWorkModal(imgSrcs, imgAlt);
  });
});

modalCloseElements.forEach((el) => {
  el.addEventListener('click', closeWorkModal);
});

// Escキーでもモーダルを閉じられるようにする
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !workModal.hidden) {
    closeWorkModal();
  }
});
