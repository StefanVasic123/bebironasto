import React from 'react';

import closeIcon from '../../../icons/closeIcon.png';
import onlineIcon from '../../../icons/onlineIcon.png';

const InfoBar = ({ room }) => (
        <div>
            <div className="chat-left-inner-container">
                <img className="on-line-icon" src={onlineIcon} alt="online image" />
                <h3>{room}</h3>
            </div>
            <div className="chat-right-inner-container">
                <a href="/"><img src={closeIcon} alt="close image" /></a>
            </div>
        </div>
    );

export default InfoBar;