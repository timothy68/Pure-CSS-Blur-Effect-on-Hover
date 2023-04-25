const slider = document.querySelector('.slider input');
const img = document.querySelector('.images .img-2');
const dragLine = document.querySelector('.slider .drag-line');
let isDragging = false;

// calculate the slider value based on touch position
function calculateSliderValue(touchX) {
  const sliderRect = slider.getBoundingClientRect();
  const sliderWidth = sliderRect.right - sliderRect.left;
  const relativeX = touchX - sliderRect.left;
  let sliderVal = (relativeX / sliderWidth) * 100;
  if (sliderVal < 0) {
    sliderVal = 0;
  } else if (sliderVal > 100) {
    sliderVal = 100;
  }
  return sliderVal;
}

// update the slider position and image width
function updateSlider(sliderVal) {
  dragLine.style.left = sliderVal + '%';
  img.style.width = sliderVal + '%';
}

slider.addEventListener('mousedown', () => {
  isDragging = true;
});

document.addEventListener('mousemove', (event) => {
  if (isDragging) {
    const sliderVal = calculateSliderValue(event.clientX);
    updateSlider(sliderVal);
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

slider.addEventListener('touchstart', (event) => {
  isDragging = true;
  const touch = event.touches[0];
  const sliderVal = calculateSliderValue(touch.clientX);
  updateSlider(sliderVal);
  event.preventDefault();
});

document.addEventListener('touchmove', (event) => {
  if (isDragging) {
    const touch = event.touches[0];
    const sliderVal = calculateSliderValue(touch.clientX);
    updateSlider(sliderVal);
    // optimize animations with requestAnimationFrame
    requestAnimationFrame(() => {
      updateSlider(sliderVal);
    });
  }
  event.preventDefault();
});

document.addEventListener('touchend', () => {
  isDragging = false;
});