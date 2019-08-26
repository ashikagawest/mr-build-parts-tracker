class DropsByWeaponTransformer {
    constructor() {
        this.transform = this.transform.bind(this);
    }

    /**
     * Source Format:
     * [
     *   {
     *     partName: "Redeemer Prime Handle",
     *     drops: [
     *       {
     *         relicTier: "Axi",
     *         relicName: "R2",
     *         relicReference: "A-R2-R"
     *       }
     *     ]
     *   }
     * ]
     *
     *
     * Destination Format:
     *  {
     *      "Axi A1 Relic": [
     *          {
     *              partName: "Redeemer Prime Handle",
     *              chance: 2
     *          },
     *          ...
     *      ]
     *  }
     *
     * @param sourceData
     */
    transform(sourceData) {
        var result;

        result = {};

        sourceData.map((ele) => this.transformPartDetail(result, ele));

        return result;
    }

    transformPartDetail(result, partInfo) {
        if (partInfo.drops) {
            partInfo.drops.map((ele) => this.transformPartDrop(result, partInfo.partName, ele));
        }
    }

    transformPartDrop(result, partName, dropInfo) {
        var key = dropInfo.relicTier + " " + dropInfo.relicName;

        var upperKey = key.toUpperCase();

        if (! (upperKey in result)) {
            result[upperKey] = [];
        }

        result[upperKey].push({ partName: partName, chance: dropInfo.chance });
    }
}

export default DropsByWeaponTransformer;
