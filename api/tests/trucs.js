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
// chai.should();
//var expect = chai.expect;
const app = require('../app');

describe('Hello World Route', () => {
    it('Returns a 200 response', (done) => {
        // return expect(Promise.resolve(response).to.eventually.have.status(200));
        chai.request(app)
            .get('/accueil/recherche')
            .send({recherche: 'a'})
            .end((error, response) => {
                if (error) done(error);
                // Now let's check our response
                expect(response).to.have.status(200);
                done();
            });
        //     .then(function (res){
        //         expect(res).to.have.status(200);
        //     })
        //     .catch(function(err){
        //         throw err;
        //     });
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
