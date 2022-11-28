"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express = require("express");
const data_source_1 = require("./data/data-source");
const grpcServer_1 = require("./services/grpcServer");
const debug = require('debug')('my express app');
const app = express();
app.use(express.json());
data_source_1.AppDataSource
    .initialize()
    .then(() => console.log("Data Source has been initialized!"))
    .catch((err) => console.error("Error during Data Source initialization:", err));
const grpcServer = new grpcServer_1.GrpcServer();
grpcServer.start(3000);
// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), function () {
    debug(`Express server listening on port ${server.address().port}`);
});
//# sourceMappingURL=app.js.map