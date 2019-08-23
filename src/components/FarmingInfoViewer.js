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
    }

    renderOneDrop(dropPart) {
        var dropText = dropPart.drops.filter((ele) => this.keepUnhiddenOnly(ele)).map((ele) => this.formatRelicReference(ele)).join(' | ');

        if (dropText === "") {
            dropText = "N/A";
        }

        var text = dropPart.partName + ": " + dropText;

        return <span key={dropPart.partName}
                     style={{ boxShadow: "2px 2px lightblue", border: "1px solid black", marginRight: "0.5ex", background: "white", color: "black", whiteSpace: "nowrap", display: "inline-block" }}
            >{text}</span>;
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

    render() {
        var drops = this.state.partDrops;

        var items = drops.map(this.renderOneDrop);
        var showAvailableOnlyButtonText = "Show Available Only";
        if (this.state.showAvailableOnly) {
            var showAvailableOnlyButtonText = "Show All";
        }

        //return <div>{JSON.stringify(this.state.partDrops)}<br/>{items}</div>;
        return <div><button onClick={this.toggleShowAvailableOnly}>{showAvailableOnlyButtonText}</button>{items}</div>;
    }
}
