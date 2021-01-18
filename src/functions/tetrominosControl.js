import { getCurrentValues, setCurrentValues } from "../../currentValues";
import { GRID_SIZE, GRID_WIDTH } from "../constant/grid";
import { colors, tetrominoes } from "../constant/tetrominos"

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
    const{position,rotation,tetrominoes,elements,colors}=getCurrentValues();
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
    

};


export const checkGameOver=()=>{
    const{position,tetrominoes,rotation,elements,timer}=getCurrentValues();
    if(tetrominoes[rotation].some((index)=>{
return elements[position+index].classList.contains("wall")

    })){
 clearInterval(timer);
 document.querySelector(".score").innerHTML="GAME OVER";
    }

};

export const bindEvent=()=>{
    document.addEventListener("keyup",(e)=>{
        handleControls(e);

    });
};

export const moveLeft=()=>{
const {position,tetrominoes,rotation,elements} = getCurrentValues();
undraw();
const isLeftBorder= tetrominoes[rotation].some((index)=>{
    return (position+index)%GRID_WIDTH === 0});
    const isWall=tetrominoes[rotation].some((index)=> elements[index+position].classList.contains("wall") )
    console.log(isWall);
if(!isLeftBorder){
 setCurrentValues("position",position-1);   

}
draw();
};
export const moveRight=()=>{
    const {position,tetrominoes,rotation} = getCurrentValues();
    undraw();
    const isRightBorder=tetrominoes[rotation].some((index)=> (index+position)%GRID_WIDTH === GRID_WIDTH-1);
    if(!isRightBorder){
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