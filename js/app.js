/*------------ Constants ------------*/
const deal = new Audio('/css/assets/sounds/Deal.wav')
const win = new Audio('/css/assets/sounds/win.wav')
const start = new Audio('/css/assets/sounds/start.wav')
start.volume = 0.5
const lose = new Audio('/css/assets/sounds/lose.wav')
lose.volume = 0.3
const retire = new Audio('/css/assets/sounds/retire.mp3')
retire.volume = 0.5
const nani = new Audio('/css/assets/sounds/nani.wav')
const betChip = new Audio('/css/assets/sounds/bet.wav')
const resetChips = new Audio('/css/assets/sounds/resetChips.wav')

/*------------ Variables ------------*/
let deck = []
let playerSum = 0
let dealerSum = 0
let tie = false
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
let menaceEl = document.querySelector('.menace')
let menaceEl2 = document.querySelector('.menace2')

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
  
  // check blackjack and tie to see what the bet return will be
  blackjack = false
  tie = false
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
  resetBtnEl.style.opacity = '0'
  menaceEl.style.opacity = '0'
  menaceEl.classList.remove('animate__animated', 'animate__shakeX')
  menaceEl2.style.opacity = '0'
  menaceEl2.classList.remove('animate__animated', 'animate__shakeX')
  messageEl.style.opacity = '0'
  checkGameOver()
}

function init() {
  deck =[
    "dA","d06","d05","d04","d03","d02",
    "hA",
    "cA",
    "sA"]
  cash = 100
  bet = 0
  blackjack = false
  tie = false
  startRoundEl.disabled = true
  nextRoundBtn.disabled = true
  hitButtonEl.disabled = true
  standButtonEl.disabled = true
  resetBtnEl.disabled = true
  resetBetBtn.disabled = false
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
  messageEl.style.opacity = '0'
  resetBtnEl.style.opacity = '0'
}
/*------------ Buttons for betting ------------*/
function addMoneyToBet1() {
  betChip.play()
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
  betChip.play()
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
  betChip.play()
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
  resetChips.play()
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
  start.play()
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
  deal.play()
  if (deck.length > 0) {  
		let randIdx = Math.floor(Math.random()*deck.length)
	  let cardPicked = deck.splice(randIdx, 1)[0]
		playerHand.push(cardPicked)
    cardPullValue = parseInt(cardPicked.match(/[0-9]{2}/g))
    if (isNaN(cardPullValue) === false){
      cardPullValue = cardPullValue
    } else if (isNaN(cardPullValue) === true) {
      let searchFaceCards = cardPicked.search(/[J|Q|K]/)
      if (searchFaceCards === 1) {
        cardPullValue = 10
      } else if (searchFaceCards === -1) { 
        let searchAceCard = cardPicked.search(/[A]/)
        if (searchAceCard === 1){
          cardPullValue = 1
        }
      } 
    }
  playerSum += cardPullValue
  const isAce = playerHand.some(c =>{
    return c.toString()[1]==='A'
  })
    if (playerSum < 12 && isAce === true) {
      playerSum += 10
    } 
    else if(playerSum > 21 && isAce === true) {
      playerSum -= 10
    } else if (playerSum === 21) {
        blackjack = true
    } 
    checkLose()
    checkTie()
    checkBlackjack()
    playerSumEl.textContent = 'Player: ' + playerSum
		renderPlayer(cardPicked)
  }
}

function dealerDrawCard() {
  deal.play()
  if (deck.length > 0) {  
    let randIdx = Math.floor(Math.random()*deck.length)  
    let cardPicked = deck.splice(randIdx, 1)[0]
    dealerHand.push(cardPicked)
    cardPullValue = parseInt(cardPicked.match(/[0-9]{2}/g))
    if (isNaN(cardPullValue) === false) {
        cardPullValue = cardPullValue
        } else if (isNaN(cardPullValue) === true) {
          let searchFaceCards = cardPicked.search(/[J|Q|K]/)
          if (searchFaceCards === 1) {
            cardPullValue = 10
          } else if (searchFaceCards === -1) { 
              let searchAceCard = cardPicked.search(/[A]/)
              if (searchAceCard === 1){
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
    renderDealer(cardPicked)
    }
  }

function stand() {
  renderDealerRemoveFacedown()
  while (playerSum >= dealerSum && dealerSum != 21) {
    dealerDrawCard()
  }
  checkTie()
  checkWin()
  checkLose()
  checkBlackjack()
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
    nani.play()
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
  retire.play()
  resetBtnEl.disabled = false
  resetBtnEl.style.opacity = '1'
  resetBetBtn.disabled = true
  messageEl.textContent = 'K.O.'
  messageEl.style.color = 'black'
  messageEl.style.opacity = '1'
  }
}

function checkTie () {
  if (playerSum === 21 && dealerSum === 21) {
    tie = true
    cash += bet
    bet = 0
    nextRoundBtn.style.opacity = '1'
    renderBet()
    roundEnd()
    messageEl.textContent = 'DRAW'
    messageEl.style.color = '#FBFCF8'
    messageEl.style.opacity = '1'
  }
}

function checkLose() {
  if (playerSum > 21 || dealerSum > playerSum && dealerSum <= 21) {
    lose.play()
    bet = 0
    nextRoundBtn.style.opacity = '1'
    roundEnd()
    renderBet()
    menaceEl.style.opacity = '1'
    menaceEl.classList.add('animate__animated', 'animate__shakeX' )
    menaceEl.style.setProperty('--animate-duration', '.5s')
    menaceEl2.style.opacity = '1'
    menaceEl2.classList.add('animate__animated', 'animate__shakeX' )
    menaceEl2.style.setProperty('--animate-duration', '.5s')
    messageEl.textContent = 'LOSE'
    messageEl.style.color = 'blue'
    messageEl.style.opacity = '1'
  }
}

function checkWin() {
  checkBlackjack()
  if (playerSum <= 21 && dealerSum > 21) {
    win.play()
    cash += bet * 1.5
    bet = 0
    nextRoundBtn.style.opacity = '1'
    roundEnd()
    renderBet()
    messageEl.textContent = 'WIN'
    messageEl.style.color = 'red'
    messageEl.style.opacity = '1'
  }
}