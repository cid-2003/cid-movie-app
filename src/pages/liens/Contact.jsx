import React from "react";
import { useTranslation } from "react-i18next";
import "./liens.scss";
// Si vous utilisez une librairie d'icônes, assurez-vous de l'importer (ex: FontAwesome, React Icons)
// Par exemple : import { FiMail, FiPhone } from 'react-icons/fi';

const Contact = () => {
  const { t } = useTranslation();
  const email = "cedrickemmanuel69@gmail.com";
  const whatsappNumber = "014507067575"; // Numéro sans le préfixe +229 pour le lien WhatsApp

  // Lien mailto: pour Gmail (le corps est optionnel, mais professionnel)
  const mailtoLink = `mailto:${email}?subject=${t(
    "Demande de support - Mon site de streaming"
  )}&body=${t("Bonjour,\n\nMon message concerne...")}`;

  // Lien WhatsApp: https://wa.me/<numéro international sans +>
  const whatsappLink = `https://wa.me/229${whatsappNumber}?text=${t(
    "Bonjour, j'ai une question concernant votre service."
  )}`;

  return (
    <div className="static-page container">
      <h1 className="page-title">{t("Contactez-Nous")}</h1>
      <p className="intro-text">
        {t(
          "Notre équipe est là pour vous assister. Choisissez la méthode de contact qui vous convient le mieux."
        )}
      </p>

      <div className="contact-links">
        <a
          href={mailtoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-item email-link"
        >
          <span className="icon">
           <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#e50914" d="M19 4H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-.41 2l-5.88 5.88a1 1 0 0 1-1.42 0L5.41 6ZM20 17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7.41l5.88 5.88a3 3 0 0 0 4.24 0L20 7.41Z"/></svg>
          </span>
          <div className="details">
            <span className="title">{t("Support par E-mail")}</span>
            <span className="value">{email}</span>
          </div>
        </a>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-item whatsapp-link"
        >
          <span className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 432 432"><path fill="#e50914" d="M364.5 65Q427 127 427 214.5T364.5 364T214 426q-54 0-101-26L0 429l30-109Q2 271 2 214q0-87 62-149T214 3t150.5 62zM214 390q73 0 125-51.5T391 214T339 89.5T214 38T89.5 89.5T38 214q0 51 27 94l4 6l-18 65l67-17l6 3q42 25 90 25zm97-132q9 5 10 7q4 6-3 25q-3 8-15 15.5t-21 9.5q-18 2-33-2q-17-6-30-11q-8-4-15.5-8.5t-14.5-9t-13-9.5t-11.5-10t-10.5-10.5t-8.5-9.5t-7-8.5t-5.5-7t-3.5-5L128 222q-22-29-22-55q0-24 19-44q6-7 14-7q6 0 10 1q8 0 12 9q2 3 6 13l7 17.5l3 8.5q3 5 1 9q-3 7-5 9l-3 3l-3 3.5l-2 2.5q-6 6-3 11q13 22 30 37q13 11 43 26q7 3 11-1q12-15 17-21q4-6 12-3q6 3 36 17z"/></svg>
          </span>
          <div className="details">
            <span className="title">{t("Assistance par WhatsApp")}</span>
            <span className="value">+229 01 45 07 06 75</span>
          </div>
        </a>
      </div>

      <section className="section-content">
        <h2>{t("Support Technique")}</h2>
        <p>
          {t(
            "Pour les problèmes techniques ou de facturation, nous vous invitons à nous contacter par e-mail pour une réponse dans les 24 heures."
          )}
        </p>
      </section>
    </div>
  );
};

export default Contact;
