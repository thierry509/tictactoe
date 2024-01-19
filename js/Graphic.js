export class Graphic {
    build(cases) {
        let table = document.querySelector('#table');
        table.style.display = 'grid';
        table.style.gridTemplateColumns = "repeat(" + cases + ", 31px)";
        table.style.gridTemplateRows = "repeat(" + cases + ", 31px)";
        let element = new Array();
        for (let i = 0; i < cases; i++) {
            for (let j = 0; j < cases; j++) {
                let position = `${i},${j}`;
                element.push(this.createElement('div', position, ['box']));
            }
        }
        element.map(elem => {
            table.append(elem);
        }
        );
    }

    createElement = (tagName, id, classNames) => {
        let elem = document.createElement(tagName)
        elem.id = id
        classNames.map(className =>
            elem.classList.add(className)
        );
        return elem;
    }

    static clearBox = () => {
        document.querySelectorAll('.box').forEach((item)=>{
            item.textContent = ""
        });
    }
}