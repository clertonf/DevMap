const socketio = require("socket.io");

const parseStringAsArray = require("./utils/parseStringAsArray");
const calculateDistance = require("./utils/calculateDistance");
// const { connection } = require("mongoose");

let io;
const connections = [];

exports.setupWebSocket = (server) => {
  io = socketio(server);

  io.on("connection", (socket) => {
    console.log(socket.id);
    const { latitude, longitutde, techs } = socket.handshake.query;

    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitutde: Number(longitutde),
      },
      techs: parseStringAsArray,
    });
  });
};

exports.findConnections = (coordinates, techs) => {
  return connections.filter((connection) => {
    return (
      calculateDistance(coordinates, connection.coordinates) < 10 &&
      connection.tech.some((item) => techs.includes(item))
    );
  });
};

exports.sendMessage = (to, message, data) => {
  to.forEach((connection) => {
    io.to(connection.id).emit(message, data);
  });
};
