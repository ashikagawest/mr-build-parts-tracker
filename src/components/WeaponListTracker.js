import React from 'react';
import ReactDOM from 'react-dom';
import ClickableItemCell from './ClickableItemCell.js';
import WeaponTracker from './WeaponTracker.js';

class WeaponListTracker extends React.Component {
    constructor(props) {
        super(props);
        this.renderOneWeapon = this.renderOneWeapon.bind(this);
        this.onShowHiddenCompletedUpdate = this.onShowHiddenCompletedUpdate.bind(this);
        this.onShowHiddenResourcesUpdate = this.onShowHiddenResourcesUpdate.bind(this);
        this.onShowHiddenCreditsUpdate = this.onShowHiddenCreditsUpdate.bind(this);
        this.prepareButtonText = this.prepareButtonText.bind(this);

        this.state = { hideCompleted : false, hideCredits: false, hideResources: false };
    }

    renderOneWeapon(weaponInfo, index) {
        var weaponKey = this.props.keyPrefix + index;
        return <WeaponTracker
                    key={weaponKey}
                    weaponKey={weaponKey}
                    weaponInfo={weaponInfo}
                    dropTableMap={this.props.dropTableMap}
                    hideCompleted={this.state.hideCompleted}
                    hideCredits={this.state.hideCredits}
                    hideResources={this.state.hideResources}
                />
            ;
    }

    onShowHiddenCompletedUpdate(event) {
        var newState = (! this.state.hideCompleted);
        this.setState({hideCompleted : newState})
    }

    onShowHiddenResourcesUpdate(event) {
        var newState = (! this.state.hideResources);
        this.setState({hideResources: newState})
    }

    onShowHiddenCreditsUpdate(event) {
        var newState = (! this.state.hideCredits);
        this.setState({hideCredits: newState})
    }

    prepareButtonText() {
        var result = { completed: "HIDE COMPLETED", credits: "HIDE CREDITS", resources: "HIDE RESOURCES" };

        if (this.state.hideCompleted) {
            result.completed = "SHOW COMPLETED";
        }

        if (this.state.hideCredits) {
            result.credits = "SHOW CREDITS";
        }

        if (this.state.hideResources) {
            result.resources = "SHOW RESOURCES";
        }

        return result;
    }

    render() {
        var rows = this.props.weaponInfo.map(this.renderOneWeapon);
        var total = this.props.weaponInfo.length;

        var buttonTextSet = this.prepareButtonText();

        return <div>
                <div className="heading">{this.props.weaponType} WEAPONS</div>
                <p>TOTAL: {total}</p>
                <button className="showHideButton" onClick={this.onShowHiddenCompletedUpdate}>{buttonTextSet.completed}</button>
                <button className="showHideButton" onClick={this.onShowHiddenCreditsUpdate}>{buttonTextSet.credits}</button>
                <button className="showHideButton" onClick={this.onShowHiddenResourcesUpdate}>{buttonTextSet.resources}</button>
                <table>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
            </div>
    }
}

export default WeaponListTracker;