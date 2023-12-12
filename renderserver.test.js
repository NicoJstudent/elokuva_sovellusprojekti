const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./renderserver');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Käyttäjätilin ja yhteisön testailuja', () => {
    let userCredentials = {
        usernick: 'testuser',
        password: 'testpassword',
        email: 'testuser@example.com',
    };

    it('Käyttäjä: uuden käyttäjän rekisteröiminen', (done) => {
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

    it('Käyttäjä: uudella käyttäjällä kirjautuminen', (done) => {
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
    it('Yhteistö: luo uuden yhteisön', (done) => {
        chai
            .request(app)
            .post('/group_create')
            .send({
                usernick: 'testuser',
                group_name: 'Test Group',
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('success').to.equal(true);
                expect(res.body).to.have.property('message').to.equal('Yhteisön luominen onnistui');
                expect(res.body).to.have.property('group');
                done();
            });
    });

    it('Yhteisö: hakee listan yhteisöistä', (done) => {
        chai
            .request(app)
            .get('/groups_list')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('success').to.equal(true);
                expect(res.body).to.have.property('groups').to.be.an('array');
                done();
            });
    });

    it('Yhteisö: liittymispyyntö lähettetty', (done) => {
        chai
            .request(app)
            .post('/liittymispyynto')
            .send({
                usernick: 'user1',
                group_id: '32',
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('success').to.equal(true);
                expect(res.body).to.have.property('message').to.equal('Liittymispyyntö lähetetty');
                done();
            });
    });

    it('Arvostelut: lista elokuva-arvosteluista', (done) => {
        const movieId = '1046032'; 

        chai
            .request(app)
            .get(`/reviewsList/${movieId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('success').to.be.true;
                expect(res.body).to.have.property('ratings');
                done();
            });
    })

    it('Suosikit: käyttäjän suosikki lista', (done) => {
        const usernick = 'admin'; 

        chai
            .request(app)
            .get(`/favorites?usernick=${usernick}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('success').to.be.true;
                expect(res.body).to.have.property('message').to.equal('Server: Favorite movie list found');
                expect(res.body).to.have.property('favoriteMovies').to.be.an('array');
                done();
            });
    });

    it('Käyttäjä: testikäyttäjän poistaminen', (done) => {
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
