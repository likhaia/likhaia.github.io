document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');
    const navbar = document.querySelector('.navbar');

    // Toggle menu
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileBtn.classList.toggle('active');
        
        // Animate hamburger icon (simple cross effect)
        const bars = mobileBtn.querySelectorAll('.bar');
        if (navLinks.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileBtn.classList.remove('active');
            
            // Reset hamburger
            const bars = mobileBtn.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
            document.body.style.overflow = '';
        });
    });

    // Navbar Scroll Effect
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            navbar.style.height = '70px'; // Shrink slightly
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
            navbar.style.height = '80px';
        }
    };
    
    window.addEventListener('scroll', handleScroll);

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // Copy to Clipboard Feature
    const copyBoxes = document.querySelectorAll('.copy-box');

    copyBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const textToCopy = box.querySelector('.copy-text').innerText;
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Visual feedback
                const originalText = box.innerHTML;
                box.innerHTML = '<span style="color: green; font-weight: bold;"><i class="fa-solid fa-check"></i> Copied!</span>';
                box.style.borderColor = 'green';
                box.style.backgroundColor = '#e8f5e9';

                setTimeout(() => {
                    box.innerHTML = originalText;
                    box.style.borderColor = '#ccc';
                    box.style.backgroundColor = 'white';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    });

    // Sample Preview Modal System
    const modal = document.getElementById('sample-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalGallery = document.getElementById('modal-gallery');
    const closeModal = document.querySelector('.close-modal');
    const viewButtons = document.querySelectorAll('.view-samples-btn');

    // Data for Sample Images (Update these URLs with your actual images later)
    const sampleData = {
        stickers: [
            'https://placehold.co/400x400/4B0082/FFFFFF?text=Sticker+Sheet+1',
            'https://placehold.co/400x400/5d1092/FFFFFF?text=Die-Cut+Stickers',
            'https://placehold.co/400x400/6f20a2/FFFFFF?text=Holo+Stickers',
            'https://placehold.co/400x400/8130b2/FFFFFF?text=Logo+Stickers'
        ],
        polaroids: [
            'https://placehold.co/400x400/4B0082/FFFFFF?text=Polaroid+Plain',
            'https://placehold.co/400x400/5d1092/FFFFFF?text=Holo+Photocards',
            'https://placehold.co/400x400/6f20a2/FFFFFF?text=Toploaders',
            'https://placehold.co/400x400/8130b2/FFFFFF?text=Group+Set'
        ],
        craftbooks: [
            'https://placehold.co/400x400/4B0082/FFFFFF?text=A5+Journal',
            'https://placehold.co/400x400/5d1092/FFFFFF?text=Sketchbook',
            'https://placehold.co/400x400/6f20a2/FFFFFF?text=Handbound+Detail',
            'https://placehold.co/400x400/8130b2/FFFFFF?text=Vintage+Style'
        ],
        gifts: [
            'https://placehold.co/400x400/4B0082/FFFFFF?text=Birthday+Box',
            'https://placehold.co/400x400/5d1092/FFFFFF?text=Anniversary+Set',
            'https://placehold.co/400x400/6f20a2/FFFFFF?text=Mug+%26+Coaster',
            'https://placehold.co/400x400/8130b2/FFFFFF?text=Christening+Token'
        ]
    };

    // Open Modal
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            const images = sampleData[category];
            const title = btn.closest('.card-content').querySelector('h3').innerText;

            if (images) {
                // Set Title
                modalTitle.innerText = title + ' Samples';
                
                // clear existing images
                modalGallery.innerHTML = '';

                // Populate Gallery
                images.forEach(imgUrl => {
                    const img = document.createElement('img');
                    img.src = imgUrl;
                    img.alt = category + ' sample';
                    modalGallery.appendChild(img);
                });

                // Show Modal
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    // Close Modal Function
    const closeModalFunc = () => {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    };

    closeModal.addEventListener('click', closeModalFunc);

    // Close when clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunc();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModalFunc();
        }
    });
});