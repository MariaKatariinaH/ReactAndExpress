const express = require('express');
const fetch = require('node-fetch'); 
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/get_prices', async (req, res) => {
  try {
    const response = await fetch('https://api.porssisahko.net/v1/latest-prices.json');
    const data = await response.json();
    res.send({ prices: data }); 
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});