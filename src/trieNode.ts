export default class TrieNode {
    // Pointer to the characters of the English alphabet
    child: Array<TrieNode | null>;
    // Indicates if this is a terminal node for a valid word
    wordEnd: boolean;

    constructor() {
        this.child = new Array<TrieNode | null>(26).fill(null);
        this.wordEnd = false;
    }

    insertKey(key: string) {
        let current: TrieNode = this;
        
        for (let c of key) {
            let index = c.charCodeAt(0) - 'a'.charCodeAt(0);
            if (current.child[index] === null) {
                current.child[index] = new TrieNode();
            }
            current = current.child[index]!;  // Non-null assertion since we know it exists
        }
        current.wordEnd = true;
    }

    searchKey(key: string): boolean {
        let current: TrieNode = this;

        for (let c of key) {
            let index = c.charCodeAt(0) - 'a'.charCodeAt(0);
            if (current.child[index] === null) {
                return false;
            }
            current = current.child[index]!;
        }
        return current.wordEnd;
    }
}