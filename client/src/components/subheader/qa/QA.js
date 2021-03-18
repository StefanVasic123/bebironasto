import React from 'react';
import { Button } from 'react-bootstrap';

const QA = (props) => {
    return (
        <div>
            Q/A 
            <Button className="secondary" onClick={() => props.history.goBack()}>Nazad</Button>
        </div>
    );
};

export default QA;