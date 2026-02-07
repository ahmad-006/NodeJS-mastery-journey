import mongodb from "mongodb";

const MongoClient = mongodb.MongoClient;

let _db;

export const mongoConnect = (cb) => {
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      _db = client.db("shop");
      cb(client);
    })
    .catch((err) => console.error(err));
};

export const getDb = () => {
  if (_db) return _db;
  console.log("No DB found");
};
