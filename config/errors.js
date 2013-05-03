/*jslint node: true, nomen: true, devel: true, indent: 4 */

module.exports = function (app, express) {

    "use strict";

    // Error handler
    app.use(function (err, req, res, next) {
        if (err.message.indexOf('not found')) { return next(); } // treat as 404
        console.error(err.stack); // log errors
        // res.status(500).render('errors/5xx', { error: err }); // 500 error
        res.write(err);
        res.end();
    });

    // 404 Error
    app.use(function (req, res, next) {
        res.status(404).render('errors/404', { url: req.originalUrl });
    });

};
