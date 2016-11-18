var client = require(__dirname + '/client')();

module.exports = function() {
    _this = this;
    _this.client_id = global.SWX.credentials.client_id;
    _this.client_secret = global.SWX.credentials.client_secret;
    _this.redirect_uri = global.SWX.credentials.redirect_uri;

    this.verify = function(callback) {
        var options = {
            method: 'GET',
            url: '/seller',
            headers: {
                authorization: 'Bearer ' + global.SWX.access_token
            }
        };

        client.call(options, function (err, response) {
            if(err) {
                throw new Error(err);
            }

            callback(response);
        });
    };

    this.getAccessToken = function(code, callback) {
        var options = {
            method: 'POST',
            url: '/oauth/access_token',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            form: {
                code: code,
                client_id: _this.client_id,
                grant_type: 'authorization_code',
                redirect_uri: _this.redirect_uri,
                client_secret: _this.client_secret,
            }
        };

        client.auth(options, function(err, response, body) {
            if (err) {
                throw new Error(err);
            }

            body = JSON.parse(body);

            if (response.statusCode !== 200) {
                if (body.error) {
                    throw new Error(body.error + ': ' + body.error_description);
                }
                throw new Error(response.body);
            }

            setGlobalAuthData(body);
            callback(body);
        });
    };

    this.getRefreshToken = function(callback) {
        var options = {
            method: 'POST',
            url: '/oauth/access_token',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            form: {
                client_id: _this.client_id,
                grant_type: 'refresh_token',
                redirect_uri: _this.redirect_uri,
                client_secret: _this.client_secret,
                refresh_token: global.SWX.refresh_token,
            }
        };

        client.auth(options, function(err, response, body) {
            if (err) {
                throw new Error(err);
            }

            console.log(body);

            if (response.statusCode !== 200) {
                if (body.error) {
                    throw new Error(body.error + body.error_description);
                }
                throw new Error(response.body);
            }

            setGlobalAuthData(body);
            callback(body);
        });
    };

    var setGlobalAuthData = function(data) {
        global.SWX.access_token = data.access_token;
        global.SWX.refresh_token = data.refresh_token;
        global.SWX.expires_at = new Date().getTime() + data.expires_in * 1000;
    };

    return this;
};
