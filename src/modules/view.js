// view.js
// this file manages the dom manipulation
import "../styles/style.css";

const populateBoard = (div) => {
    for (let i = 0; i < 10; i++) {
        const subDiv = document.createElement("div");
        subDiv.classList.add("cells")
        for(let j = 0; j < 10; j++) {
            const subSubDiv = document.createElement("div");
            subSubDiv.classList.add("cell");

            subDiv.appendChild(subSubDiv);
        }
        div.appendChild(subDiv);
    }
}

export {
    populateBoard,
}