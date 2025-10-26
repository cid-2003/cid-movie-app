import React from 'react';
import { useTranslation } from 'react-i18next';
// Assurez-vous d'importer les styles si vous utilisez un fichier CSS spécifique
import './liens.scss'; 

const AboutUs = () => {
    const { t } = useTranslation();

    return (
        <div className="static-page container">
            <h1 className="page-title">{t("A Propos de Notre Plateforme")}</h1>
            <section className="section-content">
                <h2>{t("Notre Mission")}</h2>
                <p>
                    {t("Notre plateforme est née de la passion de rassembler les cinéphiles et les amateurs de séries télévisées du monde entier. Notre mission est de vous offrir un accès illimité à une bibliothèque constamment mise à jour, allant des classiques intemporels aux dernières sorties, le tout dans une qualité de streaming optimale.")}
                </p>
            </section>

            <section className="section-content">
                <h2>{t("L'Expérience Utilisateur au Cœur")}</h2>
                <p>
                    {t("Inspirés par les meilleures applications de streaming, nous avons conçu une interface utilisateur épurée, intuitive et ultra-rapide. Grâce à nos algorithmes de recommandation avancés, vous découvrirez toujours quelque chose de nouveau, parfaitement adapté à vos goûts et à votre humeur du moment.")}
                </p>
                <ul>
                    <li>🎬 {t("Streaming HD et 4K immersif.")}</li>
                    <li>📱 {t("Accès multi-plateforme (mobile, tablette, smart TV).")}</li>
                    <li>✨ {t("Des collections thématiques exclusives.")}</li>
                </ul>
            </section>
        </div>
    );
};

export default AboutUs;