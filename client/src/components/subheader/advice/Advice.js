import React from 'react';
import { Button } from 'react-bootstrap';

const Advice = (props) => {
    return (
        <div>
            Advice
            <Button className="secondary" onClick={() => props.history.goBack()}>Nazad</Button>
        </div>
    );
};

export default Advice;