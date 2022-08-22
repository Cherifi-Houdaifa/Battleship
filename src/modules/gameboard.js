class Gameboard {
    constructor () {
        // create an array that represents each coordinate on the grid
        this.coordinates = (() => {
            let arr = [];
            let subArr = [];
            for (let j = 0; j < 10; j++) {
                subArr.push(null);
            }

            for (let i = 0; i < 10; i++) {
                arr.push(subArr);
            }
            return arr;
        })();

        this.ships = [];
    }
    placeShip(ship, coords) {
        // check if the ship is outside of the grid
        if (ship.Xaxis && coords[1] + ship.length - 1 > 9) {
            throw Error ("Ship Outside The Grid");
        } 
        else if (!ship.Xaxis && coords[0] + ship.length - 1 > 9) {
            throw Error ("Ship Outside The Grid");
        }
        if (this.coordinates[coords[1]][coords[0]] !== null) {
            throw Error("Ship is Already Placed Here");
        }
        // TODO: Check if a ship is placed in the coordinate of the ship
        // like this Xaxis this.coordinates[coords[1]][coords[0 + 1]]
        //                 this.coordinates[coords[1]][coords[0 + 2]]
        //                 this.coordinates[coords[1]][coords[0 + 3]]
        // which means there are no ship in the line of this ship

        
        this.ships.push(ship);

    }
    receiveAttack(coords) {

    }
}
export default Gameboard;