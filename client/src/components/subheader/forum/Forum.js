import React from 'react';
import { Button } from 'react-bootstrap';

const Forum = (props) => {
    return (
        <div>
            Forum
            <Button className="secondary" onClick={() => props.history.goBack()}>Nazad</Button>
        </div>
    );
};

export default Forum;