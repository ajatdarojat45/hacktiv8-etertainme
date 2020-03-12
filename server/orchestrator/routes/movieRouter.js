const express = require('express');
const router = express.Router();
const axios = require('axios');
const Redis = require("ioredis");
const redis = new Redis();

const moviesUrl = "http://localhost:3001";

router.get('/', async (req, res) => {
  const exist = await redis.get('movies');
  if (exist) {
    res.send(JSON.parse(exist));
  }else{
    axios.get(`${moviesUrl}`)
    .then(({data}) => {
      redis.set("movies", JSON.stringify(data))
      res.send(data)
    })
    .catch(err => {
      throw(err)
    });
  }
});

router.post('/store', (req, res) => {
  axios.post(`${moviesUrl}/store`, req.body)
  .then(({data}) => {
    redis.del("movies");
    res.send(data)
  })
  .catch(err => {
    throw(err)
  });
});

router.delete('/destroy/:id', (req, res) => {
  axios.delete(`${moviesUrl}/destroy/${req.params.id}`)
  .then(({data}) => {
    redis.del("movies");
    res.send(data)
  })
  .catch(err => {
    throw(err)
  });
});

router.put('/update/:id', (req, res) => {
  axios.put(`${moviesUrl}/update/${req.params.id}`, req.body)
  .then(({data}) => {
    redis.del("movies");
    res.send(data)
  })
  .catch(err => {
    throw(err)
  });
});

module.exports = router;