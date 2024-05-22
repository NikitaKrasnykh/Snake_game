class Board {
    constructor(height, width, boardContainer) {
        this.height = height;
        this.width = width;
        this.container = boardContainer;
        this.cells = [];
    }

    drawBoard() {
        for(let i = 0; i < this.width; i++) {
            this.cells[i] = [];
            for(let j = 0; j < this.height; j++) {
                const cell = document.createElement("div");
                cell.classList.add('cell');
                cell.dataset.x = i;
                cell.dataset.y = j;
                this.container.appendChild(cell);
                this.cells[i][j] = cell;
            }
        }
    }
}

export default Board;