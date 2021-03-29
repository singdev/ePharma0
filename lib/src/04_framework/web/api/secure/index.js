const apiKeyAuth = require('api-key-auth');

module.exports = (app) => {

    const apiKeys = new Map();
    apiKeys.set('ca437661-ffd1-48aa-887f-b0a50fed4952', {
        id: 1,
        name: 'main',
        secret: 'H93932Dlrlkhg4IlvAAw8jRC4a7twcZb'
    });

    // Your function to get the secret associated to the key id
    function getSecret(keyId, done) {
        if (!apiKeys.has(keyId)) {
            return done(new Error('Unknown api key'));
        }
        const clientApp = apiKeys.get(keyId);
        done(null, clientApp.secret, {
            id: clientApp.id,
            name: clientApp.name
        });
    }

    app.use('/api', apiKeyAuth({ getSecret }));
}