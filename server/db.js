const { MongoClient } = require('mongodb')

let db

async function connectDb() {
  const url = 'mongodb://localhost/chatchat'
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
  await client.connect()
  console.log('connected to MongoDB at', url)
  db = client.db()
}

function getDb() {
  return db
}

module.exports = { connectDb, getDb }
