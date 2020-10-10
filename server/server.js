require('dotenv').config()
const path = require('path')
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const render = require('./render')
const schema = require('./schema')

function server(val) {
  const resolvers = {
    Query: {
      users: () => [{ name: 'Arthur', url: 'https://lol.lo' }],
    },
    Mutation: {
      signup(_, { creds }) {
        console.log(creds)
        return { name: 'Arthur', url: 'https://lol.lo' }
      },
    },
  }

  const app = val || express()
  app.use(express.static(path.resolve(__dirname, 'public')))

  const apolloServer = new ApolloServer({
    typeDefs: schema,
    resolvers,
  })
  apolloServer.applyMiddleware({ app })
  app.use(render)
  const port = process.env.PORT || 8000
  app.listen(port, console.log(`server started on port ${port}`))
}

module.exports = server
