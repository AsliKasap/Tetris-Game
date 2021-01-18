import { elements } from "./src/functions/grid";
import { getRandomColor, getRandomTetreminoe } from "./src/functions/tetrominosControl";

export const currentValues= {
    position  : 4,
    rotation  : 0, 
    tetrominoes : getRandomTetreminoe(),
    elements  : null,
    colors: getRandomColor(),
    timer: null,
    score: 0
}
export const setCurrentValues = (key,value) => {
currentValues[key]=value;
}

export const getCurrentValues=()=> {
return currentValues;
}