let ranks = [];
const suits = [];
class Rank {
   
    constructor() {
        ranks.push('2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A');
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

    onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
}
   



module.exports = Rank;