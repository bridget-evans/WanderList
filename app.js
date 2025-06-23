// const quotes = [
//   "'Travel far, travel often, and travel without regrets.' - Oscar Wilde",
//   "'Travel brings power and love back into your life.' - Rumi",
//   "'The core of mans' spirit comes from new experiences.' - Jon Krakauer, Into the Wild",
//   "'A good traveler has no fixed plans, and is not intent on arriving.' - Lao Tzu",
//   "'The world is a book, and those who don't travel read only one page.' - St. Augustine",
//   "'A ship in harbor is safe, but that is not what ships are built for' - John A. Shedd",
//   "'It is better to travel than to arrive.' - Buddha",
// ];
// var dailyQuote = document.getElementById("dailyQuote");

// function getQuote(quotesArray) {
//   const randomIndex = Math.floor(Math.random() * quotesArray.length);
//   return quotesArray[randomIndex];
// }

// const randomQuote = getQuote(quotes);

// if (dailyQuote) {
//   dailyQuote.textContent = randomQuote;
// }
// //
// //
// //
// //
// //

// // click on close button to remove list item
// var close = document.getElementsByClassName("close");
// var i;
// for (i = 0; i < close.length; i++) {
//   close[i].onclick = function () {
//     var div = this.parentElement;
//     div.style.display = "none";
//   };
// }

// // click on list item to toggle line-through
// var list = document.querySelector("ul");
// list.addEventListener(
//   "click",
//   function (ev) {
//     if (ev.target.tagName === "LI") {
//       ev.target.classList.toggle("checked");
//     }
//   },
//   false
// );

// // create a new list and append close button to each list item
// const itemInput = document.getElementById("itemInput");
// const addBtn = document.getElementsByClassName("addBtn");
// const myList = document.getElementById("myList");

// function newItem() {
//   const listText = itemInput.value;
//   const listItem = document.createElement("li");
//   if (listText.trim() !== "") {
//     listItem.textContent = listText;
//     myList.appendChild(listItem);
//   }
//   itemInput.value = "";

//   var span = document.createElement("SPAN");
//   var txt = document.createTextNode("\u00D7");
//   span.className = "close";
//   span.appendChild(txt);
//   listItem.appendChild(span);

//   for (i = 0; i < close.length; i++) {
//     close[i].onclick = function () {
//       var div = this.parentElement;
//       div.style.display = "none";
//     };
//   }
// }

const itemInput = document.getElementById("itemInput");
const myList = document.getElementById("myList");
const quoteDisplay = document.getElementById("dailyQuote");

// Load list and quote when page loads
document.addEventListener("DOMContentLoaded", () => {
  loadList();
  showRandomQuote();
});

// Click on list item to toggle checked
myList.addEventListener("click", function (ev) {
  if (ev.target.tagName === "LI") {
    ev.target.classList.toggle("checked");
    updateStorage();
  } else if (ev.target.classList.contains("close")) {
    ev.target.parentElement.remove();
    updateStorage();
  }
});

// Add new list item
function newItem() {
  const listText = itemInput.value.trim();
  if (listText === "") return;

  addItemToDOM(listText, false);
  itemInput.value = "";
  updateStorage();
}

// Add item to DOM
function addItemToDOM(text, checked) {
  const listItem = document.createElement("li");
  listItem.textContent = text;
  if (checked) listItem.classList.add("checked");

  const span = document.createElement("SPAN");
  span.textContent = "\u00D7";
  span.className = "close";
  listItem.appendChild(span);

  myList.appendChild(listItem);
}

// Save current list to localStorage
function updateStorage() {
  const items = [];
  const listItems = myList.getElementsByTagName("li");
  for (let li of listItems) {
    items.push({
      text: li.firstChild.textContent,
      checked: li.classList.contains("checked"),
    });
  }
  localStorage.setItem("wanderList", JSON.stringify(items));
}

// Load list from localStorage
function loadList() {
  const data = JSON.parse(localStorage.getItem("wanderList")) || [];
  data.forEach((item) => addItemToDOM(item.text, item.checked));
}

// Optional: Random travel quote generator
function showRandomQuote() {
  const quotes = [
    "'Not all those who wander are lost.' — J.R.R. Tolkien",
    "'Travel far enough, you meet yourself.' — David Mitchell",
   //"Life is short and the world is wide.",
    "'The journey, not the arrival, matters.' — T.S. Eliot",
   // "Jobs fill your pockets, but adventures fill your soul.",
    "'Take only memories, leave only footprints'. — Chief Seattle",
    "'Travel far, travel often, and travel without regrets.' - Oscar Wilde",
    "'Travel brings power and love back into your life.' - Rumi",
    "'The core of mans' spirit comes from new experiences.' - Jon Krakauer, Into the Wild",
    "'A good traveler has no fixed plans, and is not intent on arriving.' - Lao Tzu",
    "'The world is a book, and those who don't travel read only one page.' - St. Augustine",
    "'A ship in harbor is safe, but that is not what ships are built for' - John A. Shedd",
    "'It is better to travel than to arrive.' - Buddha",
  ];

  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteDisplay.textContent = quotes[randomIndex];
}

itemInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    newItem();
  }
});
