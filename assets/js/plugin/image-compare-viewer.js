(() => {
  const imageCompareElement = document.getElementById("image-compare");
  if (!imageCompareElement) return;

  const options = {
    controlColor: "#FFFFFF",
    controlShadow: false,
    addCircle: true,
    addCircleBlur: true,
    smoothing: false,
    showLabels: true,
    labelOptions: { before: "Before", after: "After" },
    maxHeight: 300,
  };

  new ImageCompare(imageCompareElement, options).mount();

  function getControl() {
    return imageCompareElement.querySelector(".icv__control");
  }
  function getLabelBefore() {
    return imageCompareElement.querySelector(".icv__label-before");
  }
  function getLabelAfter() {
    return imageCompareElement.querySelector(".icv__label-after");
  }

  function isOverlapX(a, b) {
    return a.left < b.right && a.right > b.left;
  }

  function adjustLabelOpacity() {
    const control = getControl();
    const lb = getLabelBefore();
    const la = getLabelAfter();
    if (!control || !lb || !la) return;

    const controlRect = control.getBoundingClientRect();
    const beforeRect = lb.getBoundingClientRect();
    const afterRect = la.getBoundingClientRect();

    lb.style.opacity = isOverlapX(controlRect, beforeRect) ? "0" : "1";
    la.style.opacity = isOverlapX(controlRect, afterRect) ? "0" : "1";
  }

  // RAF cho mượt
  let rafId = 0;
  function rafAdjust() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      rafId = 0;
      adjustLabelOpacity();
    });
  }

  // Events: container + control + document drag
  imageCompareElement.addEventListener("mousemove", rafAdjust, { passive: true });
  imageCompareElement.addEventListener("touchmove", rafAdjust, { passive: true });

  let dragging = false;

  function onPointerDown(e) {
    const control = getControl();
    if (control && (e.target === control || control.contains(e.target))) {
      dragging = true;
      rafAdjust();
    }
  }
  function onPointerMove() {
    if (dragging) rafAdjust();
  }
  function onPointerUp() {
    if (dragging) {
      dragging = false;
      rafAdjust();
    }
  }

  document.addEventListener("pointerdown", onPointerDown, { passive: true });
  document.addEventListener("pointermove", onPointerMove, { passive: true });
  document.addEventListener("pointerup", onPointerUp, { passive: true });

  // Init + retry vì label/control có thể sinh ra sau mount
  window.addEventListener("load", rafAdjust);
  window.addEventListener("resize", rafAdjust);

  let tries = 0;
  const t = setInterval(() => {
    tries++;
    rafAdjust();
    if (getControl() && getLabelBefore() && getLabelAfter()) clearInterval(t);
    if (tries >= 30) clearInterval(t);
  }, 50);

  setTimeout(rafAdjust, 0);
})();
