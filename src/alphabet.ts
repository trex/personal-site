export default class Alphabet {
    static Languages = Object.freeze({
        ENGLISH: Symbol("english")
    });
    private language: symbol;
    private weightedPool: Array<string>;
    private letterFrequencies: Record<symbol, Record<string, number>> = {
        [Alphabet.Languages.ENGLISH]: { a: 8, b: 2, c: 2, d: 4, e: 12, f: 2, g: 3, h: 2, i: 8,
        j: 1, k: 1, l: 4, m: 2, n: 6, o: 8, p: 2, q: 1, r: 6,
        s: 4, t: 6, u: 4, v: 2, w: 2, x: 1, y: 2, z: 1 }
    };
    
    constructor(language: symbol) {
        this.language = language;
        this.weightedPool = this.setWeightedPool();
    }

    private setWeightedPool = () => {
        let pool = [];
        for (const [letter, count] of Object.entries(this.letterFrequencies[this.language])) {
            for (let i = 0; i < count; i++) {
                pool.push(letter);
            }
        }
        return pool;
    }

    getLetterFrequencies = () => {
        return this.letterFrequencies[this.language];
    }

    getMaxLetterFrequency = (): number => Math.max(...Object.values(this.letterFrequencies[this.language]));

    randomLetter(): string {
        return this.weightedPool[Math.floor(Math.random() * this.weightedPool.length)];
    }
}