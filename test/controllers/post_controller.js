const { JSDOM } = require('jsdom');
const request = require('supertest');
const app = require('../../app');
const { flushAllTables } = require('../../helpers/test_helper');
const User = require('../../models/user');
var agent = request.agent(app);


beforeEach(() => {
  setTimeout(() => flushAllTables(), 1000);
});

describe('Posts controller', () => {
  it('logged in user', (done) => {
    User.create({email: 'test@email.com', user: 'test', password: 'test'}, function(err, result) { process.exit(0); });
    request(app).get('/users/login')
      .end(function(err, res){
        dom = new JSDOM(res.text);
        csrf = dom.window.document.getElementsByName('_csrf')[0].value;
        request(app).post('/users/login')
          .set('cookie', res.headers['set-cookie'])
          .send({
            _csrf: csrf,
            username: 'test',
            password: 'test',
          })
          .expect(302)
          .expect('Location', '/')
          .end(function(err, res) {
              console.log({
                  cookie: '/user/login ' + res.headers['set-cookie']
              });
              if(err) return done(err);
              done();
          });
      });
  });
});
