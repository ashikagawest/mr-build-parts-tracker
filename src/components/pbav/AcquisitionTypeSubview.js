import React from 'react';
import ReactDOM from 'react-dom';

/**
 * View of items categorized by the type of acquisition.
 */
export default class AcquisitionTypeSubview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.renderOneItem = this.renderOneItem.bind(this);
        this.renderOneItemPart = this.renderOneItemPart.bind(this);
        this.renderMatchingItemParts = this.renderMatchingItemParts.bind(this);
        this.itemAcquisitionTypeMatches = this.itemAcquisitionTypeMatches.bind(this);
        this.itemPartAcquisitionTypeMatches = this.itemPartAcquisitionTypeMatches.bind(this);
    }

    renderOneItem(item) {
        return (
            <tr key={item.weaponName}>
                <td>{item.weaponName}</td>
                <td>{item.acquisition.subtype}</td>
                <td>{item.acquisition.requirement}</td>
                <td>{item.acquisition.cost}</td>
            </tr>
        )
        ;
    }

    renderOneItemPart(item, itemPart) {
        var fullName = item.weaponName + " " + itemPart.partName;

        return (
            <tr key={fullName}>
                <td>{fullName}</td>
                <td>{itemPart.acquisition.subtype}</td>
                <td>{itemPart.acquisition.requirement}</td>
                <td>{itemPart.acquisition.cost}</td>
            </tr>
        )
        ;
    }

    renderMatchingItemParts(itemPartRows, item) {
        if (("parts" in item) && (item.parts.length > 0)) {
            var theParts = item.parts
                 .filter((itemPart) => this.itemPartAcquisitionTypeMatches(itemPart))
                //.filter((itemPart) => true)
                ;

            var renderedParts = item.parts
                .filter((itemPart) => this.itemPartAcquisitionTypeMatches(itemPart))
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

    render() {
        var itemRows = this.props.itemInfoArray.filter((item) => this.itemAcquisitionTypeMatches(item)).map(this.renderOneItem);
        var itemPartRows = [];
        this.props.itemInfoArray.map((item) => { this.renderMatchingItemParts(itemPartRows, item); });
        var title = this.props.acquisitionType.toUpperCase();

        return (
            <div style={{display: "inline-block", marginLeft: "3px", marginRight: "3px", marginBottom: "1em", border: "1px solid grey"}}>
            <div className="heading">{title}</div>
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
