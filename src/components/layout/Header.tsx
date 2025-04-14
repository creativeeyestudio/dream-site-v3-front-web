import React from 'react';
import Navigation from './Navigation';

const Header: React.FC<{noIntro: boolean}> = ({ noIntro }) => {
    return(
        <>
        <header className={noIntro ? 'no-intro' : ''}></header>
        <Navigation menuId={'main-navigation'} />
        </>
    );
}

export default Header;