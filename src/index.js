import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const primaryWeapons = require('./primary_build_info.json');

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// <PrimaryWeaponPartTracker weaponInfo={weaponInfo} partName={partName}/>
class PrimaryWeaponPartTracker extends React.Component {
    constructor(props) {
        super(props);

        this.formatPartLocalStorageKey = this.formatPartLocalStorageKey.bind(this);
        this.onCheckboxUpdated = this.onCheckboxUpdated.bind(this);
        this.onClickCell = this.onClickCell.bind(this);

        this.state = { checked: false };
    }

    formatPartLocalStorageKey() {
        return "wf-mr-build-parts-tracker//" + this.props.weaponInfo.weaponName + "|" + this.props.partName;
    }

    componentDidMount() {
        var partStgKey = this.formatPartLocalStorageKey();
        var stgValue = localStorage.getItem(partStgKey);

        var checked = false;
        if (stgValue) {
            checked = JSON.parse(stgValue);
        }
        //console.info("read key " + partStgKey + " = " + stgValue);

        if (checked) {
            this.setState({checked: true});
        } else {
            this.setState({checked: false});
        }
    }

    onCheckboxUpdated(event) {
        var checked = event.target.checked;
        this.setState({ checked: checked });

        var partStgKey = this.formatPartLocalStorageKey();
        localStorage.setItem(partStgKey, checked);
        //console.info("set key " + partStgKey + " = " + JSON.stringify(checked));
    }

    onClickCell(event) {
        event.stopPropagation();

        var ckboxId = "ck-" + this.props.weaponInfo.weaponName + "|" + this.props.partName;
        var ckbox = document.getElementById(ckboxId);
        ckbox.checked = (! ckbox.checked );
    }

    render() {
        var ckboxId = "ck-" + this.props.weaponInfo.weaponName + "|" + this.props.partName;

        return <td key={this.props.partKey} onClick={this.onClickCell}>
            <label>
                <input type="checkbox" id={ckboxId} checked={this.state.checked} onChange={this.onCheckboxUpdated}/>
                {this.props.partName}
            </label>
            </td>
            ;
    }
}

class PrimaryWeaponTracker extends React.Component {
    constructor(props) {
        super(props);

        this.renderOnePart = this.renderOnePart.bind(this);
        this.formatWeaponLocalStorageKey = this.formatWeaponLocalStorageKey.bind(this);
        this.onCheckboxUpdated = this.onCheckboxUpdated.bind(this);
        this.onClickCell = this.onClickCell.bind(this);

        this.state = { checked: false };
    }

    formatWeaponLocalStorageKey() {
        return "wf-mr-build-parts-tracker//" + this.props.weaponInfo.weaponName;
    }

    renderOnePart(partName, index) {
        var partKey = this.props.weaponKey + "-" + index;
        return <PrimaryWeaponPartTracker weaponInfo={this.props.weaponInfo} partName={partName} key={partKey} partKey={partKey}/>
    }

    componentDidMount() {
        var weaponStgKey = this.formatWeaponLocalStorageKey();
        var stgValue = localStorage.getItem(weaponStgKey);

        var checked = false;
        if (stgValue) {
            checked = JSON.parse(stgValue);
        }
        //console.info("read key " + partStgKey + " = " + stgValue);

        if (checked) {
            this.setState({checked: true});
        } else {
            this.setState({checked: false});
        }
    }

    onCheckboxUpdated(event) {
        var checked = event.target.checked;
        this.setState({ checked: checked });

        var weaponStgKey = this.formatWeaponLocalStorageKey();
        localStorage.setItem(weaponStgKey, checked);
        console.info("set key " + weaponStgKey + " = " + JSON.stringify(checked));
    }

    onClickCell(event) {
        event.stopPropagation();

        var ckboxId = "ck-" + this.props.weaponInfo.weaponName;
        var ckbox = document.getElementById(ckboxId);
        ckbox.checked = (! ckbox.checked );
    }

    render() {
        var rows = this.props.weaponInfo.parts.map(this.renderOnePart);

        var ckboxId = "ck-" + this.props.weaponInfo.weaponName;

        return <tr>
            <td onClick={this.onClickCell} style={{border: "1px solid black"}}>
            <label>
                <input type="checkbox" id={ckboxId} checked={this.state.checked} onChange={this.onCheckboxUpdated}/>
                {this.props.weaponInfo.weaponName}
                <span/>
            </label>
            </td>
            <td>
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

//console.info(primaryWeapons[0].weaponName);

ReactDOM.render(
    <PrimaryWeaponListTracker weaponInfo={primaryWeapons} />,
    document.getElementById('root')
);
