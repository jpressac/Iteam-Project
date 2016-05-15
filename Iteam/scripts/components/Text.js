import React, {
    PropTypes
} from 'react';
import TextField from 'material-ui/TextField';

export default React.createClass({

    displayName: 'Text',

    propTypes: {
        name: PropTypes.string.isRequired,
        placeholder: PropTypes.string,
        label: Proptypes.string
    },

    render() {
        return (
          < div >
            < TextField
            hintText = {this.props.placeholder}
            floatingLabelText = {this.props.label}/>
            </div>
        );
    }
});
