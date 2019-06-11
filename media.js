// https://gabrieleromanato.name/nodejs-resize-images-as-thumbnails-on-the-fly-in-expressjs


// this works
// https://blog.campvanilla.com/nodejs-graphicsmagick-cropping-resizing-server-api-b410fe98e41

'use strict';

const path = require('path');
const ABSPATH = path.dirname(process.mainModule.filename);
const gm = require('gm');
const fs = require('fs');

const exists = (path) => {
    try {
        return fs.statSync(path).isFile();
    } catch (e) {
        return false;
    }
};

const getFileExtension = (filename) => {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
};

class Media {
    constructor(path) {
        this.src = path;
    }

    isValidMedia(src) {
        return /\.(jpe?g|png)$/.test(src);
    }

    isValidBaseDir(src) {
        return /^\/public\/images/.test(src);
    }

    thumb(request, response) {
        let image = ABSPATH +  this.src;

        //console.log(this.src)
        //console.log(request.query)

        //console.log(this.isValidBaseDir(this.src))
        //console.log(this.isValidMedia(this.src))
        //console.log(exists(image))
        
        if(this.isValidBaseDir(this.src) && this.isValidMedia(this.src) && exists(image)) {

            let width = (request.query.w && /^\d+$/.test(request.query.w)) ? request.query.w : null;
            let height = (request.query.h && /^\d+$/.test(request.query.h)) ? request.query.h : null;
            let extension = getFileExtension(this.src);
            let mime = (extension === 'jpeg' || extension === 'jpg') ? 'jpeg' : 'png';

            response.type(mime);

            //gm(image).resize(width, height).stream().pipe(response);

            gm(image)
            .resize(width, height)
            
            // TODO filename using uuid
		    .write('./public/tmp.png', (err) => {
		      if (err) {
		        console.log(err); 
		      } else {
                //var del = 1
                
                // TODO filename using uuid  
                response.sendFile(__dirname + '/public/tmp.png');

                // https://stackoverflow.com/questions/46858445/express-js-response-sent-callback
                response.on('finish', function() {
                    try {
                      // TODO filename using uuid
                      fs.unlinkSync(__dirname + '/public/tmp.png'); 
                    } catch(e) {
                      // TODO filename using uuid
                      console.log("error removing ", __dirname + '/public/tmp.png'); 
                    }
                });
		      }
		    })

		    // if(del)
		    // 	fs.unlinkSync(__dirname + '/tmp.png')
		   
        } else {
            response.sendStatus(404);
        }    
    }
}

module.exports = Media;