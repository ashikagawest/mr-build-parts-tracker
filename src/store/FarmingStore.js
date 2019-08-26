export default class FarmingStore {
    constructor() {
        this.partDrops = [];
        this.listeners = [];
        this.partDropNameSet = {};

        this.addPartDrops = this.addPartDrops.bind(this);
        this.getPartDrops = this.getPartDrops.bind(this);
        this.removePartDrops = this.removePartDrops.bind(this);
        this.addListener = this.addListener.bind(this);
        this.removeListener = this.removeListener.bind(this);
    }

    /**
     * partDropInfo structure:
     *  [
     *      {
     *          partName: "Cernos Prime Grip",
     *          drops: [
     *              {
     *                  relicReference: "A-H3-U",
     *                  relicName: "H3",
     *                  relicTier: "Axi"
     *              },
     *              ...
     *          ]
     *      }
     *
     * @param partDropInfoArray
     */
    addPartDrops(partDropInfoArray) {
        partDropInfoArray
            .filter((ele) => ! (ele.partName in this.partDropNameSet))
            .map((ele) => { this.partDrops.push(ele); this.partDropNameSet[ele.partName] = 1; });
    }

    removePartDrops(partName) {
        var newPartDropList = this.partDrops.filter((ele) => ele.partName !== partName);
        delete this.partDropNameSet[partName];

        this.partDrops = newPartDropList;

        this.listeners.forEach((listener) => listener(this));
    }

    getPartDrops() {
        return JSON.parse(JSON.stringify(this.partDrops));
    }

    addListener(listener) {
        this.listeners.push(listener);
    }

    removeListener(listener) {
        this.listeners = this.listeners.filter((ele) => ele != listener);
    }
}