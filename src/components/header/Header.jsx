import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as Config from "./../../constants/Config";

import "./header.scss";
import LanguageSwitcher from "./LanguageSwitcher";
import logo from "./../../assets/logo.png";

// Définition des liens de navigation
const headerNav = [
  {
    key: "home", 
    path: `/${Config.HOME_PAGE}`,
  },
  {
    key: "movies",
    path: `/${Config.HOME_PAGE}/movie`,
  },
  {
    key: "tvSeries",
    path: `/${Config.HOME_PAGE}/tv`,
  },
];

const Header = () => {
  const { pathname } = useLocation();
  const headerRef = useRef(null);
  const { t } = useTranslation();

  const active = headerNav.findIndex(e => e.path === pathname);

  useEffect(() => {
    const shrinkHeader = () => {
      // Ajoute la classe 'shrink' après 100px de défilement
      const isScrolled = document.body.scrollTop > 100 || document.documentElement.scrollTop > 100;
      headerRef.current.classList.toggle("shrink", isScrolled);
    };

    window.addEventListener("scroll", shrinkHeader);

    return () => window.removeEventListener("scroll", shrinkHeader);
  }, []); //Elle s'éxécute une fois qu'on défile la page

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        
        {/* Logo Section */}
        <div className="logo">
          {/* Logo envéloppé d'un lien */}
          <Link to={`/${Config.HOME_PAGE}`}>
            <img 
              src={logo} 
              alt="logo" 
              style={{ width: "180px" }} 
            />
          </Link>
        </div>

        {/* Bar de Navigation */}
        <ul className="header__nav">
          {headerNav.map((e, i) => (
            <li key={i} className={i === active ? "active" : ""}>
              <Link to={e.path}>{t(e.key)}</Link>
            </li>
          ))}
        </ul>
        
        {/* Actions (Sélecteur de Langue) */}
        <div className="header__actions">
          {/* Composant qui gère l'affichage et le changement de langue */}
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
};

export default Header;