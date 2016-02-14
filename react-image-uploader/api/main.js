var app = require('express')();
var server = require('http').Server(app);
var util = require('util');
var cors = require('cors');
var formidable = require('formidable');
var io = require('socket.io')(server);

server.listen(8081);

app.use(cors());

app.post('/test', (req, res) => {
    var form = new formidable.IncomingForm();

    form.multiples = true;

    form.parse(req, (err, fields, files) => {
        res.send('File uploaded');
    });
});

io.on('connection', (socket) => {
    socket.emit('connection', 'Connected');

    socket.on('upload-image', (buffer) => {
        console.log(data);
    });
});
