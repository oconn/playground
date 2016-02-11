var express = require('express');
var cors = require('cors');

const app = express();

app.use(cors());

app.post('/test', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.send('hello world');
});

app.listen(8081, () => {});
