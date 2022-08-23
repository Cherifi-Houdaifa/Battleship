import Gameboard from "../modules/gameboard";

// game board needs the ship class to work
import Ship from "../modules/ship";

test("Gameboard Class Test", () => {
    const gameboard = new Gameboard();
    
    gameboard.placeShip(new Ship(3, true), [0, 0]);
    gameboard.placeShip(new Ship(4, false), [4, 4]);

    gameboard.receiveAttack([4, 4]);
    gameboard.receiveAttack([5, 4]);

    expect(gameboard.ships[1].ship.hits[0]).toBe(true);

    expect(gameboard.coordinates[4][5]).toMatch("w");

    expect(gameboard.areSunk()).toBe(false);
})