'use-strict'
const utils = require('../utils')

module.exports = (app, dbs) => {

  function validate(data) {
    //some json schema validation
    return data;
  }

  app.get('/allBlogs', (req, res) => {
   res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    dbs.Blog.collection('BlogPosts').find({}).toArray((err, docs) => {
      if (err) {
        console.log(err)
        res.error(err)
      } else {
        res.json(docs)
      }
    })
  });

  app.get('/blog/:blogId', (req, res) => {
res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    dbs.Blog.collection('BlogPosts').find({id: req.params.blogId}).toArray((err, docs) => {
      if (err) {
        console.log(err);
        res.error(err);
      } else {
        res.json(docs);
      }
    })
  });

  app.post('/post', (req, res) => {
res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    dbs.Blog.collection('BlogPosts').insertOne(validate(req.body), (err, docs) => {
      if (err) {
        console.log(err);
        res.error(err);
      } else {
        res.json(docs);
      }
    })
  });

  app.post('/email', (req, res) => {
res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    utils.send(req.body);
    res.json(docs);
  });
  
  return app
}
