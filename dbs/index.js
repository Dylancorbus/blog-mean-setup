const MongoClient = require('mongodb').MongoClient

// Note: A production application should not expose database credentials in plain text.
// For strategies on handling credentials, visit 12factor: https://12factor.net/config.
const BLOG_URI = "mongodb://root:Bo\@rdlife@172.26.0.229:27017/Blog"

function connect(url) {
  return MongoClient.connect(url).then(client => client.db())
}

module.exports = async function() {
  let databases = await Promise.all([connect(BLOG_URI)]);

  return {
    Blog: databases[0]
  }
}