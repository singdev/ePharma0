const Profil = require("../../db/mongodb/model/Profil");

module.exports = (server) => {

  const { Server } = require("socket.io");
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on("sync", async (data) => {
      console.log(data);
      const info = {
        nom: data.nom,
        prenom: data.prenom,
        email: data.email,
        telephone: data.telephone
      };
      const res = await Profil.findOneAndUpdate({ pid: data.pid }, info);
      console.log(res);
    });
  });
}