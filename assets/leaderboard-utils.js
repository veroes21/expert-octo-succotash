function normalizeUsername(value) {
  return String(value || '').trim().slice(0, 12);
}

function mergeLeaderboardEntry(entries, entry, maxEntries = 5) {
  const safeEntries = Array.isArray(entries) ? entries : [];
  return [...safeEntries, entry]
    .sort((a, b) => b.balance - a.balance)
    .slice(0, maxEntries);
}

if (typeof window !== 'undefined') {
  window.leaderboardUtils = { normalizeUsername, mergeLeaderboardEntry };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { normalizeUsername, mergeLeaderboardEntry };
}
