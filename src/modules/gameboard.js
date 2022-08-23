import Ship from "./ship";

class Gameboard {
    constructor() {
        // create an array that represents each coordinate on the grid
        this.coordinates = (() => {
            let arr = [];
            let subArr = [];

            for (let i = 0; i < 10; i++) {
                subArr = [];
                for (let j = 0; j < 10; j++) {
                    subArr.push(null);
                }
                arr.push(subArr);
            }
            return arr;
        })();
        // this number increases each time a ship get created to mark it on the grid
        this.currentId = 0;

        this.ships = [];
    }
    placeShip(ship, coords) {
        // check if the ship is outside of the grid
        if (ship.Xaxis && coords[0] + ship.length - 1 > 9) {
            throw Error("Ship Outside The Grid");
        } else if (!ship.Xaxis && coords[1] + ship.length - 1 > 9) {
            throw Error("Ship Outside The Grid");
        }
        if (this.coordinates[coords[1]][coords[0]] !== null) {
            throw Error("Ship is Already Placed Here");
        }

        // TODO: Check if a ship is placed in the coordinate of the ship
        // like this Xaxis this.coordinates[coords[1]][coords[0 + 1]]
        //                 this.coordinates[coords[1]][coords[0 + 2]]
        //                 this.coordinates[coords[1]][coords[0 + 3]]
        // which means there are no ship in the line of this ship

        const shipObj = {
            id: this.currentId,
            ship: ship,
            coords: coords,
        };

        for (let i = 0; i < ship.length; i++) {
            if (ship.Xaxis) {
                // horizontal
                this.coordinates[coords[1]][coords[0] + i] = shipObj.id;
            } else {
                //vertical
                this.coordinates[coords[1] + i][coords[0]] = shipObj.id;
            }
        }

        this.ships.push(shipObj);
        this.currentId += 1;
    }

    receiveAttack(coords) {
        if (coords[0] > 9 || coords[1] > 9) {
            throw Error("Invalid Position");
        }
        if (this.coordinates[coords[1]][coords[0]] === null) {
            // "w" means there is water
            this.coordinates[coords[1]][coords[0]] = "w";
        } else {
            const id = this.coordinates[coords[1]][coords[0]];
            const shipObj = this.ships[id];

            if (shipObj.ship.Xaxis) {
                var hitPos = coords[0] - shipObj.coords[0];
            } else {
                var hitPos = coords[1] - shipObj.coords[1];
            }
            console.log(hitPos);
            shipObj.ship.hit(hitPos);
            return true;
        }
    }
    // return true if all of the ships are sunk else false
    areSunk() {
        for (let i = 0; i < this.ships.length; i++) {
            if (!this.ships[0].ship.isSunk()) {
                return false;
            }
        }
        return true;
    }
}

export default Gameboard;
