/**
 * bysrkh
 * @2020 GNU GPL v2, Yogyakarta
 *
 * bysrkh@gmail.com
 */
const fs = require('fs')

class StorageUtil {

    constructor({destination, filename}) {
        this.getDestination = destination
        this.getFilename = filename
    }

    _handleFile = (req, file, cb) => (
        this.getDestination(req, file, (err, path) => {
            if (err) return cb(err)

            this.getFilename(req, file, (err, filename) => {
                const outStream = fs.createWriteStream(path + filename)
                file.stream.pipe(outStream)
                outStream.on('error', cb)
                outStream.on('finish', () => {
                    cb(null, {
                        path: path,
                        filename: filename,
                        size: outStream.bytesWritten
                    })
                })
            })
        })
    )

    _removeFile = (req, file, cb) => {
        fs.unlink(file.path, cb)
    }
}

module.exports = opts => new StorageUtil(opts)