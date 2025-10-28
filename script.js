document.addEventListener('DOMContentLoaded', () => {
    // 1. Ambil Elemen Utama
    const track = document.querySelector('.kotakTerbaru');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-button');
    const prevButton = document.querySelector('.prev-button');
    const dotsNav = document.querySelector('.dots-nav');

    // Konstanta untuk mengukur lebar gap (1em)
    const GAP_SIZE = 16; 
    
    // Dapatkan lebar satu slide
    const slideWidth = slides[0].getBoundingClientRect().width;

    // --- Fungsi untuk membuat dan menambahkan dots ---
    const createDots = (slides, dotsNav) => {
        const dots = slides.map((slide, index) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.setAttribute('data-index', index);
            if (index === 0) {
                dot.classList.add('active-dot');
                slide.classList.add('current-slide'); // Set slide pertama sebagai default
            }
            
            // Event Listener untuk Dots
            dot.addEventListener('click', (e) => {
                const targetIndex = parseInt(e.target.dataset.index);
                const targetSlide = slides[targetIndex];
                const currentSlide = track.querySelector('.current-slide');
                moveToSlide(track, currentSlide, targetSlide);
                hideShowArrows(targetIndex);
            });
            
            dotsNav.appendChild(dot);
            return dot;
        });
        return dots;
    };
    
    const dots = createDots(slides, dotsNav); // Panggil fungsi di awal

    // --- Inisialisasi posisi setiap slide (PENTING) ---
    slides.forEach((slide, index) => {
        // Posisi = (Lebar Slide + Ukuran Gap) * Indeks
        // Ini memperbaiki masalah pergeseran yang tidak akurat
        slide.style.left = (slideWidth + GAP_SIZE) * index + 'px';
    });

    // --- Fungsi Inti untuk memindahkan track ---
    const moveToSlide = (track, currentSlide, targetSlide) => {
        const currentDot = dotsNav.querySelector('.active-dot');
        const targetDot = dotsNav.querySelector(`[data-index="${slides.indexOf(targetSlide)}"]`);
        
        // Ambil nilai 'left' yang sudah diinisialisasi
        const amountToMove = targetSlide.style.left.replace('px', '');
        
        // Lakukan pergeseran menggunakan Transform
        track.style.transform = 'translateX(-' + amountToMove + 'px)';
        
        // Update Kelas Slide & Dot
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
        currentDot.classList.remove('active-dot');
        targetDot.classList.add('active-dot');
    };
    
    // --- Fungsi Sembunyikan/Tampilkan Tombol ---
    const hideShowArrows = (targetIndex) => {
        // Menggunakan index yang diteruskan dari moveToSlide
        const currentIndex = targetIndex; 
        
        // Sembunyikan tombol Previous
        prevButton.disabled = currentIndex === 0;
        
        // Sembunyikan tombol Next
        nextButton.disabled = currentIndex === slides.length - 1;
    };

    // --- Logika Tombol Navigasi ---
    nextButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;
        const targetIndex = slides.indexOf(nextSlide);
        
        if (nextSlide) {
            moveToSlide(track, currentSlide, nextSlide);
            hideShowArrows(targetIndex);
        }
    });

    prevButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling;
        const targetIndex = slides.indexOf(prevSlide);

        if (prevSlide) {
            moveToSlide(track, currentSlide, prevSlide);
            hideShowArrows(targetIndex);
        }
    });
    
    // Tampilkan tombol setelah inisialisasi selesai
    hideShowArrows(0); 
});