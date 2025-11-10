document.addEventListener('DOMContentLoaded', function() {

    // --- 1. ควบคุมการเลื่อนหน้า (Page Scrolling) ---
    
    // ปุ่มหน้า 1 -> หน้า 2
    const welcomeBtn = document.getElementById('welcome-btn');
    if (welcomeBtn) {
        welcomeBtn.addEventListener('click', function() {
            // 1. สร้าง Confetti
            createConfetti();
            
            // 2. เลื่อนไปหน้า Gifts
            document.getElementById('page-gifts').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // ปุ่ม "ถัดไป" ทั้งหมด (ที่ไปหน้า 3 และ 4)
    const nextButtons = document.querySelectorAll('.btn-next');
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-scroll-to');
            document.getElementById(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- 2. ควบคุม Modal (ของขวัญ & Gallery) ---
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.querySelector('.modal-close');

    // ปิด Modal
    if (modalClose) {
        modalClose.onclick = () => { modal.style.display = 'none'; };
    }
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    // --- 3. Logic หน้า 2 (Gifts) ---
    const giftBoxes = document.querySelectorAll('.gift-box');
    giftBoxes.forEach(box => {
        box.addEventListener('click', function() {
            const giftType = this.getAttribute('data-gift');
            
            // เล่นเสียง "ติ๊ง" (ถ้ามี)
            // new Audio('path/to/ting_sound.mp3').play();

            // กำหนดเนื้อหาใน Modal
            if (giftType === 'text') {
                modalBody.innerHTML = '<h3>รักเธอนะที่หนึ่งเลย 💗</h3>';
            } else if (giftType === 'image') {
                modalBody.innerHTML = `
                    <h3>รูปคู่ของเรา!</h3>
                    <img src="${window.location.origin}/static/images/couple_pic.jpg" alt="รูปคู่">
                `;
            } else if (giftType === 'video') {
                modalBody.innerHTML = `
                    <h3>เพลงนี้ให้เธอ</h3>
                    <iframe 
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                        title="YouTube video player" 
                        allow="autoplay; encrypted-media; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                `;
            }
            
            modal.style.display = 'block';
        });
    });

    // --- 4. Logic หน้า 3 (Gallery) ---
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            const imgSrc = this.getAttribute('src');
            const imgAlt = this.getAttribute('alt'); // ข้อความใต้ภาพ
            
            modalBody.innerHTML = `
                <img src="${imgSrc}" alt="${imgAlt}">
                <p style="margin-top: 10px;">${imgAlt}</p>
            `;
            modal.style.display = 'block';
        });
    });

    // --- 5. Logic หน้า 4 (Final Message) ---
    const finalBtn = document.getElementById('final-btn');
    if (finalBtn) {
        finalBtn.addEventListener('click', function() {
            // 1. สร้างหัวใจลอย
            createHeartBurst();
            
            // 2. แสดงข้อความลับ
            const secretMessage = document.getElementById('secret-message');
            secretMessage.style.display = 'block';
            
            // 3. ซ่อนปุ่ม (กันกดซ้ำ)
            this.style.display = 'none';
        });
    }

    // --- 6. เอฟเฟกต์ (Effect Functions) ---
    const effectsContainer = document.getElementById('effects-container');

    // Confetti จากหน้า 1
    function createConfetti() {
        for (let i = 0; i < 100; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.animationDelay = `${Math.random() * 0.5}s`;
            
            // สีพาสเทล
            const colors = ['#fec5bb', '#fcd5ce', '#fae1dd', '#e8dff5', '#d8cbed'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.width = `${Math.random() * 10 + 5}px`;
            particle.style.height = particle.style.width;
            
            effectsContainer.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 5000); // ลบออกเมื่อ animation จบ
        }
    }

    // Heart Burst จากหน้า 4
    function createHeartBurst() {
        for (let i = 0; i < 50; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = '💖';
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.animationDelay = `${Math.random() * 2}s`;
            heart.style.fontSize = `${Math.random() * 20 + 10}px`;
            
            effectsContainer.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 4000); // ลบออกเมื่อ animation จบ
        }
    }
});