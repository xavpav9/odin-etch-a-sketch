const grid = document.querySelector("#grid");
const changeResolutionBtn = document.querySelector(".change-resolution");
const changeWidthBtn = document.querySelector(".change-width");
const changeColourBtn = document.querySelector(".change-colour")
const colours = [{name: "Black", class: "black", colourFunction: () => {return "black"}},
               {name: "RGB", class: "rgb", colourFunction() {return `rgb(${Math.floor(Math.random() * 255)} ${Math.floor(Math.random() * 255)} ${Math.floor(Math.random() * 255)})`}}, 
               {name: "Erase", class: "erase", colourFunction() {return "white"}}
]

let percentage = 70;
let size = 16;
let currentColour = 0;
let gridMouseDown = false;

changeResolutionBtn.textContent += size;
changeWidthBtn.textContent += percentage + "%";
changeColourBtn.textContent += colours[currentColour % 3].name;

window.addEventListener("resize", () => { 
  const allSquares = document.querySelectorAll(".square");
  allSquares.forEach(square => {
    const newWidth = (grid.clientWidth / size).toString() + "px";
    square.style.width = newWidth;
    square.style.height = newWidth;
  })
});

createGrid();
setGridWidth();

changeResolutionBtn.addEventListener("click", () => {
  let newSize = getUserInputNumber(1, 100, "number");
  if (newSize === null) return;
  size = newSize;
  let text = changeResolutionBtn.textContent.split(": ");
  text[1] = size;
  changeResolutionBtn.textContent = text.join(": ");


  createGrid();
});


changeWidthBtn.addEventListener("click", () => {
  let newPercentage = getUserInputNumber(1, 100, "pecentage");
  if (newPercentage === null) return;
  percentage = newPercentage;
  let text = changeWidthBtn.textContent.split(": ");
  text[1] = percentage + "%";
  changeWidthBtn.textContent = text.join(": ");

  setGridWidth();
});


changeColourBtn.addEventListener("click", () => {
  currentColour++;

  changeColourBtn.classList.remove(colours[(currentColour + colours.length - 1) % colours.length].class);
  changeColourBtn.classList.add(colours[currentColour % colours.length].class);

  let changeColourBtnText = changeColourBtn.textContent.split(" ")[0] + " " + colours[currentColour % colours.length].name;
  changeColourBtn.textContent =  changeColourBtnText; 
});

function getUserInputNumber(low, high, display) {
  let num = NaN;
  while (num > high || num < low || isNaN(num)) {
    num = prompt(`Enter a ${display} between ${low} and ${high}.`);
    if (num === null || num === "") return null;
    num = +num;
  };
  return num;
};

function createGrid() {
  while (grid.firstElementChild) grid.firstElementChild.remove();
  const newWidth = (grid.clientWidth / size).toString() + "px";
  for (let o = 0; o < size; ++o) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let i = 0; i < size; ++i) {
      const square = document.createElement("div");
      square.setAttribute("class", "square");
      square.style.width = newWidth;
      square.style.height = newWidth;
      square.addEventListener("mouseenter", evt => {
        if (gridMouseDown) {
          evt.target.style.backgroundColor = colours[currentColour % colours.length].colourFunction();
        };
      });
      square.addEventListener("mousedown", evt => {
        if (evt.button === 0) {
          gridMouseDown = true;
          evt.target.style.backgroundColor = colours[currentColour % colours.length].colourFunction(); // so square clicked on is coloured
          evt.preventDefault();
        }
      });
      window.addEventListener("mouseup", () => {if (gridMouseDown) gridMouseDown = false}); // so that any mouseup turns it off
      row.appendChild(square);
    };
    grid.appendChild(row);
  };
};

function setGridWidth() {
  grid.style.width =`${percentage}vw`;
  window.dispatchEvent(new Event("resize"));
}
