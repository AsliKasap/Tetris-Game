import {GRID_SIZE} from "../constant/grid";

const $tetrisRootElement = document.querySelector("#tetris-grid");

export const createGrid = () => {
  for(let i=0;i<GRID_SIZE;i++){
      const singleBlock = document.createElement("div");
      singleBlock.classList.add("tetris-grid-item");
    $tetrisRootElement.appendChild(singleBlock);
  }  

return Array.from(document.querySelectorAll(".tetris-grid-item"));
}
export const elements = createGrid();