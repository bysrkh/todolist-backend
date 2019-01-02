module.exports = (err, req, res, next) => {

    console.log('ulululu')
    console.error(err.stack)


    res
        .status(500)
        .json({message: 'an error occured in internal server. please contact the site administrator'})
}