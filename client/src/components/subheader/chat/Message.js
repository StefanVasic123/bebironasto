import React from 'react';

const Message = ({ message: { user, text }, name }) => {
    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();

    if(user === trimmedName ) {
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser
        ? (
            <div className="message-container justify-end">
                <p className="sent-text padding-10">{trimmedName}</p>
                <div className="message-box">
                    <p className="message-text color-white">{text}</p>
                </div>
            </div>
        ) : (
            <div className="message-container justify-start">
                <div className="message-box background-light">
                    <p className="message-text color-dark">{text}</p>
                </div>
                <p className="sent-text padding-left-10">{user}</p>

            </div>
        )
    )
}

export default Message;