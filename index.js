import express from "express";
import * as dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();
const app = express();
app.use(express.json());

const PORT = 5000;
const MONGO_URL = process.env.MONGO_URL;

const client = new MongoClient(MONGO_URL);
await client.connect();
console.log("mongodb is live");

//App start

app.get("/", function (req, res) {
  res.send("Hello, world!");
});

app.listen(PORT, () => {
  console.log("server working");
});

//create room

app.post("/createcustomer", async (req, res) => {
  let data = [req.body]; // wrap the object in an array
  let result = await client
    .db("hallbook")
    .collection("customer")
    .insertMany(data);
  res.send("success");
  console.log(result);
});
app.get("/customer", async (req, res) => {
  const result = await client
    .db("hallbook")
    .collection("customer")
    .find({})
    .toArray();
  res.send(result);
});

// Booking a Room With

app.post("/bookroom", async (req, res) => {
  let data = [req.body]; // wrap the object in an array
  let result = await client
    .db("hallbook")
    .collection("bookroom")
    .insertMany(data);
  res.send("success");
  console.log(result);
});
app.get("/room", async (req, res) => {
  const result = await client
    .db("hallbook")
    .collection("room")
    .find({})
    .toArray();
  res.send(result);
});

//list all room with booked data with

app.get("/roomdata", async (req, res) => {
  let roomdata = req.body;
  const result = await client
    .db("hallbook")
    .collection("rooms")
    .aggregate([
      {
        $lookup: {
          from: "customer",
          localField: "room_id",
          foreignField: "customer_id",
          as: "Booking_Details",
          pipeline: [
            {
              $project: {
                customer_name: 1,
                date: 1,
                start: 1,
                end: 1,
                status: 1,
              },
            },
          ],
        },
      },
    ])
    .toArray();
  result.length > 0
    ? res.send(result)
    : res.status(401).send({ message: "No data Found" });
});

//List Customer Data
app.get("/customerdata", async (req, res) => {
  let roomdata = req.body;
  const result = await client
    .db("hallbook")
    .collection("customerdata")
    .aggregate([
      {
        $lookup: {
          from: "rooms",
          as: "Room_Name",
          pipeline: [{ $project: { roomName: 1 } }],
        },
      },
    ])
    .toArray();
  result.length > 0
    ? res.send(result)
    : res.status(401).send({ message: "No data Found" });
});
