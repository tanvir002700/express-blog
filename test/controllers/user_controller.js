const { JSDOM } = require('jsdom');
const request = require('supertest');
const app = require('../../app');
const { flushAllTables } = require('../../helpers/test_helper');
const User = require('../../models/user');

beforeEach(() => {
  setTimeout(() => flushAllTables(), 1000);
});

function hasSignUpElement(res) {
  if (!res.text.includes('Email')) throw new Error('missing Email');
  if (!res.text.includes('Username')) throw new Error('missing Username');
  if (!res.text.includes('Password')) throw new Error('missing Password');
  if (!res.text.includes('Password Confirmation')) throw new Error('missing Password Confirmation');
}

function hasLoginElement(res) {
  if(!res.text.includes('Username')) throw new Error('missing Username');
  if(!res.text.includes('Password')) throw new Error('missing Password');
}

function hasSignUpError(res) {
  if(!res.text.includes('Email should not be empty.')) throw new Error('missing email presence validation.');
  if(!res.text.includes('Is not Valid Email')) throw new Error('mission email format validation.');
  if(!res.text.includes('User should not be empty.')) throw new Error('missing username validation');
  if(!res.text.includes('Password should not be empty.')) throw new Error('missing password validation');
  if(!res.text.includes('password confirmation should not be empty.')) throw new Error('missing password confirmation validation');
}

function hasLoginError(res) {
  if(!res.text.includes('Email should not be empty.')) throw new Error('missing email presence validation.');
  if(!res.text.includes('Is not Valid Email')) throw new Error('mission email format validation.');
  if(!res.text.includes('Password should not be empty.')) throw new Error('missing password validation');
}

describe('Rendering Signup page', () => {
  beforeEach(() => {
    setTimeout(() => flushAllTables(), 1000);
  });

  it('render Signup page', (done) => {
    request(app).get('/users/new')
      .expect(200)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(hasSignUpElement)
      .end(done);
  });

  it('register new user', (done) => {
    request(app).get('/users/new')
      .end(function(err, res){
        dom = new JSDOM(res.text);
        csrf = dom.window.document.getElementsByName('_csrf')[0].value;
        request(app).post('/users/create')
          .set('cookie', res.headers['set-cookie'])
          .send({
            _csrf: csrf,
            email: 'test@email.com',
            username: 'test',
            password: 'testPass',
            password_confirmation: 'testPass'
          })
          .expect(302)
          .expect('Location', '/')
          .end((err, res) => {
            User.all((dberr, dbres) =>{
              if(dbres.rowLength != 1) throw new Error('user not created');
            });
            done();
          });
      });
  });
});


describe('Validate User Registration', () => {
  it('raise validation errors', (done) => {
    request(app).get('/users/new')
      .end(function(err, res){
        dom = new JSDOM(res.text);
        csrf = dom.window.document.getElementsByName('_csrf')[0].value;
        request(app).post('/users/create')
          .set('cookie', res.headers['set-cookie'])
          .send({
            _csrf: csrf
          })
          .expect(200)
          .expect(hasSignUpError)
          .end(done);
      });
  });
});

describe('Login page', () => {
  it('render Login page', (done) => {
    request(app).get('/users/login')
      .expect(200)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(hasLoginElement)
      .end(done);
  });

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
            password: 'testPass',
          })
          .expect(302)
          .expect('Location', '/')
          .end(done);
      });
  });
});

describe ('Validate User Login', () => {
  it('raise validation errors', (done) => {
    request(app).get('/users/login')
      .end(function(err, res){
        dom = new JSDOM(res.text);
        csrf = dom.window.document.getElementsByName('_csrf')[0].value;
        request(app).post('/users/create')
          .set('cookie', res.headers['set-cookie'])
          .send({
            _csrf: csrf
          })
          .expect(200)
          .expect(hasLoginError)
          .end(done);
      });
  });
});
