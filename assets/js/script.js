document.addEventListener("DOMContentLoaded", () => {
    // Game state variables
    let gameActive = false;
    let gameSpeed = 'fast'; // 'fast' or 'slow'
    let currentMole = null;
    let currentTimeout = null;
    let gameTimer = null;
    let score = 0;
    let timeLeft = 30;
    
    // Speed settings
    const speeds = {
        fast: { min: 500, max: 1500 },
        slow: { min: 1000, max: 3000 }
    };
    
    // DOM elements
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const slowBtn = document.getElementById('slow-btn');
    const fastBtn = document.getElementById('fast-btn');
    const scoreElement = document.getElementById('score');
    const timerElement = document.getElementById('timer');
    
    // Initialize score and timer
    scoreElement.textContent = '0';
    timerElement.textContent = '30';
    
    // Create mole and angry mole elements
    function createMoleElements() {
        const mole = document.createElement('img');
        mole.setAttribute('src', 'assets/images/Copilot_20250914_120235 (Small).png');
        mole.setAttribute('alt', 'mole');
        mole.setAttribute('id', 'mole');
        
        const angryMole = document.createElement('img');
        angryMole.setAttribute('src', 'assets/images/Copilot_20250914_120212 (Small).png');
        angryMole.setAttribute('alt', 'angry mole');
        angryMole.setAttribute('id', 'angry-mole');
        
        return { mole, angryMole };
    }
    
    // Get random timeout based on current speed
    function getRandomTimeout() {
        const { min, max } = speeds[gameSpeed];
        return min + Math.floor(Math.random() * (max - min));
    }
    
    // Get random cell
    function getRandomCell() {
        const cellId = Math.floor(Math.random() * 9);
        return document.getElementById(cellId.toString());
    }
    
    // Add mole to random cell
    function addMole() {
        if (!gameActive) return;
        
        const { mole, angryMole } = createMoleElements();
        const cell = getRandomCell();
        
        if (cell) {
            currentMole = mole;
            cell.appendChild(mole);
            
            // Add click event listener
            mole.addEventListener('click', () => handleMoleClick(mole, angryMole, cell));
            
            // Set timeout to remove mole
            const timeout = getRandomTimeout();
            currentTimeout = setTimeout(() => {
                removeMole(cell);
                scheduleNextMole();
            }, timeout);
        }
    }
    
    // Handle mole click
    function handleMoleClick(mole, angryMole, cell) {
        if (!gameActive) return;
        
        // Clear the removal timeout
        if (currentTimeout) {
            clearTimeout(currentTimeout);
            currentTimeout = null;
        }
        
        // Replace mole with angry mole
        mole.replaceWith(angryMole);
        
        // Update score
        score++;
        scoreElement.textContent = score.toString();
        
        // Remove angry mole after short delay and schedule next mole
        setTimeout(() => {
            removeMole(cell);
            scheduleNextMole();
        }, 800);
    }
    
    // Timer functions
    function startTimer() {
        timeLeft = 30;
        timerElement.textContent = timeLeft;
        timerElement.className = ''; // Reset timer classes
        
        gameTimer = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;
            
            // Game over when timer reaches 0
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }
    
    function stopTimer() {
        if (gameTimer) {
            clearInterval(gameTimer);
            gameTimer = null;
        }
        timerElement.className = '';
    }
    
    function endGame() {
        gameActive = false;
        stopTimer();
        
        startBtn.disabled = false;
        stopBtn.disabled = true;
        
        // Clear timeouts
        if (currentTimeout) {
            clearTimeout(currentTimeout);
            currentTimeout = null;
        }
        
        // Clear all moles
        clearAllMoles();
        
        // Show final score
        alert(`Game Over! Final Score: ${score}`);
    }

    // Remove mole from cell
    function removeMole(cell) {
        if (cell && cell.firstChild) {
            cell.removeChild(cell.firstChild);
        }
        currentMole = null;
    }
    
    // Schedule next mole appearance
    function scheduleNextMole() {
        if (!gameActive) return;
        
        const delay = getRandomTimeout();
        currentTimeout = setTimeout(addMole, delay);
    }
    
    // Start game
    function startGame() {
        gameActive = true;
        score = 0;
        scoreElement.textContent = '0';
        
        startBtn.disabled = true;
        stopBtn.disabled = false;
        
        // Clear any existing moles
        clearAllMoles();
        
        // Start timer and game loop
        startTimer();
        addMole();
    }
    
    // Stop game
    function stopGame() {
        gameActive = false;
        stopTimer();
        
        startBtn.disabled = false;
        stopBtn.disabled = true;
        
        // Clear timeouts
        if (currentTimeout) {
            clearTimeout(currentTimeout);
            currentTimeout = null;
        }
        
        // Clear all moles
        clearAllMoles();
        
        // Reset timer display
        timeLeft = 30;
        timerElement.textContent = '30';
        timerElement.className = '';
    }
    
    // Clear all moles from board
    function clearAllMoles() {
        for (let i = 0; i < 9; i++) {
            const cell = document.getElementById(i.toString());
            if (cell && cell.firstChild) {
                cell.removeChild(cell.firstChild);
            }
        }
        currentMole = null;
    }
    
    // Set game speed
    function setSpeed(speed) {
        gameSpeed = speed;
        
        // Update button states
        slowBtn.classList.toggle('active', speed === 'slow');
        fastBtn.classList.toggle('active', speed === 'fast');
    }
    
    // Event listeners
    startBtn.addEventListener('click', startGame);
    stopBtn.addEventListener('click', stopGame);
    slowBtn.addEventListener('click', () => setSpeed('slow'));
    fastBtn.addEventListener('click', () => setSpeed('fast'));
    
    // Initialize with fast speed
    setSpeed('fast');
});