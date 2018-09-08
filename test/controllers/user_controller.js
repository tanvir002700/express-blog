const request = require('supertest');
const app = require('../../app');

beforeEach(() => {
  console.log('call back....');
});

function hasSignUpElement(res) {
  if (!res.text.includes('Email')) throw new Error('missing Email');
  if (!res.text.includes('Username')) throw new Error('missing Username');
  if (!res.text.includes('Password')) throw new Error('missing Password');
  if (!res.text.includes('Password Confirmation')) throw new Error('missing Password Confirmation');
}

function hasLoginElement(res) {
  if (!res.text.includes('Username')) throw new Error('missing Username');
  if (!res.text.includes('Password')) throw new Error('missing Password');
}

describe('Signup page', () => {
  it('render Signup page', (done) => {
    request(app).get('/users/new')
      .expect(200)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(hasSignUpElement)
      .end(done);
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
});
