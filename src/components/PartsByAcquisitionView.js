import React from 'react';
import ReactDOM from 'react-dom';

import AcquisitionTypeSubview from './pbav/AcquisitionTypeSubview.js';

/**
 * View of items categorized by the type of acquisition.
 */
export default class PartsByAcquisitionView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // Want sections
        //      SYNDICATE
        //      DOJO
        //      MARKET
        //      ...
        return (
            <div>
                <AcquisitionTypeSubview itemInfoArray={this.props.itemInfoArray} applicationStateTracker={this.props.applicationStateTracker} acquisitionType="market"/>
                <AcquisitionTypeSubview itemInfoArray={this.props.itemInfoArray} applicationStateTracker={this.props.applicationStateTracker} acquisitionType="drop"/>
                <AcquisitionTypeSubview itemInfoArray={this.props.itemInfoArray} applicationStateTracker={this.props.applicationStateTracker} acquisitionType="quest"/>
                <AcquisitionTypeSubview itemInfoArray={this.props.itemInfoArray} applicationStateTracker={this.props.applicationStateTracker} acquisitionType="dojo"/>
                <AcquisitionTypeSubview itemInfoArray={this.props.itemInfoArray} applicationStateTracker={this.props.applicationStateTracker} acquisitionType="relic"/>
                <AcquisitionTypeSubview itemInfoArray={this.props.itemInfoArray} applicationStateTracker={this.props.applicationStateTracker} acquisitionType="syndicate"/>
            </div>
        )
        ;
    }
}
