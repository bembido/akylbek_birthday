// Таймер обратного отсчета
function updateCountdown() {
    // Дата праздника: 18 октября 2025, 18:00
    const birthdayDate = new Date(2025, 9, 18, 18, 0, 0); // Месяц: 9 = октябрь (0-indexed)
    const now = new Date();
    const difference = birthdayDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    } else {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
    }
}

// Обновлять таймер каждую секунду
setInterval(updateCountdown, 1000);
updateCountdown(); // Запустить сразу

// Обработка формы RSVP с отправкой в Google Sheets
const scriptURL = 'https://script.google.com/macros/s/AKfycbwNFlSUPVzNliDUkw04axQ8Lxw_mmcrGqTAnrBMdnHZFcA5JpPCtTHDZi1G21_SXnaL/exec';
const form = document.forms['submit-to-google-sheet'];
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', e => {
    e.preventDefault();
    
    // Показать индикатор загрузки
    const submitBtn = form.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;
    
    fetch(scriptURL, { 
        method: 'POST', 
        body: new FormData(form)
    })
    .then(response => {
        console.log('Успешно!', response);
        // Скрыть форму и показать сообщение об успехе
        form.style.display = 'none';
        successMessage.classList.add('show');
        // Анимация конфетти
        createConfetti();
        // Сбросить форму
        form.reset();
    })
    .catch(error => {
        console.error('Ошибка!', error.message);
        alert('Произошла ошибка при отправке. Попробуйте еще раз.');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
});

// Создание конфетти
function createConfetti() {
    const confettiContainer = document.querySelector('.confetti');
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = Math.random();
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear`;
        
        confettiContainer.appendChild(confetti);
        
        // Удалить конфетти после анимации
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// CSS анимация для конфетти (добавляется динамически)
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        to {
            top: 100vh;
            transform: translateX(${Math.random() * 200 - 100}px) rotate(${Math.random() * 720}deg);
        }
    }
`;
document.head.appendChild(style);

// Анимация при прокрутке (плавное появление секций)
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px'
};

const fadeInObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Применить анимацию ко всем секциям
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    fadeInObserver.observe(section);
});

// Музыкальная кнопка и автоплей
const musicButton = document.getElementById('musicButton');
const birthdayMusic = document.getElementById('birthdayMusic');
let isPlaying = false;
let audioAvailable = true;

// Автоматический запуск музыки при загрузке страницы
window.addEventListener('load', function() {
    // Попытка автоматически воспроизвести музыку
    if (!birthdayMusic) return;
    birthdayMusic.volume = 0.3; // Установить громкость на 30%

    // Если файл не загрузился — спрячем кнопку
    birthdayMusic.addEventListener('error', () => {
        audioAvailable = false;
        if (musicButton) musicButton.style.display = 'none';
    }, { once: true });

    const playPromise = birthdayMusic.play();

    if (playPromise !== undefined) {
        playPromise.then(() => {
            // Автовоспроизведение началось
            isPlaying = true;
            if (musicButton) {
                musicButton.classList.add('playing');
                musicButton.textContent = '🎶';
            }
        }).catch((error) => {
            // Автовоспроизведение заблокировано браузером
            // Пользователь должен нажать кнопку
            console.log('Автовоспроизведение заблокировано. Нажмите кнопку для воспроизведения.');
            isPlaying = false;
            if (musicButton) {
                musicButton.classList.remove('playing');
                musicButton.textContent = '🎵';
            }
        });
    }
});

if (musicButton && birthdayMusic) {
    musicButton.addEventListener('click', function() {
        if (!audioAvailable) return;
        if (isPlaying) {
            birthdayMusic.pause();
            musicButton.classList.remove('playing');
            musicButton.textContent = '🎵';
            isPlaying = false;
        } else {
            birthdayMusic.play();
            musicButton.classList.add('playing');
            musicButton.textContent = '🎶';
            isPlaying = true;
        }
    });
}