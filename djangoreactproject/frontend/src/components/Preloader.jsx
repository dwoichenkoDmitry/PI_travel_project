import React from 'react';
import Preload from './img/pre.gif';

const Preloader = () => {
    return (
        <div className="preload">
            <img src={Preload} alt="preloader"/>
        </div>
    );
};

export default Preloader;