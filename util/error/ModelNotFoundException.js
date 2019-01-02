module.exports = class ModelNotFoundException extends Error {

    constructor(message) {
        super(message)
    }
}