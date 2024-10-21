const radios = document.querySelectorAll('input[name="slide"]');
const container = document.querySelector('.container');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let index = 0;
let interval;

// Function to center the clicked image
function centerImage(index) {
  const cardWidth = radios[index].nextElementSibling.offsetWidth;
  const containerWidth = container.offsetWidth;
  const offset = (containerWidth / 2) - (cardWidth / 2);
  container.style.transform = `translateX(-${index * cardWidth - offset}px)`;
}

// Function to automatically rotate images
function autoRotate() {
  interval = setInterval(() => {
    index = (index + 1) % radios.length;
    radios[index].checked = true;
    centerImage(index);
  }, 5000); // Change slide every 5 seconds
}

// Arrow button handlers
nextBtn.addEventListener('click', () => {
  clearInterval(interval);
  index = (index + 1) % radios.length;
  radios[index].checked = true;
  centerImage(index);
  autoRotate();  // Resume auto-rotation
});

prevBtn.addEventListener('click', () => {
  clearInterval(interval);
  index = (index - 1 + radios.length) % radios.length;
  radios[index].checked = true;
  centerImage(index);
  autoRotate();  // Resume auto-rotation
});

// Handle image click
radios.forEach((radio, i) => {
  radio.addEventListener('change', () => {
    index = i;
    centerImage(i);
    clearInterval(interval);  // Pause auto-rotation when clicked
    autoRotate();             // Resume auto-rotation after clicking
  });
});

// Start auto rotation on page load
autoRotate();
