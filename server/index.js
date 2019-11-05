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

// write code to handle getting data
// let overview = 'localhost:3000';
// let image = 'http://ec2-52-53-185-254.us-west-1.compute.amazonaws.com/';
// let reviews = 'http://ec2-54-183-55-106.us-west-1.compute.amazonaws.com';
// let aboutGame = 'http://my-env.wf8cymc59m.us-west-1.elasticbeanstalk.com';
// let aboutGame = 'http://ec2-18-218-54-252.us-east-2.compute.amazonaws.com:8081';


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