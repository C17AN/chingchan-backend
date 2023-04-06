"use strict";

const { ServerApiVersion } = require("mongodb");

const MongoClient = require("mongodb").MongoClient;

module.exports.handler = async (event, context) => {
  // MongoDB connection string
  const uri =
    "mongodb+srv://spacesangsoo:recharge1@main.smgwwyi.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    console.log("Connecting to MongoDB");
    await client.connect();
    const collection = client.db("main").collection("user");

    const document = { message: "Hello, MongoDB!" };
    await collection.insertOne(document);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Data written to MongoDB successfully",
        data: document,
      }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error writing to MongoDB" }),
    };
  } finally {
    await client.close();
  }
};
