// const { JSDOM } = require('jsdom');

// describe('Chat', () => {
//   let dom;
//   let $;

//   beforeEach (() => {
//     return JSDOM.fromFile(
//       'app/index.html',
//       { runScripts: 'dangerously', resources: 'usable' }
//     ).then(d => {
//       dom = d;
//       $ = require('jquery')(d.window);
//     });
//   });

//   it ('should initialize $ with our window.', () => {
//     expect($('.messages').length).toBeTruthy();
//   });

//   it ('should create a new message', () => {
//     $('#message-input').val('test message');
//     const btn = $('#btn');
//     btn.trigger('click');
//     expect($('.messages-right').first().text()).toBeTruthy();
//   });
// });
