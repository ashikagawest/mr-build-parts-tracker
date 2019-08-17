import React from 'react';
import ReactDOM from 'react-dom';
import ClickableItemCell from './ClickableItemCell.js';
import PrimaryWeaponTracker from './PrimaryWeaponTracker.js';

class PrimaryWeaponListTracker extends React.Component {
    constructor(props) {
        super(props);
        this.renderOneWeapon = this.renderOneWeapon.bind(this);
        this.onShowHiddenUpdate = this.onShowHiddenUpdate.bind(this);

        this.state = { hideCompleted : false };
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

export default PrimaryWeaponListTracker;