document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Mobile Menu Toggle
       ========================================================================== */
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const icon = mobileNavToggle.querySelector('i');
            if (navMenu.classList.contains('open')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars-staggered';
            }
        });

        // Close mobile menu on clicking any navigation link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                const icon = mobileNavToggle.querySelector('i');
                icon.className = 'fa-solid fa-bars-staggered';
            });
        });
    }

    /* ==========================================================================
       2. Sticky Navigation & Active Link Highlight (Intersection Observer)
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    const navBar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navBar.style.padding = '5px 0';
            navBar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navBar.style.padding = '0';
            navBar.style.boxShadow = 'none';
        }
    });

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Trigger when section occupies the active viewing zone
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    /* ==========================================================================
       3. Portfolio / Gallery Filter Logic
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    let activeCategory = 'all';

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state on buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            activeCategory = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                // Fade effect
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    if (activeCategory === 'all' || category === activeCategory) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    /* ==========================================================================
       4. Lightbox Modal Component
       ========================================================================== */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    let currentGalleryIndex = 0;
    let visibleItems = [];

    // Helper to get only the currently visible gallery items
    const updateVisibleItems = () => {
        visibleItems = Array.from(galleryItems).filter(item => {
            return activeCategory === 'all' || item.getAttribute('data-category') === activeCategory;
        });
    };

    const showLightbox = (index) => {
        updateVisibleItems();
        currentGalleryIndex = index;
        const currentItem = visibleItems[currentGalleryIndex];
        const img = currentItem.querySelector('.gallery-img');
        const title = currentItem.querySelector('.gallery-item-title').textContent;
        const category = currentItem.querySelector('.gallery-item-category').textContent;

        lightboxImg.src = img.src;
        lightboxCaption.innerHTML = `<span style="color:#ff6b6b; font-size:0.8rem; text-transform:uppercase; letter-spacing:0.1em; display:block; margin-bottom:5px;">${category}</span> ${title}`;
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Stop background scrolling
    };

    const closeLightbox = () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable background scrolling
    };

    // Attach click events to gallery items
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            updateVisibleItems();
            const index = visibleItems.indexOf(item);
            if (index !== -1) {
                showLightbox(index);
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
        
        // Close on clicking overlay background
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target === document.querySelector('.lightbox-content-container')) {
                closeLightbox();
            }
        });
    }

    const showNextImage = () => {
        currentGalleryIndex = (currentGalleryIndex + 1) % visibleItems.length;
        showLightbox(currentGalleryIndex);
    };

    const showPrevImage = () => {
        currentGalleryIndex = (currentGalleryIndex - 1 + visibleItems.length) % visibleItems.length;
        showLightbox(currentGalleryIndex);
    };

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showNextImage();
        });
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showPrevImage();
        });
    }

    // Keyboard support for Lightbox (Left/Right arrows, Escape)
    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.style.display === 'block') {
            if (e.key === 'ArrowRight') showNextImage();
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'Escape') closeLightbox();
        }
    });

    /* ==========================================================================
       5. Pricing Package Autoselection Flow
       ========================================================================== */
    const selectPackageButtons = document.querySelectorAll('.select-package-btn');
    const shootTypeDropdown = document.getElementById('shootType');
    const messageField = document.getElementById('clientMessage');

    selectPackageButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const packageName = button.getAttribute('data-package');
            
            // Map the package names to dropdown values
            if (packageName.includes('Solo')) {
                shootTypeDropdown.value = 'Solo';
            } else if (packageName.includes('Group')) {
                shootTypeDropdown.value = 'Group';
            } else if (packageName.includes('Event')) {
                shootTypeDropdown.value = 'Event';
            } else if (packageName.includes('Custom')) {
                shootTypeDropdown.value = 'Custom';
            }
            
            // Pre-fill message details
            messageField.value = `I am interested in booking the "${packageName}" package. Let me know details of availability.`;
        });
    });

    /* ==========================================================================
       6. FAQ Accordion Panels
       ========================================================================== */
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            
            // Toggle active state
            const isActive = faqItem.classList.contains('active');
            
            // Close all items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-answer').style.maxHeight = '0';
            });

            if (!isActive) {
                faqItem.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    /* ==========================================================================
       7. Form Validation & Deep Link (SMS / Mailto) Dispatcher
       ========================================================================== */
    const bookingForm = document.getElementById('bookingForm');
    const nameInput = document.getElementById('clientName');
    const phoneInput = document.getElementById('clientPhone');
    const dateInput = document.getElementById('shootDate');
    const shootTypeSelect = document.getElementById('shootType');
    const messageInput = document.getElementById('clientMessage');

    // Error spans
    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');
    const dateError = document.getElementById('dateError');

    // Photographer contact numbers/details
    const photographerPhone = "+919074640812";
    const photographerEmail = "Ladyycam381@gmail.com";
    // Web3Forms Access Key (Submit to kvs05655@gmail.com. Get your free key at https://web3forms.com/)
    const web3FormsAccessKey = "7524e6d1-aadf-4007-82dd-72bba6029ffa";

    // Set today's date as min attribute for date picker (prevent booking past dates)
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayFormatted = `${yyyy}-${mm}-${dd}`;
    dateInput.min = todayFormatted;

    // Helper: Client-side Form Validation
    const validateForm = () => {
        let isValid = true;

        // Name check
        if (nameInput.value.trim() === '') {
            nameError.style.display = 'block';
            nameInput.style.borderColor = 'var(--accent-magenta)';
            isValid = false;
        } else {
            nameError.style.display = 'none';
            nameInput.style.borderColor = 'var(--border-color)';
        }

        // Phone check (regex checks basic 10-digit number structure or country codes)
        const phoneRegex = /^\+?[0-9\s\-]{10,15}$/;
        if (!phoneRegex.test(phoneInput.value.trim())) {
            phoneError.style.display = 'block';
            phoneInput.style.borderColor = 'var(--accent-magenta)';
            isValid = false;
        } else {
            phoneError.style.display = 'none';
            phoneInput.style.borderColor = 'var(--border-color)';
        }

        // Date check
        if (dateInput.value === '') {
            dateError.textContent = "Please select a date";
            dateError.style.display = 'block';
            dateInput.style.borderColor = 'var(--accent-magenta)';
            isValid = false;
        } else {
            const selectedDate = new Date(dateInput.value);
            const currentDate = new Date(todayFormatted); // Strip time
            if (selectedDate < currentDate) {
                dateError.textContent = "Date cannot be in the past";
                dateError.style.display = 'block';
                dateInput.style.borderColor = 'var(--accent-magenta)';
                isValid = false;
            } else {
                dateError.style.display = 'none';
                dateInput.style.borderColor = 'var(--border-color)';
            }
        }

        return isValid;
    };

    // Clean errors on input typing
    [nameInput, phoneInput, dateInput].forEach(input => {
        input.addEventListener('input', () => {
            input.style.borderColor = 'var(--border-color)';
            const errSpan = input.nextElementSibling;
            if (errSpan && errSpan.classList.contains('error-msg')) {
                errSpan.style.display = 'none';
            }
        });
    });

    // Form Success / Error UI elements
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');
    const btnBookNow = document.getElementById('btnBookNow');

    // Handle single Form Submission using Web3Forms API
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop page reload

        // 1. Client-side Validation
        if (!validateForm()) return;

        // 2. Loading State UI
        btnBookNow.disabled = true;
        const originalBtnText = btnBookNow.innerHTML;
        btnBookNow.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;
        formSuccess.style.display = 'none';
        formError.style.display = 'none';

        // 3. Construct payload data
        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        const date = dateInput.value;
        const shootType = shootTypeSelect.options[shootTypeSelect.selectedIndex].text;
        const message = messageInput.value.trim();

        const formData = {
            access_key: web3FormsAccessKey,
            name: name,
            phone: phone,
            date: date,
            shoot_type: shootType,
            message: message || "No extra details provided.",
            subject: `New Booking Request from ${name} (${shootType})`,
            from_name: "Nafi Photography Website"
        };

        // 4. Send request to Web3Forms API
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                // Success!
                formSuccess.style.display = 'flex';
                bookingForm.reset();
                
                // Automatically hide success alert after 6 seconds
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 6000);
            } else {
                // API returned error status
                console.log(response);
                formError.querySelector('p').textContent = json.message || "Failed to submit. Please try again.";
                formError.style.display = 'flex';
            }
        })
        .catch((error) => {
            // Network connection error
            console.log(error);
            formError.style.display = 'flex';
        })
        .finally(() => {
            // Restore button UI state
            btnBookNow.disabled = false;
            btnBookNow.innerHTML = originalBtnText;
        });
    });
});
