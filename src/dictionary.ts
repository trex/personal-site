import TrieNode from "./trieNode";

// Regular expression to match only English alphabet letters (a-z, A-Z)
const englishAlphabetRegex = /^[a-zA-Z]+$/;

// Function to filter words
function filterNonEnglishWords(words: Array<string>) {
    return words.filter(word => englishAlphabetRegex.test(word));
}

export default class Dictionary extends TrieNode {
    constructor() {
        super();
        this.initialize();
    }

    private async initialize() {
        await this.loadData();
    }

    async readFile(filePath: string) {
        try {
          const response = await fetch(filePath);
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const text = await response.text();
          return text;
        } catch (error) {
          console.error("[Dictionary] Could not read file:", error);
          return null;
        }
    }
      
    // Example usage:
    async loadData() {
        const UTF_16_A = 65;
        for (let i = 0; i < 26; i++) {
            const char = String.fromCharCode(i + UTF_16_A);
            const data = await this.readFile(`/data/EOWL\ CSV\ Format/${char}\ Words.csv`);
            if (data) {
                for (let word of filterNonEnglishWords(data.split("\n"))) {
                    try {
                        this.insertKey(word.toLowerCase());
                    } catch (error) {
                        console.error("[Dictionary] Could not insert word:", word);
                    }
                }
            }
        }
    }
}