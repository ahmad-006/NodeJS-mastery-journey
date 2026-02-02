import mongodb from "mongodb";

const MongoClient = mongodb.MongoClient;

let _db;

export const mongoConnect = (cb) => {
  MongoClient.connect(
    "mongodb+srv://mrsheikho-06:RK5SOUbYuNnsPIM7@cluster0.cv16iwb.mongodb.net/shop?appName=Cluster0",
  )
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
