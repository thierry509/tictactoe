export class Player{
    /**
     * 
     * @param {string} id 
     * @param {string} name 
     * @param {string} lettre 
     */
    constructor(id, name, letter, avatar){
        this.id = id;
        this.name = name;
        this.letter = letter
        this.score = 0;
        this.avatar = avatar || 'default.png';
    }

    win(){
        this.score += 1;
    }
}