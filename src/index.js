import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import * as serviceWorker from './serviceWorker';

const primaryWeapons = require('./primary_build_info.json');

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

/**
 * Properties:
 *  storageKey
 *  text
 */
class ClickableItemCell extends React.Component {
    constructor(props) {
        super(props);

        this.onClickCell = this.onClickCell.bind(this);

        this.state = { checked: false };
    }

    componentDidMount() {
        var stgValue = localStorage.getItem(this.props.storageKey);

        var newCheckedState = false;
        if (stgValue) {
            newCheckedState = JSON.parse(stgValue);
        }

        this.setState({ checked : newCheckedState });

        if (this.props.onCheckedUpdate) {
            this.props.onCheckedUpdate(newCheckedState);
        }
    }

    updateStateFromCheckBox(checkbox) {
        var checked = checkbox.checked;
        this.setState({ checked: checked });

        localStorage.setItem(this.props.storageKey, JSON.stringify(checked));
    }

    onClickCell(event) {
        var newCheckedState = ! this.state.checked;
        this.setState({ checked: newCheckedState });

        if (this.props.onCheckedUpdate) {
            this.props.onCheckedUpdate(newCheckedState);
        }

        localStorage.setItem(this.props.storageKey, JSON.stringify(newCheckedState));
    }

    render() {
        var completionClass;
        if (this.state.checked) {
            completionClass = "completed-item";
        } else {
            completionClass = "incomplete-item";
        }

        return <td key={this.props.partKey} className={completionClass} onClick={this.onClickCell}>
            <label>
                {this.props.text}
            </label>
            </td>
            ;
    }
}

// <PrimaryWeaponPartTracker weaponInfo={weaponInfo} partName={partName}/>
class PrimaryWeaponPartTracker extends React.Component {
    constructor(props) {
        super(props);

        this.formatPartLocalStorageKey = this.formatPartLocalStorageKey.bind(this);
    }

    formatPartLocalStorageKey() {
        return "wf-mr-build-parts-tracker//" + this.props.weaponInfo.weaponName + "|" + this.props.partName;
    }

    render() {
        var partStgKey = this.formatPartLocalStorageKey();

        return  <ClickableItemCell storageKey={partStgKey} text={this.props.partName}/>
    }
}

class PrimaryWeaponTracker extends React.Component {
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
        return <PrimaryWeaponPartTracker weaponInfo={this.props.weaponInfo} partName={partName} key={partKey} partKey={partKey}/>
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

class PrimaryWeaponListTracker extends React.Component {
    constructor(props) {
        super(props);
        this.renderOneWeapon = this.renderOneWeapon.bind(this);
        this.onShowHiddenUpdate = this.onShowHiddenUpdate.bind(this);

        this.state = { hideCompleted : true };
    }

    renderOneWeapon(weaponInfo, index) {
        var weaponKey = "primary-weapon-" + index;
        return <PrimaryWeaponTracker key={weaponKey} weaponKey={weaponKey} weaponInfo={weaponInfo} hideCompleted={this.state.hideCompleted} />
            ;
    }

    onShowHiddenUpdate(event) {
        var newState = (! this.state.hideCompleted);
        this.setState({hideCompleted : newState})
    }

    render() {
        var rows = this.props.weaponInfo.map(this.renderOneWeapon);

        return <div>
                <div className="heading">PRIMARY WEAPONS</div>
                <button onClick={this.onShowHiddenUpdate}>HIDE COMPLETED</button>
                <table>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
            </div>
    }
}

// Sort the weapon list
primaryWeapons.sort(function(first, second) { return ( first.weaponName.toUpperCase() < second.weaponName.toUpperCase() ? -1 : 1 ); });

ReactDOM.render(
    <PrimaryWeaponListTracker weaponInfo={primaryWeapons} />,
    document.getElementById('root')
);
