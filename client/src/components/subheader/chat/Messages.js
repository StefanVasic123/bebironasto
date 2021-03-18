import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message';

const Messages = ({ messages }) => {
    return (
        <ScrollToBottom className="messages-row">
            {messages.map((message, index) => <div key={index}><Message message={message} /></div>)}
        </ScrollToBottom>
    );
};

export default Messages;