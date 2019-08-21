import React from 'react';
import ReactDOM from 'react-dom';
import WeaponListTracker from './components/WeaponListTracker.js';
import DropDataTransform from './transforms/DropDataTransform.js';
import './index.css';
import './App.css';
import * as serviceWorker from './serviceWorker';

const primaryWeapons = require('./primary_build_info.v2.json');
const secondaryWeapons = require('./secondary_build_info.v2.json');
const meleeWeapons = require('./melee_build_info.v2.json');
const dropTableSnapshot = require('./drop-data-snapshot_2019-08.json');

var transform = new DropDataTransform();
var dropTableMap = transform.transform(dropTableSnapshot);

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

ReactDOM.render(
    <div>
    <WeaponListTracker weaponType="PRIMARY" keyPrefix="primary-weapon-" weaponInfo={primaryWeapons} dropTableMap={dropTableMap} />
    <WeaponListTracker weaponType="SECONDARY" keyPrefix="secondary-weapon-" weaponInfo={secondaryWeapons} dropTableMap={dropTableMap} />
    <WeaponListTracker weaponType="MELEE" keyPrefix="melee-weapon-" weaponInfo={meleeWeapons} dropTableMap={dropTableMap} />
    </div>,
    document.getElementById('root')
);
