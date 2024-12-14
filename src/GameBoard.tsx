export interface BoardCell {
    x: number,
    y: number,
    wordPosition: number,
    value: string
}

export function initGameBoard(rows: number, cols: number, valueFn: () => string): BoardCell[][] {
    let board = new Array<Array<BoardCell>>(rows);
    for (let i = 0; i < rows; i++) {
        board[i] = new Array<BoardCell>(cols);
        for (let j = 0; j < cols; j++) {
            board[i][j] = {
                x: i,
                y: j,
                wordPosition: -1,
                value: valueFn(),
            };
        }    
    }
    return board;
}

const getColorFromPosition = (position: number): string => {
    const colors = [
        0,   // Red
        25,  // Safety Orange
        54,  // Golden Yellow
        109, // Harlequin
        176, // Aqua
        225, // Navy Blue
        264, // Electric Indigo
        280, // Electric Purple
        304, // Magenta
        336  // Vivid Pink
    ];

    function hslString(hue: number, saturation: number, lightness: number): string {
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    return colors[position] !== undefined ? 
        hslString(colors[position], 100, 50) :
        // Default to grey if position is out of bounds
        hslString(0, 0, 65);
};

export default function GameBoard({ cols, board, clickedCells, handleCellClick, cellRefs, calculateLetterScore }: 
    { cols: number, board: BoardCell[][], clickedCells: BoardCell[], handleCellClick: (cell: BoardCell) => void, 
        cellRefs: React.MutableRefObject<Array<Array<React.RefObject<HTMLDivElement>>>>, calculateLetterScore: (letter: string) => number}) {

    
    return <div className="game-board"
                style={{"--columns-count": cols} as React.CSSProperties}>
                {board.flatMap((row, i) => 
                    row.map((cell, j) => { 
                        const letter = cell.value;
                        const clickedCell = clickedCells.find((c) => c.x === i && c.y === j);
                        const backgroundColor = clickedCell 
                            ? getColorFromPosition(clickedCell.wordPosition)
                            : 'rgb(255, 255, 255)';
                        return (
                            <div 
                                key={`cell-${cell.x}-${cell.y}`} 
                                style={{ "--bg-color": backgroundColor } as React.CSSProperties}
                                className={`board-cell ${clickedCell ? "clicked" : ''}`}
                                onClick={() => handleCellClick(cell)}
                            >
                                <div ref={cellRefs.current[i][j]} key={`letter-${cell.x}-${cell.y}`} className="letter">{letter}</div>
                                <div key={`letter-score-${cell.x}-${cell.y}`} className="letter-score">{calculateLetterScore(letter) || ""}</div>
                            </div>
                        )
                    })
                )}
            </div>
}