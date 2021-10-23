const {client} = require('./client');
const {
  rebuildDB,
  populateInitialData
} = require('./seed_data');

client.connect()
  .then(rebuildDB)
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());