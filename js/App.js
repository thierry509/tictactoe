import { Game } from "./Game.js";
const game = new Game(17);
game.launch();
let coup = new Array();







function fillWin(cases) {

}



function coordElement(target) {
    x = target.classList[1];
    y = target.classList[2];
    return [x, y == undefined ? x : y];
}
function targetElement(coord = []) {
    return document.querySelectorAll('.box')
}

function verifiWin(target) {

    let coord = coordElement(target);
    let boxes = targetElement(coord)
    for (let i = 0; i < cases; i++) {
        console.log(boxes[i].textContent)

    }
    // for(let box of ){
    //     console.log(box);
    //     if(box.classL){    
    //         console.log(box.textContent)
    //     }
    // }
    // console.log(targetElement(coord)[1].classList[1])
    // for(let i = 0; i <= cases; i++){
    //     if(coord[0])
    // }
    //    console.log("(" + coord[0] + "," + coord[1] + ")")  
}