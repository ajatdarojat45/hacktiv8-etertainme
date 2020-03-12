const {ObjectID} = require('mongodb')
const TvModel = require('../models/tv');

exports.getData = async function(req, res) {
  const collection = TvModel(req.db);
  const tvs = await collection.find({}).toArray();
  res.send(tvs);
};

exports.store = async (req, res) => {
  const collection = TvModel(req.db);
  const tvs = await collection.insertOne({
    title: req.body.title,
	  overview: req.body.overview,
    poster_path: req.body.poster_path,
    popularity: 0,
	  tags: req.body.tags
  });
  res.send(tvs.ops);
}

exports.destroy = async (req, res) => {
  const collection = TvModel(req.db);
  await collection.deleteOne({_id: ObjectID(req.params.id)})
  res.send("Data deleted");
}

exports.update = async (req, res) => {
  const collection = TvModel(req.db);
  try {
    const tv = await collection.findOneAndUpdate(
      {_id: ObjectID(req.params.id)}, 
      {$set: 
        {
          title: req.body.title, 
          overview: req.body.overview, 
          poster_path: req.body.poster_path,
          tags: req.body.tags,
        }
      }
    );
    res.send(tv);
  } catch (error) {
    res.send(error)
  }
}