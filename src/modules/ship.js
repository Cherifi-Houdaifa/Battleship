class Ship {
    constructor(length, Xaxis = true) {
        this.length = length;

        // create an array of length this.length with all of its values set to false
        // which means there is no hit
        this.hits = ((length) => {
            let arr = [];
            for (let i = 0; i < length; i++) {
                arr.push(false);
            }
            return arr;
        })(this.length);
        this.sunk = false;
        this.Xaxis = Xaxis;
    }
    hit(pos) {
        if (pos > this.hits.length || pos < 0) {
            throw Error("Invalid Position");
        }
        this.hits[pos] = true;
    }
    isSunk() {
        for (let i = 0; i < this.hits.length; i++) {
            if (!this.hits[i]) {
                return false;
            }
        }
        this.shunk = true;
        return true;
    }
}
export default Ship;
