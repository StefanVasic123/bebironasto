import React from 'react';

const Input = ({ message, setMessage, sendMessage }) => (
    <form className="input-chat-form">
        <input
            className="input-chat"
            type="text"
            placeholder="Ukcaj poruku..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
        />
        <button className="input-chat-send-button" onClick={(event) => sendMessage(event)}>Poslati</button>
    </form>
)

export default Input;