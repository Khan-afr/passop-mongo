dotenv.config();
const cors = require('cors');
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const url = process.env.MONGO_URI;
const client = new MongoClient(url);
const dbName = 'passop';



const port = process.env.PORT || 3000;

const url = process.env.MONGO_URI;
const client = new MongoClient(url);

const dbName = 'passop';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(cors());

client.connect()
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

// GET all passwords
app.get('/', async (req, res) => {
    try {
        const db = client.db(dbName);
        const collection = db.collection('passwords');

        const findResult = await collection.find({}).toArray();

        res.json(findResult);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// POST password
app.post('/', async (req, res) => {
    try {
        const password = req.body;

        const db = client.db(dbName);
        const collection = db.collection('passwords');

        const findResult = await collection.insertOne(password);

        res.send({
            success: true,
            result: findResult
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// DELETE password
app.delete('/', async (req, res) => {
    try {
        const password = req.body;

        const db = client.db(dbName);
        const collection = db.collection('passwords');

        const findResult = await collection.deleteOne(password);

        res.send({
            success: true,
            result: findResult
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});