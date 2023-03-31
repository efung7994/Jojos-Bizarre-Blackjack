/*------------ Constants ------------*/


/*------------ Variables ------------*/
let playerSum, dealerSum, blackjack, winner, turn
let cash = 100
let bet = 0

/*---- Cached Element References ----*/
const currentCash = document.querySelector('.cash')
const currentBet = document.querySelector('.bet-money')
const dollarBtn1 = document.querySelector('.dollars1')
const dollarBtn5 = document.querySelector('.dollars5')
const dollarBtn10 = document.querySelector('.dollars10')
currentBet.textContent = 'Bet: $' + bet
currentCash.textContent = 'Cash: $' + cash

/*--------- Event Listeners ---------*/
dollarBtn1.addEventListener('click', addMoneyToBet1)
dollarBtn5.addEventListener('click', addMoneyToBet5)
dollarBtn10.addEventListener('click', addMoneyToBet10)
/*------------ Functions ------------*/
init()

function addMoneyToBet1() {
  cash -= 1
  bet += 1
  currentBet.textContent = 'Bet: $' +bet
  currentCash.textContent = 'Cash: $' +cash
}
function addMoneyToBet5() {
  cash -= 5
  bet += 5
  currentBet.textContent = 'Bet: $'+ bet
  currentCash.textContent = 'Cash: $' +cash
}
function addMoneyToBet10() {
  cash -= 10
  bet += 10
  currentBet.textContent = 'Bet: $' +bet
  currentCash.textContent = 'Cash: $' +cash
}

function init() {
  deck1 = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
}
