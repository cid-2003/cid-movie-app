import React from "react";
import { Route, Routes as ReactRouterRoutes } from "react-router-dom";

// Importations des pages
import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Detail from "../pages/detail/Detail";
import Watch from "../pages/Watch.jsx";

// Pages statiques
import About from "../pages/liens/About";
import Contact from "../pages/liens/Contact.jsx";
import Faq from "../pages/liens/Faq.jsx";
import Privacy from "../pages/liens/Privacy.jsx";
import Terms from "../pages/liens/Terms";

import * as Config from "../constants/Config";

// Chemin de base pour la navigation 
const BASE_PATH = `/${Config.HOME_PAGE}`;

const AppRoutes = () => {
    return (
        <ReactRouterRoutes>
            {/* 1. ROUTES DE LECTURE (Les plus spécifiques, toujours en premier) */}
            <Route path={`${BASE_PATH}/:category/play/:id`} element={<Watch />} />

            {/* 2. ROUTES STATIQUES (Lien direct vers les pages d'information) */}
            <Route path={`${BASE_PATH}/terms`} element={<Terms />} />
            <Route path={`${BASE_PATH}/about`} element={<About />} />
            <Route path={`${BASE_PATH}/contact`} element={<Contact />} />
            <Route path={`${BASE_PATH}/privacy`} element={<Privacy />} />
            <Route path={`${BASE_PATH}/faq`} element={<Faq />} />

            {/* 3. PAGE D'ACCUEIL */}
            <Route path={BASE_PATH} element={<Home />} />

            {/* 4. ROUTES DYNAMIQUES (Les plus spécifiques en premier) */}

            {/* a. Route de recherche (/:category/search/:keyword) */}
            <Route
                path={`${BASE_PATH}/:category/search/:keyword`}
                element={<Catalog />}
            />

            {/* b. Route de détail (/:category/:id) */}
            <Route path={`${BASE_PATH}/:category/:id`} element={<Detail />} />

            {/* c. Route de catalogue (/:category) - Générique, doit être en dernier */}
            <Route path={`${BASE_PATH}/:category`} element={<Catalog />} />
        </ReactRouterRoutes>
    );
};

export default AppRoutes;