const Rank = require('./rank');

const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const suits = ['♠️', '♣️', '♥️', '♦️'];
const rank = new Rank();
class Deck {
  constructor() {
    this.cards = [];
    this.board = [];
    for (const suit of suits) {
      for (const r of ranks) {
        this.cards.push(`${r}${suit}`);
      }
    }
  }

  shuffle() {
    // Fisher-Yates shuffle
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  draw(numCards){
    return this.cards.splice(0, numCards);
  }

  //draw x cards from the deck and add to the board
  street(numCards){
    this.board = this.board.concat(this.draw(numCards));
  }

  deal(numCards, numPlayers) {
    const hands = [];
    for (let i = 0; i < numPlayers; i++) {
      let hand = [];
      for (let i = 0; i < numCards; i++) {
        const card = this.cards.pop();
        hand.push(card);
      }
      hands.push(hand);
    }
    
    return hands;
  }

    //
  possibleHands(playerHand, board, cards) {
      
      const combined = this.combine(playerHand, board);
      // console.log({combined})
      const combos = this.pickCombinations(combined,cards);
      for(let combo of combos){
        console.log(combo, rank.isFlush(combo));
      }
      return combos;
  }

  isFlush(hand){
    const rank = [];
    const suits = []
    for(let card of hand){
      // console.log({card})
      let parts = card.split('')
      suits.push(parts[parts.length-2]);
    }
    // console.log({suits});
    var unique = suits.filter(this.onlyUnique);
    // console.log({unique});
    return (unique.length === 1);
  }


  combine(arr1, arr2) {
    const result = arr1.concat(arr2);
    return result;
  }

  pickCombinations(array, x) {
    if (x === 1) {
      // If x is 1, return an array of arrays with each element as a single-element array
      return array.map(element => [element]);
    } else {
      // Initialize an empty array to store the combinations
      const combinations = [];
      // Loop through the array and pick the combinations
      for (let i = 0; i < array.length; i++) {
        // Recursively call the function with the remaining elements of the array
        const remainingElements = array.slice(i + 1);
        const subCombinations = this.pickCombinations(remainingElements, x - 1);
        // Add the current element to each subcombination
        for (const subCombination of subCombinations) {
          combinations.push([array[i], ...subCombination]);
        }
      }
      return combinations;
    }
  }
  
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  


}

module.exports = Deck;

