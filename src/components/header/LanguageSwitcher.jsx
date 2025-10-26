import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiGlobe } from "react-icons/fi";
import "./language.scss";

// Liste des langues supportées
const availableLangs = ["fr", "en", "es"];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  // Langue actuelle en majuscules pour l'affichage
  const currentLang = i18n.language.toUpperCase();

  // Fonction de changement de langue et de fermeture du menu
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="language-switcher">
      {/* Bouton d'activation du menu */}
      <button
        className="lang-select-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <FiGlobe className="lang-icon" />
        <span className="lang-text">{currentLang}</span>
        <span className={`chevron ${isOpen ? "open" : ""}`}>&#x25BE;</span>
      </button>

      {/* Menu déroulant conditionnel */}
      {isOpen && (
        <div className="lang-dropdown">
          {availableLangs.map((lang) => (
            <button
              key={lang}
              className={`lang-option ${
                i18n.language === lang ? "active" : ""
              }`}
              onClick={() => changeLanguage(lang)}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
