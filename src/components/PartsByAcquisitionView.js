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
                <AcquisitionTypeSubview itemInfoArray={this.props.itemInfoArray} acquisitionType="dojo"/>
                <AcquisitionTypeSubview itemInfoArray={this.props.itemInfoArray} acquisitionType="syndicate"/>
            </div>
        )
        ;
    }
}
