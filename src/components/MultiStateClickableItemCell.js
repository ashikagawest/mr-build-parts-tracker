import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Properties:
 *  storageKey
 *  text
 */
class MultiStateClickableItemCell extends React.Component {
    constructor(props) {
        super(props);

        this.onClickCell = this.onClickCell.bind(this);

        var stateCount = 3;
        if (this.props.numState) {
            stateCount = this.props.numState;
        }

        this.state = { curState: 0, numState: stateCount };
    }

    componentDidMount() {
        var stgValue = localStorage.getItem(this.props.storageKey);

        var newState = 0;
        if (stgValue) {
            newState = JSON.parse(stgValue);
        }

        this.setState({ curState: newState });

        if (this.props.onStateUpdate) {
            this.props.onStateUpdate(newState);
        }
    }

    onClickCell(event) {
        var newState = this.state.curState + 1;
        if (newState >= this.state.numState) {
            newState = 0;
        }

        this.setState({ curState: newState });

        if (this.props.onStateUpdate) {
            this.props.onStateUpdate(newState);
        }

        localStorage.setItem(this.props.storageKey, JSON.stringify(newState));
    }

    render() {
        var completionClass = "item-state-" + this.state.curState;

        // TODO: consider using the classnames() function instead

        return (
            <td key={this.props.partKey} className={completionClass + " " + this.props.className}
                title={this.props.title}
                onClick={this.onClickCell}>
                <span>
                    <label>
                        {this.props.text}
                    </label>
                </span>
            </td>
        )
            ;
    }
}

export default MultiStateClickableItemCell;