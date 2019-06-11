// https://gabrieleromanato.name/nodejs-resize-images-as-thumbnails-on-the-fly-in-expressjs
// gm

'use strict';

const app = require('express')();
const Media = require('./media');

app.get('/thumb', (req, res) => {
    if(req.query.src) {
       let image = new Media(req.query.src);
       image.thumb(req, res);
    } else {
        res.sendStatus(403);
    }
});

// example url
// http://localhost:8080/thumb/?src=/public/images/test.jpg
app.listen(8080);
console.log("listening to port 8080!");