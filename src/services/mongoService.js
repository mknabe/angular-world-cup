let db = null;
const mongojs = require('mongojs');

//brew install mongodb
//Start the db with mongod --dbpath "make a folder somewhere and put the path here"

const COLLECTION_NAME = 'world_cup_data';

const readFromDatabase = (key) => {
  return new Promise((resolve, reject) => {
    db[COLLECTION_NAME].find({key}, (err, data) => {
      if (err || !data) {
        const msg = `Could not read data ${key} from Mongo. Likely no connection.`;
        console.error(msg);
        reject(msg);
        return;
      }
      console.log('Read ' + key + ' from db');
      resolve(data[0].data);
    });
  });
};

const persist = (key, data) => {
  return new Promise((resolve, reject) => {
    db[COLLECTION_NAME].update({key}, {$set: {data}}, {upsert: true}, (err, saved) => {
      if (err || !saved) {
        const msg = `${key} errored: ${err}`;
        console.error(msg);
        reject(msg);
        return;
      }
      console.log('Persisted ' + key);
      resolve(data);
    })
  });
};

module.exports = {
  initializeDB: () => {
    const databaseUrl = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'local';
    const collections = [COLLECTION_NAME];
    db = mongojs(databaseUrl, collections);
  },
  persist,
  readFromDatabase
};