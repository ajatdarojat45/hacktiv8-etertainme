const {ObjectID} = require('mongodb')
const MovieModel = require('../models/movie');

exports.getData = async function(req, res) {
  const collection = MovieModel(req.db);
  const movies = await collection.find({}).toArray();
  res.send(movies);
};

exports.store = async (req, res) => {
  const collection = MovieModel(req.db);
  const movie = await collection.insertOne({
    title: req.body.title,
	  overview: req.body.overview,
    poster_path: req.body.poster_path,
    popularity: 0,
	  tags: req.body.tags
  });
  res.send(movie.ops);
}

exports.destroy = async (req, res) => {
  const collection = MovieModel(req.db);
  await collection.deleteOne({_id: ObjectID(req.params.id)})
  res.send("Data deleted");
}

exports.update = async (req, res) => {
  const collection = MovieModel(req.db);
  try {
    const movie = await collection.findOneAndUpdate(
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
    res.send(movie);
  } catch (error) {
    res.send(error)
  }
}