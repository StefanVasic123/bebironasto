import React from 'react';
import { Button } from 'react-bootstrap';

const Notes = (props) => {
    return (
        <div>
            Beleske
            <Button className="secondary" onClick={() => props.history.goBack()}>Nazad</Button>
        </div>
    );
};

export default Notes;