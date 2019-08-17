import React from 'react';
import ReactDOM from 'react-dom';
import ClickableItemCell from './ClickableItemCell.js';
import WeaponPartTracker from './WeaponPartTracker.js';

class WeaponTracker extends React.Component {
    constructor(props) {
        super(props);

        this.renderOnePart = this.renderOnePart.bind(this);
        this.formatWeaponLocalStorageKey = this.formatWeaponLocalStorageKey.bind(this);
        this.onCheckedUpdate = this.onCheckedUpdate.bind(this);

        this.state = { checked: false };
    }

    formatWeaponLocalStorageKey() {
        return "wf-mr-build-parts-tracker//" + this.props.weaponInfo.weaponName;
    }

    renderOnePart(partName, index) {
        var partKey = this.props.weaponKey + "-" + index;
        return <WeaponPartTracker weaponInfo={this.props.weaponInfo} partName={partName} key={partKey} partKey={partKey}/>
    }

    onCheckedUpdate(newCheckedState) {
        this.setState({ checked: newCheckedState });
    }

    render() {
        var rows = this.props.weaponInfo.parts.map(this.renderOnePart);

        var completionClass;
        if (this.state.checked) {
            completionClass = "completed-item";
        } else {
            completionClass = "incomplete-item";
        }

        var storageKey = this.formatWeaponLocalStorageKey();
        var result;

        if ((! this.state.checked) || (! this.props.hideCompleted )) {
            result = <tr>
                <ClickableItemCell storageKey={storageKey} text={this.props.weaponInfo.weaponName}
                                   onCheckedUpdate={this.onCheckedUpdate}/>
                <td className={completionClass}>
                    {this.props.weaponInfo.acquisition}
                </td>
                {rows}
            </tr>
            ;
        } else {
            result = null;
            console.log("skipping completed " + this.props.weaponInfo.weaponName + "; checked-state=" + this.state.checked);
        }

        return result;
    }
}

export default WeaponTracker;