import React from 'react';
import ReactDOM from 'react-dom';
import ClickableItemCell from './ClickableItemCell.js';
import WeaponTracker from './WeaponTracker.js';

class WeaponListTracker extends React.Component {
    constructor(props) {
        super(props);
        this.renderOneWeapon = this.renderOneWeapon.bind(this);
        this.onShowHiddenUpdate = this.onShowHiddenUpdate.bind(this);

        this.state = { hideCompleted : false };
    }

    renderOneWeapon(weaponInfo, index) {
        var weaponKey = this.props.keyPrefix + index;
        return <WeaponTracker key={weaponKey} weaponKey={weaponKey} weaponInfo={weaponInfo} hideCompleted={this.state.hideCompleted} />
            ;
    }

    onShowHiddenUpdate(event) {
        var newState = (! this.state.hideCompleted);
        this.setState({hideCompleted : newState})
    }

    render() {
        var rows = this.props.weaponInfo.map(this.renderOneWeapon);
        var total = this.props.weaponInfo.length;

        return <div>
                <div className="heading">{this.props.weaponType} WEAPONS</div>
                <p>TOTAL: {total}</p>
                <button onClick={this.onShowHiddenUpdate}>HIDE COMPLETED</button>
                <table>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
            </div>
    }
}

export default WeaponListTracker;