import React from "react";
import Navigation from "./Navigation";

interface HeaderProps {
  locale: string;
}

const Header: React.FC<HeaderProps> = ({ locale }) => {
  return (
    <>
      <header></header>
      <div className="nav--primary">
        <Navigation
          menuId={'686b419f31e3d12fe17df2d8'}
          locale={locale}
          classes={undefined}
        />
      </div>
    </>
  );
};

export default Header;
