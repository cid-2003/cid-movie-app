import React from 'react';
import { useTranslation } from 'react-i18next';
import './liens.scss'; 

const Terms = () => {
    const { t } = useTranslation();

    return (
      <div className="static-page container">
        <h1 className="page-title">
          {t("Conditions Générales d'Utilisation")}
        </h1>
        <p className="last-updated">
          {t("Dernière mise à jour : 24 Octobre 2025")}
        </p>

        <section className="section-content">
          <h2>1. {t("Acceptation des Conditions")}</h2>
          <p>
            {t(
              "En accédant et en utilisant notre service, vous acceptez sans réserve d'être lié par les présentes Conditions Générales d'Utilisation (CGU). Si vous n'acceptez pas ces CGU, veuillez ne pas utiliser notre plateforme."
            )}
          </p>
        </section>

        <section className="section-content">
          <h2>2. {t("Droits de Propriété Intellectuelle")}</h2>
          <p>
            {t(
              "L'intégralité du contenu disponible sur la plateforme (films, séries, graphismes, logos) est la propriété de nos concédants de licence et est protégée par les lois sur le droit d'auteur. Toute reproduction, distribution ou utilisation commerciale non autorisée est strictement interdite."
            )}
          </p>
          <p>
            {t(
              "Tous les titres, descriptions et métadonnées sont fournis par l'API TMDB. Le contenu vidéo sous droit d'auteur n'est pas hébergé ni diffusé par notre service."
            )}
          </p>
        </section>

        <section className="section-content">
          <h2>3. {t("Compte Utilisateur et Sécurité")}</h2>
          <p>
            {t(
              "Vous êtes responsable du maintien de la confidentialité de vos informations de compte. Toute activité se produisant sous votre compte est sous votre responsabilité. Nous nous engageons à protéger vos données conformément à notre Politique de Confidentialité."
            )}
          </p>
        </section>
      </div>
    );
};

export default Terms;