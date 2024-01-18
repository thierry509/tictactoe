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
        this.countPionPlay = 0;

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
            this.roundPlayer.thisCoord = box.id;
            if (this.roundPlayer === this.player1) {
                box.classList.add('play-1')
                box.classList.add(this.player1.id)

            }
            else if (this.roundPlayer === this.player2) {
                box.classList.add('play-2')
                box.classList.add(this.player2.id)

            }
            this.countPionPlay++
            if (this.countPionPlay > 8) {
                let finalResult
                if ((finalResult = this.verify()) != null) {
                    alert(finalResult.name + " is Wining");
                }
            }
            this.roundPlayer = this.roundPlayer == this.player1 ? this.player2 : this.player1;


            this.updateScreen();
        }
    }


    verify() {
        const winPions = 5
        let left = 0.4, right = 4.0, both = 4.4;
        const tableWinnerVerify = [
            /* "O" */ - 0.1,
            /* "NO" */ - 1.1,
            /* "N": */ - 1.0,
            /* "NE": */ -0.9,
            /* "E": */ + 0.1,
            /* "SE": */ + 1.1,
            /* "S": */ + 1.0,
            /* "SO": */ 0.9
        ]

        for (let direction of tableWinnerVerify) {

            console.log("-----------------------------------------------------------------------")
            console.log("direction : " + direction)

            let coordFar = parseFloat(this.roundPlayer.thisCoord.split(',').join('.')) + (4 * direction)

            console.log(" coordornnes du pion actuel " + this.roundPlayer.thisCoord)
            console.log(" coordornnes de loin : " + coordFar)

            for (let i = 0; i < winPions; i++) {

                /* controle la case la plus loin qui soit le 5eme dans nimporte quel direction*/
                if (coordFar >= 0.0 && coordFar <= 16.16) {

                    /*variable ayant tenu l'id a rechercher*/
                    let farPionCaseSTR = (coordFar - parseInt(coordFar) >= 0.14 && coordFar - parseInt(coordFar) <= 0.16 ? coordFar.toFixed(2) : coordFar.toFixed(1)).toString().split('.').join(',')
                    console.log("ID construit : " + farPionCaseSTR)

                    let elemBox = document.getElementById(farPionCaseSTR)
                    console.log("element trouver : " + elemBox)

                    let contenuElem = elemBox.getAttribute('class');
                    console.log("contenu element trouver : " + contenuElem)
                    console.log("contenu element pur trouver" + elemBox.getAttribute('class'))

                    /*si la class box ne contient pas le name du jouer courant on arrete la recherche sur ce point cardinal*/
                    if (!contenuElem.includes(this.roundPlayer.id)) {
                        break
                    }
                    coordFar += direction;
                }

            }

            if (parseFloat(coordFar) == parseFloat(this.roundPlayer.thisCoord)) {
                return this.roundPlayer
            }
        }
        return null
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