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
    console.log("Connected to MongoDB");
    const result = await collection.find().toArray();
    console.log("result: ", result);
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to read data from MongoDB" }),
    };
  } finally {
    await client.close();
  }
};
