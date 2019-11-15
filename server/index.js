const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const axios = require('axios');
const port = 3006;
const cors = require('cors');

const app = express();








//app.use('/', express.static('public'));
//For Loader io below
app.use('/', express.static(__dirname + '/../')); //loader.io
//For Loader io above
app.use('/:gameId', express.static('public'));
app.use(compression());
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api/:service', (req, res) => {
  let service = req.params.service;
  console.log(`request for ${service}`);
  if (service === 'overview') {
    axios
      .get(`${overview}/1/dist/bundle.js`)
      .then(response => {
        res.send(response.data);
      })
      .catch(err => {
        console.log(`error in request for ${service}: ${err}`);
        res.status(404).send(err);
      });
  } else if (service === 'image') {
    axios
      .get(`${image}/1/bundle.js`)
      .then(response => {
        res.send(response.data);
      })
      .catch(err => {
        console.log(`error in request for ${service}: ${err}`);
        res.status(404).send(err);
      });
  } else if (service === 'reviews') {
    axios
      .get(`${reviews}/1/dist/bundle.js`)
      .then(response => {
        res.send(response.data);
      })
      .catch(err => {
        console.log(`error in request for ${service}: ${err}`);
        res.status(404).send(err);
      });
  } else if (service === 'aboutGame') {
    console.log(`${aboutGame}`);
    axios
      .get(`${aboutGame}/1/bundle.js`)
      .then(response => {
        res.send(response.data);
      })
      .catch(err => {
        console.log(`error in request for ${service}: ${err}`);
        res.status(404).send(err);
      });
  }
});

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});