/*------------ Constants ------------*/


/*------------ Variables ------------*/
let deck = []
let playerSum = 0
let dealerSum = 0
let tie = false
let gameOver = false
let blackjack = false
let cash = 100
let bet = 0
let playerHand = []
let dealerHand = []

/*---- Cached Element References ----*/
// Renders
let messageEl = document.querySelector('#message')
let currentCash = document.querySelector('.cash')
let currentBet = document.querySelector('.bet-money')
let dealerHandEl = document.querySelector('#dealer-hand')
let playerHandEl = document.querySelector('#player-hand')
let playerSumEl = document.querySelector('#player-sum')
let dealerSumEl = document.querySelector('#dealer-sum')
//Buttons
let startRoundEl = document.querySelector('.start')
let nextRoundBtn = document.querySelector('.next-round')
let betButtonsEl = document.querySelector ('.bet-btns')
let dollarBtn1 = document.querySelector('.dollars1')
let dollarBtn5 = document.querySelector('.dollars5')
let dollarBtn10 = document.querySelector('.dollars10')
let standButtonEl = document.querySelector('#stand-button')
let hitButtonEl = document.querySelector('#hit-button')
let resetBtnEl = document.querySelector('.reset')
//Extra
let containerEl = document.querySelector('.container')


currentBet.textContent = 'Bet: $' + bet
currentCash.textContent = 'Cash: $' + cash

/*--------- Event Listeners ---------*/
resetBtnEl.addEventListener('click', init)
dollarBtn1.addEventListener('click', addMoneyToBet1)
dollarBtn5.addEventListener('click', addMoneyToBet5)
dollarBtn10.addEventListener('click', addMoneyToBet10)
startRoundEl.addEventListener('click', startRound)
hitButtonEl.addEventListener('click', drawCard)
nextRoundBtn.addEventListener('click', initRound)
standButtonEl.addEventListener('click', stand)
/*------------ Functions ------------*/
init()

function addMoneyToBet1() {
  if(cash > 1){
    bet += 1
    cash -= 1
    currentBet.textContent = 'Bet: $' +bet
    currentCash.textContent = 'Cash: $' +cash
  } else {
    bet += cash
    cash -= cash
    currentBet.textContent = 'Bet: $' +bet
    currentCash.textContent = 'Cash: $' +cash
    dollarBtn1.disabled = true
  }
  checkCash()
  startRoundEl.disabled = false
}
function addMoneyToBet5() {
  if(cash > 5){
    bet += 5
    cash -= 5
    currentBet.textContent = 'Bet: $' +bet
    currentCash.textContent = 'Cash: $' +cash
  } else{
    bet += cash
    cash -= cash
    currentBet.textContent = 'Bet: $' +bet
    currentCash.textContent = 'Cash: $' +cash
    dollarBtn5.disabled = true
  }
  checkCash()
  startRoundEl.disabled = false
}
function addMoneyToBet10() {
  if(cash > 10){
    bet += 10
    cash -= 10
    currentBet.textContent = 'Bet: $' +bet
    currentCash.textContent = 'Cash: $' +cash
  } else {
    bet += cash
    cash -= cash
    currentBet.textContent = 'Bet: $' +bet
    currentCash.textContent = 'Cash: $' +cash
    dollarBtn10.disabled = true
  }
  checkCash()
  startRoundEl.disabled = false
}

function initRound() {
  deck =[
    "dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
  blackjack = false
  tie = false
  gameOver = false
  //clears the player hand and dealer hand divs so there are no card images
  playerHandEl.textContent = ''
  dealerHandEl.textContent = ''
  currentBet.textContent = 'Bet: $' + bet
  currentCash.textContent = 'Cash: $' + cash
  dealerSumEl.textContent = 'Dealer: '
  playerSumEl.textContent = 'Player: '
  messageEl.textContent = ' '
  playerHand = []
  dealerHand = []
  playerSum = 0
  dealerSum = 0
  enableBet()
  checkCash()
  checkGameOver()
  nextRoundBtn.disabled = true
}

function init() {
  deck =[
    "dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
  cash = 100
  bet = 0
  blackjack = false
  tie = false
  gameOver = false
  startRoundEl.disabled = true
  nextRoundBtn.disabled = true
  hitButtonEl.disabled = true
  standButtonEl.disabled = true
  resetBtnEl.disabled = true
  playerHandEl.textContent = ''
  dealerHandEl.textContent = ''
  currentBet.textContent = 'Bet: $' + bet
  currentCash.textContent = 'Cash: $' + cash
  dealerSumEl.textContent = 'Dealer: '
  playerSumEl.textContent = 'Player: '
  messageEl.textContent = ' '
  playerHand = []
  dealerHand = []
  playerSum = 0
  dealerSum = 0
  checkGameOver()
  enableBet()
}

function renderBet() {
  currentBet.textContent = 'Bet: $' + bet
  currentCash.textContent = 'Cash: $' + cash
}


function renderPlayer(cardPicked) {
  let cardImg = playerHandEl.appendChild(document.createElement('div'))
  cardImg.classList.add('card', 'large', cardPicked)
}

function renderDealer(cardPicked) {
  let cardImg = dealerHandEl.appendChild(document.createElement('div'))
  cardImg.classList.add('card', 'large', cardPicked)
}

function startRound() {
  // calls the draw card function twice because it causes the player to draw a card twice and dealer to draw twice
  drawCard()
  drawCard()
  dealerDrawCard()
  dealerDrawCard()
  checkTie()
  hitButtonEl.disabled = false
  standButtonEl.disabled = false
  startRoundEl.disabled = true
  checkBlackjack()
  disableBet()
}
  


function drawCard() {
  //check to see if player has blackjack
  checkTie()
  checkBlackjack()
  // Used to prevent error on click when no cards are left in deck 1
  if (deck.length > 0) {  

	  // Randomly select number from total cards remaining
		let randIdx = Math.floor(Math.random()*deck.length)

		// Assigns card with the random index to a variable   
	let cardPicked = deck.splice(randIdx, 1)[0]
    
	  // Adds card picked to player hand
		playerHand.push(cardPicked)
    //finds the numerical value of the cards that were picked
    cardPullValue = parseInt(cardPicked.match(/[0-9]{2}/g))
    // if the card is parsed into a number, it will return that value to the cardPullValue
    if (isNaN(cardPullValue) === false){
      cardPullValue = cardPullValue
    } else
    // if the card is not a number, a search will be done to find out what card it is
    if (isNaN(cardPullValue) === true) {
    // searches the string of the card picked and if it is a face card(contains J/Q/K), the value is returned as 10
      let searchFaceCards = cardPicked.search(/[J|Q|K]/)
      if (searchFaceCards === 1) {
      cardPullValue = 10
    // if the search does not come back with a found string, it will not search for the Ace card
    } else if (searchFaceCards === -1) { 
      let searchAceCard = cardPicked.search(/[A]/)
      if (searchAceCard === 1){
    // Once found, logic will be applied depending on the sum of the dealer. A will be 1 or 11 whichever one cause the dealer not to lose
        if (playerSum <= 10) {
          cardPullValue = 11
        } else {
          cardPullValue = 1
        }
      }
    } 
  }   
    playerSum += cardPullValue
    if (playerSum === 21) {
      blackjack = true
      checkBlackjack()
    }
    playerSumEl.textContent = 'Player: ' + playerSum
    if (playerSum > 21) {
      messageEl.textContent = 'YOU LOSE!'
      bet = 0
      roundEnd()
      renderBet()
    }
    // Pass card picked to render function to display
		renderPlayer(cardPicked)
  }
}
    // function is the same as draw card except it places the cards in the dealer's hands
function dealerDrawCard() {
   // Used to prevent error on click when no cards are left in deck 1
    if (deck.length > 0) {  
  
      // Randomly select number from total cards remaining
      let randIdx = Math.floor(Math.random()*deck.length)
  
      // Assigns card with the random index to a variable   
    let cardPicked = deck.splice(randIdx, 1)[0]
      
      dealerHand.push(cardPicked)
  
      cardPullValue = parseInt(cardPicked.match(/[0-9]{2}/g))
      if (isNaN(cardPullValue) === false){
        cardPullValue = cardPullValue
      } else
      if (isNaN(cardPullValue) === true) {
        let searchFaceCards = cardPicked.search(/[J|Q|K]/)
        if (searchFaceCards === 1) {
        cardPullValue = 10
      } else if (searchFaceCards === -1) { 
        let searchAceCard = cardPicked.search(/[A]/)
        if (searchAceCard === 1){
          if (dealerSum <= 10) {
            cardPullValue = 11
          } else {
            cardPullValue = 1
          }
        }
      } 
    }   
      dealerSum += cardPullValue
      checkTie()
      if (dealerSum === 21) {
        messageEl.textContent = 'YOU LOSE!'
        bet = 0
        roundEnd()
        renderBet()
      }
      dealerSumEl.textContent = 'Dealer: ' + dealerSum
       // Pass card picked to render function to display
      renderDealer(cardPicked)
    }
  }

function stand() {
  while (playerSum >= dealerSum) {
    dealerDrawCard()
  }
  determineWinner()
}

function determineWinner () {
  checkBlackjack()
  checkTie()
  if (dealerSum > playerSum && dealerSum < 21 || playerSum > 21 || dealerSum === 21){
    messageEl.textContent = 'YOU LOSE!'
    bet = 0
  } else if (playerSum <= 21 && dealerSum > 21) {
    messageEl.textContent = 'YOU WIN!'
    cash += bet * 1.5
    bet = 0
  }
  roundEnd()
  renderBet()
}

function disableBet() {
  dollarBtn1.disabled = true
  dollarBtn5.disabled = true
  dollarBtn10.disabled = true
}

function enableBet() {
  dollarBtn1.disabled = false
  dollarBtn5.disabled = false
  dollarBtn10.disabled = false
}


function roundEnd() {
  hitButtonEl.disabled = true
  standButtonEl.disabled = true
  nextRoundBtn.disabled = false
}

function checkBlackjack() {
  checkTie()
  if (blackjack === true && tie === false) {
    messageEl.textContent = 'BLACKJACK!'
    cash += bet * 2
    bet = 0
    renderBet()
    roundEnd()
  }
}

function checkCash() {
  if (cash === 0 || cash === 0.5) {
    disableBet()
  }
}

function checkGameOver() {
  if (cash === 0 && bet === 0){
  gameOver = true
  resetBtnEl.disabled = false
  }
}

function checkTie () {
  if (playerSum === 21 && dealerSum === 21) {
    tie = true
    messageEl.textContent = 'Tie'
    cash += bet
    bet = 0
    renderBet()
    roundEnd()
  }
}