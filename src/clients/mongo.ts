import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

let mongoClient: MongoClient;
let mongoPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    mongoClient = new MongoClient(uri);
    global._mongoClientPromise = mongoClient.connect();
  }
  mongoPromise = global._mongoClientPromise;
} else {
  mongoClient = new MongoClient(uri);
  mongoPromise = mongoClient.connect();
}

export default mongoPromise;
