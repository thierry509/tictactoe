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
            if (this.roundPlayer === this.player1) {
                box.classList.add('play-1')

            }
            else if (this.roundPlayer === this.player2) {
                box.classList.add('play-2')

            }
            this.countPionPlay++
            if (this.countPionPlay > 8) {
                let finalResult
                if ((finalResult = this.verify(box.id)) != null) {
                    alert(finalResult.name + " is Wining");
                }
            }
            this.roundPlayer = this.roundPlayer == this.player1 ? this.player2 : this.player1;


            this.updateScreen();
        }
    }


    verify(cases) {


        const tableWinnerVerify = [
            /* "O" || "E" || "N" || "S" */ + 1,
            /* "NO" || "SE": */[+1, -1],
            /* "NE" ||  "SO": */[-1, +1]
        ]

        let position = cases.split(',')
        console.log(" coordornnes du pion actuel : " + position[0] + ',' + position[1])

        const monConst = 2
        for (let i = 0; i < monConst; i++) {

            let initialPosition = parseInt(position[(monConst - (i + 1))]),
                index = 0,
                contenuElem
            console.log("retenu : " + initialPosition)


            console.log("<<<<<<<<<<<<<<<<<<<<<<<<")
            do {

                initialPosition += -tableWinnerVerify[0]
                if (i == 0) {
                    console.log("EN HORIZONTAL")
                    console.log(" coordornnes du nouveau pion: " + position[0] + ',' + initialPosition)
                }
                if (i == 1) {
                    console.log("EN VERTICAL")
                    console.log(" coordornnes du nouveau pion: " + initialPosition + ',' + position[1])

                }

                if (initialPosition >= 0) {
                    let farPionCaseSTR
                    /*variable ayant tenu l'id a rechercher*/
                    if (i == 0) {
                        console.log("EN HORIZONTAL")
                        farPionCaseSTR = position[0] + ',' + initialPosition
                    }
                    if (i == 1) {
                        console.log("EN VERTICAL")
                        farPionCaseSTR = initialPosition + ',' + position[1]
                    }

                    console.log("ID construit : " + farPionCaseSTR)

                    contenuElem = document.getElementById(farPionCaseSTR).textContent;
                    console.log("contenu element trouver : " + contenuElem)
                }

            } while (contenuElem == this.roundPlayer.letter);

            initialPosition += tableWinnerVerify[0]
            if (i == 0) {
                console.log("coordonnees du pion retenu : " + position[0] + ',' + initialPosition)
            }
            if (i == 1) {
                console.log("coordonnees du pion retenu : " + initialPosition + ',' + position[1])
            }

            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>")


            do {
                initialPosition += tableWinnerVerify[0]

                if (initialPosition <= 16) {

                    let farPionCaseSTR
                    /*variable ayant tenu l'id a rechercher*/

                    if (i == 0) {
                        farPionCaseSTR = position[0] + ',' + initialPosition
                    }
                    if (i == 1) {
                        farPionCaseSTR = initialPosition + ',' + position[1]
                    }
                    console.log("ID construit : " + farPionCaseSTR)

                    contenuElem = document.getElementById(farPionCaseSTR).textContent;
                    console.log("contenu element trouver : " + contenuElem)

                    index++
                    if (index > 4) {
                        return this.roundPlayer
                    }
                }
            } while (contenuElem == this.roundPlayer.letter);



        }

        console.log("\n\n\n")
        return null

    }

}
