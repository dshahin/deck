const Deck = require('./deck');
const args = process.argv.slice(2);
const cards = process.argv[2];
const players = process.argv[3];

console.log(`Dealing ${players} players ${cards} cards`);

const deck = new Deck();
deck.shuffle();
const hands = deck.deal(cards, players);
console.log(hands);

//flop
deck.street(3)
console.log(deck.board);

//turn
deck.street(1);
console.log(deck.board);

//river
deck.street(1);
console.log(deck.board);


hands.forEach(hand => {
    deck.possibleHands(deck.board, hand, 5);

});



