var Auth = require(__dirname + '/auth');
var Skus = require(__dirname + '/skus');
var Channels = require(__dirname + '/channels');
var Orders = require(__dirname + '/orders');

module.exports.api = function(credentials) {
    // Global variables
    global.SWX = global.SWX || {};
    global.SWX.credentials = credentials;
    global.SWX.env = credentials.env;

    global.SWX.expires_at = credentials.expires_at || '';
    global.SWX.access_token = credentials.access_token || '';
    global.SWX.refresh_token = credentials.refresh_token || '';

    this.auth = new Auth();
    this.channels = new Channels();
    this.skus = new Skus();
    this.orders = new Orders();

    this.verify = function(callback) {
        this.auth.verify(callback);
    };

    return this;
};
