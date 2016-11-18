var client = require(__dirname + '/client')();

function channels() {
    this.resource = '/channels';
}

channels.prototype.getAll = function(qs, callback) {
    var options = {
        method: 'GET',
        url: this.resource,
        qs: qs
    };

    client.call(options, function(err, response) {
        if (err) {
            return callback(err, null);
        }
        callback(null, response);
    });
};

channels.prototype.get = function(id, callback) {
    var options = {
        method: 'GET',
        url: this.resource + '/' + id,
    };

    client.call(options, function(err, response) {
        if (err) {
            return callback(err, bull);
        }
        callback(null, response);
    });

};

module.exports = channels;
