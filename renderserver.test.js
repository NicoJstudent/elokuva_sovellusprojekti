const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./renderserver');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Käyttäjätunnuksen rekisteröiminen, kirjautuminen ja poistaminen', () => {
    let userCredentials = {
        usernick: 'testuser',
        password: 'testpassword',
        email: 'testuser@example.com',
    };

    it('testataan uuden käyttäjän rekisteröiminen', (done) => {
        chai
            .request(app)
            .post('/register')
            .send(userCredentials)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('success').to.be.true;
                expect(res.body).to.have.property('message').to.equal('Rekisteröinti onnistui');
                expect(res.body.user).to.have.property('usernick').to.equal(userCredentials.usernick);
                done();
            });
    });

    it('testataan uudella käyttäjällä kirjautuminen', (done) => {
        chai
            .request(app)
            .post('/login')
            .send({
                usernick: userCredentials.usernick,
                password: userCredentials.password,
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('success').to.be.true;
                expect(res.body).to.have.property('token');
                expect(res.body).to.have.property('message').to.equal('Autentikaatio onnistui');
                done();
            });
    });

    it('testataan käyttäjätunnuksen(testi) poistaminen', (done) => {
        chai
            .request(app)
            .delete(`/customer/${userCredentials.usernick}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('success').to.be.true;
                expect(res.body).to.have.property('message').to.equal('Käyttäjätunnuksen poistaminen onnistui');
                done();
            });
    });
});
