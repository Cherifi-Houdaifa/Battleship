class Player {
    constructor(gameboard) {
        this.gameboard = gameboard;

        this.plays = [];
    }
    attack(coords) {
        // see if the moves array includes the coords
        this.plays.forEach((play) => {
            if (JSON.stringify(play) === JSON.stringify(coords)) {
                throw Error("You Have Already played this move");
            }
        });

        this.plays.push(coords);
        return this.gameboard.receiveAttack(coords);
    }
}
class Ai {
    constructor(gameboard) {
        this.gameboard = gameboard;

        this.plays = [];
    }
    attack() {
        const coords = [
            Math.floor(Math.random() * 10),
            Math.floor(Math.random() * 10),
        ];

        // see if thr moves array includes the coords
        for (let i = 0; i < this.plays.length; i++) {
            if (JSON.stringify(this.plays[i]) === JSON.stringify(coords)) {
                // this means that you need to re call the function
                return null;
            }
        }

        this.plays.push(coords);
        return [this.gameboard.receiveAttack(coords), coords];
    }
}
export {
    Player, 
    Ai
}