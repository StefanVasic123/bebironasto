import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Chat.css';

// Linkovati ka chat komponenti
// Napisati funkciju koja kaze da vec postoji soba sa tim imenom
// NAPISATI FUNKCIJU ZA ROOM KOJA STAVLJA U VRHU ONE SA VISE CLANOVA
// Poslati u redux state ime room-a  

const CreateRoom = () => {
    const [room, setRoom] = useState('');
    const [name, setName] = useState('');

    return (
        <div className="create-room-row">
            <div className="create-room-row-title">
                <h2>CREATE ROOM</h2>
            </div>
            <div className="create-room-row-input">
                <input type="text" placeholder="Add room" onChange={(e) => setRoom(e.target.value)} />
            </div>
            <div className="create-room-row-button">
                <Link onClick={event => !room ? event.preventDefault() : null} to={`/prepiska?room=${room}`}>
                    <button className="join-btn">CREATE</button>
                </Link>
            </div>
        </div>
    );
};

export default CreateRoom;