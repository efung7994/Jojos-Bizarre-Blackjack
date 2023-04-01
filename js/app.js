/*------------ Constants ------------*/
const entireDeck = [
  "dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]


  // separate cards into suits so that each card will equate to a value when searched through.
  const spades = entireDeck.filter(function(cardName){
    onlySpades = cardName.includes('s')
    return onlySpades
  })

  const hearts = entireDeck.filter(function(cardName){
    onlySpades = cardName.includes('h')
    return onlySpades
  })

  const diamonds = entireDeck.filter(function(cardName){
    onlySpades = cardName.includes('d')
    return onlySpades
  })

  const clubs = entireDeck.filter(function(cardName){
    onlySpades = cardName.includes('c')
    return onlySpades
  })




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
let startRoundEl = document.querySelector('.start')
let resetBtn = document.querySelector('.reset')
let currentCash = document.querySelector('.cash')
let currentBet = document.querySelector('.bet-money')
let dollarBtn1 = document.querySelector('.dollars1')
let dollarBtn5 = document.querySelector('.dollars5')
let dollarBtn10 = document.querySelector('.dollars10')
let dealerHandEl = document.querySelector('#dealer-hand')
let dealerDeck2El = document.querySelector('#dealer-deck-2')
let playerSumEl = document.querySelector('#player-sum')
let dealerSumEl = document.querySelector('#dealer-sum')
currentBet.textContent = 'Bet: $' + bet
currentCash.textContent = 'Cash: $' + cash

/*--------- Event Listeners ---------*/
dollarBtn1.addEventListener('click', addMoneyToBet1)
dollarBtn5.addEventListener('click', addMoneyToBet5)
dollarBtn10.addEventListener('click', addMoneyToBet10)
startRoundEl.addEventListener('click', startRound)
resetBtn.addEventListener('click', init)

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



function init() {
  deck =[
    "dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
  cash = 100
  bet = 0
  currentBet.textContent = 'Bet: $' + bet
  currentCash.textContent = 'Cash: $' + cash

}



function render(cardPicked, cardPicked2) {
  console.log(cardPicked, cardPicked2)
  

}

function startRound() {
  // Used to prevent error on click when no cards are left in deck 1
  if (deck.length > 0) {  

	  // Randomly select number from total cards remaining
		let randIdx = Math.floor(Math.random()*deck.length)

		// Assigns card with the random index to a variable   
	  let cardPicked = deck.splice(randIdx, 1)[0]
    let cardPicked2 = deck.splice(randIdx, 1)[0]
    
	  // Adds card picked to deck 2
		dealerHand.push(cardPicked, cardPicked2)

    cardPullValue1 = parseInt(cardPicked.match(/[0-9]{2}/g))
    cardPullValue2 = parseInt(cardPicked2.match(/[0-9]{2}/g))
    if (isNaN(cardPullValue1) === false){
      cardPullValue1 = cardPullValue1
      console.log(cardPullValue1)
    } else
    if (isNaN(cardPullValue1) === true) {
      cardPullValue1 = 10
    } 

    if (isNaN(cardPullValue2) === false){
      cardPullValue2 = cardPullValue2
    } else
    if (isNaN(cardPullValue2) === true) {
      cardPullValue2 = 10
    } 
    
    console.log(cardPullValue1)
    console.log(cardPullValue2)
    dealerSum += cardPullValue1 + cardPullValue2
    dealerSumEl.textContent = 'dealer ' + dealerSum


	  // Pass card picked to render function to display
		render(cardPicked, cardPicked2)
  }
}

// function handleClick() {
//   if (deck.length > 0) {

//     // Randomly select number from total cards remaining
//     let randIdx = Math.floor(Math.random() * deck.length)
//     // Assign card with the random index to a variable
//     let cardPicked = deck.splice(randIdx, 1)[0]
//     // Add card picked to deck 2
//     deck.push(cardPicked)
//     // Pass card picked to render function to display
//     render(cardPicked)
//   }
// }