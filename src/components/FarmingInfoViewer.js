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
        // {"partName":"Boltor Prime Stock",
        // "drops":[
        //      {"relicName":"R1","relicTier":"Axi","relicReference":"A-R1-U"},
        //      {"relicName":"S3","relicTier":"Axi","relicReference":"A-S3-U"}
        //  ]
        // }

        var dropText = dropPart.drops.map((ele) => ele.relicReference).join(' | ');
        var text = dropPart.partName + ": " + dropText;

        return <span style={{ border: "1px solid black", marginRight: "0.5ex", background: "white", color: "black", whiteSpace: "nowrap", display: "inline-block" }}>{text}</span>;
    }

    render() {
        var drops = this.state.partDrops;

        var items = drops.map(this.renderOneDrop);

        //return <div>{JSON.stringify(this.state.partDrops)}<br/>{items}</div>;
        return <div>{items}</div>;
    }
}
