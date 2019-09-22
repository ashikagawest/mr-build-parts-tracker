import PartState from '../model/PartState.js';

export default class PartStateTracker {
    constructor() {
        this.formatPartLocalStorageKey = this.formatPartLocalStorageKey.bind();
        this.getPartState = this.getPartState.bind(this);
        this.setPartState = this.setPartState.bind(this);
    }

    formatPartLocalStorageKey(itemName, partName) {
        return "wf-mr-build-parts-tracker//" + itemName + "|" + partName;
    }

    getPartState(itemName, partName) {
        var storageKey = this.formatPartLocalStorageKey(itemName, partName);

        var stgValue = localStorage.getItem(storageKey);

        var newState = 0;
        if (stgValue) {
            newState = JSON.parse(stgValue);
        }

        var result = new PartState();

        switch(newState) {
            case 0:
                result.setNumBuilt(0);
                result.setNumWanted(0);
                break;

            case 1:
                result.setNumBuilt(0);
                result.setNumWanted(1);
                break;

            case 2:
                result.setNumBuilt(1);
                result.setNumWanted(1);
                break;
        }

        return result;
    }

    setPartState(itemName, partName, newState) {
        if (newState instanceof PartState) {
            var storageKey = this.formatPartLocalStorageKey(itemName, partName);
            var storageValue = newState.convertToOldTriState();

            localStorage.setItem(storageKey, JSON.stringify(storageValue));
        } else {
            console.log("INTERNAL ERROR: Part state is wrong type: " + typeof newState);
        }
    }
}
