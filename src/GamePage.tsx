import { useEffect, useState } from 'react';
import Dictionary from './dictionary';

interface BoardCell {
    x: number,
    y: number,
    wordPosition: number,
    value: string
}

interface ScoredWord {
    word: string,
    score: number
}

const letterFrequencies = {
    a: 8, b: 2, c: 2, d: 4, e: 12, f: 2, g: 3, h: 2, i: 8,
    j: 1, k: 1, l: 4, m: 2, n: 6, o: 8, p: 2, q: 1, r: 6,
    s: 4, t: 6, u: 4, v: 2, w: 2, x: 1, y: 2, z: 1
};

const weightedPool: Array<string> = [];
for (const [letter, count] of Object.entries(letterFrequencies)) {
    for (let i = 0; i < count; i++) {
        weightedPool.push(letter);
    }
}

function initGameBoard() {
    let board = new Array<Array<BoardCell>>(4);
    for (let i = 0; i < 4; i++) {
        board[i] = new Array<BoardCell>(4);
        for (let j = 0; j < 4; j++) {
            board[i][j] = {
                x: i,
                y: j,
                wordPosition: -1,
                value: randomLetter(),
            };
        }    
    }
    return board;
}

function randomLetter(): string {
    return weightedPool[Math.floor(Math.random() * weightedPool.length)];
}


export default function GamePage() {
    const [dictionary, setDictionary] = useState<Dictionary>();
    const [clickedCells, setClickedCells] = useState<Array<BoardCell>>([]);
    const [board, setBoard] = useState(initGameBoard());
    const [validWord, setValidWord] = useState(false);
    const [scoredWords, setScoredWords] = useState<Array<ScoredWord>>([]);

    useEffect(() => {
        setDictionary(new Dictionary());
    },[])

    const isValidWord = (word: string): boolean => {
        return dictionary?.searchKey(word) ? true : false;
    }

    const handleCellClick = (cell: BoardCell) => {
        const lastClickedCell = clickedCells[clickedCells.length -1];
        let newClickedCells = [...clickedCells];

        // only allow "unclick" of the last cell clicked
        const alreadyClicked = clickedCells.some((c) => c.x === cell.x && c.y === cell.y);
        if (alreadyClicked) {
            if (lastClickedCell && lastClickedCell.x === cell.x && lastClickedCell.y === cell.y){
                newClickedCells = clickedCells.filter((c) => c.x !== cell.x || c.y !== cell.y);
            }
        } else if (clickedCells.length < 10) {
            // Check if cell is adjacent to last clicked cell
            const isCellAdjacent = lastClickedCell &&
                Math.abs(cell.x - lastClickedCell.x) <= 1 &&
                Math.abs(cell.y - lastClickedCell.y) <=1;
            if (clickedCells.length === 0 || isCellAdjacent) {
                const clickedCell = {
                    ...cell,
                    wordPosition: clickedCells.length
                }
                newClickedCells = [...clickedCells, clickedCell];
            }
        }

        setClickedCells(newClickedCells);

        const updatedWord = newClickedCells.map((clicked) => clicked.value).join('');
        setValidWord(isValidWord(updatedWord));
    };
    
    const handleSubmit = () => {
        const word = clickedCells.map((cell) => {
            return cell.value;
        }).join('');

        if (isValidWord(word)) {
            setScoredWords([
                ...scoredWords,
                {
                    word: word,
                    score: word.length
                }
            ])
            
            // Update the game board based on the clicked cells
            const newBoard = board.map(row => [...row]); // Create a copy of the board
            clickedCells.forEach(cell => {
                newBoard[cell.x][cell.y].value = ''; // Remove the clicked cell's value
            });

            // Cascade cells down
            for (let col = 0; col < 4; col++) {
                let bottomPointer = 3, topPointer = 3;
                for (; topPointer >= 0 && bottomPointer >= 0; topPointer--) {
                    let bottomPointerCell = newBoard[bottomPointer][col];
                    let topPointerCell = newBoard[topPointer][col];
                    if (bottomPointerCell.value === '' && topPointerCell.value != '') {
                        // Move cell down
                        newBoard[bottomPointer][col] = {
                            ...bottomPointerCell,
                            value: topPointerCell.value
                        };
                        newBoard[topPointer][col] = {
                            ...topPointerCell,
                            value: '',
                        };
                    }
                     // Move pointer to the next empty row
                     while (bottomPointer >= topPointer && newBoard[bottomPointer][col].value !== '') {
                        bottomPointer--;
                    }
                }
            }

            // Replace the empty cells from the top
            for (let row = 0; row < newBoard.length; row++) {
                for (let column = 0; column < newBoard[row].length; column++) {
                    if (newBoard[row][column].value === '') {
                        newBoard[row][column].value = randomLetter();
                    }
                }
            }

            setBoard(newBoard); // Update the board state
            setClickedCells([]);
            setValidWord(false);
        } else {
            console.log(`INVALID word '${word}'!`);
        }
    }

    const calculateScore = ():number => {
        return scoredWords.reduce((accumulator, current) => {
            return accumulator + current.score;
        }, 0);
    }

    return (
        <div className="game-board">
            <div className="score">Score: {calculateScore()}</div>
            {board.map((row, i) => (
                <div key={i} className="board-row">
                    {row.map((cell, j) => { 
                        const clickedCell = clickedCells.find((c) => c.x === i && c.y === j);
                        const backgroundColor = clickedCell 
                            ? `rgb(${173 - (clickedCell.wordPosition * 17)}, ${216 - (clickedCell.wordPosition * 24)}, ${230 + (clickedCell.wordPosition * 25)})`
                            : 'rgb(0, 255, 255)';
                        return (
                            <div 
                                key={`${i},${j}`} 
                                style={{ "--bg-color": backgroundColor } as React.CSSProperties}
                                className={`board-cell ${clickedCell ? "clicked" : ''}`}
                                onClick={() => handleCellClick(cell)}
                            >
                                {cell.value}
                            </div>
                        )
                    })}
                </div>
            ))}
            <div className={`selected-letters ${validWord ? "valid" : "invalid"}`}>
                {clickedCells.map((c, i) => (
                    <div key={i} className="selected-letter">
                        {c.value} 
                    </div>
                ))}
            </div>
            <button onClick={handleSubmit}>submit</button>
            <div className='scored-words'>
                Words:
                {scoredWords.map((scoredWord) => {
                    return (
                        <div className='scored-word'>[{scoredWord.score}] {scoredWord.word}</div>
                    )
                })}
            </div>
        </div>
    );
}