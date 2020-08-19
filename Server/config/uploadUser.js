const multer = require('multer');
var mkdirp = require('mkdirp');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let path = `uploadUser/`;
        // uploads/${req.params.type}
        mkdirp(path, err => {
            if (err) {
                console.log('err', err);
                cb(err, path)
            }
        })

        cb(null, path)
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const uploadUser = multer({ storage: storage });
module.exports = uploadUser;