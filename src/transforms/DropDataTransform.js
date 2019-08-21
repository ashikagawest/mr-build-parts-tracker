class DropDataTransform {
    constructor() {
        this.transform = this.transform.bind(this);
    }

    /**
     * Source Format:
     *  {
     *    blueprintLocations: [     -- NON-prime blueprints
     *      blueprintName: "x",
     *      ...
     *      TBD
     *    ],
     *    cetusBountyRewards: [
     *      TBD
     *    ],
     *    enemyBlueprintTables: [
     *      TBD
     *    ],
     *    enemyModTables: [
     *      IGNORED
     *    ],
     *    keyRewards: [         -- Special missions requiring keys? "Vay Hek Frequency Triangulator" / "Orokin Derelict Assassinate"
     *      IGNORED
     *    ],
     *    modLocations: [
     *      IGNORED
     *    ],
     *    relics: [             -- PRIME blueprints, etc
     *      {
     *          relicName: "A1",
     *          state: "Intact",
     *          tier: "Axi",
     *          rewards: [
     *              {
     *                  _id: "6733cc5298452209aa29dd72027c7df1",
     *                  chance: 11,
     *                  itemName: "Akstiletto Prime Barrel",
     *                  rarity: "Uncommon"
     *              },
     *              ...
     *          ]
     *      }
     *    ],
     *    sortieRewards: [
     *      TBD
     *    ],
     *    transientRewards: [
     *      TBD
     *    ]
     *  }
     *
     * Destination Format:
     *  {
     *      "Akstiletto Prime Barrel": [
     *          {
     *              relicReference: "A-A1-U"
     *          }
     *      ]
     *  }
     *
     * @param sourceData
     */
    transform(sourceData) {
        var result;

        result = {};

        if (sourceData.relics) {
            sourceData.relics.filter((ele) => ele.state.toUpperCase() === "INTACT").map((ele) => this.transformRelic(result, ele))
        }

        return result;
    }

    /***
     *      {
     *          relicName: "A1",
     *          state: "Intact",
     *          tier: "Axi",
     *          rewards: [
     *              {
     *                  _id: "6733cc5298452209aa29dd72027c7df1",
     *                  chance: 11,
     *                  itemName: "Akstiletto Prime Barrel",
     *                  rarity: "Uncommon"
     *              },
     *              ...
     *          ]
     *      }
     */
    transformRelic(result, oneRelic) {
        if (oneRelic.rewards) {
            oneRelic.rewards.map((ele) => this.transformRelicRewards(result, oneRelic, ele));
        }
    }

    transformRelicRewards(result, relic, reward) {
        var relicReference = this.formatRelicReference(relic.relicName, relic.tier, reward.rarity);

        var key = reward.itemName.toUpperCase();

        if (! result[key]) {
            result[key] = [];
        }

        result[key].push({ relicName: relic.relicName, relicTier: relic.tier, relicReference: relicReference });
    }

    formatRelicReference(name, tier, rarity) {
        var tierRef;
        var rarityRef;

        switch (tier.toUpperCase()) {
            case "LITH":
                tierRef = "L";
                break;
            case "MESO":
                tierRef = "M";
                break;
            case "NEO":
                tierRef = "N";
                break;
            case "AXI":
                tierRef = "A";
                break;
            default:
                tierRef = "*";
                console.log("unknown tier name: " + tier);
                break;
        }

        switch (rarity.toUpperCase()) {
            case "COMMON":
                rarityRef = "C";
                break;

            case "UNCOMMON":
                rarityRef = "U";
                break;

            case "RARE":
                rarityRef = "R";
                break;

            default:
                rarityRef = "*";
                console.log("unknown rarity name: " + rarity);
                break;
        }

        return tierRef + "-" + name + "-" + rarityRef;
    }
}

export default DropDataTransform;
