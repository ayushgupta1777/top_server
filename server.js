const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

const SHOPIFY_ACCESS_TOKEN = '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';
const SHOPIFY_API_URL = 'https://messold101.myshopify.com/admin/api/2023-01/products.json';

const allowedOrigins = ['https://assigenment-ayush21.web.app']; // Add your front-end domain here

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/api/products', async (req, res) => {
  try {
    const response = await axios.get(SHOPIFY_API_URL, {
      headers: {
        'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
        'Content-Type': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Error fetching products');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
