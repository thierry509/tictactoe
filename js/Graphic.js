export class Graphic {
    build(row, col) {
        let table = document.querySelector('#table');
        let cases = 10;
        table.style.display = 'grid';
        table.style.gridTemplateColumns = "repeat(" + row + ", 31px)";
        table.style.gridTemplateRows = "repeat(" + col + ", 31px)";
        let element = new Array();
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                element.push(this.createElement('div', ['box', i, j]));
            }
        }
        element.map(elem => {
            table.append(elem);
        }
        );
    }

    createElement = (tagName, classNames) => {
        let elem = document.createElement(tagName)
        classNames.map(className =>
            elem.classList.add(className)
        );
        return elem;
    }
}