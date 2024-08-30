const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');

const app = express();
var jsonParser = bodyParser.json()
const port = process.env.PORT || 3000;


app.get('/', async (req, res) => {

  res.send('Hello from my Express app!');

});

app.post('/', jsonParser,async (req, res) => {
  
  const browser  = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(req.body.url||'https://adventuretime.pro');

  await page.pdf({
    path: 'formatted.pdf',
    format: 'A4',
    margin: { top: '40px', right: '20px', bottom: '40px', left: '20px' },
  });

  await browser.close()
  res.download('./formatted.pdf')
  
  //res.send('test')
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});