import React from 'react';
import './LabelMessage.css';

function LabelMessage(props) {
    return (
        <div className="labelMessage">
            {props.message}
        </div>
    )
}

export default LabelMessage
