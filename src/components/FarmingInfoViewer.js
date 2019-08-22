import React from 'react';
import ReactDOM from 'react-dom';

export default class FarmingInfoViewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = { partDrops: this.props.farmingStore.getPartDrops() };

        this.props.farmingStore.addListener(() => this.setState({ partDrops: this.props.farmingStore.getPartDrops()}))
    }

    render() {
        return <div>{JSON.stringify(this.state.partDrops)}</div>;
    }
}
