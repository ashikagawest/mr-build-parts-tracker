export default class ItemState {
    constructor() {
        this.state = {
            numBuilt: 0,
            numWanted: 1
        };
    }

    getNumBuilt() {
        return this.state.numBuilt;
    }

    getNumWanted() {
        return this.state.numWanted;
    }

    setNumBuilt(newNumBuilt) {
        this.state.numBuilt = newNumBuilt;
    }

    setNumWanted(newNumWanted) {
        this.state.numWanted = newNumWanted;
    }
}