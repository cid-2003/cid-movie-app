import React from 'react';
import { useTranslation } from 'react-i18next';
// Assurez-vous que le fichier static-page.scss est bien importé
import './liens.scss'; 

const Privacy = () => {
    const { t } = useTranslation();

    return (
        <div className="static-page container">
            <h1 className="page-title">{t("Politique de Confidentialité")}</h1>
            <p className="last-updated">{t("Dernière mise à jour : 24 Octobre 2025")}</p>

            <section className="section-content">
                <h2>1. {t("Collecte des Informations")}</h2>
                <p>
                    {t("Nous collectons les informations nécessaires à la fourniture de nos services, notamment : votre adresse e-mail (lors de l'inscription), les informations de paiement (traitées par un tiers sécurisé) et vos préférences de visionnage pour personnaliser vos recommandations.")}
                </p>
                <ul>
                    <li>🔐 **{t("Données d'Inscription")}** : Nom d'utilisateur, E-mail.</li>
                    <li>📊 **{t("Données d'Utilisation")}** : Historique de visionnage, recherches effectuées, appareils utilisés.</li>
                </ul>
            </section>

            <section className="section-content">
                <h2>2. {t("Utilisation de Vos Données")}</h2>
                <p>
                    {t("Vos données sont utilisées dans le but unique d'améliorer votre expérience sur notre plateforme : gestion de votre compte, fourniture du contenu, personnalisation des recommandations et amélioration des fonctionnalités du site.")}
                </p>
            </section>

            <section className="section-content">
                <h2>3. {t("Sécurité et Partage")}</h2>
                <p>
                    {t("Nous mettons en œuvre des mesures de sécurité strictes (chiffrement SSL, protocoles d'accès sécurisé) pour protéger vos données contre tout accès non autorisé. Vos données personnelles ne sont jamais vendues ou louées à des tiers. Elles ne sont partagées qu'avec des prestataires de services tiers (ex: processeurs de paiement) strictement nécessaires à l'exécution du service.")}
                </p>
            </section>
        </div>
    );
};

export default Privacy;