import React from 'react';
import ReactDOM from 'react-dom';
import ClickableItemCell from './ClickableItemCell.js';

// <WeaponPartTracker weaponInfo={weaponInfo} partName={partName}/>
class WeaponPartTracker extends React.Component {
    constructor(props) {
        super(props);

        this.formatPartLocalStorageKey = this.formatPartLocalStorageKey.bind(this);
    }

    formatPartLocalStorageKey() {
        return "wf-mr-build-parts-tracker//" + this.props.weaponInfo.weaponName + "|" + this.props.partName;
    }

    render() {
        var partStgKey = this.formatPartLocalStorageKey();

        return  <ClickableItemCell className={this.props.className} storageKey={partStgKey} text={this.props.partName}/>
    }
}

export default WeaponPartTracker;