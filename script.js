// DOM Elements
const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const caption = document.getElementById('caption');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const categoryBtns = document.querySelectorAll('.cat-btn');

let currentImages = [];
let currentIndex = 0;

// Get all gallery items
function updateCurrentImages() {
    const items = document.querySelectorAll('.gallery-item');
    currentImages = Array.from(items).filter(item => {
        return item.style.display !== 'none';
    });
}

// Open Lightbox
function openLightbox(index) {
    const img = currentImages[index];
    const imgSrc = img.querySelector('img').src;
    const imgTitle = img.querySelector('.overlay h3').textContent;
    const imgDesc = img.querySelector('.overlay p').textContent;
    
    lightboxImg.src = imgSrc;
    caption.textContent = `${imgTitle} - ${imgDesc}`;
    lightbox.classList.add('active');
    currentIndex = index;
    document.body.style.overflow = 'hidden';
}

// Close Lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Next Image
function nextImage() {
    if (currentIndex < currentImages.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    
    const img = currentImages[currentIndex];
    const imgSrc = img.querySelector('img').src;
    const imgTitle = img.querySelector('.overlay h3').textContent;
    const imgDesc = img.querySelector('.overlay p').textContent;
    
    lightboxImg.src = imgSrc;
    caption.textContent = `${imgTitle} - ${imgDesc}`;
}

// Previous Image
function prevImage() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = currentImages.length - 1;
    }
    
    const img = currentImages[currentIndex];
    const imgSrc = img.querySelector('img').src;
    const imgTitle = img.querySelector('.overlay h3').textContent;
    const imgDesc = img.querySelector('.overlay p').textContent;
    
    lightboxImg.src = imgSrc;
    caption.textContent = `${imgTitle} - ${imgDesc}`;
}

// Category Filter
function filterImages(category) {
    const allItems = document.querySelectorAll('.gallery-item');
    
    allItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
    
    updateCurrentImages();
}

// Add click events to gallery items
function addGalleryEvents() {
    const items = document.querySelectorAll('.gallery-item');
    items.forEach((item, idx) => {
        item.addEventListener('click', () => {
            updateCurrentImages();
            const newIndex = currentImages.findIndex(img => img === item);
            openLightbox(newIndex);
        });
    });
}

// Category button events
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const category = btn.dataset.filter;
        filterImages(category);
    });
});

// Lightbox events
closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);

// Keyboard events
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    }
});

// Close on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// Initialize
updateCurrentImages();
addGalleryEvents();
filterImages('all');