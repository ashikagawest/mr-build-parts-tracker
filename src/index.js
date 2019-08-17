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

        return <tr>
            <ClickableItemCell storageKey={storageKey} text={this.props.weaponInfo.weaponName} onCheckedUpdate={this.onCheckedUpdate}/>
            <td className={completionClass}>
                {this.props.weaponInfo.acquisition}
            </td>
            {rows}
            </tr>
            ;
    }
}

class PrimaryWeaponListTracker extends React.Component {
    constructor(props) {
        super(props);
        this.renderOneWeapon = this.renderOneWeapon.bind(this);
    }

    renderOneWeapon(weaponInfo, index) {
        var weaponKey = "primary-weapon-" + index;
        return <PrimaryWeaponTracker key={weaponKey} weaponKey={weaponKey} weaponInfo={weaponInfo} />
            ;
    }

    render() {
        var rows = this.props.weaponInfo.map(this.renderOneWeapon);

        return <table>
            <tbody>
            {rows}
            </tbody>
            </table>
    }
}

ReactDOM.render(
    <PrimaryWeaponListTracker weaponInfo={primaryWeapons} />,
    document.getElementById('root')
);
