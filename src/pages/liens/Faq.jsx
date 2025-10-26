import React from 'react';
import { useTranslation } from 'react-i18next';
import './liens.scss'; 

const Faq = () => {
    const { t } = useTranslation();

    const faqItems = [
        {
            q: t("Le contenu complet est-il disponible en streaming ?"),
            a: t("Notre plateforme utilise les métadonnées de l'API TMDB (The Movie Database) à des fins de démonstration et d'information seulement. Par conséquent, nous ne proposons pas de streaming de films ou de séries TV complets sous droits d'auteur. Les boutons 'Watch now' et 'Watch trailer' affichent la bande-annonce officielle du titre.")
        },
        {
            q: t("Quels appareils puis-je utiliser pour regarder ?"),
            a: t("Notre plateforme est accessible sur tous les navigateurs web modernes, ainsi que sur iOS, Android, Smart TV (Samsung, LG) et les consoles de jeux (PS5, Xbox).")
        },
        {
            q: t("Comment annuler mon abonnement ?"),
            a: t("Vous pouvez annuler votre abonnement à tout moment depuis la section 'Compte et Paramètres'. L'annulation prendra effet à la fin de votre cycle de facturation actuel.")
        },
        {
            q: t("Le contenu est-il disponible en qualité HD ou 4K ?"),
            a: t("La majorité de notre catalogue est disponible en HD. Les titres les plus récents et nos productions originales sont disponibles en streaming 4K UHD, en fonction de votre appareil et de votre vitesse de connexion Internet.")
        },
    ];

    return (
        <div className="static-page container">
            <h1 className="page-title">{t("Foire Aux Questions (FAQ)")}</h1>
            <p className="intro-text">
                {t("Trouvez rapidement les réponses à vos questions les plus fréquentes sur l'abonnement, la facturation et le contenu.")}
            </p>

            <div className="faq-list">
                {faqItems.map((item, index) => (
                    <div className="faq-item" key={index}>
                        <h3 className="faq-question">? {item.q}</h3>
                        <p className="faq-answer">{item.a}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Faq;