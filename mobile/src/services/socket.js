import socketio from "socket.io-client";

const socket = socketio("http://10.0.5.202:8888", {
  autoConnect: false,
});

function subscribeToNewsDevs(subscribeFunction) {
  socket.on("new-dev", subscribeFunction);
}

function connect(latitude, longitude, techs) {
  socket.io.opts.query = {
    latitude,
    longitude,
    techs,
  };

  socket.connect();

  socket.on("message", (text) => {});
}

function disconnect() {
  if (socket.connected) {
    socket.disconnect();
  }
}

export { connect, disconnect, subscribeToNewsDevs };
