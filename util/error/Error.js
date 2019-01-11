class ModelNotFoundException extends Error {

    constructor(message) {
        super(message)
    }
}

class AuthorizationException extends Error {

    constructor(message) {
        super(message)
    }
}

module.exports = { ModelNotFoundException: ModelNotFoundException, AuthorizationException: AuthorizationException }