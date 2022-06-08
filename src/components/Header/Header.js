import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='shadow-lg py-3'>
            <div className="logo px-10">
                <Link to={'/'}>
                <h4 className='text-2xl text-cyan-600 uppercase font-semibold'>Movie App</h4>
                </Link>
            </div>
        </div>
    );
};

export default Header;