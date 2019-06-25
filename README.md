# SHOPIFI - site de e-commerce pour des films

SHOPIFI est un projet qui a été créé pour un cours de l'université de genève dans la formation système d'information et sciences des services.
Ce projet a pour but de créer une plateforme d’achats et de consultations de produits/films en ligne. Les clients pourront donc consulter et acheter des produits sur cette plateforme.

## Outils utilisés
Les outils utilisés pour ce projet sont
* MySQL
* Node
* React

## Installation

Vous avez besoin d'avoir installé Git, node et Mysql.

Ce projet a été concu et tester avec la version v10.15.1 de node

### 1.- Cloner le projet

```bash
git clone https://github.com/laetitiadoerks/SHOPIFI-projet-transversal-1.git
```

### 2.- Installer les dépendances
Dans le dossier cloner:
```bash
cd api
npm install
cd ../client/client
npm install
```

### 3.- Créer la base de données

Démarrer votre server local MySQL
Créer une base de données avec le fichier `database/init.sql` 
et si vous voulez les données avec lesquelles le projet a été concu, insérer les données contenues dans le fichier `database/datas.sql`.

Il faut ensuite modifier les données se trouvant dans le fichier `api/lib/dbconn.js`pour y mettre vos informations de connection à la base de données.

### 4.- Démarrer le serveur
Dans le dossier cloner
```bash
cd api
npm start
```

### 5.- Démarrer le client
Dans une nouvelle fenêtre du terminal.
Dans le dossier cloner
```bash
cd client/client
npm start
```
