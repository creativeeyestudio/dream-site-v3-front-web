import React from 'react';
import Navigation from './Navigation';

interface HeaderProps {
    noIntro: boolean
}

const Header: React.FC<HeaderProps> = ({ noIntro }) => {
    return(
        <>
        <header className={noIntro ? 'no-intro' : ''}></header>
        <Navigation menuId={'main-navigation'} />
        </>
    );
}

export default Header;