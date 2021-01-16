import { getCurrentValues, setCurrentValues } from "../../currentValues";
import { GRID_WIDTH } from "../constant/grid";
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
};