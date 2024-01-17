export class Utils{
    /**
     * Return a DOM element on this id
     * 
     * @param {string} id 
     * @returns {HTMLElement}
     */
    static get(id) {
        return document.getElementById(id);
    }
}