var noderworx = require(__dirname + '/index');

var credentials = {
    env: 'staging', // 'staging' or 'prod'
    client_id: '',
    client_secret: '',
    redirect_uri: '',
};

var API = noderworx.api(credentials);
var code = 'no839cB0xHkOGliStV1pfM6qDzm4rBATwmSNWeZ3';

API.auth.getAccessToken(code, function(data) {
    console.log(data);
});

API.verify(function(is_verified) {
    console.log(is_verified);
});

var channel_options = {
    filters: JSON.stringify({
        connected: true
    }),
    limit: 1
};

API.channels.getAll(channel_options, function(err, data) {
    if (err) {
        throw new Error(err);
    }
    console.log(data);
});

API.channels.get(12, function(err, data) {
    if (err) {
        throw new Error(err);
    }
    console.log(data);
});
