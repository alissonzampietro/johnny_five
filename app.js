const {Led, Board} = require('johnny-five');
const express = require('express');
const app = express();
const board = new Board();

const blink = (port, color, res) => {
  const led = new Led(port);
  led.fadeIn();
  board.wait(1000, () => {
    led.fadeOut()
    res.end(color+' Blinked')
  })
}

const blinkRed = (req, res) => {
    blink(5, 'red', res)
}
const blinkGreen = (req, res) => {
  blink(10, 'green', res)
}
const blinkYellow = (req, res) => {
  blink(6, 'yellow', res)
}

board.on("ready", function() {
  app.get('/red', blinkRed)
  app.get('/green', blinkGreen)
  app.get('/yellow', blinkYellow)
});

app.listen(4000, () => {
  console.log('running on port 4000')
})