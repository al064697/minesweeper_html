//Obteniendo elementos del DOM de los distintos id
const gameboard = document.getElementById('gameboard'); 
const scoreDisplay = document.getElementById('score');
const gameStatusDisplay = document.getElementById('gameStatus'); 
const difficultyLevelDisplay = document.getElementById('difficultyLevel'); 
const newGameBtn = document.getElementById('newGameBtn'); 
const increaseDifficultyBtn = document.getElementById('increaseDifficultyBtn'); 
const decreaseDifficultyBtn = document.getElementById('decreaseDifficultyBtn'); 

let score = 0; 
let difficulty = 3; 
let mines = Math.floor(difficulty * difficulty / 5); // Calcula el número de minas en función del tamaño del tablero
let gameStarted = false; 

function generateGameBoard() {
    gameStarted = true; 
    gameStatusDisplay.textContent = 'Game in progress';
    gameboard.innerHTML = ''; // Limpia el contenido del tablero antes de generar uno nuevo

    // Crea las celdas del tablero
    for (let i = 0; i < difficulty; i++) {  
        for (let j = 0; j < difficulty; j++) {
            const cell = document.createElement('div');  // Crea una nueva celda
            cell.classList.add('cell'); // Agrega la clase 'cell' a la celda

            // Asigna atributos de datos para la fila y la columna de la celda
            cell.dataset.row = i;
            cell.dataset.col = j;

            cell.addEventListener('click', cellClick);  // Agrega un evento de clic a la celda
            gameboard.appendChild(cell);  // Agrega la celda al tablero
        }
        gameboard.appendChild(document.createElement('br'));  // Agrega un salto de línea después de cada fila del tablero

    }
    updateDifficultyLevel(); 
}

// Función que maneja el evento de clic en una celda del tablero
function cellClick(event) {
    if (!gameStarted) return;
    const cell = event.target; // Obtiene la celda clicada
    const isMine = Math.random() < (mines / (difficulty * difficulty)); // Determina aleatoriamente si hay una mina en la celda
    if (isMine) {
        cell.textContent = '💣'; 
        cell.style.backgroundColor = '#ff4d4d';  // Cambia el color de fondo de la celda a rojo
        gameOver();
    } else {
        cell.textContent = '✅'; 
        cell.style.backgroundColor = '#7fff7f'; // Cambia el color de fondo de la celda a verde
        score++; 
        scoreDisplay.textContent = score; 
        cell.removeEventListener('click', cellClick); // Elimina el evento de clic de la celda para evitar más clics en ella
        
        // Si se han descubierto todas las celdas sin minas, el jugador gana el juego
        if (score === (difficulty * difficulty - mines)) gameWon();
        
    }
}

function gameOver() {
    gameStarted = false;
    gameStatusDisplay.textContent = 'You loose!'; 
    resetGame(); 
}

function gameWon() {
    gameStarted = false;
    gameStatusDisplay.textContent = 'You win!';
    resetGame();
}

function resetGame() {
    score = 0;
    scoreDisplay.textContent = score;
}

function updateDifficultyLevel() {
    const level = getDifficultyLevel();
    difficultyLevelDisplay.textContent = `Difficulty: ${level} (${difficulty}x${difficulty})`;
}

function getDifficultyLevel() {
    if (difficulty < 6) return "Easy";
    else if (difficulty < 12) return "Moderate";
    else return "Difficult";
}

function hideButton(button) {
    button.style.display = 'none';
}

function showButton(button) {
  /* 
  Esta línea de código establece el estilo de visualización del botón en 'inline-block'.

  Esto significa que el botón se mostrará en línea con otros elementos, pero también tendrá propiedades de bloque, 
  lo que significa que puede establecer su ancho y alto. Si el botón estaba oculto previamente (mostrar: 'ninguno'), 
  Esto hará que el botón vuelva a ser visible.
  */
    button.style.display = 'inline-block'; 
}

newGameBtn.addEventListener('click', generateGameBoard); // Agrega un evento de clic al botón 'Nuevo Juego' para generar un nuevo tablero

// Agrega un evento de clic al botón 'Aumentar Dificultad' para aumentar el nivel de dificultad del juego
increaseDifficultyBtn.addEventListener('click', () => {
    difficulty++;
    mines = Math.floor(difficulty * difficulty / 5); // Recalcula el número de minas en función del nuevo tamaño del tablero
    generateGameBoard();
    if (difficulty === 11) hideButton(increaseDifficultyBtn);
    if (difficulty > 3) showButton(decreaseDifficultyBtn);
});

// Agrega un evento de clic al botón 'Disminuir Dificultad' para disminuir el nivel de dificultad del juego
decreaseDifficultyBtn.addEventListener('click', () => {
    difficulty--;
    mines = Math.floor(difficulty * difficulty / 5); // Recalcula el número de minas en función del nuevo tamaño del tablero
    generateGameBoard();
    if (difficulty === 3) hideButton(decreaseDifficultyBtn);
    if (difficulty < 11) showButton(increaseDifficultyBtn);
});

// Genera un tablero de juego inicial al cargar la página
generateGameBoard();