<div align="center">

# Traiteur LIAN – Application Web de Livraison de Gastronomie Chinoise

Une plateforme web permettant de commander facilement des plats chinois en ligne, avec un espace administrateur simple d’utilisation.

<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">
  <img alt="Creative Commons License" style="border-width:0"
       src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" />
</a><br />
Ce projet est sous licence
<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">
  Creative Commons Attribution – NonCommercial – NoDerivatives 4.0 International
</a>.

---
**Décembre 2022**

</div>

## 📋 Sommaire

- [Présentation](#présentation)
- [Fonctionnalités](#fonctionnalités)
- [Choix Techniques](#choix-techniques)
- [Architecture](#architecture)
- [Sécurité](#sécurité)
- [Perspectives](#perspectives)
- [Contributeurs](#contributeurs)

---

## 🥢 Présentation

**Traiteur LIAN** (nom inspiré de ma mère) est une application web développée pour partager la passion de la cuisine chinoise à travers un service de commande en ligne.  

Contrairement aux plateformes comme Uber Eats ou Deliveroo, ce site cible les **événements familiaux** ou les **occasions spéciales** (mariages, fêtes traditionnelles), et vise une expérience simple et agréable, tant pour les clients que pour l’administrateur.

---

## ✅ Fonctionnalités

- **Inscription et authentification sécurisée**
  - Création de compte
  - Gestion du profil, adresses, historique de commandes
- **Parcours client**
  - Parcourir le menu (entrées, plats, desserts…)
  - Ajouter des plats au panier
  - Suivi de l’état de la commande (préparation → livraison)
- **Gestion du panier**
  - Modifier les quantités ou supprimer des articles
  - Application automatique de codes promo
- **Administration**
  - Gestion des plats (prix, description…)
  - Mise à jour de l’état des commandes
  - Gestion des utilisateurs et de leurs commandes
  - Gestion des codes promo

---

## 🛠️ Choix Techniques

- **Back-end :** Node.js + Express.js  
- **Front-end :** React (architecture par composants + SCSS pour le style)  
- **Base de données :** MySQL (via Sequelize ORM)  
- **API :** REST (GET, POST, PUT, DELETE)  
- **Hébergement :** Dokku (PaaS open-source, recommandé par Polytech)  

---

## 🧱 Architecture

### Back-end (MVC)
- **Model :** Entités principales (User, Product, Order, Promo, etc.), gérées avec Sequelize  
- **Controller :** Relie les models aux vues, renvoie des réponses JSON  
- **Router :** Définit les routes associées aux contrôleurs  
- **View :** Mails + rendu de données côté client  

### Front-end (React)
- **Components :** Conteneurs, formulaires, boutons, etc.  
- **Views :** Pages de haut niveau (ex: Home, Panier, Commandes)  
- **SCSS :** Bibliothèque centralisée pour le style  
- **API Layer :** Gestion des routes via Axios et un `axiosInstance` commun  

### Base de données
- Tables principales : `User`, `Product`, `Order`, `Picture`, `Promo`  
- Tables associatives : `LignePanier`, `LigneOrder`  
- Gestion des relations N-N et CRUD complet  

---

## 🔒 Sécurité

- **Authentification :** Basée sur des tokens 
- **Contrôle d’accès :** Rôles (admin / utilisateur)  
- **HTTPS :** Connexion sécurisée entre client et serveur  
- **Réinitialisation de mot de passe :** Token temporaire avec limite de temps  

---

## 🤝 Contributeurs

- [**Jiayi He**](https://github.com/JiayiHE95)  
