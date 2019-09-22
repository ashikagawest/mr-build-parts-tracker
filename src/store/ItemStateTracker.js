import ItemState from '../model/ItemState.js';

export default class ItemStateTracker {
    constructor() {
        this.formatItemLocalStorageKey = this.formatItemLocalStorageKey.bind(this);
        this.getItemState = this.getItemState.bind(this);
        this.setItemState = this.setItemState.bind(this);
    }

    formatItemLocalStorageKey(itemName) {
        return "wf-mr-build-parts-tracker//" + itemName;
    }

    getItemState(itemName) {
        var storageKey = this.formatItemLocalStorageKey(itemName);

        var stgValue = localStorage.getItem(storageKey);

        var newState = false;
        if (stgValue) {
            newState = JSON.parse(stgValue);
        }

        var result = new ItemState();
        result.setNumWanted(1); // TODO: this needs to be stored and retrieved.  Should initialize to count needed.
        result.setNumBuilt(newState ? 1 : 0);

        return result;
    }

    setItemState(itemName, newState) {
        if (newState instanceof ItemState) {
            var storageKey = this.formatItemLocalStorageKey(itemName);
            var storageValue = JSON.stringify(newState.getNumBuilt());

            localStorage.setItem(storageKey, JSON.stringify(storageValue));
        } else {
            console.log("INTERNAL ERROR: item state is wrong type: " + typeof newState);
        }
    }
}
