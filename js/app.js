/*------------ Constants ------------*/
const nani = new Audio('')

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
let currentCash = document.querySelector('.cash')
let currentBet = document.querySelector('.bet-money')
let dealerHandEl = document.querySelector('#dealer-hand')
let playerHandEl = document.querySelector('#player-hand')
let playerSumEl = document.querySelector('#player-sum')
let dealerSumEl = document.querySelector('#dealer-sum')
let messageEl = document.querySelector('#message')
//Buttons
let startRoundEl = document.querySelector('#start')
let nextRoundBtn = document.querySelector('#next-round')
let resetBtnEl = document.querySelector('#reset')
let betButtonsEl = document.querySelector ('.bet-btns')
let dollarBtn1 = document.querySelector('#dollars1')
let dollarBtn5 = document.querySelector('#dollars5')
let dollarBtn10 = document.querySelector('#dollars10')
let resetBetBtn = document.querySelector('#unbet')
let standButtonEl = document.querySelector('#stand-button')
let hitButtonEl = document.querySelector('#hit-button')

// Extra
let menaceEl = document.querySelector('#menace-img')

/*--------- Event Listeners ---------*/
resetBtnEl.addEventListener('click', init)
dollarBtn1.addEventListener('click', addMoneyToBet1)
dollarBtn5.addEventListener('click', addMoneyToBet5)
dollarBtn10.addEventListener('click', addMoneyToBet10)
startRoundEl.addEventListener('click', startRound)
hitButtonEl.addEventListener('click', drawCard)
nextRoundBtn.addEventListener('click', initRound)
standButtonEl.addEventListener('click', stand)
resetBetBtn.addEventListener('click', resetBet)

/*------------ Functions ------------*/
init()

/*------------ Initialize functions ------------*/
function initRound() {
  deck =[
    "dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02",
    "hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02",
    "cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02",
    "sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
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
  playerHand = []
  dealerHand = []
  playerSum = 0
  dealerSum = 0
  enableBet()
  checkCash()
  resetBetBtn.disabled = false
  nextRoundBtn.disabled = true
  nextRoundBtn.style.opacity = '0'
  menaceEl.style.opacity = '0'
  menaceEl.classList.remove('animate__animated', 'animate__shakeX')
  messageEl.style.opacity = '0'
  checkGameOver()
}

function init() {
  deck =[
    "dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02",
    "hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02",
    "cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02",
    "sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
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
  playerHand = []
  dealerHand = []
  playerSum = 0
  dealerSum = 0
  checkGameOver()
  enableBet()
  resetBtnEl.style.opacity = '0'
  messageEl.style.opacity = '1'
}
/*------------ Buttons for betting ------------*/
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

function resetBet() {
  cash += bet
  bet = 0
  currentCash.textContent = 'Cash: $' +cash
  currentBet.textContent = 'Bet: $' +bet
  startRoundEl.disabled = true
  enableBet()
}




/*------------ Render Functions ------------*/
function renderBet() {
  currentBet.textContent = 'Bet: $' + bet
  currentCash.textContent = 'Cash: $' + cash
}

function renderPlayer(cardPicked) {
  let cardImg = playerHandEl.appendChild(document.createElement('div'))
  cardImg.classList.add('card', 'large','animate__animated', 'animate__fadeInRightBig', cardPicked)
}

function renderDealer(cardPicked) {
  let cardImg = dealerHandEl.appendChild(document.createElement('div'))
  cardImg.classList.add('card', 'large', 'animate__animated', 'animate__fadeInRightBig', cardPicked)
}

function renderDealerFaceDown() {
  let cardImg = dealerHandEl.appendChild(document.createElement('div'))
  cardImg.classList.add('card', 'large', 'back', 'animate__animated', 'animate__fadeInRightBig')
}

function renderDealerRemoveFacedown() {
  dealerHandEl.removeChild(dealerHandEl.firstChild)
}



/*------------ Game Logic Functions------------*/
function startRound() {
  // calls the draw card function twice because it causes the player to draw a card twice and dealer to draw twice
  // drawCard()
  // drawCard()
  // dealerDrawCard()
  // renderDealerFaceDown()
  // checkTie()
  // roundStart()
  // disableBet()
startRoundEl.disabled = true
disableBet()
setTimeout(drawCard, 500)
setTimeout(dealerDrawCard, 2000)
setTimeout(drawCard, 1500)
setTimeout(renderDealerFaceDown, 1000)
setTimeout(checkTie, 2500)
setTimeout(roundStart, 2600)
}
  


function drawCard() {
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
    checkLose()
    checkTie()
    checkBlackjack()
    if (playerSum === 21) {
      blackjack = true
    }
    playerSumEl.textContent = 'Player: ' + playerSum
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
      roundEnd()
      renderBet()
      
      dealerSumEl.textContent = 'Dealer: ' + dealerSum
       // Pass card picked to render function to display
      renderDealer(cardPicked)
    }
  }

function stand() {
  renderDealerRemoveFacedown()
  while (playerSum >= dealerSum && dealerSum != 21) {
    dealerDrawCard()
  }
  determineWinner()
  checkBlackjack()
}

function determineWinner () {
  checkBlackjack()
  checkTie()
  if (dealerSum > playerSum && dealerSum < 21 || playerSum > 21 || dealerSum === 21){
    checkLose()
    bet = 0
  } else if (playerSum <= 21 && dealerSum > 21) {
    checkWin()
    cash += bet * 1.5
    bet = 0
  }
  roundEnd()
  renderBet()
  nextRoundBtn.style.opacity = '1'
}


/*------------ Disable/Enable Button Functions ------------*/
function disableBet() {
  dollarBtn1.disabled = true
  dollarBtn5.disabled = true
  dollarBtn10.disabled = true
  resetBetBtn.disabled = true
}

function enableBet() {
  dollarBtn1.disabled = false
  dollarBtn5.disabled = false
  dollarBtn10.disabled = false
}


function roundStart() {
  hitButtonEl.disabled = false
  standButtonEl.disabled = false
  startRoundEl.disabled = true
  nextRoundBtn.disabled = true
}

function roundEnd() {
  hitButtonEl.disabled = true
  standButtonEl.disabled = true
  nextRoundBtn.disabled = false
  
}


/*------------ Check Game State Functions ------------*/
function checkBlackjack() {
  checkTie()
  if (blackjack === true && tie === false) {
    cash += bet * 2
    bet = 0
    renderBet()
    roundEnd()
  }
}

function checkCash() {
  if (cash === 0) {
    disableBet()
    resetBetBtn.disabled = false
  }
}

function checkGameOver() {
  if (cash === 0 && bet === 0){
  gameOver = true
  resetBtnEl.disabled = false
  resetBtnEl.style.opacity = '1'
  resetBetBtn.disabled = true
  }
}

function checkTie () {
  if (playerSum === 21 && dealerSum === 21) {
    tie = true
    cash += bet
    bet = 0
    renderBet()
    roundEnd()
    messageEl.textContent = 'DRAW'
    messageEl.style.color = '#FBFCF8'
    messageEl.style.opacity = '1'
  }
}

function checkLose() {
  if (playerSum > 21) {
    bet = 0
    nextRoundBtn.style.opacity = '1'
    roundEnd()
    renderBet()
    menaceEl.style.opacity = '1'
    menaceEl.classList.add('animate__animated', 'animate__shakeX' )
    menaceEl.style.setProperty('--animate-duration', '.5s')
    messageEl.textContent = 'LOSE'
    messageEl.style.color = 'blue'
    messageEl.style.opacity = '1'
  }
}

function checkWin() {
  messageEl.textContent = 'WIN'
  messageEl.style.color = 'red'
  messageEl.style.opacity = '1'
}