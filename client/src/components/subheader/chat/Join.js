import React, { useState } from 'react';

import CreateRoom from './CreateRoom';
import RoomsJoin from './RoomsJoin';

import './Chat.css';

const Join = () => {
    const [createRow, setCreateRow] = useState(true);
    const [roomsRow, setRoomsRow] = useState(false);
    return (
        <div className="join-main">
            <div className='join-row'>
                {createRow && (
                    <CreateRoom />
                )}
                {roomsRow&& (
                    <RoomsJoin />
                )}
            </div>
        </div>
    );
};

export default Join;