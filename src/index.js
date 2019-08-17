import React from 'react';
import ReactDOM from 'react-dom';
import PrimaryWeaponListTracker from './PrimaryWeaponListTracker.js';
import './index.css';
import './App.css';
import * as serviceWorker from './serviceWorker';

const primaryWeapons = require('./primary_build_info.json');

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// Sort the weapon list
primaryWeapons.sort(function(first, second) { return ( first.weaponName.toUpperCase() < second.weaponName.toUpperCase() ? -1 : 1 ); });

ReactDOM.render(
    <PrimaryWeaponListTracker weaponInfo={primaryWeapons} />,
    document.getElementById('root')
);
