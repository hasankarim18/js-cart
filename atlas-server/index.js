
/**
 *  Summer school server
 * 
 */

const express = require('express')
const cors    = require('cors')

require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express()




// middlewares 
app.use(cors())
app.use(express.json());


const port = process.env.PORT || 5000



/**
 * Mongodb
 */

const userName = process.env.USER;
const password = process.env.PASSWORD





const uri =
  `mongodb+srv://${userName}:${password}@cluster0.nzfxe6e.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
   // await client.connect();
     client.connect();

    const database = client.db("js_cart");
     const productCollection = database.collection("products");

    app.get('/products',async (req, res)=> {
       try {
         const cursor = productCollection.find();
         const result = await cursor.toArray();
         res.send({ message: "success", data: result });
       } catch (error) {
         res.send({ message: "error", data: [], error:error });
       }
    })
  

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
  //  await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res)=> {
    res.send('js cart')
} )

app.listen(port, ()=> {
    console.log('js cart server')
})




