import { createRef, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Dictionary from './dictionary';
import ContactForm from './ContactForm';

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

const letterFrequencies: Record<string, number> = {
    a: 8, b: 2, c: 2, d: 4, e: 12, f: 2, g: 3, h: 2, i: 8,
    j: 1, k: 1, l: 4, m: 2, n: 6, o: 8, p: 2, q: 1, r: 6,
    s: 4, t: 6, u: 4, v: 2, w: 2, x: 1, y: 2, z: 1
};

const MAX_LETTER_FREQUENCY: number = Math.max(...Object.values(letterFrequencies));

const weightedPool: Array<string> = [];
for (const [letter, count] of Object.entries(letterFrequencies)) {
    for (let i = 0; i < count; i++) {
        weightedPool.push(letter);
    }
}

const calculateLetterScore = (letter: string): number => {
    return Math.floor(MAX_LETTER_FREQUENCY / letterFrequencies[letter]);
}

const calculateWordScore = (word: string): number => {
    let score = 0;
    for (let letter of word) {
        score += calculateLetterScore(letter);
    }
    return score;
}

function initGameBoard(rows: number, cols: number) {
    let board = new Array<Array<BoardCell>>(4);
    for (let i = 0; i < rows; i++) {
        board[i] = new Array<BoardCell>(cols);
        for (let j = 0; j < cols; j++) {
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

export default function GamePage({ rows, cols }: { rows: number, cols: number }) {
    const [dictionary, setDictionary] = useState<Dictionary>();
    const [clickedCells, setClickedCells] = useState<Array<BoardCell>>([]);
    const [board, setBoard] = useState(initGameBoard(rows, cols));
    const [validWord, setValidWord] = useState(false);
    const [scoredWords, setScoredWords] = useState<Array<ScoredWord>>([]);
    const cellRefs = useRef<Array<Array<React.RefObject<HTMLDivElement>>>>(
        Array.from({ length: rows }, () =>
            Array(cols).fill(null).map(() => createRef<HTMLDivElement>())
        )
    );
    
    useEffect(() => {
        setDictionary(new Dictionary());
    },[])

    useLayoutEffect(() => {
        // Reset the transform style for all cells to prevent bounce effect
        for (let row = 0; row < board.length; row++) {
            for (let column = 0; column < board[row].length; column++) {
                const ref = cellRefs.current[row][column];
                if (ref.current) {
                    ref.current.style.transform = "initial"; // Reset transform
                }
            }
        }
    },[board])

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
        // Clear selected letters if not a valid word
        if (!validWord) {
            setClickedCells([]);
            return;
        }

        const word = clickedCells.map((cell) => {
            return cell.value;
        }).join('');

        if (isValidWord(word)) {
            setScoredWords([
                ...scoredWords,
                {
                    word: word,
                    score: calculateWordScore(word)
                }
            ])
            
            // Update the game board based on the clicked cells
            const newBoard = board.map(row => [...row]); // Create a copy of the board
            clickedCells.forEach(cell => {
                newBoard[cell.x][cell.y].value = ''; // Remove the clicked cell's value
            });

            const fallingAnimations: Array<Promise<void>> = [];
            // Cascade cells down
            for (let col = 0; col < cols; col++) {
                let bottomPointer = rows - 1, topPointer = rows - 1;
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

                        // Animate the shift
                        const ref = cellRefs.current[topPointer][col];
                        const targetRef = cellRefs.current[bottomPointer][col];
                        if (ref.current && targetRef.current) {
                            const { y: refY } = ref.current.getBoundingClientRect();
                            const { y: targetY } = targetRef.current.getBoundingClientRect();
                            ref.current.style.transform = `translateY(${targetY - refY}px)`;
                
                            // Ensure the transition is applied before adding the event listener
                            ref.current!.style.transition = "transform 1.0s"; // Add transition style
                            fallingAnimations.push(
                                new Promise(resolve => {
                                    const handleTransitionEnd = () => {
                                        targetRef.current!.textContent = topPointerCell.value;
                                        ref.current!.removeEventListener("transitionend", handleTransitionEnd); // Clean up listener
                                        resolve();
                                    };
                                    ref.current!.addEventListener("transitionend", handleTransitionEnd);
                                })
                            );
                        }
                    }
                     // Move pointer to the next empty row
                     while (bottomPointer >= topPointer && newBoard[bottomPointer][col].value !== '') {
                        bottomPointer--;
                    }
                }
            }

            // Wait for all animations to complete, then update state
            Promise.all(fallingAnimations).then(() => {
                // Replace the empty cells from the top
                for (let row = 0; row < newBoard.length; row++) {
                    for (let column = 0; column < newBoard[row].length; column++) {
                        if (newBoard[row][column].value === '') {
                            newBoard[row][column].value = randomLetter();
                        }
                    }
                }

                setClickedCells([]);
                setValidWord(false);
                setBoard(newBoard);
            }).catch((error) => {
                console.error("Error in falling animations:", error);
            });
           
        } else {
            console.log(`INVALID word '${word}'!`);
        }
    }

    const calculateGameScore = ():number => {
        return scoredWords.reduce((accumulator, current) => {
            return accumulator + current.score;
        }, 0);
    }

    return (
        <>
            <div className="game-page">
                <div className={`selected-letters ${validWord ? "valid" : "invalid"}`}>
                    {clickedCells.map((c, i) => (
                        <div key={i} className="selected-letter">
                            {c.value} 
                        </div>
                    ))}
                    <p>[{calculateWordScore(clickedCells.map((c) => c.value).join(''))}]</p>
                    <button className={`submit ${validWord ? "valid" : "invalid"}`} onClick={handleSubmit}>{validWord ? "✅" : "❌"}</button>
                </div>
                <div className="game-board">
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
                <div className='score-board'>
                    <h3>Score: [{calculateGameScore()}]</h3>
                    <hr></hr>
                    {scoredWords.slice().reverse().map((scoredWord, i) => {
                        return (
                            <div key={`scored-word-${i}`} className='scored-word'>[{scoredWord.score}] {scoredWord.word}</div>
                        )
                    })}
                </div>
                <div className='game-info message'>
                    {
                        `This game is in active development and is being updated frequently (as of December 13, 2024). If you want to see the source code and/or submit any issues you can find it on my GitHub page, linked below.  If you have any thoughts and honest critical feedback about the game, please drop me a message below!
                        Thanks for playing,
                        
                        -🫶🏻T`
                    }
                </div>
            </div>
            
            <ContactForm> 
                <div>
                    Please leave me some feedback for the any thoughts you have about this game.  Thanks for playing!
                </div>
            </ContactForm>
        </>
    );
}