import { getCurrentValues, setCurrentValues } from "../../currentValues";
import { GRID_SIZE, GRID_WIDTH } from "../constant/grid";
import { colors, tetrominoes } from "../constant/tetrominos"
import { elements } from "./grid";




export const getRandomTetreminoe = ()=> { 
    const randomNum=Math.floor(Math.random() * tetrominoes.length);
    return tetrominoes[randomNum];
}
export const getRandomColor =()=>{
    
    const randomNum=Math.floor(Math.random() * colors.length);
    return colors[randomNum];
}
export const draw = () => {
const{position,rotation,tetrominoes,elements,colors}=getCurrentValues();
tetrominoes[rotation].forEach((blockIndex)=> {
    elements[position + blockIndex].classList.add("filled");
    elements[position + blockIndex].style.backgroundColor=colors;

    
});

};

export const undraw = ()=>{
    const{position,rotation,tetrominoes,elements}=getCurrentValues();
tetrominoes[rotation].forEach((blockIndex)=> {
    elements[position + blockIndex].classList.remove("filled");
    elements[position + blockIndex].style.backgroundColor="";
});
};

export const start = ()=>{
    const {position}=getCurrentValues();

    if(document.querySelector(".filled")){
            undraw()
         setCurrentValues("position",position + GRID_WIDTH);
 }
    
    draw();
    checkShouldStop();
};

export const checkShouldStop=()=>{
const{position,tetrominoes,rotation,elements}=getCurrentValues();
const isLast = tetrominoes[rotation].some((index)=> elements[position+index+GRID_WIDTH].classList.contains("wall"));
if(isLast){
    tetrominoes[rotation].forEach((index)=> elements[position+index].classList.add("wall"));
    setCurrentValues("tetrominoes",getRandomTetreminoe());
    setCurrentValues("position",4);
    setCurrentValues("colors",getRandomColor())
    draw();
    checkScore();
    checkGameOver();
    
}
};
export const checkScore=()=>{
    const{elements,score}=getCurrentValues();
    for(let currentIndex=0;currentIndex < GRID_SIZE - 1;currentIndex+=GRID_WIDTH){
        const row=[currentIndex,currentIndex+1,currentIndex+2,currentIndex+3,currentIndex+4,currentIndex+5,currentIndex+6,currentIndex+7 , currentIndex+8 , currentIndex+9]
        const notTaken=row.some(index=>elements[index].classList.contains("taken"))
        if(row.every(index=>elements[index].classList.contains("wall")) && !notTaken){
            let currentScore=score+10;
            setCurrentValues("score",currentScore);
            document.querySelector(".score").innerHTML=`SCORE: ${currentScore}`;
            row.forEach((index)=>{
            elements[index].classList.remove("wall");
            elements[index].classList.remove("filled");
            elements[index].style.backgroundColor="";
            });
            const removedElements=elements.splice(currentIndex,GRID_WIDTH);
            const newEls=removedElements.concat(elements);
            setCurrentValues("elements",newEls);
            newEls.forEach(cell=>document.querySelector("#tetris-grid").appendChild(cell));

        }
    }

};


export const checkGameOver=()=>{
    const{position,tetrominoes,rotation,elements,timer,score}=getCurrentValues();
    if(tetrominoes[rotation].some((index)=>{
return elements[position+index+GRID_WIDTH].classList.contains("wall")

    })){
 clearInterval(timer);
 highestScore(score);
 document.querySelector(".score").innerHTML="GAME OVER";
    }

};

export const bindEvent=()=>{
    document.addEventListener("keyup",(e)=>{
        handleControls(e);

    });
    document.querySelector("#pause-button").addEventListener("click",()=>{
        const {timer} = getCurrentValues();
        document.querySelector("#player").pause();
        clearInterval(timer);

    });
    
    document.querySelector(".sound").addEventListener("click",()=>{
        document.querySelector("#player").play();
    });

    document.querySelector(".mute").addEventListener("click",()=>{
        document.querySelector("#player").pause();
    });
};

export const moveLeft=()=>{
const {position,tetrominoes,rotation,elements} = getCurrentValues();
undraw();
const isLeftBorder= tetrominoes[rotation].some((index)=>(position+index)%GRID_WIDTH === 0);
const isWall=tetrominoes[rotation].some((index)=>elements[position+index-1].classList.contains("wall"));

if(!isLeftBorder && !isWall){
 setCurrentValues("position",position-1);   

}
draw();
};
export const moveRight=()=>{
    const {position,tetrominoes,rotation,elements} = getCurrentValues();
    undraw();
    const isRightBorder=tetrominoes[rotation].some((index)=> (index+position)%GRID_WIDTH === GRID_WIDTH-1);
    const isWall=tetrominoes[rotation].some((index)=>elements[position+index+1].classList.contains("wall"));
    if(!isRightBorder && !isWall){
      setCurrentValues("position",position+1);  
    }
    
    draw();
};
export const rotate=()=>{
const{rotation,tetrominoes,position}=getCurrentValues();
undraw();
const isLeftBorder= tetrominoes[rotation].some((index)=>(position+index)%GRID_WIDTH === 0);
const isRightBorder=tetrominoes[rotation].some((index)=> (index+position)%GRID_WIDTH === GRID_WIDTH-1);
setCurrentValues("rotation", rotation+1)
if(rotation+1 === tetrominoes.length){
    setCurrentValues("rotation",0);
}

if(isLeftBorder || isRightBorder){
 setCurrentValues("rotation",rotation);   
}
draw();
};

export const handleControls=(e)=>{
if(e.keyCode == 37){
    moveLeft();
}
if(e.keyCode == 39){
    moveRight();
}
if(e.keyCode == 38 ){
    rotate();
}
if(e.keyCode == 40){
    start();
    
}

};
bindEvent();

export const highestScore=(currentScore)=>{
    const highestScore=window.localStorage.getItem("highestScore");
    if(highestScore){
    if(currentScore > highestScore){
        window.localStorage.setItem("highestScore", currentScore);
    }
    
    document.querySelector("span").innerHTML=window.localStorage.getItem("highestScore") ;
    }else{
        window.localStorage.setItem("highestScore", currentScore);
        document.querySelector("span").innerHTML=currentScore;
    
    }
    };