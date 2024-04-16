const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const bcrypt = require('bcrypt');

app.use(express.json())

//new user registration
app.post('/user', async (req, res) => {
  //check if username is already exist
  let existing = await client.db("sample_mflix").collection("subjects").findOne(
    {
      username: req.body.username
    }
  )

if(existing){
  res.status(400).send("username already exist")
} else {

  // inserOne the registration data to mongo
  const hash = bcrypt.hashSync(req.body.password, 10);
  //console.log(req.body)
  let result = await client.db("sample_mflix").collection("subjects").insertOne(
    {
      username: req.body.username,
      password: hash,
      name: req.body.name,
      email: req.body.email
    }
  )
  res.send(result)
  }
})

//user login api
app.post('/login', async (req, res) => {
  //step #1: 
  if (req.body.username != null && req.body,password !== null) {
  let result = await client.db("sample_mflix").collection("subjects").findOne(
    {
      username: req.body.username
    }
  )

  //console.log(result)

  if (result) {
    //step #2: if user exist
    //console.log(req.body.password)
    //console.log(result.password)
    if (bcrypt.compareSync(req.body.password, result.password) == true) {
      //password is correct
      res.send("Welcome back" +  result.name)
    } else {
      //password is incorrect
      res.send('wrong password')
  }

  } else {
    //step #3: if user not found
    res.send("username is not found")
  }
} else {
  res.status(400).send("missing username or password")
}
})

app.get('/', (req, res) => {
  res.send('Fit!')
})

app.post('/', (req, res) => {
  res.send('FitAuni!')
})

app.get('/subjects', async (req, res) => {
  let subjects = await client.db('sample_mflix').collection('subjects').find().toArray()
  console.log(subjects)
  res.send(subjects)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://FITRIAHAUNI:ezekiel979@cluster0.ihoolyh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // let result = await client.db('sample_mflix').collection('subjects').insertOne(
    //   {
    //     subject: 'BERR 2423',
    //     code: 'BERR 2324',
    //     description: 'Database and Cloud',
    //     credit: 3
    //   }
    // )
    // console.log(result)

    // let subjects = await client.db('sample_mflix').collection('subjects').find(
    //   {
    //     credit: 3
    //   }
    // ).toArray()
    // console.log(subjects)

    // let updated = await client.db('sample_mflix').collection('subjects').updateOne(
    //   { code: 'BERR 2261' },
    //   {
    //     $set: {
    //       description: 'Data Science',
    //       lecturer: 'Dr. John Doe',
    //       semester: 3
    //     }
    //   }
    // )
    // console.log(updated)

    let deleted = await client.db('sample_mflix').collection('subjects').deleteOne(
      {
        _id: new ObjectId('660b6936016686e968eceadf')
      }
    )

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
