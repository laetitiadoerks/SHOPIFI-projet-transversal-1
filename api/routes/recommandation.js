const express = require('express');
const router = express.Router();
const connection     = require('../lib/dbconn');
const auth = require('../config/auth');


// Fonctions pour la recommandation

// const getInfoUser =  async(userId) => {
//     const query = "SELECT nom_produit, prix, description_produit, note, nom_categorie FROM `produit`, `categorie`, `produit_categorie` WHERE produit.id_produit=produit_categorie.id_produit and categorie.id_categorie=produit_categorie.id_categorie ORDER BY rand() LIMIT 6"
//     var [results] = await connection.promise().query(query)
//     // console.log('info user');
//     // console.log(results);
//     return  results;
// }
//
// const getUser =  async(userId) => {
//     const query = "SELECT id_user FROM user WHERE id_user=?"
//     var [results] = await connection.promise().query(query, userId)
//     // console.log('get user');
//     // console.log(results);
//     return  results;
// }

/**
* Fonction qui permet d'obtenir la liste d'achats du user
* a partir de l'id du user
* Retourne les résultats (une liste)
*/
const getAchats =  async(userId) => {
    const query = "SELECT achat.id_produit, id_categorie FROM `produit_categorie`, `achat` WHERE achat.id_produit=produit_categorie.id_produit and id_user=?"//ID_USER
    var [results] = await connection.promise().query(query, userId);
    // console.log(results);
    return  results;
}

/**
* Fonction qui permet d'obtenir la liste des catégories des achats du user
* a partir de l'id du user
* Retourne les résultats (une liste)
*/
const getCategorie =  async(userId) => {
    const query = "SELECT COUNT(id_categorie) AS numero, id_categorie FROM `produit_categorie`, `achat` WHERE achat.id_produit=produit_categorie.id_produit and id_user=98 GROUP BY id_categorie ORDER BY numero DESC LIMIT 3;"//ID_USER
    var [results] = await connection.promise().query(query, userId)
    // console.log(results);
    return  results;
}

/**
* Fonction qui permet d'obtenir la liste des hobby du user
* a partir de l'id du user
* Retourne les résultats (une liste)
*/
const getHobby =  async(userId) => {
    const query = "SELECT nom_hobby FROM `user_hobby`, `hobby` WHERE user_hobby.id_hobby=hobby.id_hobby and id_user=?"//ID_USER
    var [results] = await connection.promise().query(query, userId)
    // console.log('get user Hobby');
    // console.log(results);
    return  results;
}

/**
* Fonction qui permet d'obtenir la liste des interets du user
* a partir de l'id du user
* Retourne les résultats (une liste)
*/
const getInteret =  async(userId) => {
    const query = "SELECT nom_interet FROM `user_interet`, `interet` WHERE user_interet.id_interet=interet.id_interet and id_user=?"//ID_USER
    var [results] = await connection.promise().query(query, userId)
    // console.log('get user Interet');
    // console.log(results);
    return  results;
}

/**
* Fonction qui permet d'obtenir la liste de produits recommanés du user
* Recommandation si le user possède: toutes les options
* a partir de l'id du user, les catégories, les hobby et les interets
* Retourne les résultats (une liste)
*/
const recommandationComplete =  async(userId, categorie1, categorie2, categorie3, hobby1, hobby2, hobby3, interet1, interet2, interet3) => {
    // ajustement des valeurs pour qu'elles puissent être utilisées dans la requete
    categorie1 = '%'+categorie1+'%';
    categorie2 = '%'+categorie2+'%';
    categorie3 = '%'+categorie3+'%';
    hobby1 = '%'+hobby1+'%';
    hobby2 = '%'+hobby2+'%';
    hobby3 = '%'+hobby3+'%';
    interet1 = '%'+interet1+'%';
    interet2 = '%'+interet2+'%';
    interet3 = '%'+interet3+'%';
    // console.log('hobby dans recommandation:');
    // console.log(hobby1);
    // console.log(hobby2);
    // console.log(hobby3);

    const query = `SELECT *
                    FROM produit, categorie, produit_categorie
                    WHERE produit.id_produit=produit_categorie.id_produit
                    AND categorie.id_categorie=produit_categorie.id_categorie
                    AND ((categorie.id_categorie=? OR categorie.id_categorie=? OR categorie.id_categorie=?)
                    OR (nom_produit LIKE ? OR description_produit LIKE ? OR nom_categorie LIKE ?)
                    OR (nom_produit LIKE ? OR description_produit LIKE ? OR nom_categorie LIKE ?)
                    OR (nom_produit LIKE ? OR description_produit LIKE ? OR nom_categorie LIKE ?)
                    OR (nom_produit LIKE ? OR description_produit LIKE ? OR nom_categorie LIKE ?)
                    OR (nom_produit LIKE ? OR description_produit LIKE ? OR nom_categorie LIKE ?)
                    OR (nom_produit LIKE ? OR description_produit LIKE ? OR nom_categorie LIKE ?))
                    AND NOT EXISTS (SELECT achat.id_produit
                                    FROM achat
                                    WHERE achat.id_produit=produit.id_produit and id_user=?)
                    ORDER BY RAND()
                    LIMIT 6;`
    var [results] = await connection.promise().query(query, [categorie1, categorie2, categorie3, hobby1, hobby1, hobby1, hobby2, hobby2, hobby2, hobby3, hobby3, hobby3, interet1, interet1, interet1, interet2, interet2, interet2, interet3, interet3, interet3, userId])
    // console.log(results);

    // Si la liste ne contient pas 6 éléments, elle est complètée avec le nombre de produits manquant étant les produits les plus achetés
    if (results.length < 6){
        const recomandationPop = await recommandationPopulaire(userId);
        var nombreManquant = 6 - results.length;
        for (var i = 0; i < nombreManquant; i++){
            results.push(recomandationPop[i]);
        }
        console.log('ajout de recommandation populaire');
        //console.log(results);
    }
    return  results;
}

/**
* Fonction qui permet d'obtenir la liste de produits recommanés du user
* Recommandation si le user possède: hobby et interets
* a partir de l'id du user, les hobby et les interets
* Retourne les résultats (une liste)
*/
const recommandationSansCategorie =  async(userId, hobby1, hobby2, hobby3, interet1, interet2, interet3) => {
    // ajustement des valeurs pour qu'elles puissent être utilisées dans la requete
    hobby1 = '%'+hobby1+'%';
    hobby2 = '%'+hobby2+'%';
    hobby3 = '%'+hobby3+'%';
    interet1 = '%'+interet1+'%';
    interet2 = '%'+interet2+'%';
    interet3 = '%'+interet3+'%';

    const query = `SELECT *
                    FROM produit, categorie, produit_categorie
                    WHERE produit.id_produit=produit_categorie.id_produit
                    AND categorie.id_categorie=produit_categorie.id_categorie
                    AND ((nom_produit LIKE ? OR description_produit LIKE ? OR nom_categorie LIKE ?)
                    OR (nom_produit LIKE ? OR description_produit LIKE ? OR nom_categorie LIKE ?)
                    OR (nom_produit LIKE ? OR description_produit LIKE ? OR nom_categorie LIKE ?)
                    OR (nom_produit LIKE ? OR description_produit LIKE ? OR nom_categorie LIKE ?)
                    OR (nom_produit LIKE ? OR description_produit LIKE ? OR nom_categorie LIKE ?)
                    OR (nom_produit LIKE ? OR description_produit LIKE ? OR nom_categorie LIKE ?))
                    AND NOT EXISTS (SELECT achat.id_produit
                                    FROM achat
                                    WHERE achat.id_produit=produit.id_produit and id_user=?)
                    ORDER BY RAND()
                    LIMIT 6;`
    var [results] = await connection.promise().query(query, [hobby1, hobby1, hobby1, hobby2, hobby2, hobby2, hobby3, hobby3, hobby3, interet1, interet1, interet1, interet2, interet2, interet2, interet3, interet3, interet3, userId])
    // console.log('get user Interet');
    console.log(results);
    // Si la liste ne contient pas 6 éléments, elle est complètée avec le nombre de produits manquant étant les produits les plus achetés
    if (results.length < 6){
        const recomandationPop = await recommandationPopulaire(userId);
        var nombreManquant = 6 - results.length;
        for (var i = 0; i < nombreManquant; i++){
            results.push(recomandationPop[i]);
        }
        console.log('ajout de recommandation populaire');
        //console.log(results);
    }
    return  results;
}

/**
* Fonction qui permet d'obtenir la liste de produits recommandés du user
* Recommandation si le user possède: categories et interets ou catégories et hobby
* a partir de l'id du user, les catégories et les interets ou les hobby
* Retourne les résultats (une liste)
*/
const recommandationSansHobby =  async(userId, categorie1, categorie2, categorie3, interet1, interet2, interet3) => {
    // ajustement des valeurs pour qu'elles puissent être utilisées dans la requete
    categorie1 = '%'+categorie1+'%';
    categorie2 = '%'+categorie2+'%';
    categorie3 = '%'+categorie3+'%';
    interet1 = '%'+interet1+'%';
    interet2 = '%'+interet2+'%';
    interet3 = '%'+interet3+'%';

    const query = `SELECT *
                    FROM produit, categorie, produit_categorie
                    WHERE produit.id_produit=produit_categorie.id_produit
                    AND categorie.id_categorie=produit_categorie.id_categorie
                    AND ((categorie.id_categorie=? OR categorie.id_categorie=? OR categorie.id_categorie=?)
                    OR (nom_produit LIKE ? OR description_produit LIKE ? OR nom_categorie LIKE ?)
                    OR (nom_produit LIKE ? OR description_produit LIKE ? OR nom_categorie LIKE ?)
                    OR (nom_produit LIKE ? OR description_produit LIKE ? OR nom_categorie LIKE ?))
                    AND NOT EXISTS (SELECT achat.id_produit
                                    FROM achat
                                    WHERE achat.id_produit=produit.id_produit and id_user=98)
                    ORDER BY RAND()
                    LIMIT 6;`
    var [results] = await connection.promise().query(query, [categorie1, categorie2, categorie3, interet1, interet1, interet1, interet2, interet2, interet2, interet3, interet3, interet3, userId])
    // console.log(results);
    // Si la liste ne contient pas 6 éléments, elle est complètée avec le nombre de produits manquant étant les produits les plus achetés
    if (results.length < 6){
        const recomandationPop = await recommandationPopulaire(userId);
        var nombreManquant = 6 - results.length;
        for (var i = 0; i < nombreManquant; i++){
            results.push(recomandationPop[i]);
        }
        console.log('ajout de recommandation populaire');
        //console.log(results);
    }
    return  results;
}

/**
* Fonction qui permet d'obtenir la liste de produits recommandés du user
* Recommandation si le user possède: interets
* a partir de l'id du user, les interets
* Retourne les résultats (une liste)
*/
const recommandationSansCategorieSansHobby =  async(userId, interet1, interet2, interet3) => {
    // ajustement des valeurs pour qu'elles puissent être utilisées dans la requete
    interet1 = '%'+interet1+'%';
    interet2 = '%'+interet2+'%';
    interet3 = '%'+interet3+'%';

    const query = `SELECT *
                    FROM produit, categorie, produit_categorie
                    WHERE produit.id_produit=produit_categorie.id_produit
                    AND categorie.id_categorie=produit_categorie.id_categorie
                    AND ((nom_produit LIKE ? OR description_produit LIKE ? OR nom_categorie LIKE ?)
                    OR (nom_produit LIKE ? OR description_produit LIKE ? OR nom_categorie LIKE ?)
                    OR (nom_produit LIKE ? OR description_produit LIKE ? OR nom_categorie LIKE ?))
                    AND NOT EXISTS (SELECT achat.id_produit
                                    FROM achat
                                    WHERE achat.id_produit=produit.id_produit and id_user=?)
                    ORDER BY RAND()
                    LIMIT 6;`
    var [results] = await connection.promise().query(query, [interet1, interet1, interet1, interet2, interet2, interet2, interet3, interet3, interet3, userId])
    // console.log(results);
    // Si la liste ne contient pas 6 éléments, elle est complètée avec le nombre de produits manquant étant les produits les plus achetés
    if (results.length < 6){
        const recomandationPop = await recommandationPopulaire(userId);
        var nombreManquant = 6 - results.length;
        for (var i = 0; i < nombreManquant; i++){
            results.push(recomandationPop[i]);
        }
        console.log('ajout de recommandation populaire');
        //console.log(results);
    }
    return  results;
}

/**
* Fonction qui permet d'obtenir la liste de produits recommandés du user
* Recommandation si le user possède: catégories
* a partir de l'id du user, les catégories
* Retourne les résultats (une liste)
*/
const recommandationSansHobbySansInteret =  async(userId, categorie1, categorie2, categorie3) => {
    // ajustement des valeurs pour qu'elles puissent être utilisées dans la requete
    categorie1 = '%'+categorie1+'%';
    categorie2 = '%'+categorie2+'%';
    categorie3 = '%'+categorie3+'%';

    const query = `SELECT *
                    FROM produit, categorie, produit_categorie
                    WHERE produit.id_produit=produit_categorie.id_produit
                    AND categorie.id_categorie=produit_categorie.id_categorie
                    AND ((categorie.id_categorie=? OR categorie.id_categorie=? OR categorie.id_categorie=?))
                    AND NOT EXISTS (SELECT achat.id_produit
                                    FROM achat
                                    WHERE achat.id_produit=produit.id_produit and id_user=98)
                    ORDER BY RAND()
                    LIMIT 6;`
    var [results] = await connection.promise().query(query, [categorie1, categorie2, categorie3, userId])
    // console.log(results);
    // Si la liste ne contient pas 6 éléments, elle est complètée avec le nombre de produits manquant étant les produits les plus achetés
    if (results.length < 6){
        const recomandationPop = await recommandationPopulaire(userId);
        var nombreManquant = 6 - results.length;
        for (var i = 0; i < nombreManquant; i++){
            results.push(recomandationPop[i]);
        }
        console.log('ajout de recommandation populaire');
        //console.log(results);
    }
    return  results;
}

/**
* Fonction qui permet d'obtenir la liste de produits recommandés du user
* Recommandation si le user possède: aucune des options
* a partir de l'id du user
* Retourne les résultats (une liste)
*/
const recommandationPopulaire =  async(userId) => {
    const query = `SELECT nom_produit, produit.id_produit, prix, description_produit, image, note, count(achat.id_produit) as numero
                    FROM achat, produit
                    WHERE achat.id_produit=produit.id_produit
                    AND NOT EXISTS (SELECT achat.id_produit
                                    FROM achat
                                    WHERE achat.id_produit=produit.id_produit and id_user=?)
                    GROUP BY achat.id_produit
                    ORDER BY count(achat.id_produit)DESC
                    LIMIT 6;`
    var [results] = await connection.promise().query(query, userId)
    // console.log(results);
    // Si la liste ne contient pas 6 éléments, elle est complètée avec le nombre de produits manquant étant les produits les plus achetés
    if (results.length < 6){
        const recomandationPop = await recommandationPopulaire(userId);
        var nombreManquant = 6 - results.length;
        for (var i = 0; i < nombreManquant; i++){
            results.push(recomandationPop[i]);
        }
        console.log(results);
    }
    return  results;
}



/**
* Fonction qui permet d'obtenir une liste de produitd recommandés (GET)
* a partir de l'id du user
* Verifie si le user est connecté
* Retourne les résultats et un code 200 si ca a fonctionner sinon un erreur
*/
router.get('/',  auth.isAuthenticated,  async (req, res) => {
    try {

        // 1: récuperer id du user
        const userConnecte = req.user.id_user;
        //console.log('hihi');
        console.log(userConnecte);


        // initialiser les variables pour choix de la recommandationRouter
        // passe a true si les variable d'informations peuvent être remplies et donc utilisées
        var avecCategories = false;
        var avecHobby = false;
        var avecInteret = false;

        // initialiser les variables pour les informations nécéssaires pour les chaque recommandation

        // prend un nombre si elles seront utilisées
        var categorie1 = 0;
        var categorie2 = 0;
        var categorie3 = 0;

        // prend un string si elles sont utilisées
        var hobby1 = 'x';
        var hobby2 = 'y';
        var hobby3 = 'z';

        // prend un string si elles sont utilisées
        var interet1 = 'y';
        var interet2 = 'v';
        var interet3 = 'w';

        // 2: regarder si user a fait 3 achats au minimum et si la liste d'achats contient au minimum 3 catégorie différentes
        // si oui, changer la variable avecCategories a "true"
        const achats = await getAchats(userConnecte)
        console.log('Achats:');
        console.log(achats);
        // si plus ou égal à 3 achats
        if (achats.length>=3){
            // obtenir la liste des 3 categories des films les plus acheter
            const categories = await getCategorie(userConnecte)
            console.log('Categories:');
            console.log(categories);

            //regarder si la liste a bien 3 categories
            if (categories.length == 3){
                // remplir les variables des categorie si c'est le cas
                for (var i = 0; i < categories.length; i++) {
                    //categories[i]
                    //console.log(i);
                    console.log(categories[i].id_categorie);
                    if (i == 0){
                        categorie1 = categories[i].id_categorie;
                    }
                    else if (i == 1) {
                        categorie2 = categories[i].id_categorie;
                    }
                    else {
                        categorie3 = categories[i].id_categorie;
                    }
                }
                // passer la variable avecCategories à true
                avecCategories = true;
            }
        }
        // else{
        //     console.log('on fera une recommandation populaire et avecCategories est toujours false.');
        //     console.log("Le user a fait moins de 3 achats.");
        // }

        // 3: regarder si user a rempli ses 3 hobby
        // si oui, changer la variable avecHobby a "true"
        const hobby = await getHobby(userConnecte)
        console.log('hobby:');
        console.log(hobby);
        if (hobby.length == 3){
            for (var i = 0; i < hobby.length; i++) {
                console.log(i);
                console.log(hobby[i].nom_hobby);
                if (i == 0){
                    hobby1 = hobby[i].nom_hobby;
                }
                else if (i == 1) {
                    hobby2 = hobby[i].nom_hobby;
                }
                else {
                    hobby3 = hobby[i].nom_hobby;
                }
            }
            avecHobby = true;
        }
        // else{
        //     console.log('on fera une recommandation populaire et avecHobby est toujours false.');
        //     console.log("Le user a pas rempli ses hobby.");
        // }

        // 4: regarder si le user a rempli ses 3 interets
        // si oui, changer la variable avecInteret a "true"
        const interet = await getInteret(userConnecte)
        console.log('interet:');
        console.log(interet);
        if (interet.length == 3){
            for (var i = 0; i < interet.length; i++) {
                console.log(i);
                console.log(interet[i].nom_interet);
                if (i == 0){
                    interet1 = interet[i].nom_interet;
                }
                else if (i == 1) {
                    interet2 = interet[i].nom_interet;
                }
                else {
                    interet3 = interet[i].nom_interet;
                }
            }
            avecInteret = true;
        }
        // else{
        //     console.log('on fera une recommandation populaire et avecInteret est toujours false.');
        //     console.log("Le user a pas rempli ses interets.");
        // }

        // print des variables pour les voir
        console.log('RESULTATS : ');
        console.log(avecCategories,avecHobby,avecInteret);
        console.log('categories:');
        console.log(categorie1);
        console.log(categorie2);
        console.log(categorie3);
        console.log('hobby:');
        console.log(hobby1);
        console.log(hobby2);
        console.log(hobby3);
        //console.log(typeof hobby3);
        console.log('interet:');
        console.log(interet1);
        console.log(interet2);
        console.log(interet3);

        // avecCategories = true;
        // avecHobby = true;
        // avecInteret = false;


        // 5: choix de la recommandation a faire en fonction des variables remplies

        // 2 true 1 false
        // sans interets meme requete que pour sans hobby mais sans les interets
        if (avecCategories == true && avecHobby == true && avecInteret == false){
            console.log('avecCategories et avecHobby vrai, avecInteret faux');
            const recommandation = await recommandationSansHobby(userConnecte, categorie1, categorie2, categorie3, hobby1, hobby2, hobby3);
            //console.log(recommandation);
            res.status(200).send(recommandation);
        }
        // sans hobby
        else if (avecCategories == true && avecHobby == false && avecInteret == true) {
            console.log('avecCategories et avecInteret vrai, avecHobby faux');
            const recommandation = await recommandationSansHobby(userConnecte, categorie1, categorie2, categorie3, interet1, interet2, interet3);
            //console.log(recommandation);
            res.status(200).send(recommandation);

        }
        // sans categories
        else if (avecCategories == false && avecHobby == true && avecInteret == true) {
            console.log('avecHobby et avecInteret vrai, avecCategories faux');
            const recommandation = await recommandationSansCategorie(userConnecte, hobby1, hobby2, hobby3, interet1, interet2, interet3);
            //console.log(recommandation);
            res.status(200).send(recommandation);
        }
        // 1 true 2 false
        // sans categorie et sans hobby
        else if (avecCategories == false && avecHobby == false && avecInteret == true) {
            console.log('avecCategories et avecHobby faux, avecInteret vrai');
            const recommandation = await recommandationSansCategorieSansHobby(userConnecte, interet1, interet2, interet3);
            //console.log(recommandation);
            res.status(200).send(recommandation);
        }
        // sans categories et sans interets
        // meme requete que pour sans categorie et sans hobby
        else if (avecCategories == false && avecHobby == true && avecInteret == false) {
            console.log('avecCategories et avecInteret faux, avecHobby vrai');
            const recommandation = await recommandationSansCategorieSansHobby(userConnecte, hobby1, hobby2, hobby3);
            //console.log(recommandation);
            res.status(200).send(recommandation);
        }
        // sans hobby et sans interets
        // est-ce une bonne recommandation???
        else if (avecCategories == true && avecHobby == false && avecInteret == false) {
            console.log('avecHobby et avecInteret faux, avecCategories vrai');
            const recommandation = await recommandationSansHobbySansInteret(userConnecte, categorie1, categorie2, categorie3);
            //console.log(recommandation);
            res.status(200).send(recommandation);
        }
        // tout false
        else if (avecCategories == false && avecHobby == false && avecInteret == false) {
            console.log('tout faux');
            const recommandation = await recommandationPopulaire(userConnecte);
            //console.log(recommandation);
            res.status(200).send(recommandation);
        }
        // tout true
        else{
            console.log('tout vrai');
            const recommandation = await recommandationComplete(userConnecte, categorie1, categorie2, categorie3, hobby1, hobby2, hobby3, interet1, interet2, interet3);
            //console.log(recommandation);
            res.status(200).send(recommandation);
        }

    } catch (e) {
		res.send({'erreur': e})
    }
})

module.exports = router;
