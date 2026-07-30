function normalizeCardValue(value) {
  return String(value).toUpperCase();
}

function normalizeCardSuit(suit) {
  return String(suit).toUpperCase();
}

function getCardImageUrl(card) {
  if (!card) return '';

  const value = normalizeCardValue(card.value);
  const suit = normalizeCardSuit(card.suit);

  if (!value || !suit) return '';

  return `https://deckofcardsapi.com/static/img/${value}${suit}.png`;
}

if (typeof window !== 'undefined') {
  window.cardUtils = { getCardImageUrl };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getCardImageUrl };
}
