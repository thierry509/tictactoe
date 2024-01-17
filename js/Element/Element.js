export class Element{
    Create(tagName, className = []) {
        elem = document.createElement(tagName);
        className.map(item=>
            elem.classList.add(item)
            );
    }
    add(){
        window.alert("add");
    }
}