const $ = require('jquery');
const dayjs = require('dayjs');
var relativeTime = require('dayjs/plugin/relativeTime');

dayjs.extend(relativeTime);

class Message {
  constructor (content, authorId = true) {
    this.authorId = authorId;
    this.content = content;
    this.timeStamp = dayjs();
  }
}

$(() => {
  main();
});

function main () {
  setInterval(onBotMessage, 5000);
  $('#btn').on('click', onButtonClick);
}

function renderMessage (message) {
  let location = $('.messages-left');
  let opposite = $('.messages-right');

  if (message.authorId) {
    location = $('.messages-right');
    opposite = $('.messages-left');
  }

  let msg = $('<div>');
  msg.text(message.content);

  const time = $('<span>');
  time.text(dayjs().to(message.timeStamp));
  time.addClass('time');
  msg.append(time);
  msg.addClass('message-bubble');
  location.append(msg);
  
  setInterval(() => {
    time.text(dayjs().to(message.timeStamp));
  }, 1000);

  const space = $('<div>');
  space.css('height', msg.height());
  space.addClass('placeholder');
  opposite.append(space);

  const container = $('.messages');
  container.scrollTop(container.prop('scrollHeight'));
}

function onBotMessage () {
  const res = $.ajax('http://quotes.stormconsultancy.co.uk/random.json');

  res.then(data => {
    const message = new Message(data.quote, false);

    renderMessage(message);
  }).catch(e => {
    alert('There is something wrong.');
  });
}

function onButtonClick () {
  const textarea = $('#message-input');
  const input = textarea.val().trim();

  if (input) {
    const message = new Message(input);
    renderMessage(message);
    textarea.val('');
  }
}

module.exports = main;
