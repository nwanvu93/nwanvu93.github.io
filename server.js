let express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
let app = express();
let port = 3030;
let root = 'docs';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(root));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, `${root}/index.html`)));
app.get('/portfolio', (req, res) => res.sendFile(path.join(__dirname, `${root}/portfolio.html`)));
app.get('/404', (req, res) => res.sendFile(path.join(__dirname, `${root}/404.html`)));


app.listen(port, function () {
    console.log('==> http://localhost:' + port);
});