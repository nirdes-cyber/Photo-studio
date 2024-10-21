const images = [
    { src: '/assets/blog.jpg', alt: 'Description of Image 1', caption: 'Caption for Image 1' },
    { src: 'image2.jpg', alt: 'Description of Image 2', caption: 'Caption for Image 2' },
    { src: 'image3.jpg', alt: 'Description of Image 3', caption: 'Caption for Image 3' },
    { src: 'image4.jpg', alt: 'Description of Image 4', caption: 'Caption for Image 4' },
    { src: 'image5.jpg', alt: 'Description of Image 5', caption: 'Caption for Image 5' },
    { src: 'image6.jpg', alt: 'Description of Image 6', caption: 'Caption for Image 6' },
    { src: 'image7.jpg', alt: 'Description of Image 7', caption: 'Caption for Image 7' },
    { src: 'image8.jpg', alt: 'Description of Image 8', caption: 'Caption for Image 8' },
    { src: 'image9.jpg', alt: 'Description of Image 9', caption: 'Caption for Image 9' },
    { src: 'image10.jpg', alt: 'Description of Image 10', caption: 'Caption for Image 10' }
];

// Dynamically render the gallery
const galleryGrid = document.getElementById('gallery-grid');

images.forEach((image, index) => {
    const galleryItem = document.createElement('div');
    galleryItem.classList.add('gallery-item');

    const imgElement = document.createElement('img');
    imgElement.src = image.src;
    imgElement.alt = image.alt;
    imgElement.addEventListener('click', () => openLightbox(index));

    const captionElement = document.createElement('p');
    captionElement.classList.add('caption');
    captionElement.textContent = image.caption;

    galleryItem.appendChild(imgElement);
    galleryItem.appendChild(captionElement);
    galleryGrid.appendChild(galleryItem);
});

// Lightbox and navigation functionality
let currentIndex = 0;
let rotationInterval;

function startRotation() {
    rotationInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        openLightbox(currentIndex);
    }, 6000); // Set interval to 6 seconds
}

function stopRotation() {
    clearInterval(rotationInterval);
}

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const captionText = document.getElementById('caption');

function openLightbox(index) {
    currentIndex = index;
    lightbox.style.display = 'block';
    lightboxImg.src = images[currentIndex].src;
    captionText.innerHTML = images[currentIndex].alt;
    stopRotation(); // Stop the rotation when an image is opened manually
}

function closeLightbox() {
    lightbox.style.display = 'none';
    startRotation(); // Restart rotation after closing the lightbox
}

document.querySelector('.close').addEventListener('click', closeLightbox);

document.querySelector('.prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    openLightbox(currentIndex);
});

document.querySelector('.next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    openLightbox(currentIndex);
});

// Image loading effects
const allImages = document.querySelectorAll('.gallery-item img');
allImages.forEach(img => {
    img.addEventListener('load', () => {
        img.classList.add('loaded');
    });
});

// Start automatic rotation on window load
window.onload = startRotation;
