let game = {
    
    firstCard: null,
    secondCard: null,
    lockeMode: false,
    moves: 0,

    cards: [],
    
    symbols: [
        'bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react'
    ],

    createCards: function(){
        this.cards = (this.symbols.flatMap( symbol => this.createPair(symbol)))
    },

    createPair: function(symbol){
        return [{
            id: this.createCardID(symbol),
            icon: symbol,
            flipped: false,
        },{
            id: this.createCardID(symbol),
            icon: symbol,
            flipped: false
        }]
    },

    createCardID: function(symbol){
        return symbol + (Math.random() * 1000); 
    },

    shuffleCards: function(){
        let currIndex = this.cards.length;
        let randomIndex = 0;

        while (currIndex != 0){
            randomIndex = Math.floor(Math.random() * currIndex);
            currIndex--;
            [this.cards[randomIndex], this.cards[currIndex]] = [this.cards[currIndex], this.cards[randomIndex]]
        }
        return true
    },

    setCArd: function(cardElem){
        let card = this.cards.filter(card => card.id == cardElem.id)[0];

        if (card.flipped || this.lockeMode) { return false }

        if (!this.firstCard){
            card.flipped = true;
            this.firstCard = card;
            return true;
        }
        else{
            card.flipped = true;
            this.secondCard = card;
            this.lockeMode = true;
            return true;
        }
        return false;
    },

    clearCards: function(){
        this.firstCard = null;
        this.secondCard = null;
        this.lockeMode = false;
    },

    checkMatch: function(){
        return this.firstCard.icon === this.secondCard.icon
    }, 

    unflipCards: function(cardElem, FLIP){
        let cards2 = this.cards.filter( card => card.id === this.firstCard.id || card.id === this.secondCard.id)
        cards2[0].flipped = false;
        cards2[1].flipped = false;
        this.clearCards();
    },

    checkGameOver: function(){
        return this.cards.filter( card => !card.flipped ).length == 0;
    },
}