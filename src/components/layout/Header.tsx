import React from 'react';
import Navigation from './Navigation';

const Header: React.FC<{secondary_page: boolean}> = ({ secondary_page }) => {
    
    const baseClasses = 'header';
    const classes = `${baseClasses} ${secondary_page ? "secondary-page" : ""}`.trim();

    return(
        <>
        <header className={classes}></header>
        <Navigation menuId={'main-navigation'} />
        </>
    );
}

export default Header;