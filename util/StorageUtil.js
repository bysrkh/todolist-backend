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
        this.s3 = new AWS.S3({
            endpoint: process.env.S3_HOST,
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_KEY
        })
    }

    _handleFile = (req, file, callback) => (
        this.getDestination(req, file, (err, fileBucket) => {
            if (err) return callback(err)

            this.getFilename(req, file, (err, fileName) => {

                function outStream(s3) {
                    const pass = new stream.PassThrough();
                    s3.upload({
                        Bucket: fileBucket, Key: fileName, Body: pass
                    }, {
                        partSize: 5242880, queueSize: 1
                    }, (err, data) => {
                        if (err) return callback(err)
                        if (data) callback(null, {path: data.Location, fileName: data.Key, size: file.size})
                    })

                    return pass
                }

                file.stream.pipe(outStream(this.s3))
            })
        })
    )

    _removeFile = (req, file, callback) => { } //TODO: leave it empty for a while
}

module.exports = opts => new StorageUtil(opts)