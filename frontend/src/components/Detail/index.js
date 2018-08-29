import React from 'react';
import { withRouter } from 'react-router';

const Detail = ({
    match: {
        params: {id}
    }
 }) => {
    console.log(id);
    return (
    <div className="container">
        <h1>Detail!</h1>
    </div>
    );
};

export default Detail;