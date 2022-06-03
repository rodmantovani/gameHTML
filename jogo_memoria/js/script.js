const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let score = 0;
let GameOver = false;
shuffle();

// VIRAR A CARTA
function flipCard(){
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.toggle('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMath();
}

function checkForMath() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        score++;
        isGameOver();
        return;
    }
    unflipCards();

}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards(){
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockBoard = false;
        resetBoard();
    }, 1500)
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];

}

// EMBARALHA TODAS AS CARTAS
function shuffle(){
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random()*12);
        card.style.order = randomPosition;
    })
};

//função que verifica se o jogo acabou
function isGameOver() {
    if(score === 6) {
        
        confirm("Fim de jogo!!");
        //flipCard();
        document.location.reload(true);
    }
}



cards.forEach((card)=>{
    card.addEventListener('click', flipCard)
});

