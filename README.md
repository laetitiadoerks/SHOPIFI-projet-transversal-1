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

## Documentation dur les requêtes

Voici les chemins des requêtes de l'API (testable dans Postman):

### http://localhost:9000/logout POST

Se déconnecté
Demande d'être connecté.

### http://localhost:9000/login?username=lo@g.com&password=1234 POST

Se connecter
Lien de test fonctionnel pour se connecter

### http://localhost:9000/accueil GET

Aller sur la page d'acceuil

Demande d'être connecté.

### http://localhost:9000/accueil/recherche?recherche=z GET

Faire une recherche

Demande être connecté

### http://localhost:9000/user GET

Récupérer les données recyclait.

Demande être connecté


### http://localhost:9000/user/achats GET

Récupérer les données recyclait.

Demande être connecté


### http://localhost:9000/user/modification POST

Pour modifié afin qu'ekke n'ai plus peur.

{"prenom_user": "alberti", "nom_user": "rigit", "addresse": "jjjjhhhjjjj", "mot_de_passe": "12345"}

### http://localhost:9000/recommandation GET

Pour modifié florence

### http://localhost:9000/achat/ajout POST

{"prenom_user": "alberti", "nom_user": "rigit", "addresse": "jjjjhhhjjjj", "mot_de_passe": "12345"}

### http://localhost:9000/signup POST

{"prenom_user": "albertine", "nom_user": "rigi", "genre":"Female", "date_naissance": "1999-12-10", "addresse": "jjjjjjjj", "email": "rigatto.com", "mot_de_passe": "1234"}

### http://localhost:9000/hobbyinteret/interet/ajout POST
veu d'inqure q'ul x arrvie maintenant

### http://localhost:9000/hobbyinteret/hobby GET
veu d'inqure qu'ulr un arrvie maintenant

### http://localhost:9000/produit?id_produit=2

{"nom_produit": "titan", "prix": "15", "description_produit": "ce film est une fiction"}
