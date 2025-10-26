import React from "react";
import { Link } from "react-router-dom"; 
import { useTranslation } from "react-i18next";
import * as Config from "./../../constants/Config";

import "./footer.scss";
import bg from "./../../assets/footer-bg.jpg";
import logo from "./../../assets/logo.png";

// Définit le chemin de base une seule fois pour la concision
const HOME = `/${Config.HOME_PAGE}`;

const Footer = () => {
  const { t } = useTranslation();

  return (
    // Utilisation des template literals pour le style background
    <div className="footer" style={{ backgroundImage: `url(${bg})` }}>
      <div className="footer__content container">
        
        {/* Logo Section */}
        <div className="footer__content__logo">
          <div className="logo">
            {/* Logo */}
            <img src={logo} alt="logo" style={{ width: "150px" }} />
          </div>
        </div>

        {/* Liens de navigation */}
        <div className="footer__content__menus">
          
          {/* Menu 1: Général et Statique */}
          <div className="footer__content__menu">
            <Link to={HOME}>{t("Home")}</Link>
            <Link to={`${HOME}/contact`}>{t("Contact us")}</Link>
            <Link to={`${HOME}/terms`}>{t("Term of service")}</Link>
            <Link to={`${HOME}/about`}>{t("About us")}</Link>
          </div>
          
          {/* Menu 2: Informations et Extras */}
          <div className="footer__content__menu">
            <Link to={HOME}>{t("Live")}</Link>
            <Link to={`${HOME}/faq`}>{t("FAQ")}</Link>
            <Link to={HOME}>{t("Premium")}</Link>
            <Link to={`${HOME}/privacy`}>{t("Privacy policy")}</Link>
          </div>
          
          {/* Menu 3: Découverte et Listes */}
          <div className="footer__content__menu">
            <Link to={HOME}>{t("You must watch")}</Link>
            <Link to={HOME}>{t("Recent release")}</Link>
            <Link to={HOME}>{t("Top IMDB")}</Link> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;