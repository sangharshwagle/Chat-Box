import React from 'react';

const message = (props) => {
    return (
        <div className = "message">
                <div className = "message-username">{props.username}</div>
                <div className = "message-text">{props.message}</div>
            </div>
    )
}



export default message;