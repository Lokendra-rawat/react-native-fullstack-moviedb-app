var express = require('express');
var router = express.Router();
var axios = require('axios');

const API_KEY = 'd2cfd1f1e56482aa1301b0283a14ccc1'
const BASE_URL = 'https://api.themoviedb.org/3/movie'

/* GET movies listing. */
router.get('/popular', async function (req, res, next) {
  const { page } = req.query
  let response = await axios.get(`${BASE_URL}/popular`, {
    params: {
      api_key: API_KEY,
      page: page || 1,
    }
  })
  if (response.status === 200) {
    res.send(response.data)
  } else {
    res.send(response.status);
  }
});

router.get('/upcoming', async function (req, res, next) {
  const { page } = req.query
  let response = await axios.get(`${BASE_URL}/upcoming`, {
    params: {
      api_key: API_KEY,
      page: page || 1,
    }
  })
  if (response.status === 200) {
    res.send(response.data)
  } else {
    res.send(response.status);
  }
});

router.get('/details', async function (req, res, next) {
  const { itemId } = req.query
  let response = await axios.get(`${BASE_URL}/${itemId}`, {
    params: {
      api_key: API_KEY,
    }
  })
  if (response.status === 200) {
    res.send(response.data)
  } else {
    res.send(response.status);
  }
});

module.exports = router;
