const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const axios = require('axios');
const port = 3006;

const app = express();

app.use('/', express.static('public'));
app.use('/:gameId', express.static('public'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// write code to handle getting data
// let overview = 'http://ec2-18-144-35-234.us-west-1.compute.amazonaws.com';
// let reviews = 'http://ec2-54-183-55-106.us-west-1.compute.amazonaws.com';
// let image = 'http://ec2-13-57-33-155.us-west-1.compute.amazonaws.com';
// let aboutGame = 'http://my-env.wf8cymc59m.us-west-1.elasticbeanstalk.com';
let overview = 'http://ec2-13-57-13-174.us-west-1.compute.amazonaws.com';
let reviews = 'http://ec2-54-183-55-106.us-west-1.compute.amazonaws.com';
let image = 'http://ec2-13-57-33-155.us-west-1.compute.amazonaws.com';
let aboutGame = 'http://my-env.wf8cymc59m.us-west-1.elasticbeanstalk.com';

app.use('/api/:service', (req, res) => {
  let service = req.params.service;
  console.log(`request for ${service}`);
  if (service === 'overview') {
    axios.get(`${overview}/1/dist/bundle.js`)
      .then((response) => {
        // console.log(response.data);
        res.send(response.data);
      })
      .catch((err) => {
        console.log(`error in request for ${service}: ${err}`);
      })
  } else if (service === 'reviews') {
    axios.get(`${reviews}/1/dist/bundle.js`)
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        console.log(`error in request for ${service}: ${err}`);
      })
  } else if (service === 'image') {
    axios.get(`${image}/1/bundle.js`)
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        console.log(`error in request for ${service}: ${err}`);
      })
  } else if (service === 'aboutGame') {
    axios.get(`${aboutGame}/bundle.js`)
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        console.log(`error in request for ${service}: ${err}`);
      })
  }
})

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});