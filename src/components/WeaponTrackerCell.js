import React from 'react';
import ReactDOM from 'react-dom';

import ClickableItemCell from './ClickableItemCell.js';

export default class WeaponTrackerCell extends React.Component {
    constructor(props) {
        super(props);

        this.formatWeaponLocalStorageKey = this.formatWeaponLocalStorageKey.bind(this);
    }

    formatWeaponLocalStorageKey() {
        return "wf-mr-build-parts-tracker//" + this.props.weaponInfo.weaponName;
    }

    render() {
        var storageKey = this.formatWeaponLocalStorageKey();

        return (
            <ClickableItemCell storageKey={storageKey} text={this.props.weaponInfo.weaponName}
                               onCheckedUpdate={this.props.onCheckedUpdate}/>
        )
        ;
    }
}
