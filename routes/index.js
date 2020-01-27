'use-strict'
const utils = require('../utils')

module.exports = (app, dbs) => {

  function validate(data) {
    //some json schema validation
    return data;
  }

  app.get('/allBlogs', (req, res) => {
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
    utils.send(req.body);
    res.json(docs);
  });
  
  return app
}
