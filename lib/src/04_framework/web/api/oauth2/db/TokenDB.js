let AccessToken;

module.exports = (injectedAccessToken) => {
    AccessToken = injectedAccessToken;

    return {
        saveAccessToken: saveAccessToken,
        getUserIDFromBearerToken: getUserIDFromBearerToken,
    };
};

function saveAccessToken(accessToken, userID, cbFunc) {
    const a = new AccessToken({ access_token: accessToken, user_id: userID});
    a.save(cbFunc);
}

function getUserIDFromBearerToken(bearerToken, cbFunc) {
    AccessToken.findOne({ access_token: bearerToken }, (err, data) => {
        let userID;
        if(data == null){
            userID = null;
        } else {
            userID = data.user_id;
        }
        cbFunc(userID);
    })
}