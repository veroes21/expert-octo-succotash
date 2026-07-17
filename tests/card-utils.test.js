const test = require('node:test');
const assert = require('node:assert/strict');
const { getCardImageUrl } = require('../assets/card-utils.js');

test('builds deckofcardsapi image URLs for card values and suits', () => {
  assert.equal(getCardImageUrl({ value: '10', suit: 'S' }), 'https://deckofcardsapi.com/static/img/10S.png');
  assert.equal(getCardImageUrl({ value: 'A', suit: 'H' }), 'https://deckofcardsapi.com/static/img/AH.png');
  assert.equal(getCardImageUrl({ value: 'Q', suit: 'C' }), 'https://deckofcardsapi.com/static/img/QC.png');
});
