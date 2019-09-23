import React from 'react';
import ReactDOM from 'react-dom';

/**
 * View of items categorized by the type of acquisition.
 */
export default class AcquisitionTypeSubview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hideCompleted: false
        };

        this.renderOneItem = this.renderOneItem.bind(this);
        this.determineItemCompletionClass = this.determineItemCompletionClass.bind(this);
        this.renderOneItemPart = this.renderOneItemPart.bind(this);
        this.determinePrtCompletionClass = this.determinePartCompletionClass.bind(this);
        this.renderMatchingItemParts = this.renderMatchingItemParts.bind(this);
        this.itemAcquisitionTypeMatches = this.itemAcquisitionTypeMatches.bind(this);
        this.itemPartAcquisitionTypeMatches = this.itemPartAcquisitionTypeMatches.bind(this);
        this.onShowHideCompletedUpdate = this.onShowHideCompletedUpdate.bind(this);
        this.shouldShowItem = this.shouldShowItem.bind(this);
    }

    renderOneItem(item) {
        var itemState = this.props.applicationStateTracker.getItemState(item.weaponName);
        var completionClass = this.determineItemCompletionClass(item);

        return (
            <tr key={item.weaponName}>
                <td className={completionClass}>{item.weaponName}</td>
                <td>{item.acquisition.subtype}</td>
                <td>{item.acquisition.requirement}</td>
                <td>{item.acquisition.cost}</td>
            </tr>
        )
        ;
    }

    determineItemCompletionClass(item) {
        var itemState = this.props.applicationStateTracker.getItemState(item.weaponName);

        if (itemState.getNumBuilt()) {
            return "completed-item";
        }

        return "incomplete-item";
    }

    renderOneItemPart(item, itemPart) {
        var fullName = item.weaponName + " " + itemPart.partName;
        var partCompletionState = this.determinePartCompletionClass(item, itemPart);

        return (
            <tr key={fullName}>
                <td className={partCompletionState}>{fullName}</td>
                <td>{itemPart.acquisition.subtype}</td>
                <td>{itemPart.acquisition.requirement}</td>
                <td>{itemPart.acquisition.cost}</td>
            </tr>
        )
        ;
    }

    determinePartCompletionClass(item, itemPart) {
        // var completionClass = "item-state-" + this.state.curState;
        var partState = this.props.applicationStateTracker.getPartState(item.weaponName, itemPart.partName);

        if (partState) {
            var triState = partState.convertToOldTriState();
        }

        return "item-state-" + triState;
    }

    renderMatchingItemParts(itemPartRows, item) {
        if (("parts" in item) && (item.parts.length > 0)) {
            var renderedParts = item.parts
                .filter((itemPart) => this.itemPartAcquisitionTypeMatches(itemPart))
                .filter((itemPart) => this.shouldShowPart(item, itemPart))
                .map((itemPart) => this.renderOneItemPart(item, itemPart));

            itemPartRows = Array.prototype.push.apply(itemPartRows, renderedParts);
        }
    }

    itemAcquisitionTypeMatches(item) {
        if ("acquisition" in item) {
            if ("type" in item.acquisition) {
                if (this.props.acquisitionType.toUpperCase() === item.acquisition.type.toUpperCase()) {
                    return true;
                }
            }
        }

        return false;
    }

    itemPartAcquisitionTypeMatches(itemPart) {
        if ("acquisition" in itemPart) {
            if ("type" in itemPart.acquisition) {
                if (this.props.acquisitionType.toUpperCase() === itemPart.acquisition.type.toUpperCase()) {
                    return true;
                }
            }
        }

        return false;
    }

    onShowHideCompletedUpdate(event) {
        var hideCompleted = ! ( this.state.hideCompleted );
        this.setState({hideCompleted: hideCompleted});
    }

    shouldShowItem(item) {
        var show = true;

        if (this.state.hideCompleted) {
            var itemState = this.props.applicationStateTracker.getItemState(item.weaponName);
            if (itemState) {
                if (itemState.isItemCompleted()) {
                    show = false;
                }
            }

        }

        return show;
    }

    shouldShowPart(item, itemPart) {
        var show = true;

        if (this.state.hideCompleted) {
            var partState = this.props.applicationStateTracker.getPartState(item.weaponName, itemPart.partName);
            if (partState) {
                if (partState.isPartCompleted()) {
                    show = false;
                }
            }

        }

        return show;
    }

    render() {
        var itemRows = this.props.itemInfoArray
            .filter((item) => this.itemAcquisitionTypeMatches(item))
            .filter((item) => this.shouldShowItem(item))
            .map(this.renderOneItem);

        var itemPartRows = [];
        this.props.itemInfoArray.map((item) => { this.renderMatchingItemParts(itemPartRows, item); });
        var title = this.props.acquisitionType.toUpperCase();

        var showHideButtonText = "HIDE COMPLETED";
        if (this.state.hideCompleted) {
            showHideButtonText = "SHOW COMPLETED";
        }

        return (
            <div style={{display: "inline-block", marginLeft: "3px", marginRight: "3px", marginBottom: "1em", border: "1px solid grey"}}>
                <div className="heading">{title}</div>
                <button className="showHideButton" onClick={this.onShowHideCompletedUpdate}>{showHideButtonText}</button>
                <table>
                    <thead>
                        <tr>
                            <th>Item / Part</th>
                            <th>SubType</th>
                            <th>Requirement</th>
                            <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemRows}
                        {itemPartRows}
                    </tbody>
                </table>
            </div>
        )
        ;
    }
}
