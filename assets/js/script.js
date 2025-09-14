// The entire game logic is wrapped in a DOMContentLoaded event listener to ensure the DOM is fully loaded before executing the script.

document.addEventListener("DOMContentLoaded", (event) => {
    // Create mole element
    const mole = document.createElement('img');
    mole.setAttribute('src', 'assets/images/Copilot_20250914_120235 (Small).png');
    mole.setAttribute('alt', 'mole');
    mole.setAttribute('id', 'mole');

    const angryMole = document.createElement('img');
    angryMole.setAttribute('src', 'assets/images/Copilot_20250914_120212 (Small).png');
    angryMole.setAttribute('alt', 'angry mole');
    angryMole.setAttribute('id', 'angry-mole');

    // Global variables
    let timeout;
    let randCell;
    let cell;

    // Pick a cell at random and add mole to it 
    function addMole() {
        randCell = Math.floor(Math.random() * 9); 
        cell = document.getElementById(randCell); 
        if (cell) {
            cell.appendChild(mole);
            timeout = 800 + Math.floor(Math.random() * 2201);
            setTimeout(removeMole, timeout);
        }
    }

    //remove mole function
    function removeMole() {
        // Check for both regular mole and angry mole
        const currentMole = document.querySelector('#mole, #angry-mole');
        if (currentMole && currentMole.parentNode) {
            currentMole.parentNode.removeChild(currentMole);
        }
        
        // Start new mole cycle
        timeout = 800 + Math.floor(Math.random() * 2201);
        setTimeout(addMole, timeout);
    }

    // Add event listener to the mole to replace image on click
    mole.addEventListener('click', function whackMole() {
        
        // Replace mole image with angry mole image
        mole.replaceWith(angryMole);
        
        // Update score
        const scoreElement = document.getElementById('score');
        if (scoreElement) {
            const currentScore = parseInt(scoreElement.textContent.split(': ')[1]) || 0;
            scoreElement.textContent = 'Score: ' + (currentScore + 1);
        }
        
        // Clear existing timeout and set new one for removal
        clearTimeout(timeout);
        timeout = 800 + Math.floor(Math.random() * 2201);
        setTimeout(removeMole, timeout);
    });

    // Start the game
    timeout = 800 + Math.floor(Math.random() * 2201);
    setTimeout(addMole, timeout);
});

