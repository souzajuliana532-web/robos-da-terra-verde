// ===== AUDIO SYNTHESIS =====
// Function to create sine wave beeps
function createBeepSound(frequency = 440, duration = 100, type = 'sine') {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = type;

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (e) {
        console.log('Audio context not available');
    }
}

// ===== SOUND EFFECTS =====
const soundEffects = {
    bip: () => createBeepSound(800, 150),
    blip: () => createBeepSound(600, 100),
    vrum: () => createBeepSound(150, 300, 'triangle'),
    ploc: () => createBeepSound(1200, 80),
    ziip: () => createBeepSound(2000, 200),
    fof: () => createBeepSound(400, 120),
    zuuum: () => createBeepSound(100, 400, 'sawtooth'),
    clique: () => createBeepSound(1500, 100),
    chua: () => createBeepSound(200, 250),
    pim: () => createBeepSound(900, 80),
    pou: () => createBeepSound(500, 150)
};

// ===== SCENE MANAGEMENT =====
class SceneManager {
    constructor() {
        this.currentScene = 0;
        this.scenes = document.querySelectorAll('.scene');
        this.navButtons = document.querySelectorAll('.nav-btn');
        this.playButtons = document.querySelectorAll('.play-btn');

        this.initEventListeners();
    }

    initEventListeners() {
        // Navigation buttons
        this.navButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => this.switchScene(index));
        });

        // Play buttons
        this.playButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => this.playScene(index));
        });
    }

    switchScene(index) {
        // Remove active class from current scene and button
        this.scenes[this.currentScene].classList.remove('active');
        this.navButtons[this.currentScene].classList.remove('active');

        // Add active class to new scene and button
        this.currentScene = index;
        this.scenes[this.currentScene].classList.add('active');
        this.navButtons[this.currentScene].classList.add('active');
    }

    playScene(sceneIndex) {
        const scenes = [
            this.playScene0,
            this.playScene1,
            this.playScene2,
            this.playScene3,
            this.playScene4
        ];

        if (scenes[sceneIndex]) {
            scenes[sceneIndex].call(this);
        }
    }

    // Scene 1: O Começo do Dia
    playScene0() {
        this.switchScene(0);
        setTimeout(() => soundEffects.bip(), 300);
        setTimeout(() => soundEffects.blip(), 600);
    }

    // Scene 2: Robô Tico
    playScene1() {
        this.switchScene(1);
        setTimeout(() => soundEffects.vrum(), 300);
        setTimeout(() => soundEffects.vrum(), 800);
        setTimeout(() => soundEffects.ploc(), 1500);
    }

    // Scene 3: Colheita de Maçãs
    playScene2() {
        this.switchScene(2);
        setTimeout(() => soundEffects.ziip(), 300);
        setTimeout(() => soundEffects.fof(), 1200);
    }

    // Scene 4: Drone Zeca
    playScene3() {
        this.switchScene(3);
        setTimeout(() => soundEffects.zuuum(), 300);
        setTimeout(() => soundEffects.zuuum(), 600);
        setTimeout(() => soundEffects.clique(), 1200);
    }

    // Scene 5: Missão Cumprida
    playScene4() {
        this.switchScene(4);
        setTimeout(() => soundEffects.chua(), 300);
        setTimeout(() => soundEffects.chua(), 600);
        setTimeout(() => soundEffects.pim(), 1200);
        setTimeout(() => soundEffects.pou(), 1500);
    }
}

// ===== INITIALIZE =====
let sceneManager;

document.addEventListener('DOMContentLoaded', () => {
    sceneManager = new SceneManager();
    
    // Play first scene on load
    setTimeout(() => {
        sceneManager.playScene0();
    }, 500);
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!sceneManager) return;
    
    if (e.key === 'ArrowRight') {
        const nextScene = (sceneManager.currentScene + 1) % sceneManager.scenes.length;
        sceneManager.switchScene(nextScene);
    } else if (e.key === 'ArrowLeft') {
        const prevScene = (sceneManager.currentScene - 1 + sceneManager.scenes.length) % sceneManager.scenes.length;
        sceneManager.switchScene(prevScene);
    }
});