# Macro App

An exploration of a "full-stack" application to emulate a macro-nutrient tracker.

### Pre-requisites

- Create an Mlab instance
- Configure .env with Mlab credentials and server url

### Installing

```
$ npm install
```

### Running

Concurrently is used to allow us to start the frontend and backend.

From the project root/src, run:

```
$ npm start
```

## Built With

- [React.js](https://reactjs.org/) - The web framework used
- [GraphQL](https://graphql.org/) - Schema definition language used
- [Apollo Server/Client](https://www.apollographql.com/) - Used to run our GraphQL server and serve data to the front-end
- [mLab](https://mlab.com/) - Our database-as-a-service
- [Mongoose](https://mongoosejs.com/docs/guide.html) - Used for defining our MongoDB models and accessing documents in MongoDB
