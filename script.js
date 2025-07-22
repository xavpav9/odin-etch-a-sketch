const grid = document.querySelector("#grid");
const changeResolutionBtn = document.querySelector(".change-resolution");
const changeWidthBtn = document.querySelector(".change-width");
const changeColourBtn = document.querySelector(".change-colour");
const changeEffectBtn = document.querySelector(".change-darken");
const clearScreenBtn = document.querySelector(".clear-screen");
const colours = [{name: "Black", class: "black", colourFunction: () => {return "black"}},
               {name: "RGB", class: "rgb", colourFunction() {return `rgb(${Math.floor(Math.random() * 255)} ${Math.floor(Math.random() * 255)} ${Math.floor(Math.random() * 255)})`}}, 
               {name: "Erase", class: "erase", colourFunction() {return "white"}}
];
const effects = [{name: "Opaque", class: "opaque", opacityIncrease: 1},
                {name: "Darkening", class: "darkening", opacityIncrease: 0.1}
];

let percentage = 50;
let size = 16;
let currentColour = 0;
let gridMouseDown = false;
let currentEffect = 0;

changeResolutionBtn.textContent += size;
changeWidthBtn.textContent += percentage + "%";
changeColourBtn.textContent += colours[currentColour % colours.length].name;
changeEffectBtn.textContent += effects[currentEffect  % effects.length].name;

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
  let newSize = getUserInputNumber(2, 64, "number");
  if (newSize === null) return;
  size = newSize;
  let text = changeResolutionBtn.textContent.split(": ");
  text[1] = size;
  changeResolutionBtn.textContent = text.join(": ");


  createGrid();
  doGreenPulse(changeResolutionBtn);
});


changeWidthBtn.addEventListener("click", () => {
  let newPercentage = getUserInputNumber(25, 75, "pecentage");
  if (newPercentage === null) return;
  percentage = newPercentage;
  let text = changeWidthBtn.textContent.split(": ");
  text[1] = percentage + "%";
  changeWidthBtn.textContent = text.join(": ");

  setGridWidth();
  doGreenPulse(changeWidthBtn);
});


changeColourBtn.addEventListener("click", () => {
  currentColour++;

  changeColourBtn.classList.remove(colours[(currentColour + colours.length - 1) % colours.length].class);
  changeColourBtn.classList.add(colours[currentColour % colours.length].class);

  let changeColourBtnText = changeColourBtn.textContent.split(": ")[0] + ": " + colours[currentColour % colours.length].name;
  changeColourBtn.textContent = changeColourBtnText; 
});

clearScreenBtn.addEventListener("click", () => {
  let clearScreen = confirm("Are you sure that you want to clear the screen?");
  if (clearScreen) {
    createGrid();
    doGreenPulse(clearScreenBtn);
  };
});

changeEffectBtn.addEventListener("click", () => {
  currentEffect++;

  changeEffectBtn.classList.remove(effects[(currentEffect + effects.length - 1) % effects.length].class);
  changeEffectBtn.classList.add(effects[currentEffect % effects.length].class);

  let changeEffectBtnText = changeEffectBtn.textContent.split(": ")[0] + ": " + effects[currentEffect % effects.length].name;
  changeEffectBtn.textContent =  changeEffectBtnText; 
});

function doGreenPulse(button) {
  for (let i = 0; i <= 10; ++i) {
    setTimeout(() => button.style.backgroundColor = `rgb(${Math.floor(240 - (240/10 * i))}, 240, ${Math.floor(240 - (240/10 * i))})`, i*50);   
    setTimeout(() => button.style.backgroundColor = `rgb(${Math.floor(240/10 * i)}, 240, ${Math.floor(240/10 * i)})`, 500 + i*50);   
  };
};

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
          newOpacity = effects[currentEffect % effects.length].opacityIncrease + +evt.target.style.opacity;
          evt.target.style.opacity = (newOpacity > 1 || colours[currentColour % colours.length].name === "Erase") ? 1 : newOpacity;
          evt.target.style.backgroundColor = colours[currentColour % colours.length].colourFunction();
        };
      });
      square.addEventListener("mousedown", evt => {
        if (evt.button === 0) {
          gridMouseDown = true;
          evt.target.dispatchEvent(new Event("mouseenter")); // so square clicked on is coloured
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
