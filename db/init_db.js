// code to build and initialize DB goes here
const {
  client,
   rebuildDB,
   populateInitialData
  // other db methods 
} = require('./seed_data');

client.connect()
  .then(rebuildDB)
  .then(populateInitalData)
  .catch(console.error)
  .finally(() => client.end());