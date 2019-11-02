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
let overview = 'http://ec2-54-153-99-135.us-west-1.compute.amazonaws.com';
let image = 'http://ec2-52-53-185-254.us-west-1.compute.amazonaws.com/';
let reviews = 'http://ec2-52-53-170-110.us-west-1.compute.amazonaws.com:3001/';
let aboutGame = 'http://ec2-18-218-54-252.us-east-2.compute.amazonaws.com:8081/';

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
  } else if (service === 'image') {
    axios.get(`${image}/1/bundle.js`)
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        console.log(`error in request for ${service}: ${err}`);
      })
  } 
  else if (service === 'reviews') {
    axios.get(`${reviews}/1/dist/bundle.js`)
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => {
        console.log(`error in request for ${service}: ${err}`);
      })
  }
   else if (service === 'aboutGame') {
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