import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017";

async function createdbconnection() {
  const client = new MongoClient(url);
  await client.connect();
  console.log("mongodb is connected succcess");
  return client;
}

export const client = await createdbconnection();
