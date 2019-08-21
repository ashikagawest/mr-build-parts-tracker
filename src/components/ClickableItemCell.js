import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Properties:
 *  storageKey
 *  text
 */
class ClickableItemCell extends React.Component {
    constructor(props) {
        super(props);

        this.onClickCell = this.onClickCell.bind(this);

        this.state = { checked: false };
    }

    componentDidMount() {
        var stgValue = localStorage.getItem(this.props.storageKey);

        var newCheckedState = false;
        if (stgValue) {
            newCheckedState = JSON.parse(stgValue);
        }

        this.setState({ checked : newCheckedState });

        if (this.props.onCheckedUpdate) {
            this.props.onCheckedUpdate(newCheckedState);
        }
    }

    updateStateFromCheckBox(checkbox) {
        var checked = checkbox.checked;
        this.setState({ checked: checked });

        localStorage.setItem(this.props.storageKey, JSON.stringify(checked));
    }

    onClickCell(event) {
        var newCheckedState = ! this.state.checked;
        this.setState({ checked: newCheckedState });

        if (this.props.onCheckedUpdate) {
            this.props.onCheckedUpdate(newCheckedState);
        }

        localStorage.setItem(this.props.storageKey, JSON.stringify(newCheckedState));
    }

    render() {
        var completionClass;
        if (this.state.checked) {
            completionClass = "completed-item";
        } else {
            completionClass = "incomplete-item";
        }

        // TODO: consider using the classnames() function instead

        return <td key={this.props.partKey} className={completionClass + " " + this.props.className} onClick={this.onClickCell}>
            <label>
                {this.props.text}
            </label>
            </td>
            ;
    }
}

export default ClickableItemCell;