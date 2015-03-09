'use strict';

var socketIO = require('socket.io');

exports.register = function (server, opts, next) {
    var io, selection;
    server.log(['socket.io', 'info'], 'Initializing socket...');

    selection = opts.serverLabel ? server.select(opts.serverLabel) : server;
    io = socketIO.listen(selection.connections[0].listener, opts);
    server.expose('io', io);
    io.on('connection', function (socket) {
        socket.emit({msg: 'welcome'});
    });

    next();
};

exports.register.attributes = {
    pkg: require('../package.json')
};