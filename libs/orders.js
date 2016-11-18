var client = require(__dirname + '/client')();

function Orders() {
    this.resource = '/orders';
}

Orders.prototype.getAll = function(qs, callback) {
    var options = {
        method: 'GET',
        url: resource,
        qs: qs
    };

    client.call(options, function(err, response) {
        if (err) {
            return callback(err, bull);
        }
        callback(null, JSON.parse(response));
    });
};

Orders.prototype.get = function(id, callback) {
    var options = {
        method: 'GET',
        url: resource + '/' + id,
    };

    client.call(options, function(err, response) {
        if (err) {
            return callback(err, bull);
        }
        callback(null, response);
    });

};

Orders.prototype.update = function(id, data, callback) {
    var options = {
        method: 'PUT',
        url: resource + '/' + id,
        json: true,
        body: data
    };

    client.call(options, function(err, response) {
        if (err) {
            return callback(err, bull);
        }
        callback(null, response);
    });
};


Orders.prototype.createInvoice = function(id, data, callback) {
    var options = {
        method: 'POST',
        url: resource + '/' + id + '/invoices',
        json: true,
        body: data
    };

    client.call(options, function(err, response) {
        if (err) {
            return callback(err, bull);
        }
        callback(null, response);
    });
};

Orders.prototype.createShipments = function(id, data, callback) {
    var options = {
        method: 'POST',
        url: resource + '/' + id + '/shipments',
        json: true,
        body: data
    };

    client.call(options, function(err, response) {
        if (err) {
            return callback(err, bull);
        }
        callback(null, response);
    });
};

Orders.prototype.printLabel = function(id, callback) {
    var options = {
        method: 'GET',
        url: resource + '/' + id,
    };

    client.call(options, function(err, response) {
        if (err) {
            return callback(err, bull);
        }
        callback(null, response);
    });

};

module.exports = Orders;
