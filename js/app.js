/*------------ Constants ------------*/


/*------------ Variables ------------*/
let deck = []
let playerSum = 0
let dealerSum = 0
let blackjack = false
let winner = false
let turn = 1
let cash = 100
let bet = 0
let playerHand = []
let dealerHand = []

/*---- Cached Element References ----*/
let messageEl = document.querySelector('#message')
let startRoundEl = document.querySelector('.start')
let resetBtn = document.querySelector('.reset')
let currentCash = document.querySelector('.cash')
let currentBet = document.querySelector('.bet-money')
let dollarBtn1 = document.querySelector('.dollars1')
let dollarBtn5 = document.querySelector('.dollars5')
let dollarBtn10 = document.querySelector('.dollars10')
let containerEl = document.querySelector('.container')
let dealerHandEl = document.querySelector('#dealer-hand')
let playerHandEl = document.querySelector('#player-hand')
let playerSumEl = document.querySelector('#player-sum')
let dealerSumEl = document.querySelector('#dealer-sum')
let standButtonEl = document.querySelector('#stand-button')
let hitButtonEl = document.querySelector('#hit-button')
currentBet.textContent = 'Bet: $' + bet
currentCash.textContent = 'Cash: $' + cash

/*--------- Event Listeners ---------*/
dollarBtn1.addEventListener('click', addMoneyToBet1)
dollarBtn5.addEventListener('click', addMoneyToBet5)
dollarBtn10.addEventListener('click', addMoneyToBet10)
startRoundEl.addEventListener('click', startRound)
hitButtonEl.addEventListener('click', drawCard)
resetBtn.addEventListener('click', init)
standButtonEl.addEventListener('click', stand)

/*------------ Functions ------------*/
init()

function addMoneyToBet1() {
  if(cash > 0){
    cash -= 1
    bet += 1
    currentBet.textContent = 'Bet: $' +bet
    currentCash.textContent = 'Cash: $' +cash
  } else {
    cash += 0
    bet += 0
  }
}
function addMoneyToBet5() {
  if(cash > 0){
    cash -= 5
    bet += 5
    currentBet.textContent = 'Bet: $' +bet
    currentCash.textContent = 'Cash: $' +cash
  } else {
    cash += 0
    bet += 0
    
  }
}
function addMoneyToBet10() {
  if(cash > 0){
    cash -= 10
    bet += 10
    currentBet.textContent = 'Bet: $' +bet
    currentCash.textContent = 'Cash: $' +cash
  } else {
    cash += 0
    bet += 0
  }
}

function initRound() {
  deck =[
    "dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
  
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
  blackjack = false
  winner = false
  turn = 1
}

function init() {
  deck =[
    "dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
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
  blackjack = false
  winner = false
  turn = 1
  cash = 100
  bet = 0
}

function renderBet() {
  currentBet.textContent = 'Bet: $' + bet
  currentCash.textContent = 'Cash: $' + cash
}


function renderPlayer(cardPicked) {
  let cardImg = playerHandEl.appendChild(document.createElement('div'))
  cardImg.classList.add('card', 'large', cardPicked)
  console.log(cardPicked)
}

function renderDealer(cardPicked) {
  let cardImg = dealerHandEl.appendChild(document.createElement('div'))
  cardImg.classList.add('card', 'large', cardPicked)
  console.log(cardPicked)
  

}

function startRound() {
  // calls the draw card function twice because it causes the player to draw a card twice and dealer to draw twice
  initRound()
  drawCard()
  drawCard()
  dealerDrawCard()
  dealerDrawCard()
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
        if (dealerSum <= 10) {
          cardPullValue = 11
        } else {
          cardPullValue = 1
        }
      }
    } 
  }   
    console.log(cardPullValue)
    playerSum += cardPullValue
    playerSumEl.textContent = 'Player: ' + playerSum
     // Pass card picked to render function to display
		renderPlayer(cardPicked)
    determineWinner()
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
      console.log(cardPullValue)
      dealerSum += cardPullValue
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
  console.log(cash)
  console.log(bet)
}

function determineWinner () {
  if (dealerSum > playerSum && dealerSum < 21 || playerSum > 21 || dealerSum === 21){
    messageEl.textContent = 'YOU LOSE!'
    bet = 0
  } else if (playerSum <= 21 && dealerSum > 21) {
    messageEl.textContent = 'YOU WIN!'
    cash += bet * 1.5
    bet = 0
  }
  if (playerSum === 21) {
    messageEl.textContent = 'BLACKJACK!'
    cash += bet * 2
    bet = 0
  }
  renderBet()
}

if (bet === 0){
  startRoundEl.disabled = true
}
if (bet > 0) {
  startRoundEl.disabled = false
}
