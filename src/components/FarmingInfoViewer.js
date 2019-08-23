import React from 'react';
import ReactDOM from 'react-dom';

export default class FarmingInfoViewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = { partDrops: this.props.farmingStore.getPartDrops(), showAvailableOnly: true };

        this.props.farmingStore.addListener(() => this.setState({ partDrops: this.props.farmingStore.getPartDrops()}));

        this.renderOneDrop = this.renderOneDrop.bind(this);
        this.keepUnhiddenOnly = this.keepUnhiddenOnly.bind(this);
        this.toggleShowAvailableOnly = this.toggleShowAvailableOnly.bind(this);
        this.compareRelicDrops = this.compareRelicDrops.bind(this);
        this.convertTierToNumber = this.convertTierToNumber.bind(this);
    }

    renderOneDrop(dropPart) {
        var dropText = dropPart.drops.filter((ele) => this.keepUnhiddenOnly(ele)).sort(this.compareRelicDrops).map((ele) => this.formatRelicReference(ele)).join(' | ');

        if (dropText === "") {
            dropText = "N/A";
        }

        var text = dropPart.partName + ": " + dropText;

        return <span key={dropPart.partName}
                     style={{ boxShadow: "2px 2px lightblue", border: "1px solid black", marginRight: "0.5ex", background: "white", color: "black", whiteSpace: "nowrap", display: "inline-block" }}
            >{text}</span>;
    }

    compareRelicDrops(first, second) {
        var result = this.convertTierToNumber(second.relicTier) - this.convertTierToNumber(first.relicTier);
        if (result == 0) {
            return first.relicName.localeCompare(second.relicName);
        }
    }

    keepUnhiddenOnly(drop) {
        var keep = true;
        if (this.state.showAvailableOnly) {
            var relicName = drop.relicTier + " " + drop.relicName + " Relic";
            var key = relicName.toUpperCase();

            keep = this.isPartAvailable(key);
        }

        return keep;
    }

    formatRelicReference(drop) {
        var relicName = drop.relicTier + " " + drop.relicName + " Relic";
        var key = relicName.toUpperCase();

        var available = this.isPartAvailable(key);
        var text = drop.relicReference;

        if ((available) && (! this.state.showAvailableOnly)) {
            text = text + " (AVAIL)";
        }

        return text;
    }

    isPartAvailable(partName) {
        return (partName.toUpperCase() in this.props.dropTableMap);
    }

    toggleShowAvailableOnly(event) {
        this.setState({ showAvailableOnly: (! this.state.showAvailableOnly ) });
    }

    convertTierToNumber(tier) {
        switch (tier.toUpperCase()) {
            case "AXI":
                return 4;

            case "LITH":
                return 1;

            case "MESO":
                return 2;

            case "NEO":
                return 3;
        }

        return -1;
    }

    render() {
        var drops = this.state.partDrops;

        var items = drops.sort((first, second) => { return first.partName.localeCompare(second.partName) }).map(this.renderOneDrop);
        var showAvailableOnlyButtonText = "Show Available Only";
        if (this.state.showAvailableOnly) {
            var showAvailableOnlyButtonText = "Show All";
        }

        //return <div>{JSON.stringify(this.state.partDrops)}<br/>{items}</div>;
        return <div><button onClick={this.toggleShowAvailableOnly}>{showAvailableOnlyButtonText}</button>{items}</div>;
    }
}
