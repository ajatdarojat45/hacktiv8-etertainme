const express = require('express');
const router = express.Router();
const axios = require('axios');
const Redis = require("ioredis");
const redis = new Redis();

const tvUrl = "http://localhost:3002";

router.get('/', async (req, res) => {
  const cache = await redis.get('tvs');
  if (cache) {
    res.send(JSON.parse(cache));
  }else{
    axios.get(`${tvUrl}`)
    .then(({data}) => {
      redis.set("tvs", JSON.stringify(data))
      res.send(data)
    })
    .catch(err => {
      throw(err)
    });
  }
});

router.post('/store', (req, res) => {
  axios.post(`${tvUrl}/store`, req.body)
  .then(({data}) => {
    redis.del("tvs");
    res.send(data)
  })
  .catch(err => {
    throw(err)
  });
});

router.delete('/destroy/:id', (req, res) => {
  axios.delete(`${tvUrl}/destroy/${req.params.id}`)
  .then(({data}) => {
    redis.del("tvs");
    res.send(data)
  })
  .catch(err => {
    throw(err)
  });
});

router.put('/update/:id', (req, res) => {
  axios.put(`${tvUrl}/update/${req.params.id}`, req.body)
  .then(({data}) => {
    redis.del("tvs");
    res.send(data)
  })
  .catch(err => {
    throw(err)
  });
});

module.exports = router;