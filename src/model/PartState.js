export default class PartState {
    constructor() {
        this.state = {
            numBuilt: 0,
            numWanted: 0
        };

        this.getNumBuilt = this.getNumBuilt.bind(this);
        this.getNumWanted = this.getNumWanted.bind(this);
        this.setNumBuilt = this.setNumBuilt.bind(this);
        this.setNumWanted = this.setNumWanted.bind(this);
        this.isPartCompleted = this.isPartCompleted.bind(this);
        this.convertToOldTriState = this.convertToOldTriState.bind(this);
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

    isPartCompleted() {
        return (this.state.numBuilt >= this.state.numWanted);
    }

    convertToOldTriState() {
        var result = 0;

        switch (this.state.numWanted) {
            case 0:
                result = 0;
                break;

            case 1:
                if (this.state.numBuilt == 0) {
                    result = 1;
                } else {
                    result = 2;
                }
                break;
        }

        return result;
    }
}