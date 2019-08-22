export default class FarmingStore {
    constructor() {
        this.partDrops = [];
        this.listeners = [];

        this.addPartDrops = this.addPartDrops.bind(this);
        this.getPartDrops = this.getPartDrops.bind(this);
        this.removePartDrops = this.removePartDrops.bind(this);
        this.addListener = this.addListener.bind(this);
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
     * @param partDropInfo
     */
    addPartDrops(partDropInfo) {
        this.partDrops.push.apply(this.partDrops, partDropInfo);

        this.listeners.forEach((listener) => listener(this));
    }

    removePartDrops(partName) {
        var newPartDropList = this.partDrops.filter((ele) => ele.partName !== partName);
        this.partDrops = newPartDropList;

        this.listeners.forEach((listener) => listener(this));
    }

    getPartDrops() {
        return this.partDrops;
    }

    addListener(listener) {
        this.listeners.push(listener);
    }
}