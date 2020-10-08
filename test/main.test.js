require('@testing-library/jest-dom');
const main = require('../src/main');

const $ = require('jquery');
const { exception } = require('console');
const html = require('fs').readFileSync('./app/index.html').toString();

beforeEach(() => {
  document.documentElement.innerHTML = html;
  main();
});

test('Testing is working', () => {
  $('#message-input').val('test message');
  $('#btn').trigger('click');
});