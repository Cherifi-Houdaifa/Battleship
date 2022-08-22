import Gameboard from "../modules/gameboard";
import Ship from "../modules/ship";

test("Gameboard Class Test", () => {
    const gameboard = new Gameboard();
    
    gameboard.placeShip(new Ship(3, true), [0, 0]);
})