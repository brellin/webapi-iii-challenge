function firstCap(req, res, next) {
    const { name } = req.body
    const pat = /((^[A-Z])[a-z]?)+/g
    if (pat.test(name)) {
        next()
    } else {
        next('You need to include a field called name and the first letter needs to be capitalized.')
    }
}

function errorLogger(err, req, res, next) {
    res.status(400).send(`<h2>${err}</h2>`)
}

module.exports = {
    firstCap,
    errorLogger
}
