let currentPage = 1;
let blownCandles = 0;
let currentSurpriseIndex = 0;
let isPlaying = false;

const surprises = [
  "🌟 Kamu itu bener-bener luar biasa, jangan pernah ragukan dirimu sendiri",
  "💫 Semua yang udah kamu capai itu bukti kerja keras dan keteguhanmu, teruslah melangkah",
  "🌈 Kehadiranmu bikin dunia sekitar jadi lebih indah dan penuh warna",
  "⭐ Kamu punya kekuatan besar buat mewujudkan semua mimpi, percayalah sama dirimu",
  "🦋 Setiap langkah kecilmu adalah awal dari masa depan yang semakin cerah",
  "🌻 Sikap positifmu selalu jadi energi baik buat orang lain, terus tebarkan semangat itu",
  "🎨 Hidupmu tuh ibarat karya seni penuh cerita indah yang terus berkembang",
  "💎 Kamu itu berharga banget buat orang-orang disekitarmu, jangan lupa kalau kamu juga kuat dan pasti bisa melewati beban seberat apapun"
];

const photoCaptions = [
    "Putri Duyung nyasar ini mah 🧜‍♀ ",
    "Good smile with jempol andalan 👍",
    "Calon2 BA G2G kayaknya ini 😍",
    "Orang masuk angin ini mah 🤧",
];

// Initialize music
const music = document.getElementById('bgMusic');
music.volume = 0.3;

function toggleMusic() {
    const btn = document.getElementById('musicBtn');
    if (isPlaying) {
        music.pause();
        btn.textContent = '🔇';
        isPlaying = false;
    } else {
        music.play().catch(e => console.log('Audio play failed:', e));
        btn.textContent = '🎵';
        isPlaying = true;
    }
}

function goToPage(pageNum) {
    // Hide current page
    document.getElementById(`page${currentPage}`).classList.remove('active');

    // Show new page
    document.getElementById(`page${pageNum}`).classList.add('active');

    // Update navigation
    document.querySelectorAll('.nav-btn').forEach((btn, index) => {
        btn.classList.toggle('active', index + 1 === pageNum);
    });

    currentPage = pageNum;

    // Add some floating hearts for page transitions
    if (pageNum > 1) {
        createFloatingHearts();
    }

    // Auto-start music on first interaction
    if (!isPlaying && pageNum === 2) {
        toggleMusic();
    }
}

function blowCandle(candle) {
    candle.classList.add('blown');
    candle.textContent = '💨';
    blownCandles++;

    if (blownCandles === 5) {
        document.getElementById('cake-message').innerHTML =
            '🎉 Yeee, Semua lilin sudah ditiup!<br>Semoga semua harapanmu terkabul 🌟';
        setTimeout(() => {
            createConfetti();
        }, 500);
    }
}

function showPhoto(frame) {
    const index = Array.from(frame.parentNode.children).indexOf(frame);
    frame.style.transform = 'scale(1.2) rotate(10deg)';
    document.getElementById('photo-caption').textContent = photoCaptions[index];

    setTimeout(() => {
        frame.style.transform = '';
    }, 1000);
}

function getSurprise() {
    const surpriseText = document.getElementById('surprise-text');
    surpriseText.textContent = surprises[currentSurpriseIndex];
    currentSurpriseIndex = (currentSurpriseIndex + 1) % surprises.length;
    createFloatingHearts();
}

function resetSurprise() {
    document.getElementById('surprise-text').textContent = '';
    currentSurpriseIndex = 0;
}

function createFloatingHearts() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-hearts';
            heart.textContent = ['💕', '💖', '⭐', '✨', '🌟'][Math.floor(Math.random() * 5)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDelay = Math.random() * 2 + 's';
            document.body.appendChild(heart);

            setTimeout(() => heart.remove(), 5000);
        }, i * 200);
    }
}

function createConfetti() {
    const colors = ['#ff6b9d', '#ff8fb3', '#db2777', '#ec4899', '#f472b6'];

    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '0';
        confetti.style.borderRadius = '50%';
        confetti.style.animation = `confetti-fall ${Math.random() * 2 + 3}s linear forwards`;
        confetti.style.zIndex = '50';
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 5000);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Start with floating hearts
    createFloatingHearts();
    setInterval(createFloatingHearts, 8000);
});