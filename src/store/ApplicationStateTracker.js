import ItemStateTracker from './ItemStateTracker.js';
import PartStateTracker from './PartStateTracker.js';

export default class ApplicationStateTracker {
    constructor() {
        this.props = {
            itemStateTracker: new ItemStateTracker(),
            partStateTracker: new PartStateTracker()
        }
    }

    getItemState(itemName) {
        return this.props.itemStateTracker.getItemState(itemName);
    }

    getPartState(itemName, partName) {
        return this.props.partStateTracker.getPartState(itemName, partName);

    }

    setItemState(itemName, state) {
        this.props.itemStateTracker.setItemState(itemName, state);
    }

    setPartState(itemName, partName, state) {
        this.props.partStateTracker.setPartState(itemName, partName, state);
    }
}