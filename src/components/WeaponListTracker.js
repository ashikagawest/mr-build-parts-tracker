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

    componentDidMount() {
        var savedHideCompleted = localStorage.getItem(this.props.keyPrefix + "ui-hide-completed");
        if ((savedHideCompleted) && (JSON.parse(savedHideCompleted))) {
            this.setState({ hideCompleted: true });
        }

        var savedHideCredits = localStorage.getItem(this.props.keyPrefix + "ui-hide-credits");
        if ((savedHideCredits) && (JSON.parse(savedHideCredits))) {
            this.setState({ hideCredits: true });
        }

        var savedHideResources = localStorage.getItem(this.props.keyPrefix + "ui-hide-resources");
        if ((savedHideResources) && (JSON.parse(savedHideResources))) {
            this.setState({ hideResources: true });
        }
    }

    renderOneWeapon(weaponInfo, index) {
        var weaponKey = this.props.keyPrefix + index;
        return <WeaponTracker
                    key={weaponKey}
                    weaponKey={weaponKey}
                    weaponInfo={weaponInfo}
                    dropTableMap={this.props.dropTableMap}
                    farmingStore={this.props.farmingStore}
                    hideCompleted={this.state.hideCompleted}
                    hideCredits={this.state.hideCredits}
                    hideResources={this.state.hideResources}
                />
            ;
    }

    onShowHiddenCompletedUpdate(event) {
        var newState = (! this.state.hideCompleted);
        localStorage.setItem(this.props.keyPrefix + "ui-hide-completed", JSON.stringify(newState));
        this.setState({hideCompleted : newState})
    }

    onShowHiddenResourcesUpdate(event) {
        var newState = (! this.state.hideResources);
        localStorage.setItem(this.props.keyPrefix + "ui-hide-resources", JSON.stringify(newState));
        this.setState({hideResources: newState})
    }

    onShowHiddenCreditsUpdate(event) {
        var newState = (! this.state.hideCredits);
        localStorage.setItem(this.props.keyPrefix + "ui-hide-credits", JSON.stringify(newState));
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

        return <div style={{display: "inline-block", marginLeft: "3px", marginRight: "3px"}}>
                <div className="heading">{this.props.weaponType} WEAPONS</div>
                <p style={{ fontSize: "small" }}>TOTAL: {total}</p>
                <button className="showHideButton" onClick={this.onShowHiddenCompletedUpdate}>{buttonTextSet.completed}</button>
                <button className="showHideButton" onClick={this.onShowHiddenCreditsUpdate}>{buttonTextSet.credits}</button>
                <button className="showHideButton" onClick={this.onShowHiddenResourcesUpdate}>{buttonTextSet.resources}</button>
                <table>
                    <thead>
                        <tr>
                            <th style={{ backgroundColor: "black", color: "white" }}>WEAPON</th>
                            <th style={{ backgroundColor: "black", color: "white" }}>ACQUISITION</th>
                            <th colSpan={99} style={{ backgroundColor: "black", color: "white" }}>REQUIREMENTS</th>
                        </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
            </div>
    }
}

export default WeaponListTracker;