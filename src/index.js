import "./reset.css";
import "./style.css" ;
import {createGrid, elements} from "./functions/grid";
import {tetrominoes} from "./constant/tetrominos"
import { GRID_WIDTH } from "./constant/grid";
import { setCurrentValues } from "../currentValues";
import {  start,isGameOver} from "./functions/tetrominosControl";

//const username=prompt("Your Name");

if(window.localStorage.getItem("highestScore")){
    document.querySelector("span").innerHTML=window.localStorage.getItem("highestScore");

}else{
    document.querySelector("span").innerHTML=0;
}

const gridItems=elements;
setCurrentValues("elements",gridItems);
document.querySelector("#start-button").addEventListener("click",()=>{
    document.querySelector("#player").play();
    startInvertal()
    if(isGameOver){
        window.location.reload(true);
        }
});

const startInvertal=()=>{

  const startTetrisInterval=()=>{
    start();
    };
const timer = setInterval(startTetrisInterval,800);
setCurrentValues("timer",timer);

}

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