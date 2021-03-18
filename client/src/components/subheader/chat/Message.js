import React from 'react';
import ReactEmoji from 'react-emoji';

import './Chat.css';

const Message = ({ message: { text, user } }) => {
    let isSentByCurrentUser = false; 
    const name = localStorage.getItem('name').trim().toLowerCase();
    
    if(user === name) {
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser
        ? (
            <div className="message-container justify-end">
                <p className="sent-text pr-10">{name}</p>
                <div className="message-box background-blue">
                    <p className="message-text color-white">{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        ) : (
            <div className="message-container justify-start">
                <div className="message-box background-light">
                    <p className="message-text color-dark">{text}</p>
                </div>
                <p className="sent-text pl-10">{ReactEmoji.emojify(user)}</p>
            </div>
        )
    )
};

export default Message;