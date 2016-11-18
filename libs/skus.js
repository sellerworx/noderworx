var client = require(__dirname + '/client')();

function Skus() {
    this.resource = '/skus';
}

Skus.prototype.getAll = function(qs, callback) {
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

Skus.prototype.get = function(id, callback) {
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

Skus.prototype.update = function(id, data, callback) {
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

Skus.prototype.updateSameStock = function(data, callback) {
    var options = {
        method: 'PUT',
        url: resource + '/stock',
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

module.exports = Skus;
