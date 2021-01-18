import {GRID_SIZE, GRID_WIDTH} from "../constant/grid";

const $tetrisRootElement = document.querySelector("#tetris-grid");

export const createGrid = () => {
  for(let i=0;i<GRID_SIZE;i++){
      const singleBlock = document.createElement("div");
      singleBlock.classList.add("tetris-grid-item");
    $tetrisRootElement.appendChild(singleBlock);
  }  
for(let j=0;j<GRID_WIDTH;j++){
  const extraBlock = document.createElement("div");
  extraBlock.classList.add("tetris-grid-item")
  extraBlock.classList.add("wall");
  extraBlock.classList.add("taken");
  $tetrisRootElement.appendChild(extraBlock);
}
return Array.from(document.querySelectorAll(".tetris-grid-item"));
}
export const elements = createGrid();