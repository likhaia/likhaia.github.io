document.addEventListener('DOMContentLoaded', () => {
    // Pre-loader Logic
    const hidePreloader = () => {
        setTimeout(() => {
            document.body.classList.add('loaded');
            updateGreeting(); // Set greeting after load
        }, 500);
    };

    // Time-Based Greeting
    function updateGreeting() {
        const greetingEl = document.getElementById('greeting');
        if (!greetingEl) return;

        const hour = new Date().getHours();
        let welcomeText = "Welcome to our Likha.";

        if (hour < 12) welcomeText = "Good Morning! " + welcomeText;
        else if (hour < 18) welcomeText = "Good Afternoon! " + welcomeText;
        else welcomeText = "Good Evening! ✨ " + welcomeText;

        greetingEl.innerText = welcomeText;
    }

    if (document.readyState === 'complete') {
        hidePreloader();
    } else {
        window.addEventListener('load', hidePreloader);
    }

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');
    const navbar = document.querySelector('.navbar');

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileBtn.classList.toggle('active');
        const bars = mobileBtn.querySelectorAll('.bar');
        if (navLinks.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            document.body.style.overflow = 'hidden';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
            document.body.style.overflow = '';
        }
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileBtn.classList.remove('active');
            const bars = mobileBtn.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
            document.body.style.overflow = '';
        });
    });

    // Navbar & Back-to-top Scroll Effects
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            navbar.style.height = '70px';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
            navbar.style.height = '80px';
        }

        const backToTop = document.getElementById('back-to-top');
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }

        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progress = document.querySelector(".scroll-progress");
        if (progress) progress.style.width = scrolled + "%";
    };
    window.addEventListener('scroll', handleScroll);

    document.getElementById('back-to-top').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Custom Cursor
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");
    window.addEventListener("mousemove", (e) => {
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
        cursorOutline.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 500, fill: "forwards" });
    });

    const hoverables = document.querySelectorAll('a, button, .gallery-item, .card, .copy-box, .insta-item');
    hoverables.forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('cursor-hover');
            cursorDot.classList.add('cursor-hover');
        });
        item.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('cursor-hover');
            cursorDot.classList.remove('cursor-hover');
        });
    });

    // Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // Category Filtering Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-grid article');
    const searchInput = document.getElementById('product-search');

    const filterProducts = () => {
        const searchValue = searchInput.value.toLowerCase();
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');

        productCards.forEach(card => {
            const title = card.querySelector('h3').innerText.toLowerCase();
            const desc = card.querySelector('p').innerText.toLowerCase();
            const category = card.getAttribute('data-category');
            
            const matchesSearch = title.includes(searchValue) || desc.includes(searchValue);
            const matchesCategory = activeFilter === 'all' || category === activeFilter;

            if (matchesSearch && matchesCategory) {
                card.classList.remove('hide');
                setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => card.classList.add('hide'), 400);
            }
        });
    };

    // Filter Button Click
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProducts(); // Re-run filter
        });
    });

    // Search Input Keyup
    if (searchInput) {
        searchInput.addEventListener('keyup', filterProducts);
    }



    // Flipbook Modal Logic
    const flipbookModal = document.getElementById('flipbook-modal');
    const flipbookBtn = document.querySelector('.flipbook-btn');
    const closeFlipbook = document.getElementById('close-flipbook');

    if (flipbookBtn) {
        flipbookBtn.addEventListener('click', () => {
            flipbookModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeFlipbook) {
        closeFlipbook.addEventListener('click', () => {
            flipbookModal.classList.remove('show');
            document.body.style.overflow = '';
        });
    }

    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) item.classList.remove('active');
            });
            faqItem.classList.toggle('active');
        });
    });

    // Data for Sample Images (Updated for new products)
    const sampleData = {
        scrapbook: [
            { url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80', id: 'LW-MS-01' },
            { url: 'https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&w=600&q=80', id: 'LW-MS-02' },
            { url: 'https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&w=600&q=80', id: 'LW-MS-03' },
            { url: 'https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&w=600&q=80', id: 'LW-MS-04' }
        ],
        strip_keychain: [
            { url: 'https://images.unsplash.com/photo-1617396900799-f4ec2b43c7ae?auto=format&fit=crop&w=600&q=80', id: 'LW-PK-01' },
            { url: 'https://images.unsplash.com/photo-1604163546580-c5332616f97c?auto=format&fit=crop&w=600&q=80', id: 'LW-PK-02' }
        ],
        photo_keychain: [
            { url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80', id: 'LW-SK-01' },
            { url: 'https://images.unsplash.com/photo-1620300762319-53e74d92ebc9?auto=format&fit=crop&w=600&q=80', id: 'LW-SK-02' }
        ],
        polaroids: [
            { url: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80', id: 'LW-PP-01' },
            { url: 'https://images.unsplash.com/photo-1593453896434-d2e825a0a38b?auto=format&fit=crop&w=600&q=80', id: 'LW-PP-02' }
        ],
        blind_box: [
            { url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80', id: 'LW-BB-01' }
        ],
        gifts: [
            { url: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=600&q=80', id: 'LW-GB-01' },
            { url: 'https://images.unsplash.com/photo-1607344645830-47b6ad6c770d?auto=format&fit=crop&w=600&q=80', id: 'LW-GB-02' }
        ],
        chibi_stickers: [
            { url: 'https://images.unsplash.com/photo-1620300762319-53e74d92ebc9?auto=format&fit=crop&w=600&q=80', id: 'LW-CS-01' }
        ],
        lam_keychain: [
            { url: 'https://images.unsplash.com/photo-1621600411688-4be93cd68504?auto=format&fit=crop&w=600&q=80', id: 'LW-LK-01' }
        ],
        vinyl_decals: [
            { url: 'https://images.unsplash.com/photo-1626114271030-4419757048d0?auto=format&fit=crop&w=600&q=80', id: 'LW-VD-01' }
        ]
    };

    const sampleModal = document.getElementById('sample-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalGallery = document.getElementById('modal-gallery');

    document.querySelectorAll('.view-samples-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            const samples = sampleData[category];
            const title = btn.closest('.card-content').querySelector('h3').innerText;
            modalTitle.innerText = title + ' Samples';
            modalGallery.innerHTML = '';
            samples.forEach(sample => {
                const container = document.createElement('div');
                container.className = 'sample-item';
                container.innerHTML = `<img src="${sample.url}" alt="${sample.id}"><div class="sample-info"><div class="sample-id-group"><span class="sample-id">${sample.id}</span><button class="copy-id-btn" data-id="${sample.id}"><i class="fa-regular fa-copy"></i></button></div><button class="btn-primary-sm sample-select-btn" data-id="${sample.id}" data-product="${title}">Order This</button></div>`;
                modalGallery.appendChild(container);
            });
            sampleModal.classList.add('show');
            document.body.style.overflow = 'hidden';

            modalGallery.querySelectorAll('.sample-select-btn').forEach(selBtn => {
                selBtn.addEventListener('click', () => {
                    const id = selBtn.getAttribute('data-id');
                    const prod = selBtn.getAttribute('data-product');
                    sampleModal.classList.remove('show');
                    notifyTelegram("Order This Clicked", `ID: ${id} | ${prod}`);
                    openOrderModal(prod, id);
                });
            });

            // Re-add copy ID events
            modalGallery.querySelectorAll('.copy-id-btn').forEach(copyBtn => {
                copyBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const id = copyBtn.getAttribute('data-id');
                    notifyTelegram("Copy ID", `Ref Code: ${id}`);
                    navigator.clipboard.writeText(id).then(() => {
                        const originalHTML = copyBtn.innerHTML;
                        copyBtn.innerHTML = '<i class="fa-solid fa-check" style="color: #4CAF50;"></i>';
                        setTimeout(() => { copyBtn.innerHTML = originalHTML; }, 2000);
                    });
                });
            });
        });
    });

    // Order Modal Logic
    const orderModal = document.getElementById('order-modal');
    const productNameInput = document.getElementById('product-name');
    const orderModalTitle = document.getElementById('order-modal-title');
    const orderGuide = document.getElementById('order-guide');
    const orderRush = document.getElementById('order-rush');
    const rushNote = document.getElementById('rush-note');
    const orderCode = document.getElementById('order-code');

    const productGuides = {
        'Mini Scrapbook (A6)': 'Include: Theme, 35 Photos, 2 Messages, 1 Fav Song & Description. 6 pages total.',
        'Acrylic Keychain Strip': 'B1T1 at ₱49 (+₱5 for colored frame). Include design choice.',
        'Spotify/Photo Keychain': 'B1T1 at ₱59 (+₱5 for full-page). Include song details/photo.',
        'Polaroid/Instax Prints': '10 pcs for ₱49 (+₱10 for colored frame). Include border choice.',
        'Blind Box': 'Includes 10 polaroids, 1 message with picture, and 1 keychain. Mention theme!',
        'Custom Gift Set': 'Box with mini flowers, etc. Send your inspo and choice of items!',
        'Vinyl Decals (Moto/Car)': 'Include: Design/Text and Vinyl Color (Matte/Glossy/Holo). Max A4 size.'
    };

    const openOrderModal = (product, code = '') => {
        productNameInput.value = product;
        orderModalTitle.innerText = 'Order: ' + product;
        orderCode.value = code;
        orderGuide.innerText = productGuides[product] || 'Please include size, color, and design notes.';
        orderModal.classList.add('show');
        document.body.style.overflow = 'hidden';

        // Notify Telegram
        notifyTelegram("Click Order Now", `Product: ${product} ${code ? '(Ref: ' + code + ')' : ''}`);
    };

    document.querySelectorAll('.order-btn').forEach(btn => {
        btn.addEventListener('click', () => openOrderModal(btn.getAttribute('data-product')));
    });

    if (orderRush) {
        orderRush.addEventListener('change', () => { rushNote.style.display = orderRush.checked ? 'block' : 'none'; });
    }

    const closeModal = () => {
        document.querySelectorAll('.modal').forEach(m => m.classList.remove('show'));
        // Allow transition to finish before restoring scroll
        setTimeout(() => {
            if (!document.querySelector('.modal.show')) {
                document.body.style.overflow = '';
            }
        }, 400);
    };
    document.querySelectorAll('.close-modal').forEach(btn => btn.addEventListener('click', closeModal));
    window.addEventListener('click', (e) => { if (e.target.classList.contains('modal')) closeModal(); });

    // Send Order Logic
    document.getElementById('send-messenger').addEventListener('click', () => {
        const msg = generateMessage();
        if(msg) {
            notifyTelegram("Order Sent", "via Messenger");
            window.open(`https://m.me/1016930224830241?text=${encodeURIComponent(msg)}`, '_blank');
        }
    });

    document.getElementById('send-email').addEventListener('click', () => {
        const msg = generateMessage();
        if(msg) {
            notifyTelegram("Order Sent", "via Email");
            const product = productNameInput.value;
            window.location.href = `mailto:likhaiaworks@gmail.com?subject=Order Inquiry: ${product}&body=${encodeURIComponent(msg)}`;
        }
    });

    function generateMessage() {
        const details = document.getElementById('order-details').value;
        if(!details) { alert('Please enter customization details!'); return null; }
        
        const isRush = orderRush.checked ? 'YES' : 'No';
        return `ORDER INQUIRY\n-------------------------\nProduct: ${productNameInput.value}\nRef Code: ${orderCode.value || 'None'}\nQuantity: ${document.getElementById('order-qty').value}\nDesired Delivery: ${document.getElementById('order-date').value || 'Not specified'}\nRush Order: ${isRush}\nCustomization Details: ${details}\n-------------------------\nSent from LIKHAIAWORKS Website`;
    }

    // Share Logic
    const shareBtn = document.getElementById('share-shop');
    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            notifyTelegram("Share Shop Clicked");
            if (navigator.share) {
                try { await navigator.share({ title: 'Likhaia Prints & Craft Studio', text: 'Beautiful handmade gifts!', url: window.location.href }); } catch (err) {}
            } else { navigator.clipboard.writeText(window.location.href); alert('Shop link copied!'); }
        });
    }

    // Studio Feed Navigation Logic
    const feed = document.getElementById('feed-container');
    const prevBtn = document.getElementById('feed-prev');
    const nextBtn = document.getElementById('feed-next');

    if (feed && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            feed.scrollBy({ left: -320, behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', () => {
            feed.scrollBy({ left: 320, behavior: 'smooth' });
        });

        // Drag to Scroll Logic for Mouse
        let isDown = false;
        let startX;
        let scrollLeft;

        feed.addEventListener('mousedown', (e) => {
            isDown = true;
            feed.style.cursor = 'grabbing';
            startX = e.pageX - feed.offsetLeft;
            scrollLeft = feed.scrollLeft;
        });
        feed.addEventListener('mouseleave', () => {
            isDown = false;
            feed.style.cursor = 'grab';
        });
        feed.addEventListener('mouseup', () => {
            isDown = false;
            feed.style.cursor = 'grab';
        });
        feed.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - feed.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed
            feed.scrollLeft = scrollLeft - walk;
        });
    }

    // Gift Box Calculator Logic
    const calcModal = document.getElementById('calculator-modal');
    const closeCalc = document.getElementById('close-calc');
    const calcTrigger = document.querySelector('.calc-trigger-btn');
    const totalDisplay = document.getElementById('calc-total');
    const calcOrderBtn = document.querySelector('.order-calc-btn');

    if (calcTrigger) {
        calcTrigger.addEventListener('click', () => {
            calcModal.classList.add('show');
            document.body.style.overflow = 'hidden';
            calculateTotal(); // Init
            notifyTelegram("Open Calculator", "Gift Box Builder");
        });
    }

    if (closeCalc) {
        closeCalc.addEventListener('click', () => {
            calcModal.classList.remove('show');
            document.body.style.overflow = '';
        });
    }

    function calculateTotal() {
        let total = 0;
        
        // Get Base
        const base = document.querySelector('input[name="calc-base"]:checked');
        if (base) total += parseInt(base.value);

        // Get Addons
        document.querySelectorAll('.calc-addon:checked').forEach(addon => {
            total += parseInt(addon.value);
        });

        totalDisplay.innerText = total;
    }

    // Listen for changes
    document.querySelectorAll('input[name="calc-base"], .calc-addon').forEach(input => {
        input.addEventListener('change', calculateTotal);
    });

    // Order from Calculator
    if (calcOrderBtn) {
        calcOrderBtn.addEventListener('click', () => {
            // Build the details string
            let details = "Base: " + document.querySelector('input[name="calc-base"]:checked').parentElement.innerText.trim();
            document.querySelectorAll('.calc-addon:checked').forEach(addon => {
                details += ", " + addon.parentElement.innerText.trim();
            });
            details += ". Total Est: ₱" + totalDisplay.innerText;

            // Close Calc and Open Order Modal
            calcModal.classList.remove('show');
            openOrderModal('Custom Gift Set');
            
            // Pre-fill the textarea
            setTimeout(() => {
                document.getElementById('order-details').value = details;
            }, 100);
        });
    }

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                lightboxImg.src = img.src;
                lightbox.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Read More Logic for Mobile
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.card-content p:not(.price)').forEach(p => {
            if (p.innerText.length > 60) {
                p.classList.add('desc-collapsed');
                const btn = document.createElement('span');
                btn.className = 'read-more-link';
                btn.innerText = 'Read More';
                p.parentNode.insertBefore(btn, p.nextSibling);
                
                btn.addEventListener('click', () => {
                    p.classList.toggle('desc-collapsed');
                    btn.innerText = p.classList.contains('desc-collapsed') ? 'Read More' : 'Show Less';
                });
            }
        });
    }

    // Telegram Notification Logic
    const TELEGRAM_TOKEN = "8161719576:AAH4qFIJg-XZqAbUol7zotQ9V-oIkXHvL2A";
    const TELEGRAM_CHAT_ID = "5543161340";

    async function notifyTelegram(action = "Page Visit", detail = "") {
        if (TELEGRAM_TOKEN.includes("YOUR_")) return;

        try {
            // Fetch IP and Location Info (Cached in session to avoid multiple API calls)
            let ipData = JSON.parse(sessionStorage.getItem('ipData'));
            if (!ipData) {
                const ipResponse = await fetch('https://ipapi.co/json/');
                ipData = await ipResponse.json();
                sessionStorage.setItem('ipData', JSON.stringify(ipData));
            }

            const page = window.location.pathname.split("/").pop() || "index.html";
            const device = getDeviceType();
            
            const message = `✨ LIKHAIA ACTIVITY ALERT
-------------------------
🔔 Action: ${action}
📦 Details: ${detail || 'None'}
📄 Page: ${page}
📍 Location: ${ipData.city}, ${ipData.country_name}
📱 Device: ${device}
⏰ Time: ${new Date().toLocaleString()}
-------------------------`;

            await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: message
                })
            });
        } catch (err) {
            console.log('Notification Error:', err);
        }
    }

    function getDeviceType() {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return "Tablet";
        if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return "Mobile";
        return "Desktop (" + navigator.platform + ")";
    }

    // Only notify once per session to avoid spam
    if (!sessionStorage.getItem('notified')) {
        notifyTelegram();
        sessionStorage.setItem('notified', 'true');
    }

    // Video Button Logic
    document.querySelectorAll('.video-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const videoLink = btn.getAttribute('data-video-link');
            if (videoLink) {
                window.open(videoLink, '_blank');
                notifyTelegram("Watch Video Clicked", `Product: ${btn.closest('.card-content').querySelector('h3').innerText}`);
            }
        });
    });

    // Bottom Nav Active State Logic
    const bottomNavItems = document.querySelectorAll('.bottom-nav .nav-item');
    const sections = document.querySelectorAll('section, header');

    window.addEventListener('scroll', () => {
        let current = "";
        const scrollY = window.scrollY;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 100) {
                current = section.getAttribute("id");
            }
        });

        bottomNavItems.forEach((item) => {
            item.classList.remove("active");
            if (item.getAttribute("href").includes(current)) {
                item.classList.add("active");
            }
        });
    });
});
