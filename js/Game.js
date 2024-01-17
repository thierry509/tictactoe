import { Player } from "./Player.js";
import { Graphic } from "./Graphic.js";
import { Utils } from "./Utils.js";
export class Game {
    constructor(cases) {
        this.cases = cases;
        this.player1 = new Player('001', 'lakay', 'X');
        this.player2 = new Player('002', 'Envite', 'O');
        this.roundPlayer = this.player1;
        this.addPions = this.addPions.bind(this);

        new Graphic().build(cases);
        document.querySelector('.top .player-1 span').textContent = this.player1.name;
        document.querySelector('.top .player-2 span').textContent = this.player2.name;
        document.querySelector('.score .play-1').textContent = this.player1.letter;
        document.querySelector('.score .play-2').textContent = this.player2.letter;
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
            box.addEventListener('click', () => {
                this.addPions(box)
            })
        }
    }

    updateScreen() {
        const player1Box = document.querySelector('.top .player.player-1');
        const player2Box = document.querySelector('.top .player.player-2');
        if (this.roundPlayer === this.player1) {
            player1Box.classList.add('turn');
            player2Box.classList.remove('turn');
        }
        else if (this.roundPlayer === this.player2) {
            player2Box.classList.add('turn');
            player1Box.classList.remove('turn');
        }
    }

    /**
     * 
     * @param {HTMLElement} box 
     */
    addPions(box) {
        if (box.textContent.trim() === '') {
            box.innerText = this.roundPlayer.letter;
            if (this.roundPlayer === this.player1) {
                box.classList.add('play-1')
            }
            else if (this.roundPlayer === this.player2) {
                box.classList.add('play-2')
            }
            this.roundPlayer = this.roundPlayer == this.player1 ? this.player2 : this.player1;
            this.verifWin(box)
            this.updateScreen();
        }
    }

    /**
     * 
     * @param {HTMLElement} cases 
     */
    verifWin(cases) {
        let winArray1 = [],
            winArray2 = [],
            winArray3 = [],
            winArray4 = [],
            winArray5 = [],
            winArray6 = [],
            winArray7 = [],
            winArray8 = [];
        const coord = cases.id.split(',');
        if (coord[0] >= 4) {
            for (let i = 0; i <= 4; i++) {
                if ((coord[0] - i) >= 0) {
                    winArray1.push(`${coord[0] - i},${coord[1]}`)
                }
            }
        }
        if (coord[1] >= 5) {
            for (let i = 0; i <= 4; i++) {
                winArray2.push(`${coord[0]},${coord[1] - i}`)
            }
        }
        if (coord[0] <= this.cases - 5) {
            for (let i = 0; i <= 4; i++) {
                winArray3.push(`${parseInt(coord[0]) + 1},${coord[1]}`)
            }
        }
        if (coord[1] <= this.cases - 5) {
            for (let i = 0; i <= 4; i++) {
                winArray4.push(`${coord[0]},${parseInt(coord[1]) + 1}`)
            }
        }

        if (this.arrayWin(coord, winArray1) || this.arrayWin(coord, winArray2) ||
            this.arrayWin(coord, winArray3) || this.arrayWin(coord, winArray4)) {
                alert("Wining");
        }
    }

    arrayWin(coords, list) {
        let elem = Utils.get(coords)
        let loop = true, i = 0;
        while (loop && i < 3) {
            console.log(elem)
            if (!(elem.textContent === Utils.get(list[i]).textContent)) {
                loop = false;
            }
            i++;
        }
        console.log();
        return true;
    }
}