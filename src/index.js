import React from 'react';
import ReactDOM from 'react-dom';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

import WeaponListTracker from './components/WeaponListTracker.js';
import DropDataTransform from './transforms/DropDataTransform.js';
import FarmingStore from './store/FarmingStore.js';
import FarmingInfoViewer from './components/FarmingInfoViewer.js';
import FarmingInfoByDropViewer from './components/FarmingInfoByDropViewer.js';
import './index.css';
import './App.css';
import * as serviceWorker from './serviceWorker';

const primaryWeapons = require('./data/primary_build_info.v2.json');
const secondaryWeapons = require('./data/secondary_build_info.v2.json');
const meleeWeapons = require('./data/melee_build_info.v2.json');
const archwingMeleeWeapons = require('./data/archwing-melee_build_info.v2.json');
const archGunWeapons = require('./data/arch-gun_build_info.v2.json');
const dropTableSnapshot = require('./data/drop-data-snapshot_2019-09-03.json');

var transform = new DropDataTransform();
var dropTableMap = transform.transform(dropTableSnapshot);
var farmingStore = new FarmingStore();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// Sort the weapon lists
primaryWeapons.sort(
    function (first, second) {
        return ( first.weaponName.toUpperCase() < second.weaponName.toUpperCase() ? -1 : 1 );
    });
secondaryWeapons.sort(
    function (first, second) {
        return ( first.weaponName.toUpperCase() < second.weaponName.toUpperCase() ? -1 : 1 );
    });
meleeWeapons.sort(
    function (first, second) {
        return ( first.weaponName.toUpperCase() < second.weaponName.toUpperCase() ? -1 : 1 );
    });
archGunWeapons.sort(
    function (first, second) {
        return ( first.weaponName.toUpperCase() < second.weaponName.toUpperCase() ? -1 : 1 );
    });
archwingMeleeWeapons.sort(
    function (first, second) {
        return ( first.weaponName.toUpperCase() < second.weaponName.toUpperCase() ? -1 : 1 );
    });


// Drop view:
//  Axi R2 Relic  |  Redeemer Prime Handle (10%)  |  Lex Prime Receiver (25.33%) | ...

ReactDOM.render(
        <Tabs style={{position: "fixed", top: 0, height: "100%", width: "100%"}}>
            <TabList>
                <Tab>Weapon Lists</Tab>
                <Tab>Farming: Drops by Weapon</Tab>
                <Tab>Farming: Drops by Source</Tab>
            </TabList>

            <TabPanel style={{height: "100%", width: "100%"}}>
                <div style={{position: "relative", top: 0, left: 0, right: 0, bottom: 0, overflow: "scroll", maxHeight: "100%"}}>
                    <WeaponListTracker weaponType="PRIMARY" keyPrefix="primary-weapon-" weaponInfo={primaryWeapons} dropTableMap={dropTableMap} farmingStore={farmingStore}/>
                    <WeaponListTracker weaponType="SECONDARY" keyPrefix="secondary-weapon-" weaponInfo={secondaryWeapons} dropTableMap={dropTableMap}  farmingStore={farmingStore}/>
                    <WeaponListTracker weaponType="MELEE" keyPrefix="melee-weapon-" weaponInfo={meleeWeapons} dropTableMap={dropTableMap}  farmingStore={farmingStore}/>
                    <WeaponListTracker weaponType="ARCHWING GUNS" keyPrefix="archwing-gun-weapon-" weaponInfo={archGunWeapons} dropTableMap={dropTableMap}  farmingStore={farmingStore}/>
                    <WeaponListTracker weaponType="ARCHWING MELEE" keyPrefix="archwing-melee-weapon-" weaponInfo={archwingMeleeWeapons} dropTableMap={dropTableMap}  farmingStore={farmingStore}/>
                    <div style={{height: "110px"}}/>
                </div>
            </TabPanel>
            <TabPanel style={{height: "100%", width: "100%"}}>
                <div style={{position: "relative", top: 0, left: 0, right: 0, bottom: 0, overflow: "scroll", maxHeight: "100%"}}>
                    <FarmingInfoViewer farmingStore={farmingStore} dropTableMap={dropTableMap}/>
                    <div style={{height: "110px"}}/>
                </div>
            </TabPanel>
            <TabPanel style={{height: "100%", width: "100%"}}>
                <div style={{position: "relative", top: 0, left: 0, right: 0, bottom: 0, overflow: "scroll", maxHeight: "100%"}}>
                    <FarmingInfoByDropViewer farmingStore={farmingStore} dropTableMap={dropTableMap}/>
                    <div style={{height: "110px"}}/>
                </div>
            </TabPanel>
        </Tabs>
        ,
    document.getElementById('root')
);
