import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import Header from './Header';
import Input from './Input';
import Messages from './Messages';

import './Chat.css';

let socket;

const Chat = ({ location }) => {
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const name = localStorage.getItem('name');

    const ENDPOINT = 'ws://bebironasto.herokuapp.com/';

    useEffect(() => {
        const { room } = queryString.parse(location.search); // get room from http query

        socket = io(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket']});

        setRoom(room);

        socket.emit('join', { name, room }, ( error ) => {
            if(error) {
                console.log(error)
            }
        })

        return () => {
            socket.emit('disconnect');

            socket.off();
        } 
    }, [ENDPOINT, location.search]);

/*    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [...messages, message]);
        })
    }, []) */
        useEffect(() => {
            socket.on('message', message => {
                setMessages([...messages, message])
            })
            return () => {
                socket.off()
            }
        }, [messages])

    const sendMessage = (event) => {
        event.preventDefault();
        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    return (
        <div className="chat-row">
            <div>
                <Header room={room} />
            </div>
            <div>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <div>
                <Messages messages={messages} />
            </div>
        </div>
    );
};

export default Chat;