import { populateBoard } from "./modules/view";
import { Player, Ai } from "./modules/player";
import { Gameboard } from "./modules/gameboard";
import Ship from "./modules/ship";
import { sample } from "lodash"


// an Array that contains multiple ship placments for the ships
// you can use it for both player and Ai

let shipPlacements = [
    [
        { ship: new Ship(5, true), coords: [2, 2] },
        { ship: new Ship(4, false), coords: [8, 5] },
        { ship: new Ship(3, true), coords: [3, 8] },
        { ship: new Ship(3, false), coords: [6, 7] },
        { ship: new Ship(2, true), coords: [0, 8] },
    ],
    [
        { ship: new Ship(5, false), coords: [7, 3] },
        { ship: new Ship(4, true), coords: [2, 6] },
        { ship: new Ship(3, true), coords: [2, 1] },
        { ship: new Ship(3, true), coords: [0, 9] },
        { ship: new Ship(2, false), coords: [8, 1] },
    ],
    [
        { ship: new Ship(5, false), coords: [7, 5] },
        { ship: new Ship(4, true), coords: [1, 3] },
        { ship: new Ship(3, false), coords: [8, 1] },
        { ship: new Ship(3, true), coords: [1, 7] },
        { ship: new Ship(2, true), coords: [0, 0] },
    ],
];

window.addEventListener("load", () => {

    // QUICK NOTE: this is not an AI
    // the ai gameboard is the player gameboard
    const ai = new Ai(new Gameboard());
    // place Ai ships
    let aiShips = sample(shipPlacements);

    
    console.log(shipPlacements.indexOf(aiShips));
    shipPlacements.splice(shipPlacements.indexOf(aiShips), 1);
    for (let i = 0; i < aiShips.length; i++) {
        ai.gameboard.placeShip(aiShips[i].ship, aiShips[i].coords);
    }


    const aiBoard = document.querySelector(".board");
    populateBoard(aiBoard);
    const aiCellsDivs = aiBoard.querySelectorAll(".cells");
    // add ship class to ships
    aiCellsDivs.forEach((cells, papaKey) => {
        cells.querySelectorAll("div.cell").forEach((cell, childKey) => {

            if (ai.gameboard.coordinates[papaKey][childKey] !== null) {
                cell.classList.add("ship");
            }
        })
    })

    

    function aiPlay() {
        let stat = ai.attack();
        while (stat === null) {
            stat = ai.attack();
        }
        const cells = aiBoard.querySelector(
            `div.cells:nth-child(${stat[1][1] + 1})`
        );
        const cell = cells.querySelector(
            `div.cell:nth-child(${stat[1][0] + 1})`
        );
        if (stat[0] === "w") {
            // touched water
            cell.classList.add("water");
        } else if (stat[0] === true) {
            // a hit
            cell.classList.add("hit");
        }
    }

    // the game board for the player is the game board of the opponent
    const player = new Player(new Gameboard());

    let playerShips = sample(shipPlacements);
    
    console.log(shipPlacements.indexOf(playerShips));
    for (let i = 0; i < playerShips.length; i++) {
        player.gameboard.placeShip(playerShips[i].ship, playerShips[i].coords);
    }

    const playerBoard = document.querySelector(".board:last-of-type");
    populateBoard(playerBoard);
    const cellsDivs = playerBoard.querySelectorAll(".cells");
    cellsDivs.forEach((cellsDiv, papaKey) => {
        const cells = cellsDiv.querySelectorAll(".cell");
        cells.forEach((cell, childKey) => {
            cell.addEventListener("click", function clickCallback(e) {
                // console.log(e.target);
                const coords = [papaKey, childKey].reverse();
                const stat = player.attack(coords);
                // desactivate the cell
                if (stat === "w") {
                    // touched water
                    e.target.classList.add("water");
                } else if (stat === true) {
                    // a hit
                    e.target.classList.add("hit");
                }
                // check if player win
                if (player.gameboard.areSunk()) {
                    // show popup and replay btn
                    const popup = document.querySelector(".game-end-popup");
                    popup.querySelector("h1").textContent = "You Won";
                    popup.classList.add("show");
                    document.querySelector("main").classList.add("hide");
                }
                // Ai play

                aiPlay();

                // check if Ai win
                if (ai.gameboard.areSunk()) {
                    // show popup and replay btn
                    const popup = document.querySelector(".game-end-popup");
                    popup.querySelector("h1").textContent = "You Lost";
                    popup.classList.add("show");
                    document.querySelector("main").classList.add("hide");

                }

                e.target.removeEventListener("click", clickCallback);
            });
        });
    });
});
