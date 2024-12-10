// eslint-disable-next-line import/no-extraneous-dependencies
const socketIO = require("socket.io");
const { api } = require("../config/messages");
const { depositService } = require("../services");

const socketConnection = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: "*",
    },
    addTrailingSlash: false,
  });
  io.on("connection", async (socket) => {
    console.log("A client connected:", socket.id);

    // create deposit
    socket.on("new-deposit", async (data) => {
      const deposit = await depositService.addDeposit(data);

      if (!deposit) {
        return socket.emit("error", { error: api.internalServerError });
      }
      const allDeposits = await depositService.getAllDeposits({});
      /// sending deposits to concerned persons
      // io.to(deposit?.recieverId).emit("allDeposits", allDeposits);
      io.to([deposit?.receiverId, "672e05607f762523835d1f01"]).emit(
        "allDeposits",
        allDeposits
      );
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("A client disconnected:", socket.id);
    });
  });
  return io;
};

module.exports = {
  socketConnection,
};
