const Profil = require("../../db/mongodb/model/Profil");

module.exports = (server) => {

  const { Server } = require("socket.io");
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on("sync", async (data) => {
      await Profil.findByIdAndUpdate(data._id, {
        nom: data.nom,
        prenom: data.nom,
        email: data.email,
        telephone: data.telephone
      });
    });
  });
}