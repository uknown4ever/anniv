document.addEventListener('DOMContentLoaded', () => {
    const rose = document.querySelector('.rose');
    const birthdayText = document.querySelector('.birthday-text');
    const letters = document.querySelectorAll('.birthday-text span');
    const birthdaySong = document.getElementById('birthday-song');
    let isAnimating = false;

    rose.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;

        // Play the birthday song
        birthdaySong.currentTime = 0; // Reset the song to start
        birthdaySong.play()
            .catch(error => console.log("Audio playback failed:", error));

        // Rotate and shine effect
        rose.style.transform = `rotateY(${360 * 2}deg)`;
        rose.classList.add('shine');

        // Show birthday text with staggered animation
        birthdayText.style.opacity = '1';
        letters.forEach((letter, index) => {
            setTimeout(() => {
                letter.style.animationPlayState = 'running';
            }, index * 100);
        });

        // Add sparkles
        createSparkles();

        // Reset animations after completion
        setTimeout(() => {
            rose.style.transform = 'rotateY(0)';
            rose.classList.remove('shine');
            letters.forEach(letter => {
                letter.style.animationPlayState = 'paused';
            });
            isAnimating = false;
        }, 4000);
    });

    function createSparkles() {
        for (let i = 0; i < 20; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: white;
                border-radius: 50%;
                pointer-events: none;
                animation: sparkle 1s linear forwards;
                left: ${Math.random() * 200 - 50}px;
                top: ${Math.random() * 200 - 50}px;
            `;
            rose.appendChild(sparkle);

            setTimeout(() => sparkle.remove(), 1000);
        }
    }

    // Add sparkle animation to stylesheet
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkle {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: scale(1) rotate(180deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});