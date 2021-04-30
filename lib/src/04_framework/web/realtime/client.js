const io = require("socket.io-client");

const URL = require("../../../01_enterprise/remote-epg-url");

module.exports = (data) => {
  const socket = io(URL);
}

