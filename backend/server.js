const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
    console.error("MONGO_URI is not defined");
    process.exit(1);
}

const client = new MongoClient(mongoUri);
const dbName = "passop";

app.use(bodyParser.json());
app.use(cors());

let collection;

async function startServer() {
    try {
        await client.connect();

        console.log("Connected to MongoDB Atlas");

        const db = client.db(dbName);
        collection = db.collection("passwords");

        app.get("/", async (req, res) => {
            try {
                const passwords = await collection.find({}).toArray();
                res.json(passwords);
            } catch (error) {
                console.error("GET error:", error);
                res.status(500).json({
                    success: false,
                    error: error.message
                });
            }
        });

        app.post("/", async (req, res) => {
            try {
                const password = req.body;

                const result = await collection.insertOne(password);

                res.json({
                    success: true,
                    result
                });
            } catch (error) {
                console.error("POST error:", error);
                res.status(500).json({
                    success: false,
                    error: error.message
                });
            }
        });

        app.delete("/", async (req, res) => {
            try {
                const password = req.body;

                const result = await collection.deleteOne(password);

                res.json({
                    success: true,
                    result
                });
            } catch (error) {
                console.error("DELETE error:", error);
                res.status(500).json({
                    success: false,
                    error: error.message
                });
            }
        });

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });

    } catch (error) {
        console.error("MongoDB connection failed:");
        console.error(error);
        process.exit(1);
    }
}

startServer();