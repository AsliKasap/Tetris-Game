import "./reset.css";
import "./style.css" ;
import {createGrid, elements} from "./functions/grid";
import {tetrominoes} from "./constant/tetrominos"
import { GRID_WIDTH } from "./constant/grid";
import { setCurrentValues } from "../currentValues";
import { start } from "./functions/tetrominosControl";


const gridItems=elements;
setCurrentValues("elements",gridItems);

document.querySelector("#start-button").addEventListener("click",()=>{
const startTetrisInterval=()=>{
     start();
    };
const timer = setInterval(startTetrisInterval,800);

});

/*
const blocks = createGrid();

const getRandomNumber = (max)=>{
    const randomNum= Math.floor(Math.random()*max);
    return randomNum;
}
const currentTetromino=tetrominoes[getRandomNumber(5)];
const currentRotation = currentTetromino[getRandomNumber(currentTetromino.length)];

const colors=["#FFBF00","#DE3163","#6495ED","#2ECC71"];

const randomColor=colors[getRandomNumber(colors.length)];

const startingPoint=Math.floor(GRID_WIDTH/2)-2;

currentRotation.forEach((index)=>{
    console.log(index);
    blocks[startingPoint + index].classList.add("filled");
    blocks[startingPoint + index].style.backgroundColor= randomColor;

}); 
*/