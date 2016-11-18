var request = require('request');

module.exports = function() {
    var base_url = 'https://sandbox-connect.sellerworx.com';
    if(global.SWX.env === 'prod') {
        base_url = 'https://connect.sellerworx.com';
    }

    var version = '/api/v7';
    var api_url = base_url + version;
    _this = this;

    this.call = function(options, callback) {
        options.url = api_url + options.url;

        if (options.headers) {
            options.headers.authorization = options.headers.authorization || 'Bearer ' + global.SWX.access_token;
        } else {
            options.headers = {
                authorization: 'Bearer ' + global.SWX.access_token,
            };
        }

        console.log(options);

        request(options, function(err, response, body) {
            if (err) {
                throw new Error(err);
            }

            if (response.statusCode === 401) {
                regenerateAuth(function(error, response) {
                    if(error) {
                        return console.log(error);
                    }

                    console.log(response.body);
                    var data = response.body;

                    global.SWX.access_token = data.access_token;
                    global.SWX.refresh_token = data.refresh_token;
                    global.SWX.expires_at = new Date().getTime() + data.expires_in * 1000;

                    this.call(options, callback);
                });

                return;
            }

            // Convert to Object
            try {
                body = JSON.parse(body);
            } catch (e) {
                if (response.statusCode !== 200) {
                    return callback(body, null);
                }
                return callback(null, response.body);
            }

            if (response.statusCode !== 200) {
                if (body.error) {
                    throw new Error(body.error_description);
                } else {
                    throw new Error(response.body);
                }
            }

            callback(null, body);
        });
    };

    var regenerateAuth = function(callback) {
        var options = {
            method: 'POST',
            url: '/oauth/access_token',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            form: {
                client_id: global.SWX.credentials.client_id,
                grant_type: 'refresh_token',
                redirect_uri: global.SWX.credentials.redirect_uri,
                client_secret: global.SWX.credentials.client_secret,
                refresh_token: global.SWX.refresh_token,
            }
        };

        this.auth(options, callback);
    };

    this.auth = function(options, callback) {
        options.url = base_url + options.url;
        console.log(options);
        request(options, callback);
    };

    return this;
};
