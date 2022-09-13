/** Memory game: find matching pairs of cards and flip both of them. */
const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple"
];
let count = 0
const gameBoard = document.getElementById("game");
const start = document.getElementById("start");
const refresh = document.getElementById("refresh");
start.addEventListener("click",function(){ createCards(shuffle(COLORS))})
refresh.addEventListener("click",blank)
/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.
  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}
function createCards(colors){
  if(count===0){
  count+=1
  for (let color of colors) {
    let cards = document.createElement ("div")
    cards.classList.add(color,"back")
    cards.style.backgroundColor="white"
    cards.addEventListener("click",handleCardClick)
    gameBoard.append(cards)
  }
}
}

/** Flip a card face-up by adding css trait for front and deleting the back trait. */
function flipCard(cards) {
  cards.classList.remove("back");
  cards.classList.add("front");
  cards.style.backgroundColor=cards.classList[0];

}
/** Flip a card face-up by adding css trait for back and deleting the front trait. */
function unFlipCard(cards){
  cards.classList.remove("front");
  cards.classList.add("back");
  cards.style.backgroundColor= "white";

}
function handleCardClick(event){

  if(document.querySelectorAll(".front").length<2 && !(event.target.classList.contains("front")) && !(event.target.classList.contains("matched"))){
      flipCard(event.target)
      document.querySelector(".current").innerHTML++
  }

if(document.querySelectorAll(".front").length === 2){
  if( document.querySelectorAll(".front")[0].style.backgroundColor=== document.querySelectorAll(".front")[1].style.backgroundColor){
    document.querySelectorAll(".front").forEach((card)=>{
      card.classList.remove("front")
      card.classList.add("matched")
    })
    } else {
      setTimeout(function(){document.querySelectorAll(".front").forEach((cards)=>{unFlipCard(cards)})},1000)
    }
  }

if(document.querySelectorAll(".matched").length===COLORS.length){
  setTimeout(reset,FOUND_MATCH_WAIT_MSECS)
};



}
let high = parseInt(document.querySelector(".high").innerHTML)
function reset(){
  count = 0;
  console.log(alert("Congratulations you won!"))
  document.querySelector("#game").innerHTML="";
  if(parseInt(document.querySelector(".high").innerHTML) === 0 ){
    document.querySelector(".high").innerHTML = parseInt(document.querySelector(".current").innerHTML)
  }
  if(parseInt(document.querySelector(".high").innerHTML)  >= parseInt(document.querySelector(".current").innerHTML) ){
    document.querySelector(".high").innerHTML = parseInt(document.querySelector(".current").innerHTML)
  }
  document.querySelector(".current").innerHTML=0;
}

function blank(){
  count = 0;
  document.querySelector("#game").innerHTML="";
  document.querySelector(".current").innerHTML=0
}

