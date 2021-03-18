import React from 'react';
import { Link } from 'react-router-dom';
// import Advice from '../subheader/advice/Advice';
// import Forum from '../subheader/forum/Forum';
// import Info from '../subheader/info/Info';
// import Notes from '../subheader/notes/Notes';
// import QA from '../subheader/qa/QA';
import '../../App.css';

const SubHeader = () => {
    return (
        <div className="sub-header-module">
            <div>
                <Link to="/info">
                    info
                </Link>
            </div>
            <div>
                <Link to="/beleske">
                    beleske
                </Link>
            </div>
            <div>
                <Link to="/saveti">
                    saveti
                </Link>
            </div>
            <div>
            <Link to="/join">
                    prepiska
            </Link>
            </div>
            <div>
                <Link to="/q-a">
                    q/a
                </Link>
            </div>
        </div>
    );
};

export default SubHeader;