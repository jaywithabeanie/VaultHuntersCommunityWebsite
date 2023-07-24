import React from 'react';
import './Content.scss';

// Define component
function Content(props) {

    return (
        <div className="content-container">
            {props.children}
        </div>
    );

}

// Export component
export default Content;
