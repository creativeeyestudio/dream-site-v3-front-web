import React from 'react';
import Navigation from './Navigation';

interface HeaderProps {
    noIntro: boolean
}

const Header: React.FC<HeaderProps> = ({ noIntro }) => {
    return(
        <>
            <header className={noIntro ? 'no-intro' : ''}></header>
            <div className="nav--primary">
                <Navigation menuId={'main-navigation'} images={true} />
            </div>
        </>
    );
}

export default Header;