import { Player } from "./Player.js";
export class Game {
    constructor() {
        this.player1 = new Player('001', 'lakay', 'X');
        this.player2 = new Player('002', 'Envite', 'O');
        this.roundPlayer = this.player1;
        this.addPions = this.addPions.bind(this);
        
        
        document.querySelector('.top .player-1 span').textContent = this.player1.name;
        document.querySelector('.top .player-2 span').textContent = this.player2.name;
        document.querySelector('.score .play-1').textContent = this.player1.letter;
        document.querySelector('.score .play-2').textContent = this.player2.letter;

        this.player1.win();
        this.updateScore();
    }

    updateScore = () => {
        const scoreBox = document.querySelector('.score .head .data');
        scoreBox.querySelector('.player-1').textContent = this.player1.score;
        scoreBox.querySelector('.player-2').textContent = this.player2.score;
    }

    launch() {
        this.updateScore();
        let boxes = document.querySelectorAll('.box');
        for (let box of boxes) {
            box.addEventListener('click',  ()=>{
                this.addPions(box)
            })
        }        
    }

    updateScreen(){
        const player1Box = document.querySelector('.top .player.player-1');
        const player2Box = document.querySelector('.top .player.player-2');
        if(this.roundPlayer === this.player1){
            player1Box.classList.add('turn');
            player2Box.classList.remove('turn');
        }
        else if(this.roundPlayer === this.player2){
            player2Box.classList.add('turn');
            player1Box.classList.remove('turn');
        }
    }

    addPions(box) {
        if (box.textContent.trim() === '') {
            box.innerText = this.roundPlayer.letter;
            this.roundPlayer = this.roundPlayer == this.player1 ? this.player2 : this.player1;
            this.updateScreen();
        }
    }
}