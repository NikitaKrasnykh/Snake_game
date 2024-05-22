import Board from './Board.js';
import Snake from './Snake.js';
import Apple from './Apple.js';
import Score from './Score.js';

class Game {
    constructor(container, currentScoreElement, maxScoreElement, modal, restartButton) {
        this.width = 10;
        this.height = 10;
        this.container = container;
        this.currentScoreElement = currentScoreElement;
        this.maxScoreElement = maxScoreElement;
        this.modal = modal;
        this.restartButton = restartButton;
        this.direction = "right";
        this.board = new Board(this.width, this.height, this.container);
        this.apple = new Apple();
        this.cells = this.board.cells;
        this.snake = new Snake(this.cells, this.direction);
        this.storedScore = localStorage.getItem('max_score') ? localStorage.getItem('max_score') : 0;
        this.score = new Score(this.currentScoreElement, this.maxScoreElement, this.storedScore);
        this.handler = this.startGame.bind(this);
        this.container.addEventListener('click', this.handler);
        document.addEventListener('keydown', this.control.bind(this));
        this.restartButton.addEventListener('click', () => this.restartGame());
    }

    startGame() {
        this.board.drawBoard();
        this.drawSnake();
        this.generateApple();
        this.score.displayScore();
        this.intervalId = setInterval(() => this.update(), 500);
        this.container.removeEventListener('click', this.handler);
    }

    drawSnake() {
        this.snake.segments.forEach(segment => {
            this.cells[segment.y][segment.x].classList.add("snake");
        });
    }

    _drawApple() {
        this.cells[this.apple.position.y][this.apple.position.x].classList.add("apple");
    }

    generateApple() {
        let appleX, appleY;

        do {
            appleX = Math.floor(Math.random() * this.cells.length);
            appleY = Math.floor(Math.random() * this.cells.length);
        }
        while (this.snake.segments.some(segment => segment.x == appleX && segment.y == appleY));

        this.apple.setPosition(appleX, appleY);
        this._drawApple()
    }

    hideApple() {
        this.cells[this.apple.position.y][this.apple.position.x].classList.remove("apple");
    }

    drawSnakeHead() {
        const snakeHead = this.snake.getHeadLocation();
        this.cells[snakeHead.y][snakeHead.x].classList.add("snake");
    }

    hideSnakeTail() {
        const snakeTail = this.snake.getTailLocation();
        this.cells[snakeTail.y][snakeTail.x].classList.remove("snake");
    }

    update() {
        this.snake.direction = this.direction;
        this.snake.move();
        if(this.snake.segments[0].x > this.cells.length - 1 || this.snake.segments[0].x < 0 || this.snake.segments[0].y > this.cells.length - 1 || this.snake.segments[0].y < 0) {
            this.endGame();
            return;
        }

        this.drawSnakeHead();
        let snake = this.snake;
        if(this.snake.segments.some(function (segment, index) {
            if (index === 0) return false;
            return (segment.x === snake.segments[0].x && segment.y === snake.segments[0].y)
        })) {
            this.endGame();
        }


        if(this.snake.segments[0].x === this.apple.position.x && this.snake.segments[0].y === this.apple.position.y) {
            this.hideApple();
            this.score.scoreIncrease();
            this.score.displayScore();
            this.generateApple();
            this._drawApple();
        } else {
            this.hideSnakeTail();
            this.snake.segments.pop();
        }
    }

    control(evt) {
            switch (evt.key) {
                case 'ArrowUp':
                    if (this.direction !== 'down') {
                        this.direction = 'up';
                    }
                    break;
                case 'ArrowDown':
                    if (this.direction !== 'up') {
                        this.direction = 'down';
                    }
                    break;
                case 'ArrowLeft':
                    if (this.direction !== 'right') {
                        this.direction = 'left';
                    }
                    break;
                case 'ArrowRight':
                    if (this.direction !== 'left') {
                        this.direction = 'right';
                    }
                    break;
            }
    }

    endGame() {
        clearInterval(this.intervalId);
        this.modal.classList.add('modal_displayed');

    }

    restartGame(evt) {
        this.modal.classList.remove('modal_displayed');
        clearInterval(this.intervalId);
        this.cells.forEach(row => {
                row.forEach(cell => {
                    cell.classList.remove("snake");
                    cell.classList.remove("apple");
                })
            });
        this.snake.segments = [
            {x: 6, y: 5},
            {x: 5, y: 5},
        ];
        this.drawSnake();
        this.generateApple();
        this.score.resetScore();
        this.direction = "right";
        this.score.displayScore();
        this.intervalId = setInterval(() => this.update(), 500);
    }
}

const modal = document.querySelector('.modal_hidden');
const restartButton = modal.querySelector('.restart');
const container = document.querySelector('.container');
const currentScoreElement = document.querySelector('.current_score');
const maxScoreElement = document.querySelector('.max_score');
new Game(container, currentScoreElement, maxScoreElement, modal, restartButton);