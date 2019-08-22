import React from 'react';
import ReactDOM from 'react-dom';

export default class FarmingInfoViewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = { partDrops: this.props.farmingStore.getPartDrops() };

        this.props.farmingStore.addListener(() => this.setState({ partDrops: this.props.farmingStore.getPartDrops()}));

        this.renderOneDrop = this.renderOneDrop.bind(this);
    }

    renderOneDrop(dropPart) {
        var dropText = dropPart.drops.map((ele) => this.formatRelicReference(ele)).join(' | ');
        var text = dropPart.partName + ": " + dropText;

        return <span key={dropPart.partName}
                     style={{ border: "1px solid black", marginRight: "0.5ex", background: "white", color: "black", whiteSpace: "nowrap", display: "inline-block" }}>{text}</span>;
    }

    formatRelicReference(drop) {
        var relicName = drop.relicTier + " " + drop.relicName + " Relic";
        var key = relicName.toUpperCase();

        var available = this.isPartAvailable(key);
        var text = drop.relicReference;

        if (available) {
            text = text + " (AVAIL)";
        }

        return text;
    }

    isPartAvailable(partName) {
        return (partName.toUpperCase() in this.props.dropTableMap);
    }

    render() {
        var drops = this.state.partDrops;

        var items = drops.map(this.renderOneDrop);

        //return <div>{JSON.stringify(this.state.partDrops)}<br/>{items}</div>;
        return <div>{items}</div>;
    }
}
