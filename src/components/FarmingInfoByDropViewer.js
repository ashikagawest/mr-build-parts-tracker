import React from 'react';
import ReactDOM from 'react-dom';
import DropsByWeaponTransformer from '../transforms/DropsByWeaponTransformer.js';

export default class FarmingInfoByDropViewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = { partDrops: this.props.farmingStore.getPartDrops(), showAvailableOnly: true };
        this.dropsByWeaponTransformer = new DropsByWeaponTransformer();
        this.farmingStoreListener = () => this.setState({ partDrops: this.props.farmingStore.getPartDrops()});

        this.props.farmingStore.addListener(this.farmingStoreListener);

        this.renderOneDrop = this.renderOneDrop.bind(this);
        this.renderOnePart = this.renderOnePart.bind(this);
        //this.keepUnhiddenOnly = this.keepUnhiddenOnly.bind(this);
        //this.toggleShowAvailableOnly = this.toggleShowAvailableOnly.bind(this);
        //this.compareRelicDrops = this.compareRelicDrops.bind(this);
        //this.convertTierToNumber = this.convertTierToNumber.bind(this);
    }

    componentWillUnmount() {
        this.props.farmingStore.removeListener(this.farmingStoreListener);
    }

    renderOnePart(dropData) {
        return <td key={dropData.partName}>{dropData.partName} ({dropData.chance}%)</td>;
    }


    /*
     *
     */
    renderOneDrop(dropName, dropData) {
        var dropColumns = dropData.map(this.renderOnePart);
        dropColumns.unshift(<td key={dropName}>{dropName}</td>);

        return <tr key={"row-" + dropName}>{dropColumns}</tr>;
    }

    /**
     * partDrops
     *   [
     *     {
     *       "Axi A1 Relic": [
     *         {
     *           partName: "Redeemer Prime Handle",
     *           chance: 2
     *         },
     *         ...
     *         ]
     *     }
     *   ]
     */
    render() {
        var drops = this.state.partDrops;

        var dropsBySource = this.dropsByWeaponTransformer.transform(drops);

        var items = (
            Object.keys(dropsBySource)
                .sort()
                .map((ele) => this.renderOneDrop(ele, dropsBySource[ele]))
        ) ;

        return (
            <div>
                <table>
                    <thead>
                    <tr key="farming-by-drop-thead">
                        <th style={{background: "black", color: "white"}}>SOURCE</th>
                        <th colSpan={99} style={{background: "black", color: "white"}}>DROPS</th>
                    </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </table>
            </div>
        )
        ;
    }
}
