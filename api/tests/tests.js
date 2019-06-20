// Import the dependencies for testing
// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../app';
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
var chaiAsPromised = require('chai-as-promised')
// Configure chai
chai.use(chaiHttp);
chai.should();
//var expect = chai.expect;
const app = require('../app');

describe('tests API', () => {

    //test de /acceuil
    describe('/acceuil', () => {
        it('should return response with status 200', (done) => {
            chai.request(app)
                .get('/accueil')
                .end((error, response) => {
                    if (error) done(error);
                    expect(response).to.have.status(200);
                    done();
                });

        });
        it('should return response with status 200', (done) => {
            chai.request(app)
                .get('/accueil/recherche')
                .send({recherche: 'a'})
                .end((error, response) => {
                    if (error) done(error);
                    expect(response).to.have.status(200);
                    done();
                });

        });
    });

    //tests de index (page de tests)
    describe('/', () => {

        it('should return response with status 200', (done) => {
            chai.request(app)
                .get('/')
                .end((error, response) => {
                    if (error) done(error);
                    expect(response).to.have.status(200);
                    done();
                });

        });
    });

    //test de produit
    describe('/produit', () => {
        it('should return response with status 200', (done) => {
            chai.request(app)
                .get('/produit')
                .send({id_produit: '14'})
                .end((error, response) => {
                    if (error) done(error);
                    expect(response).to.have.status(200);
                    done();
                });

        });
        it('should return response with status 404, the product is inexisting', (done) => {
            chai.request(app)
                .get('/produit')
                .send({id_produit: '156'})
                .end((error, response) => {
                    if (error) done(error);
                    expect(response).to.have.status(404);
                    //expect(response).to.have.body('{"erreur": "ce produit n\'existe pas"}');
                    done();
                });

        });
    });

    //tests de users, retourne tous les users (page de tests)
    describe('/users', () => {

        it('should return response with status 200', (done) => {
            chai.request(app)
                .get('/users')
                .end((error, response) => {
                    if (error) done(error);
                    expect(response).to.have.status(200);
                    done();
                });

        });
    });

    //test de user
    describe('/user', () => {
        it('should return response with status 200', (done) => {
            chai.request(app)
                .get('/user')
                .send({id_user: '101'})
                .end((error, response) => {
                    if (error) done(error);
                    expect(response).to.have.status(200)
                    response.body.should.have.all.keys(
                        "addresse",
                        "date_naissance",
                        "email",
                        "genre",
                        "mot_de_passe",
                        "nom_user",
                        "prenom_user");
                    done();
                });

        });
        it('should return response with status 404, the user is inexisting', (done) => {
            chai.request(app)
                .get('/user')
                .send({id_user: '171'})
                .end((error, response) => {
                    if (error) done(error);
                    expect(response).to.have.status(404);
                    response.body.should.eql({'erreur': 'ce user n\'existe pas'})
                    done();
                });

        });
        it('should return response with status 200', (done) => {
            chai.request(app)
                .get('/user/achats')
                .send({id_user: '98'})
                .end((error, response) => {
                    if (error) done(error);
                    expect(response).to.have.status(200);
                    done();
                });

        });
        it('should return response with status 404, the user hasn\'t done any achats', (done) => {
            chai.request(app)
                .get('/user/achats')
                .send({id_user: '102'})
                .end((error, response) => {
                    if (error) done(error);
                    expect(response).to.have.status(404);
                    response.body.should.eql({'erreur': 'ce user n\'a pas fait d\'achats'})
                    done();
                });

        });
    });

    //test testAPI
    describe('/testAPI', () => {
        it('should return response with status 200', (done) => {
            chai.request(app)
                .get('/testAPI')
                .end((error, response) => {
                    if (error) done(error);
                    response.body.should.eql([{"id_user": 98, "prenom_user": "Kerwin", "nom_user": "Mickleborough", "genre": "Male", "date_naissance": "1991-06-06T22:00:00.000Z", "addresse": "716 West Alley", "email": "lo@g.com", "mot_de_passe": "1234", "statut": "visiteur"}]);
                    done();
                });

        });
    });

});


// describe("users", () => {
//     it("should get user's informations", (done) => {
//         chai.request(app)
//             .get('/user/usertest')
//
//     })
// })
//
// describe("users", () => {
//      //    beforeEach((done) => {
//      //   TodoItem.remove({}, () => { // On vide la base de données avant chaque test
//      //     done(); // Etant donné que la méthode remove est asynchrone, done est utilisé pour que mocha sache quand tout est terminé
//      //   });
//      // });
//     describe("GET /", () => { //test pour la route GET /
//         // Test to get all students record
//         it("should get all users record", (done) => { // Test qui vérifie qu'il n'y a pas d'erreurs lorsque la base de données est vide
//             //tout une ligne: fiat requete vers la route get"/"
//              chai.request(app)
//                  .get('/')
//                  .end((err, res) => {
//                      res.should.have.status(200);// On vérifie le statu de la réponse
//                      res.body.should.be.a('object'); // On vérifie que le résultat est ....
//                      //res.body.length.should.be.eql(0); // On vérifie que la longueur du tableau est de 0
//                      done();// On dit à mocha que l'on a fini nos assertions
//                   });
//          });
//         // Test to get single student record
//         it("should get a single user record", (done) => {
//              const id = 1;
//              chai.request(app)
//                  .get(`/${id}`)
//                  .end((err, res) => {
//                      res.should.have.status(200);
//                      res.body.should.be.a('object');
//                      done();
//                   });
//          });
//
//         // Test to get single student record
//         it("should not get a single user record", (done) => {
//              const id = 6;
//              chai.request(app)
//                  .get(`/${id}`)
//                  .end((err, res) => {
//                      res.should.have.status(404);
//                      done();
//                   });
//          });
//     });
// });
