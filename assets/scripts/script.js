const CARD = 'card'
const FLIP = 'flip'
const FRONT = 'card-front'
const BACK = 'card-back'
const GAOV = 'gameover'
const GABO = 'gameboard'
const ICON = 'icon'
const MOVES = 'moves'
const NAME = 'inputName'


startGame();

function startGame(){
    game.createCards();
    game.shuffleCards();
    initializeCards();
}

function initializeCards(){
    let gameboard = document.getElementById(GABO);

    // reset gameboard
    gameboard.innerHTML = ''

    game.cards.forEach(card => {
        let cardElem = document.createElement('div');
        cardElem.classList.add(CARD);
        cardElem.id = card.id;
        cardElem.dataset.icon = card.icon;
        cardElem.flipped = card.flipped;

        createCardFaces(cardElem);

        cardElem.addEventListener('click', () => flipCards(cardElem))

        gameboard.appendChild(cardElem);
    })
}

function createCardFaces(cardElem){
    createCardFacesContent(FRONT, cardElem);
    createCardFacesContent(BACK, cardElem);
}

function createCardFacesContent(face, cardElem){
    let cardFaceElement = document.createElement('div');
    
    if (face === FRONT){
        cardFaceElement.classList.add(FRONT)
        let img = document.createElement('img');
        img.src = './assets/images/' + cardElem.dataset.icon + '.png'
        img.classList.add(ICON)
        
        cardFaceElement.appendChild(img);
    }
    else{
        cardFaceElement.classList.add(BACK)
        cardFaceElement.innerHTML = '&lt/&gt'
    }

    cardElem.appendChild(cardFaceElement)
}

function flipCards(cardElem){
    if (!game.setCArd(cardElem)){ return false }
    
    cardElem.classList.add(FLIP)
    
    if (game.secondCard){
        game.moves++;
        // if the two cards flipped is not equals
        if (!game.checkMatch()) {
            setTimeout(() => {
                let firstCardView = document.getElementById(game.firstCard.id);
                let secondCard = document.getElementById(game.secondCard.id);
                firstCardView.classList.remove(FLIP);
                secondCard.classList.remove(FLIP);
                game.unflipCards();
            }, 1000)
        }

        // if the two cards flipped are equals
        else{
            if (game.checkGameOver()){
                let gameOver = document.getElementById(GAOV);
                let movesElem = document.getElementsByClassName(MOVES)[0];
                movesElem.innerHTML = `<h1>Movimentos: <span>${game.moves}</span></h1>`
                gameOver.style.display = 'flex';
            }
            else{
                game.clearCards();
            }
        }
    }
}

function restart(){
    let gameOver = document.getElementById(GAOV);
    gameOver.style.display = 'none';
    game.cards = [];
    moves = 0;
    game.clearCards();
    startGame();
}

function saveScore(){
    let name = document.getElementById(NAME).value;
    localStorage.setItem(name, parseInt(game.moves));
}

