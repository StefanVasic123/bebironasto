import React from 'react';
import { Button } from 'react-bootstrap';

const Info = (props) => {
    return (
        <div>
            Info
            <Button className="secondary" onClick={() => props.history.goBack()}>Nazad</Button>
        </div>
    );
};

export default Info;