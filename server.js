const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const assert = require("assert");
const cors = require("cors");

let mongo_url = "mongodb://localhost:27017";
let dataBase = "contacts-database";

app.listen(3001, error => {
  if (error) {
    console.log("server can't be running");
  } else {
    console.log("server is running perfecly");
  }
});
app.use(cors());
app.use(bodyParser.json());
mongodb.MongoClient.connect(
  mongo_url,
  { useUnifiedTopology: true },
  (err, client) => {
    if (err) {
      console.log("can't connect to mongodb database");
    }

    let db = client.db(dataBase);

    app.post("/add_contact", (req, res) => {
      let newContact = req.body;
      db.collection("contacts").insertOne(newContact, (err, data) => {
        if (err) {
          res.send("can't add the contact");
        }
        res.send("contact added perfectly");
      });
    });

    app.get("/find_contacts", (req, res) => {
      db.collection("contacts")
        .find()
        .toArray((err, data) => {
          if (err) {
            res.send("error finding your contacts");
          } else {
            res.send(data);
          }
        });
    });

    app.get("/find_contacts/:id", (req, res) => {
      let id = mongodb.ObjectID(req.params.id);
      db.collection("contacts").findOne({ _id: id }, (err, data) => {
        res.send(data);
      });
    });

    app.put("/modify_contacts/:id", (req, res) => {
      let id = mongodb.ObjectID(req.params.id);
      db.collection("contacts").findOneAndUpdate(
        { _id: id },
        { $set: { ...req.body } },
        (err, data) => {
          if (err) {
            res.send(err);
          }
          res.send(data);
        }
      );
    });

    app.put("/change_modification_state/:id", (req, res) => {
      let id = mongodb.ObjectID(req.params.id);
      db.collection("contacts").findOneAndUpdate(
        { _id: id },
        { $set: { ...req.body } },
        (err, data) => {
          if (err) {
            console.log(err);
          } else {
            res.send(data);
          }
        }
      );
    });

    app.delete("/delete_contact/:id", (req, res) => {
      let id = mongodb.ObjectID(req.params.id);
      db.collection("contacts").findOneAndDelete({ _id: id }, (err, data) => {
        if (err) {
          res.send(err);
        } else {
          res.send(data);
        }
      });
    });
  }
);
