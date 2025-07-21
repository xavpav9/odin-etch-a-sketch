const grid = document.querySelector("#grid");
createGrid(16);

const changeSizeBtn = document.querySelector(".change-size");
changeSizeBtn.addEventListener("click", () => {
  let newSize = 0;
  while (newSize > 100 || newSize < 1 || isNaN(newSize)) {
    newSize = prompt("Enter a new size, between 1 and 100");
    if (newSize === null || newSize === "") return;
    newSize = +newSize;
    console.log(newSize, typeof newSize);
  };
  createGrid(newSize);
});


function createGrid(size) {
  while (grid.firstElementChild) grid.firstElementChild.remove();
  const newWidth = (100 / size).toString() + "vw";
  for (let o = 0; o < size; ++o) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let i = 0; i < size; ++i) {
      const square = document.createElement("div");
      square.setAttribute("class", "square");
      square.style.width = newWidth;
      square.style.height = newWidth;
      square.addEventListener("mouseenter", evt => evt.target.style.backgroundColor = "black");
      row.appendChild(square);
    };
    grid.appendChild(row);
  };
};
