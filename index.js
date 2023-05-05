import express from "express";
import { client } from "./db.js";
const app = express();
const data = [
  {
    id: "1",
    numberofseats: 100,
    amenties: ["Ac,", "chair"],
    price: 5000,
    ifbooked: "true",
    customername: "Abdul",
    date: "05-feb-2023",
    roomid: 123,
    roomName: "duplex",
  },
  {
    id: "2",
    numberofseats: 100,
    amenties: ["Ac,", "chair"],
    price: 5000,
    ifbooked: "false",
    customername: "Azees",
    date: "05-feb-2022",
    roomid: 123,
    roomName: "custom",
  },
];

app.get("/hall/ticket", (req, res) => {
  res.send(data);
});
app.use(express.json());

app.post("/hall/ticket", (req, res) => {
  const newhall = {
    id: data.length + 1,
    numberofseats: req.body.numberofseats,
    amenties: req.body.amenties,
    price: req.body.price,
    customername: req.body.customername,
    roomname: req.body.roomName,
  };
  console.log(req.body);
  data.push(newhall);
  res.send(data);
});
function getcompanydetails() {
  return client.db("guvi").collection("company").find().toArray();
}
app.get("/cars/data", async (req, res) => {
  const companydata = await getcompanydetails();
  return res.status(200).json({ data: companydata });
  res.send(companydata)
});

app.listen(6000, () => console.log("server start"));
