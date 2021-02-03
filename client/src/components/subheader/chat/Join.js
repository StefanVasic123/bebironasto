import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    // saljemo name i room preko params-a ali je bolje da to odradimo u redux-u... 
    return (
        <div>
            <h1>Join</h1>
            <div><input placeholder="name" className="" type="text" onChange={(event) => setName(event.target.value)} /></div>
            <div><input placeholder="room" className="" type="text" onChange={(event) => setRoom(event.target.value)} /></div>
            <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/prepiska?name=${name}&room=${room}`}>
                <button type="submit">Sign in to chat</button>
            </Link>
        </div>
    );
};

export default Join;