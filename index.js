// const express = require('express')
// const app = express()
// const port = 3000

// const processImage = require('express-processimage')

// const root = __dirname + '/public'

// console.log(root)

// app.use(processImage({root:root}))
// app.use(express.static(root))

// app.get('/hello', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))


var express = require('express'),
    processImage = require('express-processimage'),
    root = __dirname + '/public';

express()
    .use(processImage({root: root}))
    .use(express.static(root))
    .listen(1337);