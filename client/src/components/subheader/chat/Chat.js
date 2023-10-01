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

    // const ENDPOINT = 'wss://bebironasto.herokuapp.com/';

   //  const ENDPOINT = 'wss://localhost:3000';
   const ENDPOINT = 'ws://localhost:3000';

    useEffect(() => {
        const { room } = queryString.parse(location.search); // get room from http query

        console.log(message)

        socket = io(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket']}); 

    //    socket = io(ENDPOINT);

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
            console.log(socket)
            socket.on('message', message => {
                console.log('inside')
                setMessages([...messages, message])
            })
            return () => {
                socket.off()
            }
        }, [message])

    const sendMessage = (event) => {
        event.preventDefault();
        console.log('sendMessage: ', event, 'message: ', message)
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