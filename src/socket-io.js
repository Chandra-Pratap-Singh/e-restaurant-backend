const Socket = require("socket.io");
let io;

module.exports = {
  init(httpServer) {
    io = Socket(httpServer, {
      cors: {
        origin: "*",
        methods: ["OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
      },
    });
    return io;
  },
  getIo() {
    if (!io) throw new Error("io not initialized");
    return io;
  },
};
