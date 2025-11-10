document.addEventListener('DOMContentLoaded', function() {

    // 1. หา audio element
    const birthdayAudio = document.getElementById('birthday-audio');

    // --- 1. ควบคุมการเลื่อนหน้า (Page Scrolling) ---
    const welcomeBtn = document.getElementById('welcome-btn');
    if (welcomeBtn) {
        welcomeBtn.addEventListener('click', function() {
            if (birthdayAudio && birthdayAudio.paused) {
                birthdayAudio.play().catch(error => {
                    console.log("Audio play failed:", error);
                });
            }
            createConfetti();
            document.getElementById('page-gifts').scrollIntoView({ behavior: 'smooth' });
        });
    }

    const nextButtons = document.querySelectorAll('.btn-next');
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-scroll-to');
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // --- 2. ควบคุม Modal (ของขวัญ & Gallery) ---
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.querySelector('.modal-close');

    if (modalClose) {
        modalClose.onclick = () => { 
            modal.style.display = 'none'; 
            modalBody.innerHTML = ''; 
        };
    }
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none'; 
            modalBody.innerHTML = '';
        }
    };

    // --- 3. Logic หน้า 2 (Gifts) ---
    const giftBoxes = document.querySelectorAll('.gift-box');
    
    giftBoxes.forEach(box => {
        box.addEventListener('click', function() {
            const giftType = this.getAttribute('data-gift');

            // กล่องที่ 1: ข้อความ
            if (giftType === 'text') {
                modalBody.innerHTML = '<h3>สุขสันต์วันเกิดนะคับน้องมุกกก 💖</h3>';
            
            // กล่องที่ 2: วิดีโอส่วนตัว
            } else if (giftType === 'local-video') {
                modalBody.innerHTML = `
                    <h3>วิดีโอพิเศษสำหรับเธอ 🎬</h3>
                    <video 
                        src="/static/videos/my_video.mp4" 
                        controls 
                        autoplay 
                        style="width: 100%; border-radius: 10px; max-height: 70vh;">
                    </video>
                `;
            
            // [แก้ไข] กล่องที่ 3: เปลี่ยนเป็น "ปุ่มลิงก์"
            } else if (giftType === 'youtube-music') {
                modalBody.innerHTML = `
                    <h3>เพลงนี้...ให้เธอนะ 🎵</h3>
                    <p style="margin: 20px 0;">กดที่ปุ่มด้านล่างเพื่อฟังเพลงบน YouTube ได้เลย</p>
                    <a 
                        href="https://www.youtube.com/watch?v=rc7KnQAh_1I" 
                        target="_blank" 
                        class="btn-main" 
                        style="background-color: #c4302b; border-color: #c4302b; color: white;">
                        🎵 เปิด YouTube 🎵
                    </a>
                `;
            }
            
            modal.style.display = 'flex';
        });
    });


    // --- 4. Logic หน้า 3 (Gallery) ---
    const galleryImagesElements = document.querySelectorAll('.gallery-grid img');
    galleryImagesElements.forEach(img => {
        img.addEventListener('click', function() {
            const imgSrc = this.getAttribute('src');
            const imgAlt = this.getAttribute('alt');
            
            modalBody.innerHTML = `
                <img src="${imgSrc}" alt="${imgAlt}">
                <p style="margin-top: 10px;">${imgAlt}</p>
            `;
            
            modal.style.display = 'flex';
        });
    });

    // --- 5. Logic หน้า 4 (Final Message) ---
    const finalBtn = document.getElementById('final-btn');
    if (finalBtn) {
        finalBtn.addEventListener('click', function() {
            createHeartBurst();
            const secretMessage = document.getElementById('secret-message');
            secretMessage.style.display = 'block';
            this.style.display = 'none';
        });
    }

    // --- 6. เอฟเฟกต์ (Effect Functions) ---
    const effectsContainer = document.getElementById('effects-container');

    function createConfetti() {
        for (let i = 0; i < 100; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.animationDelay = `${Math.random() * 0.5}s`;
            
            const colors = ['#fec5bb', '#fcd5ce', '#fae1dd', '#e8dff5', '#d8cbed'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.width = `${Math.random() * 10 + 5}px`;
            particle.style.height = particle.style.width;
            
            effectsContainer.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 5000);
        }
    }

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
            }, 4000);
        }
    }
});