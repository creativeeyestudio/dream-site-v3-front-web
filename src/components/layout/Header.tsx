import React from 'react';
import Navigation from './Navigation';

const Header: React.FC = () => {
    return(
        <>
            <header></header>
            <div className="nav--primary">
                <Navigation menuId={'main-navigation'} images={true} classes={undefined} />
            </div>
        </>
    );
}

export default Header;