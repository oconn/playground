var app = require('express')();
var server = require('http').Server(app);
var util = require('util');
var cors = require('cors');
var multiparty = require('multiparty');

server.listen(8081);

app.use(cors());

app.post('/test', (req, res) => {
    var form = new multiparty.Form();

    form.parse(req, (err, fields, files) => {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));
        console.log(util.inspect(files))
    });
});
