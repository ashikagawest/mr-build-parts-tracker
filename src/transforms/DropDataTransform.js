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
     *      {
     *          _id: "318a48765469176209df299fc1e1151f",
     *          bountyLevel: "Level 40 - 60 Cetus Bounty",
     *          rewards: {
     *              "A": [
     *                  {
     *                      _id: "f67b78e5c91696a58dd1da952aaa5756",
     *                      chance: 33.04,
     *                      itemName: "Axi S3 Relic",
     *                      rarity: "Common",
     *                      stage: "Stage 2, Stage 3 of 4, and Stage 3 of 5"
     *                  },
     *                  ...
     *              ]
     *       }
     *       TBD
     *    ],
     *    enemyBlueprintTables: [
     *      TBD
     *    ],
     *    enemyModTables: [
     *      IGNORED
     *    ],
     *    keyRewards: [         -- Special missions requiring keys? "Vay Hek Frequency Triangulator" / "Orokin Derelict
     * Assassinate" IGNORED
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
     *      "Akstiletto Prime Barrel": {
     *          relics: [ {
     *              relicReference: "A-A1-U"
     *            },
     *            ...
     *          ],
     *      }
     *      "Axi A1 Relic": [
     *          {
     *              cetusBountyRewards: [ {
     *                      bountyLevel: "Level 40 - 60 Cetus Bounty",
     *                      chance: 33.04,
     *                      rarity: "Common",
     *                      stage: "Stage 2, Stage 3 of 4, and Stage 3 of 5"
     *                  }, {
     *                      ...
     *                  }
     *              ],
     *              missionRewards: [
     *                  TBD
     *              ]
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

        if (sourceData.cetusBountyRewards) {
            sourceData.cetusBountyRewards.map((ele) => this.transformRewardsFromCetusBounty(result, ele));
        }

        if (sourceData.keyRewards) {
            sourceData.keyRewards.map((ele) => this.transformRewardsFromKeyMissions(result, ele));
        }

        if (sourceData.missionRewards) {
            // Each key is a Planet which is an object with Node names inside
            Object.keys(sourceData.missionRewards)
                .map((ele) => this.transformRewardsFromMissionPlanet(result, ele, sourceData.missionRewards[ele]));
        }

        // TODO: process all other sources of rewards as well
        // TODO: make "AXI A1 RELIC" entry type (object) consistent with "MESA PRIME SYSTEMS BLUEPRINT" (array)

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
        var relicReference = this.formatRelicReference(relic.relicName, relic.tier, reward.rarity, reward.chance);

        var key = reward.itemName.toUpperCase();

        if (! result[key]) {
            result[key] = { relics: [] };
        }

        result[key].relics.push({
            relicName: relic.relicName,
            relicTier: relic.tier,
            relicReference: relicReference,
            chance: reward.chance
        });
    }

    formatRelicReference(name, tier, rarity, chance) {
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

		// Some Common relics are mistakenly reported as Uncommon; if chance >= 20, it is Common
		if (chance >= 20 ) {
			rarityRef = "C";
		}
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

    /**
     *
        {
            "_id": "6f9f3333023cf3b4929e3e5604705ee8",
            "bountyLevel": "Level 5 - 15 Cetus Bounty",
            "rewards": {
                "A": [
                    {
                        "_id": "1b6498e23a3c43775699129e7ebfcfeb",
                        "chance": 20,
                        "itemName": "Redirection",
                        "rarity": "Uncommon",
                        "stage": "Stage 1"
                    },

     */

    transformRewardsFromCetusBounty(result, bounty) {
        if (bounty.rewards) {
            if (bounty.rewards.A) {
                bounty.rewards.A.map((ele) => this.transformCetusBountyReward(result, bounty, ele));
            }
        }
    }

    /* OUT:
     *      "Axi A1 Relic": [
     *          {
     *              cetusBountyRewards: [ {
     *                      bountyLevel: "Level 40 - 60 Cetus Bounty",
     *                      chance: 33.04,
     *                      rarity: "Common",
     *                      stage: "Stage 2, Stage 3 of 4, and Stage 3 of 5"
     *                  }, {
     *                      ...
     *                  }
     *              ],
     *              missionRewards: [
     *                  TBD
     *              ]
     *          }
     */
    transformCetusBountyReward(result, bounty, reward) {
        var itemName = this.sanitizeItemName(reward.itemName);
        var key = itemName.toUpperCase();

        if (! result[key]) {
            result[key] = {};
        }

        if (! result[key].cetusBountyRewards) {
            result[key].cetusBountyRewards = [];
        }

        result[key].cetusBountyRewards.push({ bountyLevel: bounty.bountyLevel, chance: reward.chance, rarity: reward.rarity, stage: reward.stage});
    }

    /**
     * IN:
     *
          {
             "_id": "f8a5482637296393dfbff7e75d3a1ff7",
             "keyName": "Recover The Orokin Archive",
             "rewards": {
               "A": [
                 {
                   "_id": "c0400ac7082c2f3d811e47ca9b7a8ae8",
                   "chance": 15.18,
                   "itemName": "Vitality",
                   "rarity": "Uncommon"
                 }
               ]
             }
          }
        ]
     *
     * OUT:
     *      "Axi A1 Relic": [
     *          {
     *              keyRewards: [ {
     *                      keyName: "Recover The Orokin Archive",
     *                      chance: 15.18,
     *                      rarity: "Unommon",
     *                      rotation: "A"
     *                  }, {
     *                      ...
     *                  }
     *              ],
     *              ...
     *          }
     *
     *
     * @param result
     * @param keyMission
     */
    transformRewardsFromKeyMissions(result, keyMission) {
        if (keyMission.rewards) {
            if (keyMission.rewards.A) {
                keyMission.rewards.A.map((ele) => this.transformOneKeyReward(result, "A", ele));
            }
            if (keyMission.rewards.B) {
                keyMission.rewards.B.map((ele) => this.transformOneKeyReward(result, "A", ele));
            }
            if (keyMission.rewards.C) {
                keyMission.rewards.C.map((ele) => this.transformOneKeyReward(result, "A", ele));
            }
        }
    }
    transformOneKeyReward(result, rotation, keyReward) {
        var itemName = this.sanitizeItemName(keyReward.itemName);
        var key = itemName.toUpperCase();

        if (! result[key]) {
            result[key] = {};
        }

        if (! result[key].keyRewards) {
            result[key].keyRewards = [];
        }

        result[key].keyRewards.push({
            keyName: keyReward.keyName,
            chance: keyReward.chance,
            rarity: keyReward.rarity,
            rotation: rotation
        });
    }

    /**
     * IN:
     *
        "Ceres": {
            "Bode": {
                "gameMode": "Spy",
                "isEvent": false,
                "rewards": {
                    "A": [
                        {
                            "_id": "c0400ac7082c2f3d811e47ca9b7a8ae8",
                            "chance": 9.09,
                            "itemName": "Vitality",
                            "rarity": "Rare"
                        },
     */
    transformRewardsFromMissionPlanet(result, planetName, planet) {
        Object.keys(planet)
            .map((ele) => this.transformRewardsFromMissionNode(result, planetName, planet, ele, planet[ele]));
    }

    transformRewardsFromMissionNode(result, planetName, planet, nodeName, node) {
        if (node.rewards) {
            if (node.rewards.A) {
                node.rewards.A
                    .map((ele) => this.transformRewardsFromMissionNodeReward(result, planetName, planet, nodeName, node, ele, "A"));
            }
            if (node.rewards.B) {
                node.rewards.B
                    .map((ele) => this.transformRewardsFromMissionNodeReward(result, planetName, planet, nodeName, node, ele, "B"));
            }
            if (node.rewards.C) {
                node.rewards.C
                    .map((ele) => this.transformRewardsFromMissionNodeReward(result, planetName, planet, nodeName, node, ele, "C"));
            }
        }
    }

    transformRewardsFromMissionNodeReward(result, planetName, planet, nodeName, node, reward, rotation) {
        var itemName = this.sanitizeItemName(reward.itemName);
        var key = itemName.toUpperCase();

        if (! result[key]) {
            result[key] = {};
        }

        if (! result[key].missionRewards) {
            result[key].missionRewards = [];
        }

        result[key].missionRewards.push({
            planetName: planetName,
            nodeName: nodeName,
            rotation: rotation,
            chance: reward.chance,
            rarity: reward.rarity
        });
    }

    sanitizeItemName(name) {
        if (name.endsWith(" (Intact)")) {
            return name.replace(" (Intact)", "");
        }
        if (name.endsWith(" (Exceptional)")) {
            return name.replace(" (Exceptional)", "");
        }
        if (name.endsWith(" (Flawless)")) {
            return name.replace(" (Flawless)", "");
        }
        if (name.endsWith(" (Radiant)")) {
            return name.replace(" (Radiant)", "");
        }

        return name;
    }

}

export default DropDataTransform;
