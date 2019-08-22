import React from 'react';
import ReactDOM from 'react-dom';
import ClickableItemCell from './ClickableItemCell.js';
import MultiStateClickableItemCell from './MultiStateClickableItemCell.js';

// <WeaponPartTracker weaponInfo={weaponInfo} partName={partName}/>
class WeaponPartTracker extends React.Component {
    constructor(props) {
        super(props);

        this.formatPartLocalStorageKey = this.formatPartLocalStorageKey.bind(this);
        this.onCellStateUpdate = this.onCellStateUpdate.bind(this);
    }

    formatPartLocalStorageKey() {
        return "wf-mr-build-parts-tracker//" + this.props.weaponInfo.weaponName + "|" + this.props.partName;
    }

    onCellStateUpdate(newState) {
        if (this.props.onPartStateUpdate) {
            this.props.onPartStateUpdate(this.props.partName, newState);
        }
    }

    render() {
        var partStgKey = this.formatPartLocalStorageKey();

        var partNameText;
        if (this.props.partCount) {
            partNameText = this.props.partCount + " " + this.props.partName;
        } else {
            partNameText = this.props.partName;
        }

        return <MultiStateClickableItemCell className={this.props.className} storageKey={partStgKey}
                                            text={partNameText} onStateUpdate={this.onCellStateUpdate} />
    }
}

export default WeaponPartTracker;