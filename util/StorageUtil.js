/**
 * bysrkh
 * @2020 GNU GPL v2, Yogyakarta
 *
 * bysrkh@gmail.com
 */
const fs = require('fs')
const AWS = require('aws-sdk')
const stream = require('stream')

class StorageUtil {

    constructor({destination, filename}) {
        this.getDestination = destination
        this.getFilename = filename
    }

    _handleFile = (req, file, cb) => (
        this.getDestination(req, file, (err, bucketName) => {
            if (err) return cb(err)

            this.getFilename(req, file, (err, fileName) => {
                const s3 = new AWS.S3({
                    endpoint: process.env.S3_HOST,
                    accessKeyId: process.env.S3_ACCESS_KEY,
                    secretAccessKey: process.env.S3_SECRET_KEY
                })

                function outStream(s3) {
                    const pass = new stream.PassThrough();
                    s3.upload({
                        Bucket: bucketName,
                        Key: fileName,
                        Body: pass
                    }, {
                        partSize: 5242880,
                        queueSize: 1
                    }, function (err, data) {
                        if (err) cb(err)
                        if (data) cb(null, {
                            path: path,
                            fileName: fileName,
                            size: file.size
                        })
                    })

                    return pass
                }

                file.stream.pipe(outStream(s3))
            })
        })
    )

    _removeFile = (req, file, cb) => {
        fs.unlink(file.path, cb)
    }
}

module.exports = opts => new StorageUtil(opts)