import React from 'react';
import ReactDOM from 'react-dom';
import ClickableItemCell from './ClickableItemCell.js';
import WeaponPartTracker from './WeaponPartTracker.js';

class WeaponTracker extends React.Component {
    constructor(props) {
        super(props);

        this.renderOnePartCommon = this.renderOnePartCommon.bind(this);
        this.renderOnePartWeaponPart = this.renderOnePartWeaponPart.bind(this);
        this.renderOnePartResource = this.renderOnePartResource.bind(this);
        this.formatWeaponLocalStorageKey = this.formatWeaponLocalStorageKey.bind(this);
        this.onCheckedUpdate = this.onCheckedUpdate.bind(this);
        this.formatCredits = this.formatCredits.bind(this);
        this.collectPartDropData = this.collectPartDropData.bind(this);
        this.renderDropInfo = this.renderDropInfo.bind(this);

        this.state = { checked: false };
    }

    formatWeaponLocalStorageKey() {
        return "wf-mr-build-parts-tracker//" + this.props.weaponInfo.weaponName;
    }

    renderOnePartCommon(part, index, partType) {
        // V1, part is a string
        // V2, part is an object with "count" and "partName"
        var partName = part;
        if (part.partName) {
            partName = part.count + " " + part.partName;
        }

        var partKey = this.props.weaponKey + "-" + partType + "-" + index;

        return <WeaponPartTracker className={"part-" + partType} weaponInfo={this.props.weaponInfo} partName={partName} key={partKey} partKey={partKey}/>
    }

    renderOnePartWeaponPart(part, index) {
        return this.renderOnePartCommon(part, index, "weaponPart");
    }

    renderOnePartResource(part, index) {
        return this.renderOnePartCommon(part, index, "resource");
    }

    onCheckedUpdate(newCheckedState) {
        this.setState({ checked: newCheckedState });
    }

    formatCredits(credits) {
        var numeric = Number(credits);
        if (!isNaN(numeric)) {
            return numeric.toLocaleString();
        }
    }

    collectPartDropData(result, part) {
        var dropKey = this.props.weaponInfo.weaponName + " " + part.partName;
        var dropInfo = this.props.dropTableMap[dropKey.toUpperCase()];

        if ( dropInfo ) {
            result.push({ partName: dropKey, drops: dropInfo });
        }
    }

    renderDropInfo() {
        var collection = [];
        this.props.weaponInfo.parts.map((ele) => this.collectPartDropData(collection, ele));

        return <td key="drop-info" style={{whiteSpace: "nowrap", overflow: "scroll", maxWidth: "10em"}}>{JSON.stringify(collection)}</td>
    }

    render() {
        var columns = this.props.weaponInfo.parts.map(this.renderOnePartWeaponPart);

        // v2, resources are in weaponInfo.resources with "count" and "partName"
        if (this.props.weaponInfo.resources) {
            if (! this.props.hideResources) {
                var resourceColumns = this.props.weaponInfo.resources.map(this.renderOnePartResource);
                columns.push.apply(columns, resourceColumns);
            }
        }

        var completionClass;
        if (this.state.checked) {
            completionClass = "completed-item";
        } else {
            completionClass = "incomplete-item";
        }

        var storageKey = this.formatWeaponLocalStorageKey();

        var creditsElement = null;
        if (! this.props.hideCredits) {
            var formattedCredits = this.formatCredits(this.props.weaponInfo.credits);
            var creditsElement = <td className="credits">{formattedCredits}</td>;
        }

        var dropInfoElement = this.renderDropInfo();

        var result;

        if ((! this.state.checked) || (! this.props.hideCompleted )) {
            result = <tr>
                <ClickableItemCell storageKey={storageKey} text={this.props.weaponInfo.weaponName}
                                   onCheckedUpdate={this.onCheckedUpdate}/>
                <td className={completionClass}>
                    {this.props.weaponInfo.acquisition}
                </td>
                {creditsElement}
                {columns}
                {dropInfoElement}
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