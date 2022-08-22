import Ship from "../modules/ship";

test("Test The Ship Class", () => {
    const ship = new Ship(3);

    // test the hit function
    ship.hit(0);
    ship.hit(2);
    expect(ship.hits).toEqual([true, false, true]);

    // test the is sunk function
    expect(ship.isSunk()).toBe(false);
});