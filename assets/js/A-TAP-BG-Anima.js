function initPaintEffect() {
  const box = document.querySelector('.paint-reveal-box');
  if (!box) return;

  const parent = box.parentElement;
  if (!parent) return;

  function onScroll() {
    const rect = parent.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalScroll = rect.height - windowHeight;

    if (totalScroll <= 0) return;

    let progress = -rect.top / totalScroll;
    progress = Math.min(Math.max(progress, 0), 1);

    const img1 = box.querySelector('img:first-of-type');
    const img2 = box.querySelector('img:last-of-type');

    const isMobile = window.innerWidth < 768;

    if (isMobile && img1 && img2) {
      // --- ระบบทำงานสำหรับมือถือ (Pan ซ้าย->ขวา + Paint Reveal) ---
      const maxPan1 = Math.max(0, img1.getBoundingClientRect().width - window.innerWidth);
      const maxPan2 = Math.max(0, img2.getBoundingClientRect().width - window.innerWidth);

      // เฟส 1 (0% - 30%): แพนภาพแรกจาก ซ้าย -> ขวา
      let pan1Progress = Math.min(Math.max(progress / 0.30, 0), 1);
      img1.style.transform = `translateX(${-pan1Progress * maxPan1}px)`;

      // เฟส 2 (30% - 55%): ปาดสีเปิดภาพสอง (ภาพสองเริ่มที่ฝั่งซ้าย)
      let revealProgress = 0;
      if (progress > 0.30 && progress <= 0.55) {
        revealProgress = (progress - 0.30) / 0.25;
      } else if (progress > 0.55) {
        revealProgress = 1;
      }
      const hidePercent = (1 - revealProgress) * 100;
      img2.style.clipPath = `inset(0 0 ${hidePercent}% 0)`;
      img2.style.webkitClipPath = `inset(0 0 ${hidePercent}% 0)`;

      // เฟส 3 (55% - 85%): แพนภาพสองจาก ซ้าย -> ขวา
      let pan2Progress = 0;
      if (progress > 0.55) {
        pan2Progress = Math.min(Math.max((progress - 0.55) / 0.30, 0), 1);
      }
      img2.style.transform = `translateX(${-pan2Progress * maxPan2}px)`;

    } else if (img1 && img2) {
      // --- ระบบทำงานสำหรับหน้าจอคอม (Desktop ปาดสีแนวตั้งปกติ) ---
      img1.style.transform = 'none';
      img2.style.transform = 'none';

      let revealProgress = 0;
      if (progress < 0.15) {
        revealProgress = 0;
      } else if (progress > 0.85) {
        revealProgress = 1;
      } else {
        revealProgress = (progress - 0.15) / 0.7;
      }

      const hidePercent = (1 - revealProgress) * 100;
      img2.style.clipPath = `inset(0 0 ${hidePercent}% 0)`;
      img2.style.webkitClipPath = `inset(0 0 ${hidePercent}% 0)`;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
}

document.addEventListener('DOMContentLoaded', initPaintEffect);
window.addEventListener('load', initPaintEffect);