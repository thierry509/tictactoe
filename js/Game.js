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
        this.updateScreen();
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
        if (box.textContent.trim() === "") {
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
                    finalResult.score++;
                    Graphic.clearBox();
                    this.updateScore()
                    alert(finalResult.name + " is Wining");
                }
            }
            this.roundPlayer = this.roundPlayer == this.player1 ? this.player2 : this.player1;


            this.updateScreen();
        }
    }


    verify(cases) {

        const STEP = 1,
            MIN = 0,
            MAX = 16,
            POSITION = cases.split(','),
            MON_CONST = 4

        for (let i = 0; i < MON_CONST; i++) {

            let actual_position_pion,
                count_five_align_pion = 0,
                content_element

            if (i < 2) {
                actual_position_pion = parseInt(POSITION[((MON_CONST - 2) - (i + 1))])
            }
            if (i >= 2) {
                actual_position_pion = [parseInt(POSITION[0]), parseInt(POSITION[1])]
            }


            do {

                content_element = ''
                if (i == 0) {
                    actual_position_pion += -STEP
                }
                if (i == 1) {
                    actual_position_pion += -STEP
                }

                if (i >= 2) {
                    if (i == 2) {
                        actual_position_pion[0] += -STEP
                        actual_position_pion[1] += -STEP
                    } else {
                        actual_position_pion[0] += -STEP
                        actual_position_pion[1] += STEP
                    }

                }

                if ((i < 2 && actual_position_pion >= MIN) || (i >= 2 && actual_position_pion[0] >= MIN && actual_position_pion[1] >= MIN)) {

                    let ID_actual_pion
                    /*variable ayant tenu l'id a rechercher*/
                    if (i == 0) {
                        ID_actual_pion = POSITION[0] + ',' + actual_position_pion
                    }
                    if (i == 1) {
                        ID_actual_pion = actual_position_pion + ',' + POSITION[1]
                    }

                    if (i >= 2) {
                        ID_actual_pion = actual_position_pion.join(',')
                    }


                    content_element = document.getElementById(ID_actual_pion).textContent;
                }

            } while (content_element == this.roundPlayer.letter);


            if (i == 0) {
                actual_position_pion += STEP
            }
            if (i == 1) {
                actual_position_pion += STEP
            }
            if (i >= 2) {
                if (i == 2) {
                    actual_position_pion[0] += STEP
                    actual_position_pion[1] += STEP
                } else {
                    actual_position_pion[0] += STEP
                    actual_position_pion[1] += -STEP
                }
            }



            do {
                content_element = ''
                if (i < 2) {
                    actual_position_pion += STEP
                } else {
                    if (i == 2) {
                        actual_position_pion[0] += STEP
                        actual_position_pion[1] += STEP
                    } else {
                        actual_position_pion[0] += STEP
                        actual_position_pion[1] += -STEP
                    }
                }

                if ((i < 2 && actual_position_pion <= MAX) || i >= 2 && actual_position_pion[0] <= MAX && actual_position_pion[1] <= MAX) {

                    let ID_actual_pion
                    
                    if (i == 0) {
                        ID_actual_pion = POSITION[0] + ',' + actual_position_pion
                    }
                    if (i == 1) {
                        ID_actual_pion = actual_position_pion + ',' + POSITION[1]
                    }
                    if (i >= 2) {
                        ID_actual_pion = actual_position_pion.join(',')
                    }

                    content_element = document.getElementById(ID_actual_pion).textContent;
                    count_five_align_pion++
                    if (count_five_align_pion > 4) {

                        return this.roundPlayer
                    }
                }
            } while (content_element == this.roundPlayer.letter);

        }
        return null

    }


}